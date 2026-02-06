'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import CalculatorForm from '@/components/calculator/CalculatorForm'
import CalculatorResults from '@/components/calculator/CalculatorResults'
import type { CalculationResult, CalculatorInput } from '@/lib/calculator/types'

export default function CalculatorPage() {
  const t = useTranslations('calculator')
  const [result, setResult] = useState<CalculationResult | null>(null)

  const handleCalculate = async (input: CalculatorInput) => {
    try {
      const response = await fetch('/api/calculator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      })
      const calculationResult: CalculationResult = await response.json()
      setResult(calculationResult)
    } catch (error) {
      console.error('Calculation error:', error)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div>
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary-800 mb-2">
              {t('title')}
            </h1>
            <p className="text-lg text-gray-600">
              {t('description')}
            </p>
          </div>
          <CalculatorForm onCalculate={handleCalculate} />
          {result && <CalculatorResults result={result} />}
        </div>
      </div>
    </main>
  )
}
