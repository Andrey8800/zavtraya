'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import FutureForm from '@/components/FutureForm'
import LoadingFuture from '@/components/LoadingFuture'
import { FutureFormData } from '@/lib/types'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function CreateContent() {
  const [pendingFormData, setPendingFormData] = useState<FutureFormData | null>(null)
  const searchParams = useSearchParams()
  const isFriend = searchParams.get('friend') === 'true'

  if (pendingFormData) {
    return <LoadingFuture formData={pendingFormData} />
  }

  return (
    <div className="bg-[#07070A] min-h-screen">
      {/* Back nav */}
      <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 pointer-events-none">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass border border-white/10 text-white/60 hover:text-white text-sm font-medium transition-all pointer-events-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            На главную
          </Link>
        </div>
      </div>

      <div className="pt-16">
        <FutureForm isFriend={isFriend} onSubmit={(data) => setPendingFormData(data)} />
      </div>
    </div>
  )
}
