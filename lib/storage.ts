import { FutureFormData, FutureResult } from './types'

const FORM_KEY = 'zavtraya_formData'
const RESULT_KEY = 'zavtraya_result'

export function saveFormData(data: FutureFormData): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(FORM_KEY, JSON.stringify(data))
}

export function loadFormData(): FutureFormData | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(FORM_KEY)
    return raw ? (JSON.parse(raw) as FutureFormData) : null
  } catch {
    return null
  }
}

export function saveResult(result: FutureResult): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(RESULT_KEY, JSON.stringify(result))
}

export function loadResult(): FutureResult | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(RESULT_KEY)
    return raw ? (JSON.parse(raw) as FutureResult) : null
  } catch {
    return null
  }
}

export function clearStorage(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(FORM_KEY)
  localStorage.removeItem(RESULT_KEY)
}
