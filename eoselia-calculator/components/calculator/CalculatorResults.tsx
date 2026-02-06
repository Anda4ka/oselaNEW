'use client'

import { useTranslations } from 'next-intl'
import type { CalculationResult } from '@/lib/calculator/types'

interface CalculatorResultsProps {
  result: CalculationResult
}

export default function CalculatorResults({ result }: CalculatorResultsProps) {
  const t = useTranslations('results')

  if (!result.success) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-4xl mx-auto">
        <h3 className="text-lg font-semibold text-red-800 mb-2">
          {t('status')}: {t('notAllowed')}
        </h3>
        <p className="text-red-700">{result.error}</p>
      </div>
    )
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('uk-UA', {
      style: 'currency',
      currency: 'UAH',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-primary-800 mb-6">{t('title')}</h2>

      {result.warnings.length > 0 && (
        <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">{t('warnings')}</h3>
          <ul className="list-disc list-inside text-yellow-700">
            {result.warnings.map((warning, index) => (
              <li key={index}>{warning}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg text-gray-800 mb-3">{t('areaAnalysis')}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-700">{t('normativeArea')}</span>
                <span className="text-gray-800">{result.normativeArea.toFixed(1)} м²</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">{t('actualArea')}</span>
                <span className="text-gray-800">{result.actualArea.toFixed(1)} м²</span>
              </div>
              {result.excessArea > 0 && (
                <div className="flex justify-between text-orange-600">
                  <span>{t('excessArea')}</span>
                  <span>{result.excessArea.toFixed(1)} м² ({result.excessAreaPercent.toFixed(1)}%)</span>
                </div>
              )}
            </div>
          </div>
 
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg text-gray-800 mb-3">{t('priceAnalysis')}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-700">{t('limitPrice')}</span>
                <span className="text-gray-800">{formatCurrency(result.limitPrice)}/м²</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">{t('actualPrice')}</span>
                <span className="text-gray-800">{formatCurrency(result.actualPricePerSqM)}/м²</span>
              </div>
              {result.excessPrice > 0 && (
                <div className="flex justify-between text-orange-600">
                  <span>{t('excessPrice')}</span>
                  <span>{formatCurrency(result.excessPrice)}/м² ({result.excessPricePercent.toFixed(1)}%)</span>
                </div>
              )}
            </div>
          </div>
        </div>
 
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg text-gray-800 mb-3">{t('financialSummary')}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-700">{t('propertyCost')}</span>
                <span className="text-gray-800">{formatCurrency(result.actualPricePerSqM * result.actualArea)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">{t('baseDownPayment')}</span>
                <span className="text-gray-800">{formatCurrency(result.downPayment - result.additionalPayments.reduce((sum, p) => sum + p.amount, 0))}</span>
              </div>
              {result.additionalPayments.map((payment, index) => (
                <div key={index} className="flex justify-between text-orange-600">
                  <span>{t(payment.type)}</span>
                  <span>{formatCurrency(payment.amount)}</span>
                </div>
              ))}
              <div className="flex justify-between font-bold border-t pt-2">
                <span className="text-gray-700">{t('totalDownPayment')}</span>
                <span className="text-primary-600">{formatCurrency(result.downPayment)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span className="text-gray-700">{t('loanAmount')}</span>
                <span className="text-primary-600">{formatCurrency(result.loanAmount)}</span>
              </div>
            </div>
          </div>
 
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg text-gray-800 mb-3">{t('monthlyPayments')}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-700">{t('monthlyPaymentFirstPeriod')}</span>
                <span className="font-semibold">{formatCurrency(result.monthlyPayment1)}</span>
              </div>
              {result.monthlyPayment2 > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-700">{t('monthlyPaymentSecondPeriod')}</span>
                  <span className="font-semibold">{formatCurrency(result.monthlyPayment2)}</span>
                </div>
              )}
              <div className="flex justify-between border-t pt-2">
                <span className="text-gray-700">{t('totalInterest')}</span>
                <span className="text-gray-800">{formatCurrency(result.totalInterest)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span className="text-gray-700">{t('totalPayment')}</span>
                <span className="text-primary-600">{formatCurrency(result.totalPayment)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
