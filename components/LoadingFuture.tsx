'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { FutureFormData } from '@/lib/types'
import { generateMockFutureResult } from '@/lib/generateMockFutureResult'
import { saveResult } from '@/lib/storage'

const PHRASES_NO_PHOTO = [
  'ИИ ищет твою альтернативную линию жизни…',
  'Собираем версию 2031…',
  'Сравниваем два сценария будущего…',
  'Пишем письмо от тебя из будущего…',
  'Собираем твой DreamFeed…',
  'Почти готово…',
]

const PHRASES_WITH_PHOTO = [
  'GPT-4o изучает твою внешность…',
  'Анализируем твои мечты и страхи…',
  'Пишем письмо из 2031…',
  'Собираем твой DreamFeed…',
  'Готовим 6 сцен для генерации…',
  'Почти готово…',
]

const MIN_DISPLAY_MS = 4500

interface Props {
  formData: FutureFormData
}

export default function LoadingFuture({ formData }: Props) {
  const router = useRouter()
  const PHRASES = formData.photo ? PHRASES_WITH_PHOTO : PHRASES_NO_PHOTO
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const doneRef = useRef(false)

  // Rotate phrases
  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((i) => (i + 1) % PHRASES.length)
    }, 1200)
    return () => clearInterval(interval)
  }, [])

  // Animate progress bar (tied to min display time)
  useEffect(() => {
    const start = Date.now()
    let raf: number
    const tick = () => {
      const elapsed = Date.now() - start
      const pct = Math.min((elapsed / MIN_DISPLAY_MS) * 90, 90) // holds at 90% until API done
      setProgress(pct)
      if (pct < 90) {
        raf = requestAnimationFrame(tick)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  // Call API + wait minimum time, then navigate
  useEffect(() => {
    const startTime = Date.now()

    const generate = async () => {
      try {
        const res = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        if (!res.ok) throw new Error('API error')
        const result = await res.json()
        saveResult(result)
      } catch {
        // Graceful fallback to mock
        const result = generateMockFutureResult(formData)
        saveResult(result)
      }

      // Ensure minimum display time for UX
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed)

      setTimeout(() => {
        if (doneRef.current) return
        doneRef.current = true
        setProgress(100)
        // Small delay so user sees 100%
        setTimeout(() => router.push('/result'), 400)
      }, remaining)
    }

    generate()
  }, [formData, router])

  return (
    <div className="min-h-screen bg-[#07070A] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-pink-600/8 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 text-center max-w-md w-full">
        {/* Animated orb */}
        <div className="flex items-center justify-center mb-10">
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="w-24 h-24 rounded-full border-2 border-dashed border-violet-500/30"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-2 rounded-full border-2 border-dashed border-pink-500/20"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-600 to-pink-600 shadow-[0_0_30px_rgba(139,92,246,0.5)]"
              />
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-black text-white mb-2">Создаём твою версию</h1>
        <p className="text-white/40 mb-10 text-sm">
          {formData.photo ? 'GPT-4o анализирует фото и пишет твоё будущее…' : 'GPT-4o пишет твоё будущее…'}
        </p>

        {/* Rotating phrase */}
        <div className="h-14 flex items-center justify-center mb-8">
          <AnimatePresence mode="wait">
            <motion.p
              key={phraseIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="text-base text-violet-300 font-medium text-center"
            >
              {PHRASES[phraseIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-gradient-to-r from-violet-500 via-blue-500 to-pink-500 rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
        <p className="text-xs text-white/25">{Math.round(progress)}%</p>

        {/* Steps */}
        <div className="mt-10 grid grid-cols-3 gap-4">
          {(formData.photo
            ? [
                { label: 'Анализ фото', done: progress > 20 },
                { label: 'Письмо + Feed', done: progress > 65 },
                { label: 'Готово к сценам', done: progress > 90 },
              ]
            : [
                { label: 'Анализ мечт', done: progress > 25 },
                { label: 'Создание письма', done: progress > 60 },
                { label: 'DreamFeed', done: progress > 88 },
              ]
          ).map((item, i) => (
            <div key={i} className="text-center">
              <div
                className={`w-6 h-6 rounded-full mx-auto mb-1.5 flex items-center justify-center transition-all duration-500 ${
                  item.done
                    ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]'
                    : 'bg-white/10'
                }`}
              >
                {item.done ? (
                  <span className="text-xs">✓</span>
                ) : (
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                )}
              </div>
              <p className="text-xs text-white/30">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
