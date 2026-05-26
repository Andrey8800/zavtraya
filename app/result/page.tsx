'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Clock, ArrowRight } from 'lucide-react'
import { FutureResult, FutureFormData } from '@/lib/types'
import { loadResult, loadFormData } from '@/lib/storage'
import { generateMockFutureResult } from '@/lib/generateMockFutureResult'
import ResultComparison from '@/components/ResultComparison'
import DreamFeed from '@/components/DreamFeed'
import FutureLetter from '@/components/FutureLetter'
import ShareButtons from '@/components/ShareButtons'

export default function ResultPage() {
  const [result, setResult] = useState<FutureResult | null>(null)
  const [formData, setFormData] = useState<FutureFormData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedResult = loadResult()
    const storedForm = loadFormData()

    if (storedResult && storedForm) {
      setResult(storedResult)
      setFormData(storedForm)
    } else if (storedForm && !storedResult) {
      // Regenerate if result missing but form data exists
      const generated = generateMockFutureResult(storedForm)
      setResult(generated)
      setFormData(storedForm)
    }

    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07070A] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
      </div>
    )
  }

  if (!result || !formData) {
    return <EmptyState />
  }

  return (
    <div className="bg-[#07070A] min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-50 px-4 sm:px-6 py-4 border-b border-white/5 bg-[#07070A]/80 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-white/50 hover:text-white text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            На главную
          </Link>
          <span className="text-sm font-bold gradient-text-alt">ЗавтраЯ</span>
          <Link
            href="/create"
            className="text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors"
          >
            Создать ещё
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 pb-20">
        {/* Hero block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 relative"
        >
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-violet-600/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative">
            <span className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-bold uppercase tracking-widest mb-6">
              Версия 2031
            </span>

            {/* Generated portrait — main visual */}
            {result.generatedPortraitUrl && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto mb-8"
              >
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/30 via-pink-500/20 to-blue-500/20 blur-2xl scale-110" />
                <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-white/15 shadow-[0_0_60px_rgba(139,92,246,0.35)]">
                  <img
                    src={result.generatedPortraitUrl}
                    alt="Ты в 2031"
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay label */}
                  <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/70 to-transparent">
                    <p className="text-white text-sm font-semibold">Ты в 2031</p>
                    <p className="text-white/50 text-xs">сгенерировано DALL-E 3</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Original photo (small, if no portrait generated) */}
            {!result.generatedPortraitUrl && formData.photo && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-20 h-20 rounded-full mx-auto mb-6 overflow-hidden border-2 border-violet-500/40 shadow-[0_0_30px_rgba(139,92,246,0.3)]"
              >
                <img src={formData.photo} alt="Твоё фото" className="w-full h-full object-cover" />
              </motion.div>
            )}

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4">
              <span className="gradient-text">{result.title}</span>
            </h1>
            <p className="text-base sm:text-lg text-white/50 max-w-xl mx-auto leading-relaxed">
              {result.subtitle}
            </p>
          </div>
        </motion.div>

        {/* Timeline block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-strong rounded-2xl p-6 border border-white/10 mb-10 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-transparent pointer-events-none" />
          <div className="relative">
            <p className="text-white/40 text-sm mb-2">До новой версии жизни</p>
            <div className="flex items-center justify-center gap-3">
              <Clock className="w-6 h-6 text-violet-400" />
              <span className="text-5xl font-black gradient-text">
                {result.monthsToNewLife}
              </span>
              <div className="text-left">
                <p className="text-xl font-bold text-white">месяцев</p>
                <p className="text-xs text-white/30">ориентир</p>
              </div>
            </div>
            <p className="text-white/30 text-xs mt-3 max-w-xs mx-auto">
              Это не гарантия. Это ориентир, чтобы мечта стала маршрутом.
            </p>
          </div>
        </motion.div>

        {/* Comparison */}
        <ResultComparison
          noChange={result.comparison.noChange}
          change={result.comparison.change}
        />

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-4" />

        {/* DreamFeed */}
        <DreamFeed
          cards={result.dreamFeed}
          photo={formData.photo}
          place={formData.place}
          dreams={formData.dreams}
          personDescription={result.personDescription}
        />

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-4" />

        {/* Letter */}
        <FutureLetter letter={result.letter} />

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-4" />

        {/* Share */}
        <ShareButtons result={result} formData={formData} />
      </main>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="min-h-screen bg-[#07070A] flex flex-col items-center justify-center px-4 text-center">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-violet-600/8 rounded-full blur-[100px]" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <span className="text-7xl mb-6 block">🔮</span>
        <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">
          Будущее ещё не создано
        </h1>
        <p className="text-white/40 text-lg mb-10 max-w-sm">
          Ответь на несколько вопросов, и ИИ покажет твою версию 2031
        </p>
        <Link
          href="/create"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl btn-gradient text-white font-semibold text-lg"
        >
          Создать мою версию
          <ArrowRight className="w-5 h-5" />
        </Link>
        <div className="mt-6">
          <Link href="/" className="text-white/30 hover:text-white/50 text-sm transition-colors">
            На главную
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
