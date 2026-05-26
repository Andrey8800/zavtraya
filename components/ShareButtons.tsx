'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Share2, Users, RefreshCw, Check } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FutureResult, FutureFormData } from '@/lib/types'

interface Props {
  result: FutureResult
  formData: FutureFormData
}

function buildShareUrl(result: FutureResult, formData: FutureFormData): string {
  if (typeof window === 'undefined') return ''

  const base = window.location.origin
  const dreams = formData.dreams.slice(0, 4).join(' · ')
  const params = new URLSearchParams({
    place: formData.place,
    income: formData.income,
    months: String(result.monthsToNewLife),
    dreams,
  })
  return `${base}/share?${params.toString()}`
}

export default function ShareButtons({ result, formData }: Props) {
  const router = useRouter()
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const shareUrl = buildShareUrl(result, formData)
    const shareData = {
      title: 'Моя версия 2031 — ЗавтраЯ',
      text: result.shareText,
      url: shareUrl,
    }

    try {
      if (navigator.share && navigator.canShare?.(shareData)) {
        await navigator.share(shareData)
      } else {
        await navigator.clipboard.writeText(`${result.shareText}\n\n${shareUrl}`)
        setCopied(true)
        setTimeout(() => setCopied(false), 3000)
      }
    } catch {
      try {
        await navigator.clipboard.writeText(`${result.shareText}\n\n${shareUrl}`)
        setCopied(true)
        setTimeout(() => setCopied(false), 3000)
      } catch { /* silent */ }
    }
  }

  return (
    <section className="py-8">
      {/* Toast */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          >
            <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
              <Check className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-medium text-white">Ссылка скопирована</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">Это только начало</h2>
        <p className="text-white/40 text-sm max-w-sm mx-auto">
          Покажи своё будущее миру или помоги другу увидеть своё
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
      >
        <button
          type="button"
          onClick={handleShare}
          className="group flex-1 flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl btn-gradient text-white font-semibold transition-all duration-300"
        >
          {copied ? (
            <>
              <Check className="w-5 h-5" />
              Скопировано!
            </>
          ) : (
            <>
              <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Поделиться будущим
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => router.push('/create?friend=true')}
          className="flex-1 flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl glass border border-white/10 text-white font-semibold hover:border-white/20 hover:bg-white/5 transition-all duration-300"
        >
          <Users className="w-5 h-5" />
          Версия для друга
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center mt-4"
      >
        <button
          type="button"
          onClick={() => router.push('/create')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white/40 hover:text-white/70 text-sm font-medium transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Создать заново
        </button>
      </motion.div>
    </section>
  )
}
