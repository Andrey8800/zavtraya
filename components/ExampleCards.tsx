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
    emoji: '🌊',
    preview: 'Кофе на рассвете. Волны за окном. Будильника нет.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80&fit=crop',
  },
  {
    title: 'Удалённая работа',
    subtitle: 'Свой проект · Доход',
    income: '500 000 ₽',
    months: '18 мес',
    emoji: '💻',
    preview: 'Ноутбук открыт. Проект приносит, а не только забирает.',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=80&fit=crop',
  },
  {
    title: 'Свой проект',
    subtitle: 'Бизнес · Творчество',
    income: '1 000 000 ₽+',
    months: '24 мес',
    emoji: '🚀',
    preview: 'Клиенты пишут сами. Ты выбираешь, с кем работать.',
    image: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=600&q=80&fit=crop',
  },
  {
    title: 'Дом на колёсах',
    subtitle: 'Свобода · Путешествия',
    income: '300 000 ₽',
    months: '12 мес',
    emoji: '🏕️',
    preview: 'Новый город каждые три недели. Дом едет с тобой.',
    image: 'https://images.unsplash.com/photo-1533591380348-14193f1de18f?w=600&q=80&fit=crop',
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
                  {/* Photo area */}
                  <div className="h-40 relative overflow-hidden">
                    <img
                      src={ex.image}
                      alt={ex.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <span className="absolute top-3 right-3 text-2xl">{ex.emoji}</span>
                    <p className="absolute bottom-3 left-3 right-3 text-xs text-white/80 italic leading-relaxed">{ex.preview}</p>
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
