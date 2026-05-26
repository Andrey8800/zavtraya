import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl

  const place = searchParams.get('place') || 'У моря'
  const incomeRaw = searchParams.get('income') || '300 000 руб'
  // Strip ₽ — edge runtime font doesn't support it; replace with "руб"
  const income = incomeRaw.replace('₽+', '+ руб/мес').replace('₽', 'руб/мес')
  const months = searchParams.get('months') || '18'
  const dreams = searchParams.get('dreams') || 'Свобода · Путешествия · Свой проект'

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#07070A',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Violet radial glow top */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '900px',
            height: '700px',
            background:
              'radial-gradient(ellipse at center, rgba(139,92,246,0.22) 0%, transparent 65%)',
            display: 'flex',
          }}
        />
        {/* Pink glow bottom-right */}
        <div
          style={{
            position: 'absolute',
            bottom: '-80px',
            right: '-60px',
            width: '500px',
            height: '500px',
            background:
              'radial-gradient(ellipse at center, rgba(236,72,153,0.14) 0%, transparent 65%)',
            display: 'flex',
          }}
        />
        {/* Blue glow bottom-left */}
        <div
          style={{
            position: 'absolute',
            bottom: '-60px',
            left: '-40px',
            width: '400px',
            height: '400px',
            background:
              'radial-gradient(ellipse at center, rgba(59,130,246,0.1) 0%, transparent 65%)',
            display: 'flex',
          }}
        />

        {/* Grid lines subtle */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            display: 'flex',
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0px',
            padding: '0 60px',
            textAlign: 'center',
          }}
        >
          {/* Logo */}
          <div
            style={{
              color: 'rgba(167,139,250,0.9)',
              fontSize: '22px',
              fontWeight: 700,
              letterSpacing: '0.05em',
              marginBottom: '28px',
            }}
          >
            ЗавтраЯ
          </div>

          {/* Year — big gradient text */}
          <div
            style={{
              fontSize: '180px',
              fontWeight: 900,
              lineHeight: 1,
              marginBottom: '20px',
              background: 'linear-gradient(135deg, #c4b5fd 0%, #93c5fd 50%, #f9a8d4 100%)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            2031
          </div>

          {/* Tagline */}
          <div
            style={{
              color: 'rgba(255,255,255,0.45)',
              fontSize: '26px',
              fontWeight: 400,
              marginBottom: '40px',
              letterSpacing: '0.01em',
            }}
          >
            Твоя версия будущего
          </div>

          {/* Stats row */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              marginBottom: '32px',
            }}
          >
            {/* Place */}
            <div
              style={{
                padding: '14px 24px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.09)',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>место</span>
              <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', fontWeight: 700 }}>
                {place}
              </span>
            </div>
            {/* Income */}
            <div
              style={{
                padding: '14px 24px',
                background: 'rgba(139,92,246,0.12)',
                border: '1px solid rgba(139,92,246,0.28)',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span style={{ color: 'rgba(167,139,250,0.65)', fontSize: '13px' }}>доход</span>
              <span style={{ color: '#c4b5fd', fontSize: '18px', fontWeight: 700 }}>
                {income}
              </span>
            </div>
            {/* Months */}
            <div
              style={{
                padding: '14px 24px',
                background: 'rgba(16,185,129,0.1)',
                border: '1px solid rgba(16,185,129,0.22)',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span style={{ color: 'rgba(52,211,153,0.6)', fontSize: '13px' }}>до цели</span>
              <span style={{ color: '#34d399', fontSize: '18px', fontWeight: 700 }}>
                {months} мес
              </span>
            </div>
          </div>

          {/* Dreams */}
          <div
            style={{
              color: 'rgba(255,255,255,0.28)',
              fontSize: '17px',
              letterSpacing: '0.05em',
            }}
          >
            {dreams}
          </div>
        </div>

        {/* Bottom branding */}
        <div
          style={{
            position: 'absolute',
            bottom: '28px',
            right: '44px',
            color: 'rgba(255,255,255,0.18)',
            fontSize: '15px',
          }}
        >
          zavtraya.app
        </div>

        {/* Top-right badge */}
        <div
          style={{
            position: 'absolute',
            top: '28px',
            right: '36px',
            padding: '6px 14px',
            background: 'rgba(139,92,246,0.12)',
            border: '1px solid rgba(139,92,246,0.25)',
            borderRadius: '20px',
            color: 'rgba(196,181,253,0.8)',
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          Powered by AI
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
