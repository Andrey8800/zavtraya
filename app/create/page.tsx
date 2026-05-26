import { Suspense } from 'react'
import CreateContent from './create-content'

export default function CreatePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#07070A] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
        </div>
      }
    >
      <CreateContent />
    </Suspense>
  )
}
