'use client'

import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle, FileText, Users } from 'lucide-react'

const TELEGRAM_URL = 'https://t.me/Crawl88'

export default function PremiumOffer() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="py-8"
    >
      {/* Main offer card */}
      <div className="relative rounded-3xl overflow-hidden border border-violet-500/30 bg-gradient-to-br from-violet-950/60 via-[#0f0a1e] to-pink-950/40 p-7 sm:p-9">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-violet-600/15 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-pink-600/10 rounded-full blur-[60px] pointer-events-none" />

        <div className="relative z-10">
          {/* Badge */}
          <span className="inline-block px-3 py-1 rounded-full bg-violet-500/20 border border-violet-400/30 text-violet-300 text-xs font-bold uppercase tracking-widest mb-5">
            Следующий шаг
          </span>

          <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 leading-tight">
            Хочешь дойти до этой версии?
          </h2>
          <p className="text-white/50 text-sm mb-7 max-w-md">
            ИИ показал направление. Теперь нужен план и поддержка, чтобы не слиться через неделю.
          </p>

          {/* Features */}
          <div className="grid sm:grid-cols-3 gap-3 mb-8">
            {[
              { icon: MessageCircle, text: 'Чат поддержки', sub: 'ответы на вопросы по пути' },
              { icon: FileText, text: 'PDF-памятка', sub: 'как не проебать время' },
              { icon: Users, text: 'Неделя доступа', sub: 'старт без откладывания' },
            ].map(({ icon: Icon, text, sub }) => (
              <div key={text} className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/8">
                <div className="w-8 h-8 rounded-xl bg-violet-500/20 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-violet-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{text}</p>
                  <p className="text-xs text-white/40 mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Price + CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl font-black text-white">499</span>
                <span className="text-lg text-white/60 font-medium">₽</span>
                <span className="text-sm text-white/30 ml-1">/ неделя</span>
              </div>
              <p className="text-xs text-white/30 mt-0.5">Отмена в любой момент</p>
            </div>

            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl btn-gradient text-white font-bold text-base shadow-[0_0_30px_rgba(139,92,246,0.35)] hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] transition-shadow"
            >
              Начать за 499 ₽
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Contact line */}
      <div className="mt-5 text-center">
        <p className="text-white/30 text-sm">
          Остались вопросы?{' '}
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-400 hover:text-violet-300 transition-colors font-medium"
          >
            Напиши в Telegram →
          </a>
        </p>
      </div>
    </motion.section>
  )
}
