import {
  FutureFormData,
  FutureResult,
  DreamFeedCard,
  DreamOption,
  IncomeOption,
  PlaceOption,
} from './types'

const dreamToOutcome: Record<DreamOption, string> = {
  'Свобода': 'свобода принимать решения без оглядки на других',
  'Путешествия': 'новые страны и города каждые несколько месяцев',
  'Дом на колёсах': 'дом, который едет туда, куда хочешь ты',
  'Семья': 'близкие рядом — каждый день, не только по праздникам',
  'Доход': 'деньги, которые работают на тебя, а не наоборот',
  'Свой проект': 'проект, который приносит и смысл, и доход',
  'Удалённая работа': 'работа из любой точки на карте',
  'Бизнес': 'своё дело, которое растёт даже без тебя',
  'Творчество': 'время и пространство для того, что по-настоящему вдохновляет',
  'Жизнь у моря': 'море за окном и рассветы над водой',
  'Спокойствие': 'жизнь без хронического стресса и вечной гонки',
  'Новая профессия': 'работа, которой ты гордишься и которая приносит радость',
}

const placeToDescription: Record<PlaceOption, string> = {
  'У моря': 'у моря, где каждое утро начинается с шума волн',
  'В доме на колёсах': 'в движении — новый горизонт каждые несколько недель',
  'В своём доме': 'в своём доме, где каждая деталь сделана по-твоему',
  'В другой стране': 'в другой стране, где жизнь ощущается совершенно иначе',
  'В большом городе': 'в большом городе, с доступом ко всему, что тебе нужно',
  'В тихом месте на природе': 'на природе, в тишине и полном спокойствии',
}

const placeShort: Record<PlaceOption, string> = {
  'У моря': 'на берегу',
  'В доме на колёсах': 'в дороге',
  'В своём доме': 'дома',
  'В другой стране': 'за границей',
  'В большом городе': 'в городе',
  'В тихом месте на природе': 'на природе',
}

function calculateMonths(income: IncomeOption, dreamsCount: number): number {
  if (income === '1 000 000 ₽+') return dreamsCount >= 6 ? 24 : 20
  if (income === '500 000 ₽') return 18
  if (income === '300 000 ₽') return 18
  return 12
}

function getMorningText(place: PlaceOption, dreams: DreamOption[]): string {
  const hasTravel = dreams.includes('Путешествия') || dreams.includes('Жизнь у моря')
  const hasFreedom = dreams.includes('Свобода') || dreams.includes('Спокойствие')

  if (place === 'У моря') {
    return 'Окно открыто. Ты слышишь волны ещё до того, как открываешь глаза. Будильника нет. Сегодня ты сам решаешь, как начнётся день.'
  }
  if (place === 'В другой стране') {
    return 'За окном незнакомый язык и тёплый воздух. Ты больше не спешишь туда, где давно не хотел быть.'
  }
  if (hasFreedom) {
    return 'Кофе на рассвете. Ты больше не спешишь туда, где давно не хотел быть. Это утро — твоё.'
  }
  if (hasTravel) {
    return 'Каждое утро — новый вид из окна. Сегодня ты просыпаешься там, где сам выбрал быть.'
  }
  return 'Ты просыпаешься без тревоги. Первая мысль утра — не страх, а интерес. Что сегодня?'
}

function getWorkText(dreams: DreamOption[], income: IncomeOption): string {
  const hasRemote = dreams.includes('Удалённая работа')
  const hasProject = dreams.includes('Свой проект')
  const hasBusiness = dreams.includes('Бизнес')

  if (hasBusiness) {
    return `Ноутбук открыт, но ты не работаешь — ты следишь за тем, как работает твой бизнес. ${income} в месяц. Не потолок.`
  }
  if (hasProject) {
    return `Проект приносит деньги, а не только усталость. Клиенты пишут сами. Ты выбираешь, с кем работать.`
  }
  if (hasRemote) {
    return `Встреча через 20 минут — подключишься из кафе. Или с веранды. Или с горы. Главное, что не из офиса.`
  }
  return `Работа перестала быть клеткой. Теперь это место, куда ты идёшь по выбору. Деньги — ${income}. И это только начало.`
}

function getMoneyText(income: IncomeOption, barriers: string[]): string {
  const hadMoneyBarrier = barriers.includes('Деньги') || barriers.includes('Долги')
  if (hadMoneyBarrier) {
    return `Сегодня ты понял: деньги — это инструмент, а не приговор. Ты помнишь, как боялся не дотянуть до следующего месяца. ${income} изменило многое.`
  }
  return `Счёт пополнился снова. ${income} в месяц — и это не предел, а точка отсчёта. Деньги перестали диктовать условия.`
}

function getPeopleText(dreams: DreamOption[]): string {
  const hasFamily = dreams.includes('Семья')
  if (hasFamily) {
    return 'Рядом те, кого ты выбрал. Семья — это не обязанность, это якорь. Ты больше не пропускаешь ужины.'
  }
  return 'Люди вокруг тебя изменились. Это те, кто тянет вверх, а не вниз. Каждый разговор — заряд, а не слив.'
}

function getPlaceText(place: PlaceOption): string {
  const texts: Record<PlaceOption, string> = {
    'У моря': 'Ты нашёл своё место силы. Это море. Вода успокаивает то, что раньше было постоянным шумом внутри.',
    'В доме на колёсах': 'Дом — это не адрес. Это ощущение. Ты понял это, когда в третий раз сменил страну за год.',
    'В своём доме': 'Свой дом. Ты помнишь, как казалось, что это недостижимо. Теперь ты просто живёшь здесь.',
    'В другой стране': 'Эмиграция оказалась не побегом, а выбором. Ты не убежал от себя — ты нашёл себя в новом контексте.',
    'В большом городе': 'Город даёт энергию. Ты научился брать из него то, что нужно, и не давать ему забирать лишнего.',
    'В тихом месте на природе': 'Тишина больше не пугает. Она стала твоим топливом. Здесь ты думаешь яснее, чем где угодно.',
  }
  return texts[place]
}

function getEveningText(dreams: DreamOption[], oldDream?: string): string {
  if (oldDream && oldDream.length > 10) {
    return `Вечером ты вспомнил, как когда-то мечтал об этом и откладывал. Сегодня ты просто живёшь этим. Это странное, тихое счастье.`
  }
  const hasCreativity = dreams.includes('Творчество')
  if (hasCreativity) {
    return 'Вечер не заканчивается усталостью — он заканчивается созданием. Ты сделал то, что хотел. Это и есть свобода.'
  }
  return 'Вечер тихий. Ты не листаешь ленту в поисках чего-то — тебе незачем убегать от своей жизни. Ты в ней.'
}

function generateDreamFeed(
  dreams: DreamOption[],
  income: IncomeOption,
  place: PlaceOption,
  barriers: string[],
  oldDream?: string
): DreamFeedCard[] {
  return [
    {
      id: 'morning',
      title: 'Утро через 5 лет',
      text: getMorningText(place, dreams),
      caption: '07:23 · ' + placeShort[place],
      gradient: 'from-violet-800 via-violet-700 to-indigo-700',
      emoji: '🌅',
    },
    {
      id: 'work',
      title: 'Работа из новой точки',
      text: getWorkText(dreams, income),
      caption: '11:47 · рабочий день',
      gradient: 'from-blue-800 via-blue-700 to-cyan-700',
      emoji: '💻',
    },
    {
      id: 'money',
      title: 'Деньги и спокойствие',
      text: getMoneyText(income, barriers),
      caption: income + ' / мес',
      gradient: 'from-emerald-800 via-teal-700 to-cyan-700',
      emoji: '✨',
    },
    {
      id: 'people',
      title: 'Люди рядом',
      text: getPeopleText(dreams),
      caption: '15:30 · встреча с теми, кого выбрал',
      gradient: 'from-pink-800 via-rose-700 to-purple-800',
      emoji: '🤝',
    },
    {
      id: 'place',
      title: 'Место силы',
      text: getPlaceText(place),
      caption: placeShort[place] + ' · точка опоры',
      gradient: 'from-amber-700 via-orange-700 to-red-800',
      emoji: '🌍',
    },
    {
      id: 'evening',
      title: 'Вечер новой жизни',
      text: getEveningText(dreams, oldDream),
      caption: '21:15 · конец дня без сожалений',
      gradient: 'from-purple-800 via-violet-700 to-fuchsia-800',
      emoji: '🌙',
    },
  ]
}

function generateLetter(formData: FutureFormData): string {
  const { dreams, income, place, oldDream, barriers } = formData
  const placeDesc = placeToDescription[place]
  const topDreams = dreams.slice(0, 3).map((d) => dreamToOutcome[d])
  const hadFear = barriers.includes('Страх')
  const hadTime = barriers.includes('Нет времени')
  const hadAge = barriers.includes('Возраст')

  let paragraph2 = 'Ты думал, что опоздал. Но на самом деле ты просто слишком долго ждал идеального момента. А его нет. Никогда не было.'
  if (hadAge) {
    paragraph2 = 'Ты думал, что время ушло. Что возраст — это приговор. Я сижу здесь и смеюсь над этой мыслью. Самые важные вещи начались позже, чем ты думал нужным.'
  }
  if (hadFear) {
    paragraph2 = 'Ты боялся. Это нормально. Но я хочу, чтобы ты знал: страх не ушёл в один день. Он просто перестал быть командиром. Ты сделал первый шаг не потому, что не было страха — а несмотря на него.'
  }
  if (hadTime) {
    paragraph2 = 'Ты говорил себе «нет времени». Но время не появляется само — ты его создаёшь. Я помню тот день, когда ты впервые выделил один час только для себя. С этого всё и началось.'
  }

  const dreamLine = topDreams.length > 0
    ? `Сегодня у меня есть ${topDreams.join(', ')}. Это звучит банально только до тех пор, пока ты не живёшь этим.`
    : 'Жизнь изменилась не сразу и не резко. Она менялась тихо, день за днём.'

  const oldDreamLine = oldDream && oldDream.length > 5
    ? `\nТы помнишь, как мечтал: «${oldDream}» — и откладывал. Ты больше не откладываешь. Ты уже там.`
    : ''

  return `Привет. Это ты из 2031.

Я пишу тебе ${placeDesc}. Рядом тихо. За окном — то, о чём ты думал как о несбыточном.

${paragraph2}

Всё начало меняться не в день большого рывка. А в тот день, когда ты сделал первый маленький шаг — и не остановился.

${dreamLine}${oldDreamLine}

Я зарабатываю около ${income} в месяц. Не потому что повезло. А потому что однажды ты перестал бояться строить.

Не жди понедельника. Не жди, пока «всё сложится». Начни с малого. Один шаг. Сегодня.

Это всё, что тебе нужно.

С любовью,
Ты из 2031`
}

export function generateMockFutureResult(formData: FutureFormData): FutureResult {
  const { dreams, barriers, income, place, oldDream } = formData

  const monthsToNewLife = calculateMonths(income, dreams.length)

  const changePoints = dreams.slice(0, 5).map((d) => dreamToOutcome[d])

  const dreamFeed = generateDreamFeed(dreams, income, place, barriers, oldDream)

  const letter = generateLetter(formData)

  const shareText = `Я только что увидел свою версию 2031 на ЗавтраЯ. ИИ показал, как может измениться моя жизнь через 5 лет. ${monthsToNewLife} месяцев до новой жизни. Посмотри своё будущее →`

  return {
    title: 'Твоя версия 2031',
    subtitle:
      'Это не предсказание. Это один из вариантов будущего, если начать двигаться сейчас.',
    comparison: {
      noChange: {
        text: 'Будущее не обязательно станет плохим. Оно просто останется слишком знакомым.',
        points: [
          'та же усталость в воскресенье вечером',
          'те же «потом» и «когда-нибудь»',
          'те же мечты в заметках телефона',
          'те же оправдания себе',
        ],
      },
      change: {
        text: 'Ты постепенно собираешь новую жизнь: больше свободы, больше выбора, больше воздуха.',
        points: changePoints,
      },
    },
    dreamFeed,
    letter,
    monthsToNewLife,
    shareText,
  }
}
