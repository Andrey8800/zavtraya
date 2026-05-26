import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { FutureFormData, DreamFeedCard } from '@/lib/types'
import { generateMockFutureResult } from '@/lib/generateMockFutureResult'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

function buildTextPrompt(f: FutureFormData): string {
  return `Ты — автор сервиса ЗавтраЯ. Создаёшь персонализированные «версии будущего».

Анкета:
- Мечты: ${f.dreams.join(', ')}
- Барьеры: ${f.barriers.join(', ')}
- Доход: ${f.income}
- Место: ${f.place}
- Отложенная мечта: ${f.oldDream || 'не указана'}

РАЗДЕЛ 1 — "letter": письмо себе из 2031.
5-6 абзацев (\\n\\n), начало "Привет. Это ты из 2031.", тёплый и ироничный тон,
конкретные факты по мечтам, место и доход органично, финал «С любовью, ты из 2031».
ТОЛЬКО русский язык.

РАЗДЕЛ 2 — "dreamFeed": 6 карточек утро→работа→деньги→люди→место→вечер.
{ "id": "morning"|"work"|"money"|"people"|"place"|"evening",
  "title": "3-5 слов", "text": "2-3 кинематографичных предложения на «ты»",
  "caption": "3-6 слов в стиле Stories", "emoji": "эмодзи" }

Верни ТОЛЬКО JSON: { "letter": "...", "dreamFeed": [...] }`
}

async function analyzePhoto(base64: string): Promise<string> {
  const res = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{
      role: 'user',
      content: [
        { type: 'image_url', image_url: { url: base64, detail: 'low' } },
        {
          type: 'text',
          text: 'Describe this person for an art prompt in ONE sentence. Format: "A [age range] [gender] with [hair color, length], [skin tone], [one notable feature if any]". English only, brief and neutral.',
        },
      ],
    }],
    max_tokens: 80,
  })
  return res.choices[0].message.content?.trim() ?? 'A person'
}

interface AiText { letter?: string; dreamFeed?: DreamFeedCard[] }

export async function POST(req: NextRequest) {
  let formData: FutureFormData
  try { formData = await req.json() }
  catch { return NextResponse.json({ error: 'Invalid request' }, { status: 400 }) }

  const base = generateMockFutureResult(formData)

  if (!process.env.OPENAI_API_KEY) return NextResponse.json(base)

  try {
    // Analyze photo + generate text in parallel
    const [ai, personDescription] = await Promise.all([
      openai.chat.completions
        .create({
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: 'Отвечай строго в формате JSON.' },
            { role: 'user', content: buildTextPrompt(formData) },
          ],
          response_format: { type: 'json_object' },
          temperature: 0.88,
          max_tokens: 2000,
        })
        .then((c) => JSON.parse(c.choices[0].message.content ?? '{}') as AiText)
        .catch(() => ({} as AiText)),

      formData.photo ? analyzePhoto(formData.photo).catch(() => null) : Promise.resolve(null),
    ])

    const mergedDreamFeed = base.dreamFeed.map((card) => {
      const aiCard = (ai.dreamFeed ?? []).find((c) => c.id === card.id)
      return {
        ...card,
        title: aiCard?.title || card.title,
        text: aiCard?.text || card.text,
        caption: aiCard?.caption || card.caption,
        emoji: aiCard?.emoji || card.emoji,
      }
    })

    return NextResponse.json({
      ...base,
      letter: ai.letter || base.letter,
      dreamFeed: mergedDreamFeed,
      personDescription: personDescription ?? undefined,
    })
  } catch (err) {
    console.error('[/api/generate] error:', err)
    return NextResponse.json(base)
  }
}
