'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles, Clock } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-violet-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-pink-600/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/8 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-violet-500/20 mb-8"
            >
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-sm text-violet-300 font-medium">Powered by AI</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6"
            >
              Посмотри своё{' '}
              <span className="gradient-text">будущее</span>{' '}
              через 5 лет
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-white/60 leading-relaxed mb-10 max-w-lg"
            >
              Загрузи фото, выбери мечты — и ИИ покажет, какой может стать твоя жизнь,
              если начать менять её сегодня.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/create"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl btn-gradient text-white font-semibold text-lg transition-all duration-300"
              >
                Показать моё будущее
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/result"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl glass border border-white/10 text-white/80 font-semibold text-lg hover:border-white/20 hover:bg-white/5 transition-all duration-300"
              >
                Посмотреть пример
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 flex items-center gap-6"
            >
              <div className="flex -space-x-2">
                {['🧑', '👩', '🧔', '👱'].map((emoji, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full glass border border-white/10 flex items-center justify-center text-lg"
                  >
                    {emoji}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">12 000+ версий будущего</p>
                <p className="text-xs text-white/40">уже создано</p>
              </div>
            </motion.div>
          </div>

          {/* Right: Preview card */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:justify-self-end w-full max-w-sm mx-auto lg:mx-0"
          >
            <div className="relative">
              {/* Glow behind card */}
              <div className="absolute inset-0 bg-violet-600/20 rounded-3xl blur-2xl" />

              {/* Main card */}
              <div className="relative glass-strong rounded-3xl p-6 border border-white/10 glow-violet">
                {/* Card header */}
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-xs text-white/40 mb-1">Версия</p>
                    <p className="text-2xl font-black gradient-text">2031</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs text-emerald-400 font-medium">активна</span>
                  </div>
                </div>

                {/* Mini DreamFeed */}
                <div className="space-y-3 mb-5">
                  {[
                    { emoji: '🌅', title: 'Утро у моря', desc: 'Кофе на рассвете. Будильника нет.' },
                    { emoji: '💻', title: 'Свой проект', desc: '500 000 ₽ / мес без офиса' },
                    { emoji: '🌍', title: 'Новая страна', desc: 'Живёшь там, где выбрал сам' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5"
                    >
                      <span className="text-xl">{item.emoji}</span>
                      <div>
                        <p className="text-sm font-semibold text-white">{item.title}</p>
                        <p className="text-xs text-white/50">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Timeline */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-violet-500/10 border border-violet-500/20 mb-4">
                  <Clock className="w-4 h-4 text-violet-400 shrink-0" />
                  <div>
                    <p className="text-xs text-white/50">До новой жизни</p>
                    <p className="text-sm font-bold text-violet-300">18 месяцев</p>
                  </div>
                </div>

                {/* Letter teaser */}
                <div className="p-3 rounded-xl bg-pink-500/5 border border-pink-500/10">
                  <p className="text-xs text-pink-300/70 italic leading-relaxed">
                    «Ты думал, что опоздал. Но на самом деле ты просто слишком долго ждал...»
                  </p>
                  <p className="text-xs text-white/30 mt-1">— Письмо из 2031</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
