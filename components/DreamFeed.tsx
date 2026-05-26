'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { DreamFeedCard, PlaceOption, DreamOption } from '@/lib/types'

interface Props {
  cards: DreamFeedCard[]
  photo?: string
  place?: PlaceOption
  dreams?: DreamOption[]
  personDescription?: string
}

function CardImage({
  card,
  photo,
  place,
  dreams,
  personDescription,
  delay,
}: {
  card: DreamFeedCard
  photo?: string
  place?: PlaceOption
  dreams?: DreamOption[]
  personDescription?: string
  delay: number
}) {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  const generate = useCallback(async () => {
    if (!photo || !place || !dreams) return
    setStatus('loading')
    try {
      const res = await fetch('/api/card-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photo, cardId: card.id, place, dreams, personDescription }),
      })
      const data = await res.json()
      if (data.imageUrl) {
        setImageUrl(data.imageUrl)
        setStatus('done')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }, [photo, place, dreams, card.id, personDescription])

  useEffect(() => {
    if (!photo) return
    const timer = setTimeout(generate, delay)
    return () => clearTimeout(timer)
  }, [generate, delay, photo])

  return (
    <div className="relative h-56 overflow-hidden bg-black">
      {/* Gradient fallback — always rendered underneath */}
      <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient}`} />
      <div className="absolute inset-0 bg-black/20" />

      {/* Loading shimmer */}
      {status === 'loading' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/60 backdrop-blur-sm z-10">
          <div className="relative">
            <div className="w-10 h-10 rounded-full border-2 border-violet-500/30 border-t-violet-400 animate-spin" />
          </div>
          <p className="text-white/50 text-xs text-center px-4">
            DALL·E 3 рисует<br />твою сцену…
          </p>
        </div>
      )}

      {/* Real generated image */}
      {imageUrl && (
        <motion.img
          src={imageUrl}
          alt={card.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 w-full h-full object-cover z-10"
        />
      )}

      {/* Fallback emoji when no photo or error */}
      {!photo && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl opacity-25">{card.emoji}</span>
        </div>
      )}

      {/* Gradient overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent z-20" />

      {/* Caption pill */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-30">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/55 backdrop-blur-sm text-white/85 text-xs font-medium">
          <span>{card.emoji}</span>
          <span>{card.caption}</span>
        </span>
        {status === 'done' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-2 py-1 rounded-lg bg-violet-500/25 backdrop-blur-sm border border-violet-400/30 text-violet-300 text-[10px] font-bold"
          >
            AI ✓
          </motion.span>
        )}
      </div>
    </div>
  )
}

export default function DreamFeed({ cards, photo, place, dreams, personDescription }: Props) {
  return (
    <section className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <p className="text-xs font-bold text-pink-400 uppercase tracking-widest mb-2">DreamFeed</p>
        <h2 className="text-2xl sm:text-3xl font-black text-white">Твоя лента будущего</h2>
        <p className="text-white/40 text-sm mt-1">
          {photo
            ? 'Генерируем тебя в каждой сцене 2031 — появятся поочерёдно'
            : 'Шесть сцен из жизни в 2031'}
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card, i) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group glass rounded-2xl overflow-hidden border border-white/8 hover:border-white/18 transition-all duration-300 hover:-translate-y-1"
          >
            <CardImage
              card={card}
              photo={photo}
              place={place}
              dreams={dreams}
              personDescription={personDescription}
              delay={i * 3000}  // stagger 3s apart to avoid rate limits
            />

            <div className="p-5">
              <h3 className="text-base font-bold text-white mb-2">{card.title}</h3>
              <p className="text-sm text-white/55 leading-relaxed">{card.text}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {photo && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-xs text-white/25 mt-6"
        >
          Каждая сцена генерируется отдельно · DALL·E 3 · ~10-15с на карточку
        </motion.p>
      )}
    </section>
  )
}
