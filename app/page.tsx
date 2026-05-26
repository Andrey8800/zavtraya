import HeroSection from '@/components/HeroSection'
import HowItWorks from '@/components/HowItWorks'
import ExampleCards from '@/components/ExampleCards'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="bg-[#07070A] min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-black gradient-text-alt">
            ЗавтраЯ
          </Link>
          <Link
            href="/create"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl btn-gradient text-white font-semibold text-sm"
          >
            Начать
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      <HeroSection />
      <HowItWorks />
      <ExampleCards />

      {/* Final CTA */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-violet-600/10 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6">
            Твоя версия 2031
            <br />
            <span className="gradient-text">уже существует</span>
          </h2>
          <p className="text-lg text-white/50 mb-10 leading-relaxed">
            Один из вариантов будущего ждёт. Ты хочешь его увидеть?
          </p>
          <Link
            href="/create"
            className="inline-flex items-center gap-2 px-10 py-5 rounded-2xl btn-gradient text-white font-bold text-xl"
          >
            Показать моё будущее
            <ArrowRight className="w-6 h-6" />
          </Link>
          <p className="text-sm text-white/25 mt-5">Бесплатно · Занимает 2 минуты</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">© 2026 ЗавтраЯ</p>
          <p className="text-white/20 text-xs">
            Это MVP-прототип. Результаты — визуальный эксперимент, не предсказание.
          </p>
        </div>
      </footer>
    </main>
  )
}
