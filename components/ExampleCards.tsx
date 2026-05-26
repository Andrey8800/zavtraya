'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const examples = [
  {
    title: 'Будущее у моря',
    subtitle: 'Свобода · Путешествия',
    income: '300 000 ₽',
    months: '18 мес',
    gradient: 'from-blue-950 via-cyan-900 to-teal-900',
    emoji: '🌊',
    preview: 'Кофе на рассвете. Волны за окном. Будильника нет.',
  },
  {
    title: 'Удалённая работа',
    subtitle: 'Свой проект · Доход',
    income: '500 000 ₽',
    months: '18 мес',
    gradient: 'from-violet-950 via-purple-900 to-indigo-900',
    emoji: '💻',
    preview: 'Ноутбук открыт. Проект приносит, а не только забирает.',
  },
  {
    title: 'Свой проект',
    subtitle: 'Бизнес · Творчество',
    income: '1 000 000 ₽+',
    months: '24 мес',
    gradient: 'from-amber-950 via-orange-900 to-rose-900',
    emoji: '🚀',
    preview: 'Клиенты пишут сами. Ты выбираешь, с кем работать.',
  },
  {
    title: 'Дом на колёсах',
    subtitle: 'Свобода · Путешествия',
    income: '300 000 ₽',
    months: '12 мес',
    gradient: 'from-emerald-950 via-teal-900 to-cyan-900',
    emoji: '🏕️',
    preview: 'Новый город каждые три недели. Дом едет с тобой.',
  },
]

export default function ExampleCards() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-pink-400 uppercase tracking-widest mb-3">
            Примеры результатов
          </p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
            Какой может быть{' '}
            <span className="gradient-text">твоя версия</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {examples.map((ex, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <Link href="/create">
                <div className="glass rounded-2xl overflow-hidden border border-white/8 hover:border-white/15 transition-all duration-300 hover:-translate-y-1">
                  {/* Gradient image area */}
                  <div className={`h-40 bg-gradient-to-br ${ex.gradient} relative flex items-end p-4`}>
                    <span className="absolute top-4 right-4 text-3xl">{ex.emoji}</span>
                    <p className="text-xs text-white/60 italic leading-relaxed">{ex.preview}</p>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-base font-bold text-white mb-1">{ex.title}</h3>
                    <p className="text-xs text-white/40 mb-3">{ex.subtitle}</p>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-white/30">доход</p>
                        <p className="text-sm font-semibold text-violet-300">{ex.income}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-white/30">до цели</p>
                        <p className="text-sm font-semibold text-emerald-400">{ex.months}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/create"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl btn-gradient text-white font-semibold text-lg"
          >
            Создать мою версию
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
