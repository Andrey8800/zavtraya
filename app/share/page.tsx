import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface Props {
  searchParams: Promise<{
    place?: string
    income?: string
    months?: string
    dreams?: string
  }>
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams
  const place = params.place || 'У моря'
  const income = params.income || '300 000 ₽'
  const months = params.months || '18'
  const dreams = params.dreams || 'Свобода · Путешествия · Свой проект'

  const ogImageUrl = `/api/og?place=${encodeURIComponent(place)}&income=${encodeURIComponent(income)}&months=${encodeURIComponent(months)}&dreams=${encodeURIComponent(dreams)}`

  return {
    title: 'Смотри, какое будущее я создал в ЗавтраЯ',
    description: `${place} · ${income} / мес · До новой жизни: ${months} месяцев. Создай свою версию!`,
    openGraph: {
      title: 'Моя версия 2031 — ЗавтраЯ',
      description: `${place} · ${income} · ${months} мес до новой жизни`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: 'Версия 2031 — ЗавтраЯ',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Моя версия 2031 — ЗавтраЯ',
      description: `${place} · ${income} · ${months} мес до новой жизни`,
      images: [ogImageUrl],
    },
  }
}

export default async function SharePage({ searchParams }: Props) {
  const params = await searchParams
  const place = params.place || 'У моря'
  const income = params.income || '300 000 ₽'
  const months = params.months || '18'
  const dreamsRaw = params.dreams || 'Свобода · Путешествия · Свой проект'
  const dreamsList = dreamsRaw.split(' · ').filter(Boolean)

  return (
    <div className="min-h-screen bg-[#07070A] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-violet-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-600/8 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-lg w-full text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-violet-500/20 mb-8">
          <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          <span className="text-sm text-violet-300 font-medium">Версия 2031</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
          Кто-то создал{' '}
          <span className="gradient-text">своё будущее</span>
        </h1>
        <p className="text-white/50 text-lg mb-10">
          И поделился им с тобой. Посмотри на детали — и создай свою версию.
        </p>

        {/* Preview card */}
        <div className="glass-strong rounded-3xl p-6 border border-white/10 mb-10 text-left shadow-[0_0_60px_rgba(139,92,246,0.08)]">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs font-bold text-violet-400 uppercase tracking-widest">
              Чья-то версия 2031
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="glass rounded-xl p-3 border border-white/8 text-center">
              <p className="text-xs text-white/30 mb-1">место</p>
              <p className="text-sm font-bold text-white">{place}</p>
            </div>
            <div className="glass rounded-xl p-3 border border-violet-500/20 text-center">
              <p className="text-xs text-violet-400/60 mb-1">доход</p>
              <p className="text-sm font-bold text-violet-300">{income}</p>
            </div>
            <div className="glass rounded-xl p-3 border border-emerald-500/20 text-center">
              <p className="text-xs text-emerald-400/60 mb-1">до цели</p>
              <p className="text-sm font-bold text-emerald-400">{months} мес</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {dreamsList.map((d) => (
              <span
                key={d}
                className="px-3 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/15 text-xs text-violet-300 font-medium"
              >
                {d}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/create"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl btn-gradient text-white font-bold text-lg w-full justify-center"
        >
          Создать мою версию 2031
          <ArrowRight className="w-5 h-5" />
        </Link>

        <p className="text-white/25 text-sm mt-4">Бесплатно · Занимает 2 минуты</p>
      </div>
    </div>
  )
}
