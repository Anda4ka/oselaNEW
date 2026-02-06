'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Navbar from '@/components/Navbar'
import CalculatorForm from '@/components/calculator/CalculatorForm'
import CalculatorResults from '@/components/calculator/CalculatorResults'
import type { CalculationResult, CalculatorInput } from '@/lib/calculator/types'

export default function CalculatorPage() {
  const t = useTranslations('calculator')
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = async (input: CalculatorInput) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/calculator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      })
      const calculationResult: CalculationResult = await response.json()
      setResult(calculationResult)
    } catch (err) {
      setError('Failed to calculate. Please try again.')
      console.error('Calculation error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12">
        <div className="container mx-auto px-4">
          <div>
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-primary-800 mb-2">
                {t('title')}
              </h1>
              <p className="text-lg text-gray-600">
                {t('description')}
              </p>
            </div>
            <CalculatorForm onCalculate={handleCalculate} loading={loading} />
            {error && (
              <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4 max-w-4xl mx-auto">
                <p className="text-red-700">{error}</p>
              </div>
            )}
            {result && <div className="mt-8"><CalculatorResults result={result} /></div>}
          </div>
        </div>
      </main>
    </>
  )
}
