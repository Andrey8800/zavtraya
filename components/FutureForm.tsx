'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, ChevronRight, ChevronLeft, Upload, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DreamOption, BarrierOption, IncomeOption, PlaceOption, FutureFormData } from '@/lib/types'
import { saveFormData } from '@/lib/storage'

const DREAMS: DreamOption[] = [
  'Свобода', 'Путешествия', 'Дом на колёсах', 'Семья', 'Доход', 'Свой проект',
  'Удалённая работа', 'Бизнес', 'Творчество', 'Жизнь у моря', 'Спокойствие', 'Новая профессия',
]

const BARRIERS: BarrierOption[] = [
  'Деньги', 'Страх', 'Возраст', 'Работа', 'Не знаю, куда идти',
  'Потерял мечту', 'Нет времени', 'Нет поддержки', 'Выгорание', 'Долги',
]

const INCOMES: IncomeOption[] = ['100 000 ₽', '300 000 ₽', '500 000 ₽', '1 000 000 ₽+']

const PLACES: PlaceOption[] = [
  'У моря', 'В доме на колёсах', 'В своём доме',
  'В другой стране', 'В большом городе', 'В тихом месте на природе',
]

const PLACE_EMOJIS: Record<PlaceOption, string> = {
  'У моря': '🌊',
  'В доме на колёсах': '🚐',
  'В своём доме': '🏠',
  'В другой стране': '✈️',
  'В большом городе': '🏙️',
  'В тихом месте на природе': '🌲',
}

const TOTAL_STEPS = 6

interface Props {
  isFriend: boolean
  onSubmit: (formData: FutureFormData) => void
}

export default function FutureForm({ isFriend, onSubmit }: Props) {
  const [step, setStep] = useState(1)
  const [photo, setPhoto] = useState<string | null>(null)
  const [dreams, setDreams] = useState<DreamOption[]>([])
  const [barriers, setBarriers] = useState<BarrierOption[]>([])
  const [income, setIncome] = useState<IncomeOption | null>(null)
  const [place, setPlace] = useState<PlaceOption | null>(null)
  const [oldDream, setOldDream] = useState('')
  const [errors, setErrors] = useState<Record<number, string>>({})
  const fileRef = useRef<HTMLInputElement>(null)

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const img = new window.Image()
      img.onload = () => {
        const MAX = 512
        let { width, height } = img
        if (width > height) {
          if (width > MAX) { height = Math.round(height * MAX / width); width = MAX }
        } else {
          if (height > MAX) { width = Math.round(width * MAX / height); height = MAX }
        }
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        canvas.getContext('2d')!.drawImage(img, 0, 0, width, height)
        setPhoto(canvas.toDataURL('image/jpeg', 0.82))
      }
      img.src = ev.target?.result as string
    }
    reader.readAsDataURL(file)
  }

  const toggleDream = (d: DreamOption) => {
    setDreams((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    )
    setErrors((e) => ({ ...e, 2: '' }))
  }

  const toggleBarrier = (b: BarrierOption) => {
    setBarriers((prev) =>
      prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]
    )
    setErrors((e) => ({ ...e, 3: '' }))
  }

  const validateStep = (): boolean => {
    if (step === 2 && dreams.length < 2) {
      setErrors((e) => ({ ...e, 2: 'Выбери минимум 2 мечты' }))
      return false
    }
    if (step === 3 && barriers.length < 1) {
      setErrors((e) => ({ ...e, 3: 'Выбери хотя бы один барьер' }))
      return false
    }
    if (step === 4 && !income) {
      setErrors((e) => ({ ...e, 4: 'Выбери желаемый доход' }))
      return false
    }
    if (step === 5 && !place) {
      setErrors((e) => ({ ...e, 5: 'Выбери место для жизни' }))
      return false
    }
    return true
  }

  const next = () => {
    if (!validateStep()) return
    setStep((s) => Math.min(s + 1, TOTAL_STEPS))
  }

  const back = () => setStep((s) => Math.max(s - 1, 1))

  const handleSubmit = () => {
    if (!validateStep()) return
    if (!income || !place) return

    const formData: FutureFormData = {
      photo: photo ?? undefined,
      dreams,
      barriers,
      income,
      place,
      oldDream: oldDream.trim() || undefined,
    }

    saveFormData(formData)
    onSubmit(formData)
  }

  const progressPct = ((step - 1) / (TOTAL_STEPS - 1)) * 100

  return (
    <div className="min-h-screen bg-[#07070A] flex flex-col">
      {/* Header */}
      <div className="px-4 sm:px-6 pt-6 pb-4 max-w-2xl mx-auto w-full">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-lg font-bold text-white">
            {isFriend ? 'Покажи другу его будущее' : 'Создай свою версию 2031'}
          </h1>
          <span className="text-sm text-white/30 font-medium">{step} / {TOTAL_STEPS}</span>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-violet-500 via-blue-500 to-pink-500 rounded-full"
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 px-4 sm:px-6 py-6 max-w-2xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            {step === 1 && (
              <Step1
                photo={photo}
                fileRef={fileRef}
                onPhotoChange={handlePhotoChange}
                onRemove={() => setPhoto(null)}
              />
            )}
            {step === 2 && (
              <Step2
                dreams={dreams}
                toggle={toggleDream}
                error={errors[2]}
              />
            )}
            {step === 3 && (
              <Step3
                barriers={barriers}
                toggle={toggleBarrier}
                error={errors[3]}
              />
            )}
            {step === 4 && (
              <Step4
                income={income}
                setIncome={(v) => {
                  setIncome(v)
                  setErrors((e) => ({ ...e, 4: '' }))
                }}
                error={errors[4]}
              />
            )}
            {step === 5 && (
              <Step5
                place={place}
                setPlace={(v) => {
                  setPlace(v)
                  setErrors((e) => ({ ...e, 5: '' }))
                }}
                error={errors[5]}
              />
            )}
            {step === 6 && (
              <Step6 oldDream={oldDream} setOldDream={setOldDream} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="sticky bottom-0 px-4 sm:px-6 py-4 border-t border-white/5 bg-[#07070A]/80 backdrop-blur-xl">
        <div className="max-w-2xl mx-auto flex gap-3">
          {step > 1 && (
            <button
              type="button"
              onClick={back}
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl glass border border-white/10 text-white/70 hover:text-white font-medium transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
              Назад
            </button>
          )}
          <button
            type="button"
            onClick={step === TOTAL_STEPS ? handleSubmit : next}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl btn-gradient text-white font-semibold text-base"
          >
            {step === TOTAL_STEPS ? 'Показать моё будущее' : 'Дальше'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Step 1: Photo ── */
function Step1({
  photo,
  fileRef,
  onPhotoChange,
  onRemove,
}: {
  photo: string | null
  fileRef: React.RefObject<HTMLInputElement>
  onPhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemove: () => void
}) {
  return (
    <div>
      <StepHeader
        tag="Шаг 1"
        title="Добавь своё фото"
        sub="Необязательно. Но с фото результат будет живее."
      />
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onPhotoChange}
      />
      {photo ? (
        <div className="relative w-48 h-48 mx-auto rounded-2xl overflow-hidden border border-violet-500/30">
          <img src={photo} alt="Фото" className="w-full h-full object-cover" />
          <button
            onClick={onRemove}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="w-full max-w-sm mx-auto flex flex-col items-center gap-4 p-10 rounded-2xl glass border-2 border-dashed border-white/15 hover:border-violet-500/40 hover:bg-violet-500/5 transition-all duration-300 block"
        >
          <div className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
            <Camera className="w-7 h-7 text-violet-400" />
          </div>
          <div className="text-center">
            <p className="font-semibold text-white mb-1">Загрузить фото</p>
            <p className="text-sm text-white/40">PNG, JPG до 10 МБ</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-500/10 border border-violet-500/20">
            <Upload className="w-4 h-4 text-violet-400" />
            <span className="text-sm text-violet-300 font-medium">Выбрать файл</span>
          </div>
        </button>
      )}
      <p className="text-center text-sm text-white/30 mt-4">
        Фото хранится только у тебя в браузере
      </p>
    </div>
  )
}

/* ── Step 2: Dreams ── */
function Step2({
  dreams,
  toggle,
  error,
}: {
  dreams: DreamOption[]
  toggle: (d: DreamOption) => void
  error?: string
}) {
  return (
    <div>
      <StepHeader
        tag="Шаг 2"
        title="Что ты хочешь увидеть в своём будущем?"
        sub="Выбери минимум 2 пункта. Можно больше — это твоё будущее."
      />
      <div className="flex flex-wrap gap-3">
        {DREAMS.map((d) => (
          <ChipButton
            key={d}
            label={d}
            selected={dreams.includes(d)}
            onClick={() => toggle(d)}
          />
        ))}
      </div>
      {error && <ErrorMsg msg={error} />}
      {dreams.length >= 2 && (
        <p className="mt-4 text-sm text-emerald-400">
          Выбрано: {dreams.length} мечты ✓
        </p>
      )}
    </div>
  )
}

/* ── Step 3: Barriers ── */
function Step3({
  barriers,
  toggle,
  error,
}: {
  barriers: BarrierOption[]
  toggle: (b: BarrierOption) => void
  error?: string
}) {
  return (
    <div>
      <StepHeader
        tag="Шаг 3"
        title="Что сейчас больше всего тормозит?"
        sub="Честно. Это поможет сделать твой результат точнее."
      />
      <div className="flex flex-wrap gap-3">
        {BARRIERS.map((b) => (
          <ChipButton
            key={b}
            label={b}
            selected={barriers.includes(b)}
            onClick={() => toggle(b)}
            variant="pink"
          />
        ))}
      </div>
      {error && <ErrorMsg msg={error} />}
    </div>
  )
}

/* ── Step 4: Income ── */
function Step4({
  income,
  setIncome,
  error,
}: {
  income: IncomeOption | null
  setIncome: (v: IncomeOption) => void
  error?: string
}) {
  const descriptions: Record<IncomeOption, string> = {
    '100 000 ₽': 'Стабильность и спокойствие',
    '300 000 ₽': 'Свобода выбора',
    '500 000 ₽': 'Достаток и путешествия',
    '1 000 000 ₽+': 'Полная независимость',
  }

  return (
    <div>
      <StepHeader
        tag="Шаг 4"
        title="Какой доход хочешь видеть в новой жизни?"
        sub="Не бойся хотеть больше. Это твой ориентир, не потолок."
      />
      <div className="grid grid-cols-2 gap-3">
        {INCOMES.map((inc) => (
          <button
            key={inc}
            type="button"
            onClick={() => setIncome(inc)}
            className={cn(
              'relative p-4 rounded-2xl text-left border transition-all duration-200',
              income === inc
                ? 'bg-violet-500/20 border-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.2)]'
                : 'glass border-white/10 hover:border-white/20 hover:bg-white/5'
            )}
          >
            <p className="text-lg font-black text-white mb-1">{inc}</p>
            <p className="text-xs text-white/40">{descriptions[inc]}</p>
            {income === inc && (
              <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center">
                <span className="text-xs">✓</span>
              </div>
            )}
          </button>
        ))}
      </div>
      {error && <ErrorMsg msg={error} />}
    </div>
  )
}

/* ── Step 5: Place ── */
function Step5({
  place,
  setPlace,
  error,
}: {
  place: PlaceOption | null
  setPlace: (v: PlaceOption) => void
  error?: string
}) {
  return (
    <div>
      <StepHeader
        tag="Шаг 5"
        title="Где ты хочешь просыпаться через 5 лет?"
        sub="Выбери место, где тебе хочется начинать каждое утро."
      />
      <div className="grid grid-cols-2 gap-3">
        {PLACES.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPlace(p)}
            className={cn(
              'relative p-4 rounded-2xl text-left border transition-all duration-200',
              place === p
                ? 'bg-blue-500/20 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]'
                : 'glass border-white/10 hover:border-white/20 hover:bg-white/5'
            )}
          >
            <span className="text-2xl mb-2 block">{PLACE_EMOJIS[p]}</span>
            <p className="text-sm font-semibold text-white">{p}</p>
            {place === p && (
              <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-xs">✓</span>
              </div>
            )}
          </button>
        ))}
      </div>
      {error && <ErrorMsg msg={error} />}
    </div>
  )
}

/* ── Step 6: Old dream ── */
function Step6({
  oldDream,
  setOldDream,
}: {
  oldDream: string
  setOldDream: (v: string) => void
}) {
  return (
    <div>
      <StepHeader
        tag="Шаг 6"
        title="О чём ты мечтал раньше, но отложил?"
        sub="Необязательно. Но если есть что-то на душе — напиши. Это войдёт в твоё письмо из будущего."
      />
      <textarea
        value={oldDream}
        onChange={(e) => setOldDream(e.target.value)}
        placeholder="Например: хотел научиться рисовать, открыть маленькую кофейню, уехать жить к морю..."
        rows={5}
        className="w-full px-5 py-4 rounded-2xl glass border border-white/10 text-white placeholder:text-white/25 text-base leading-relaxed resize-none focus:outline-none focus:border-violet-500/50 transition-colors"
      />
      <p className="text-right text-xs text-white/25 mt-2">{oldDream.length} / 300</p>
    </div>
  )
}

/* ── Sub-components ── */
function StepHeader({
  tag,
  title,
  sub,
}: {
  tag: string
  title: string
  sub: string
}) {
  return (
    <div className="mb-8">
      <span className="text-xs font-bold text-violet-400 uppercase tracking-widest">{tag}</span>
      <h2 className="text-2xl sm:text-3xl font-black text-white mt-2 mb-3 leading-tight">{title}</h2>
      <p className="text-white/50 leading-relaxed">{sub}</p>
    </div>
  )
}

function ChipButton({
  label,
  selected,
  onClick,
  variant = 'violet',
}: {
  label: string
  selected: boolean
  onClick: () => void
  variant?: 'violet' | 'pink'
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200',
        selected && variant === 'violet'
          ? 'bg-violet-500/20 border-violet-500 text-white shadow-[0_0_12px_rgba(139,92,246,0.2)]'
          : selected && variant === 'pink'
          ? 'bg-pink-500/20 border-pink-500 text-white shadow-[0_0_12px_rgba(236,72,153,0.2)]'
          : 'glass border-white/10 text-white/65 hover:border-white/20 hover:text-white hover:bg-white/5'
      )}
    >
      {label}
    </button>
  )
}

function ErrorMsg({ msg }: { msg: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-3 text-sm text-red-400"
    >
      {msg}
    </motion.p>
  )
}
