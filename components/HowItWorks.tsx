'use client'

import { motion } from 'framer-motion'
import { Camera, Heart, Sparkles, Share2 } from 'lucide-react'

const steps = [
  {
    icon: Camera,
    step: '01',
    title: 'Загрузи фото',
    description: 'Необязательно, но так твой результат станет ещё более личным и живым.',
    gradient: 'from-violet-600 to-purple-600',
    glow: 'rgba(124, 58, 237, 0.3)',
  },
  {
    icon: Heart,
    step: '02',
    title: 'Выбери мечты',
    description: 'Расскажи, что важно для тебя: свобода, доход, место, люди — или всё сразу.',
    gradient: 'from-pink-600 to-rose-600',
    glow: 'rgba(236, 72, 153, 0.3)',
  },
  {
    icon: Sparkles,
    step: '03',
    title: 'Получи версию будущего',
    description: 'ИИ создаёт твой DreamFeed, письмо из 2031 и путь до новой жизни.',
    gradient: 'from-blue-600 to-indigo-600',
    glow: 'rgba(59, 130, 246, 0.3)',
  },
  {
    icon: Share2,
    step: '04',
    title: 'Поделись с другом',
    description: 'Покажи свою версию будущего или создай версию для того, кто тебе важен.',
    gradient: 'from-emerald-600 to-teal-600',
    glow: 'rgba(16, 185, 129, 0.3)',
  },
]

export default function HowItWorks() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-violet-400 uppercase tracking-widest mb-3">
            Как это работает
          </p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
            Четыре шага до{' '}
            <span className="gradient-text">новой версии</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative group"
              >
                <div className="relative glass rounded-2xl p-6 border border-white/8 hover:border-white/15 transition-all duration-300 h-full">
                  {/* Step number */}
                  <span className="absolute top-5 right-5 text-4xl font-black text-white/5">
                    {step.step}
                  </span>

                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                    style={{ boxShadow: `0 8px 24px ${step.glow}` }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>
                </div>

                {/* Connector line (except last) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-white/10 to-transparent z-20 -translate-x-1/2" />
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
