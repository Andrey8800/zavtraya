'use client'

import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'

interface Props {
  letter: string
}

export default function FutureLetter({ letter }: Props) {
  const paragraphs = letter.split('\n\n').filter(Boolean)

  return (
    <section className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <p className="text-xs font-bold text-violet-400 uppercase tracking-widest mb-2">
          Из будущего
        </p>
        <h2 className="text-2xl sm:text-3xl font-black text-white">Письмо тебе от тебя</h2>
        <p className="text-white/40 text-sm mt-1">Написано тобой из 2031 года</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative glass-strong rounded-3xl p-6 sm:p-8 border border-violet-500/15 shadow-[0_0_60px_rgba(139,92,246,0.08)]"
      >
        {/* Glow bg */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-600/5 via-transparent to-pink-600/5 pointer-events-none" />

        <div className="relative">
          {/* Header */}
          <div className="flex items-center gap-3 mb-7 pb-5 border-b border-white/8">
            <div className="w-11 h-11 rounded-2xl bg-violet-500/15 border border-violet-500/20 flex items-center justify-center">
              <Mail className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Личное письмо</p>
              <p className="text-xs text-white/35">от: ты из 2031 · кому: ты сейчас</p>
            </div>
            <div className="ml-auto px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/15">
              <span className="text-xs text-violet-400 font-medium">2031</span>
            </div>
          </div>

          {/* Letter content */}
          <div className="space-y-4">
            {paragraphs.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`leading-relaxed text-sm sm:text-base ${
                  i === 0
                    ? 'text-white font-medium text-base sm:text-lg'
                    : 'text-white/65'
                }`}
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Signature */}
          <div className="mt-8 pt-5 border-t border-white/8">
            <p className="text-white/30 text-sm italic">
              Это письмо написано на основе твоих мечт и страхов. Каждое слово — правда, которую ты уже знаешь.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
