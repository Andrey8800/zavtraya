export type DreamOption =
  | 'Свобода'
  | 'Путешествия'
  | 'Дом на колёсах'
  | 'Семья'
  | 'Доход'
  | 'Свой проект'
  | 'Удалённая работа'
  | 'Бизнес'
  | 'Творчество'
  | 'Жизнь у моря'
  | 'Спокойствие'
  | 'Новая профессия'

export type BarrierOption =
  | 'Деньги'
  | 'Страх'
  | 'Возраст'
  | 'Работа'
  | 'Не знаю, куда идти'
  | 'Потерял мечту'
  | 'Нет времени'
  | 'Нет поддержки'
  | 'Выгорание'
  | 'Долги'

export type IncomeOption =
  | '100 000 ₽'
  | '300 000 ₽'
  | '500 000 ₽'
  | '1 000 000 ₽+'

export type PlaceOption =
  | 'У моря'
  | 'В доме на колёсах'
  | 'В своём доме'
  | 'В другой стране'
  | 'В большом городе'
  | 'В тихом месте на природе'

export interface FutureFormData {
  photo?: string
  dreams: DreamOption[]
  barriers: BarrierOption[]
  income: IncomeOption
  place: PlaceOption
  oldDream?: string
}

export interface DreamFeedCard {
  id: string
  title: string
  text: string
  caption: string
  gradient: string
  emoji: string
  imageUrl?: string
}

export interface ComparisonSide {
  text: string
  points: string[]
}

export interface FutureResult {
  title: string
  subtitle: string
  comparison: {
    noChange: ComparisonSide
    change: ComparisonSide
  }
  dreamFeed: DreamFeedCard[]
  letter: string
  monthsToNewLife: number
  shareText: string
  generatedPortraitUrl?: string
  personDescription?: string
}
