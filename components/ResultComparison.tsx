'use client'

import { motion } from 'framer-motion'
import { X, Check } from 'lucide-react'
import { ComparisonSide } from '@/lib/types'

interface Props {
  noChange: ComparisonSide
  change: ComparisonSide
}

export default function ResultComparison({ noChange, change }: Props) {
  return (
    <section className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8 text-center"
      >
        <h2 className="text-2xl sm:text-3xl font-black text-white">Два сценария</h2>
        <p className="text-white/40 mt-2 text-sm">Выбор всегда твой</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* No change */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-6 border border-white/8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <span className="text-lg">😶</span>
            </div>
            <div>
              <p className="text-xs text-white/30 uppercase tracking-wide">Если ничего не менять</p>
              <p className="text-sm font-semibold text-white/70">Знакомый сценарий</p>
            </div>
          </div>

          <p className="text-sm text-white/50 leading-relaxed mb-5 italic">
            «{noChange.text}»
          </p>

          <ul className="space-y-2.5">
            {noChange.points.map((point, i) => (
              <li key={i} className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-red-500/15 border border-red-500/20 flex items-center justify-center shrink-0">
                  <X className="w-3 h-3 text-red-400" />
                </div>
                <span className="text-sm text-white/50">{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* With change */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative glass-strong rounded-2xl p-6 border border-violet-500/20 shadow-[0_0_40px_rgba(139,92,246,0.1)]"
        >
          {/* Glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-600/5 to-pink-600/5 pointer-events-none" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-violet-500/15 border border-violet-500/20 flex items-center justify-center">
                <span className="text-lg">✨</span>
              </div>
              <div>
                <p className="text-xs text-violet-400 uppercase tracking-wide">Если начать сейчас</p>
                <p className="text-sm font-semibold text-white">Твой сценарий</p>
              </div>
            </div>

            <p className="text-sm text-white/60 leading-relaxed mb-5 italic">
              «{change.text}»
            </p>

            <ul className="space-y-2.5">
              {change.points.map((point, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-emerald-400" />
                  </div>
                  <span className="text-sm text-white/75">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
