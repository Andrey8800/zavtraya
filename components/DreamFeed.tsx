'use client'

import { motion } from 'framer-motion'
import { DreamFeedCard, PlaceOption, DreamOption } from '@/lib/types'

interface Props {
  cards: DreamFeedCard[]
  photo?: string
  place?: PlaceOption
  dreams?: DreamOption[]
  personDescription?: string
}

const CARD_PHOTOS: Record<string, Record<string, string>> = {
  morning: {
    'У моря':                 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80&fit=crop',
    'В доме на колёсах':      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80&fit=crop',
    'В своём доме':           'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80&fit=crop',
    'В другой стране':        'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=800&q=80&fit=crop',
    'В большом городе':       'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80&fit=crop',
    'В тихом месте на природе':'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80&fit=crop',
  },
  work: {
    default: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80&fit=crop',
  },
  money: {
    default: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80&fit=crop',
  },
  people: {
    default: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80&fit=crop',
  },
  place: {
    'У моря':                 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80&fit=crop',
    'В доме на колёсах':      'https://images.unsplash.com/photo-1533591380348-14193f1de18f?w=800&q=80&fit=crop&auto=format',
    'В своём доме':           'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80&fit=crop',
    'В другой стране':        'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80&fit=crop',
    'В большом городе':       'https://images.unsplash.com/photo-1514565131-fce0801e6true?w=800&q=80&fit=crop',
    'В тихом месте на природе':'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80&fit=crop',
  },
  evening: {
    default: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&fit=crop',
  },
}

function getCardPhoto(cardId: string, place?: PlaceOption): string {
  const map = CARD_PHOTOS[cardId]
  if (!map) return ''
  if (place && map[place]) return map[place]
  return map['default'] ?? Object.values(map)[0] ?? ''
}

function CardImage({ card, place }: { card: DreamFeedCard; place?: PlaceOption }) {
  const photo = getCardPhoto(card.id, place)

  return (
    <div className="relative h-56 overflow-hidden bg-black">
      <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient}`} />

      {photo && (
        <motion.img
          src={photo}
          alt={card.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent z-20" />

      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-30">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/55 backdrop-blur-sm text-white/85 text-xs font-medium">
          <span>{card.emoji}</span>
          <span>{card.caption}</span>
        </span>
      </div>
    </div>
  )
}

export default function DreamFeed({ cards, place }: Props) {
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
        <p className="text-white/40 text-sm mt-1">Шесть сцен из жизни в 2031</p>
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
            <CardImage card={card} place={place} />

            <div className="p-5">
              <h3 className="text-base font-bold text-white mb-2">{card.title}</h3>
              <p className="text-sm text-white/55 leading-relaxed">{card.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
