import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
})

const defaultOgImage = '/api/og?place=У+моря&income=500+000+₽&months=18&dreams=Свобода+·+Путешествия+·+Свой+проект'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'),
  title: 'ЗавтраЯ — Посмотри своё будущее через 5 лет',
  description:
    'Загрузи фото, выбери мечты — и ИИ покажет, какой может стать твоя жизнь, если начать менять её сегодня.',
  keywords: 'будущее, мечты, ИИ, визуализация, жизнь, изменения',
  openGraph: {
    title: 'ЗавтраЯ — Посмотри своё будущее через 5 лет',
    description: 'Загрузи фото, выбери мечты — и ИИ покажет, какой может стать твоя жизнь.',
    type: 'website',
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: 'ЗавтраЯ — версия 2031',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ЗавтраЯ — Посмотри своё будущее через 5 лет',
    description: 'Загрузи фото, выбери мечты — и ИИ покажет твою версию 2031',
    images: [defaultOgImage],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={inter.variable}>
      <body className={`bg-[#07070A] text-white antialiased ${inter.className}`}>
        {children}
      </body>
    </html>
  )
}
