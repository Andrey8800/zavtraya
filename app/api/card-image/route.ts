import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { PlaceOption, DreamOption } from '@/lib/types'

function getOpenAI() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
}

// ─── Scene descriptions per card ─────────────────────────────────────────────

const MORNING_PLACE: Record<PlaceOption, string> = {
  'У моря': 'in a bright coastal bedroom, ocean visible through open window, warm morning sunlight',
  'В доме на колёсах': 'waking up inside a cozy camper van, door open to misty mountain forest at sunrise',
  'В своём доме': 'in a sun-drenched modern bedroom with plants, golden morning light on their face',
  'В другой стране': 'on a charming foreign apartment terrace, coffee in hand, city waking up below',
  'В большом городе': 'in a sleek urban apartment, city skyline gleaming behind floor-to-ceiling glass',
  'В тихом месте на природе': 'stepping outside a wooden cabin into a dewy meadow, sunrise mist, birds',
}

const PLACE_SCENE: Record<PlaceOption, string> = {
  'У моря': 'standing barefoot at the edge of a turquoise sea, golden hour waves, wind in hair, blissful freedom',
  'В доме на колёсах': 'sitting on top of a vintage camper van at a scenic canyon overlook, epic sunset sky behind',
  'В своём доме': 'relaxing in a lush personal garden, surrounded by blooming flowers, warm afternoon sunlight',
  'В другой стране': 'exploring a beautiful ancient European city alley, golden cobblestones, wonder in their eyes',
  'В большом городе': 'on a glass rooftop terrace, glittering city far below at blue hour, champagne glass in hand',
  'В тихом месте на природе': 'sitting on a mossy boulder beside a crystal mountain lake, mirror reflection, serene peace',
}

function buildScenePrompt(
  cardId: string,
  personDesc: string,
  place: PlaceOption,
  dreams: DreamOption[]
): string {
  const hasRemote = dreams.includes('Удалённая работа') || dreams.includes('Свой проект')
  const hasBusiness = dreams.includes('Бизнес')
  const hasCreativity = dreams.includes('Творчество')
  const hasFamily = dreams.includes('Семья')

  const base = `SUBJECT: ${personDesc}.
Keep this EXACT person's face, hair colour, hair length, skin tone and distinctive features IDENTICAL to the reference photo. Do not alter their appearance.
SCENE:`

  const style = `\nSTYLE: Hyper-realistic cinematic photography, 8K, shallow depth of field, golden hour bokeh, professional colour grading, ultra detailed skin, natural light. No cartoon, no illustration.`

  switch (cardId) {
    case 'morning':
      return `${base} The person is ${MORNING_PLACE[place]}. They are relaxed, fully at peace, smiling softly. This is their life now.${style}`

    case 'work':
      return `${base} The person is ${
        hasBusiness
          ? 'in a sleek modern office they own, reviewing impressive metrics on a large screen, proud and focused'
          : hasRemote
          ? `working on a laptop in a ${place === 'У моря' ? 'beachside café with sea breeze and palm shadows' : place === 'В доме на колёсах' ? 'camper van parked on a cliff edge, panoramic view' : 'sunlit home studio with plants, art on walls, perfect light'}`
          : 'at a creative coworking space, deeply immersed in meaningful work, natural daylight, flow state'
      }. Happy to be doing exactly this.${style}`

    case 'money':
      return `${base} The person is sitting at a stylish outdoor café, casually glancing at their phone screen showing a very satisfying bank balance notification. Their expression shows quiet confidence and deep relief — not flashy, just FREE. Warm afternoon light, golden bokeh background.${style}`

    case 'people':
      return `${base} The person is ${
        hasFamily
          ? 'sharing a warm joyful meal with their beloved family at a sunlit dining table, laughter filling the air, genuine love all around'
          : 'laughing freely and authentically with 2-3 close friends at a beautiful outdoor terrace, golden hour light, candid moment of pure joy'
      }.${style}`

    case 'place':
      return `${base} The person is ${PLACE_SCENE[place]}. This is EXACTLY where they always dreamed of being. The light is absolutely perfect. Life-defining moment of arrival.${style}`

    case 'evening':
      return `${base} The person is ${
        hasCreativity
          ? 'painting at an easel by a large window, warm amber studio light, completely in the creative zone, brushstroke mid-air, pure flow state'
          : 'reading a book in a cozy armchair by warm lamplight, glass of wine nearby, soft blanket, completely at peace with their life'
      }. Evening is slow and intentional. No anxiety. Only presence and contentment.${style}`

    default:
      return `${base} The person living their dream life in 2031, candid moment of pure happiness.${style}`
  }
}

// ─── Route ───────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ imageUrl: null })
  }

  let body: {
    photo: string
    cardId: string
    place: PlaceOption
    dreams: DreamOption[]
    personDescription?: string
  }

  try { body = await req.json() }
  catch { return NextResponse.json({ imageUrl: null }, { status: 400 }) }

  const { photo, cardId, place, dreams, personDescription } = body

  // Person description fallback
  const personDesc = personDescription || 'A person'
  const prompt = buildScenePrompt(cardId, personDesc, place, dreams)

  const openai = getOpenAI()

  try {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt,
      size: '1024x1024',
      quality: 'standard',
      n: 1,
    })

    const url = response.data?.[0]?.url
    if (url) {
      return NextResponse.json({ imageUrl: url })
    }
    return NextResponse.json({ imageUrl: null })
  } catch (err: unknown) {
    console.error(`[/api/card-image] ${cardId}:`, err)
    return NextResponse.json({ imageUrl: null })
  }
}
