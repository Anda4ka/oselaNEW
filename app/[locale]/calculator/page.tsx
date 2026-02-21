'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import Navbar from '@/components/Navbar'
import CalculatorForm from '@/components/calculator/CalculatorForm'
import CalculatorResults from '@/components/calculator/CalculatorResults'
import type { CalculationResult, CalculatorInput } from '@/lib/calculator/types'

// Minimum required fields to get a meaningful calculation
function hasEnoughInput(input: Partial<CalculatorInput>): boolean {
  return !!(
    input.category &&
    input.area && input.area >= 10 &&
    input.totalCost && input.totalCost >= 100000 &&
    input.region &&
    input.settlementType &&
    input.buildingAge !== undefined &&
    input.loanTerm && input.loanTerm >= 1
  )
}

function countFilledFields(input: Partial<CalculatorInput>): number {
  const checks = [
    !!input.category,
    !!(input.age && input.age >= 18),
    !!(input.familySize && input.familySize >= 1),
    !!input.propertyType,
    !!input.region,
    !!input.settlementType,
    !!(input.area && input.area >= 10),
    !!(input.totalCost && input.totalCost >= 100000),
    input.buildingAge !== undefined && input.buildingAge !== null,
    !!(input.loanTerm && input.loanTerm >= 1),
  ]
  return checks.filter(Boolean).length
}

const TOTAL_FIELDS = 10

export default function CalculatorPage() {
  const t = useTranslations('calculator')
  const tResults = useTranslations('results')
  const tCommon = useTranslations('common')

  const [input, setInput] = useState<Partial<CalculatorInput>>({
    category: 'military',
    propertyType: 'apartment',
    region: 'Kyiv',
    settlementType: 'major',
    loanTerm: 20,
  })
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('uk-UA', {
      style: 'currency',
      currency: 'UAH',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const calculate = useCallback(async (currentInput: Partial<CalculatorInput>) => {
    // Calculate whenever we have enough for a meaningful result (not all fields required)
    if (!hasEnoughInput(currentInput)) {
      if (abortRef.current) abortRef.current.abort()
      abortRef.current = null
      setLoading(false)
      setErrorMessage(null)
      setResult(null)
      return
    }

    if (abortRef.current) abortRef.current.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setErrorMessage(null)
    setLoading(true)

    try {
      const response = await fetch('/api/calculator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentInput),
        signal: controller.signal,
      })

      if (!response.ok) {
        throw new Error(`Calculation request failed with status ${response.status}`)
      }

      const data: CalculationResult = await response.json()
      setResult(data)
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== 'AbortError') {
        console.error('Calculation error:', err)
        setResult(null)
        setErrorMessage(t('calculationError'))
      }
    } finally {
      if (abortRef.current === controller) {
        abortRef.current = null
        setLoading(false)
      }
    }
  }, [t])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      calculate(input)
    }, 400)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [input, calculate])

  const handleInputChange = (newInput: Partial<CalculatorInput>) => {
    setInput(newInput)
  }

  const getStatus = () => {
    if (!result) return null
    if (!result.success) return 'fail'
    if (result.warnings.length > 0 || result.additionalPayments.length > 0) return 'warn'
    return 'pass'
  }

  const status = getStatus()
  const filledCount = countFilledFields(input)
  const progressPercent = Math.round((filledCount / TOTAL_FIELDS) * 100)
  const hasEnough = hasEnoughInput(input)

  // Empty state — show progress towards getting a result
  const EmptyState = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="text-center mb-5">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-50 mb-3">
          <svg className="w-7 h-7 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-sm font-medium text-gray-700">Заповніть основні поля</p>
        <p className="text-xs text-gray-400 mt-0.5">для розрахунку потрібні: площа, вартість, місто</p>
      </div>

      {/* Field progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-gray-500">
          <span>Прогрес заповнення</span>
          <span className="font-semibold text-primary-600">{filledCount}/{TOTAL_FIELDS} полів</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className="bg-primary-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Field checklist */}
      <div className="mt-4 space-y-1.5">
        {[
          { label: 'Категорія', done: !!input.category },
          { label: 'Місто / регіон', done: !!input.region && !!input.settlementType },
          { label: 'Площа житла', done: !!(input.area && input.area >= 10) },
          { label: 'Вартість (≥ 100 000 ₴)', done: !!(input.totalCost && input.totalCost >= 100000) },
          { label: 'Рік будівлі', done: input.buildingAge !== undefined },
        ].map(({ label, done }) => (
          <div key={label} className="flex items-center gap-2 text-xs">
            <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${done ? 'bg-emerald-100' : 'bg-gray-100'}`}>
              {done
                ? <svg className="w-2.5 h-2.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                : <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
              }
            </div>
            <span className={done ? 'text-gray-500 line-through' : 'text-gray-600'}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4 py-6 md:py-10">
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-primary-800 mb-1">
              {t('title')}
            </h1>
            <p className="text-sm text-gray-500">
              {t('subtitle')}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto">
            <div className="w-full lg:w-[420px] flex-shrink-0">
              <CalculatorForm input={input} onInputChange={handleInputChange} />
            </div>

            {/* Desktop results panel */}
            <div className="hidden lg:block flex-1 min-w-0">
              <div className="sticky top-6">
                {errorMessage && !loading && (
                  <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    {errorMessage}
                  </div>
                )}

                {loading && (
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-center py-12">
                    <svg className="animate-spin h-6 w-6 text-primary-500" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  </div>
                )}

                {result && !loading && (
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                    <CalculatorResults result={result} loanTermYears={input.loanTerm || 20} />
                  </div>
                )}

                {/* Show progress/checklist until we have enough for calculation */}
                {!result && !loading && !errorMessage && (
                  <EmptyState />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile bottom sheet — shown when result available */}
        {result && !loading && (
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
            <div
              className={`bg-white border-t-2 shadow-2xl transition-all ${status === 'pass' ? 'border-emerald-400' : status === 'warn' ? 'border-amber-400' : 'border-red-400'
                }`}
            >
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="w-full px-5 py-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">
                    {status === 'pass' ? '✅' : status === 'warn' ? '⚠️' : '❌'}
                  </span>
                  <div className="text-left">
                    {result.success ? (
                      <>
                        <div className="text-lg font-bold text-primary-800">
                          {formatCurrency(result.monthlyPayment1)}
                          <span className="text-xs text-gray-500 font-normal">/{tCommon('months')}</span>
                        </div>
                        <div className="text-xs text-gray-500">{tResults('comparisonDownPayment')}: {formatCurrency(result.downPayment)}</div>
                      </>
                    ) : (
                      <div className="text-sm font-medium text-red-700">{tResults('statusFail')}</div>
                    )}
                  </div>
                </div>
                <svg className={`w-5 h-5 text-gray-400 transition-transform ${mobileOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>

              {mobileOpen && (
                <div className="max-h-[70vh] overflow-y-auto px-5 pb-6 border-t border-gray-100">
                  <CalculatorResults result={result} loanTermYears={input.loanTerm || 20} />
                </div>
              )}
            </div>
          </div>
        )}

        {result && !loading && <div className="lg:hidden h-20" />}

        {/* Mobile: progress/loading/error below form */}
        <div className="lg:hidden px-4 pb-24">
          {errorMessage && !loading && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </div>
          )}
          {loading && (
            <div className="flex items-center justify-center py-8">
              <svg className="animate-spin h-6 w-6 text-primary-500" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
          )}
          {!result && !loading && !errorMessage && !hasEnough && (
            <EmptyState />
          )}
        </div>
      </main>
    </>
  )
}
