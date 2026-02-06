'use client'

import { useTranslations } from 'next-intl'
import type { CalculationResult, ComparisonScenario } from '@/lib/calculator/types'

interface CalculatorResultsProps {
  result: CalculationResult
}

export default function CalculatorResults({ result }: CalculatorResultsProps) {
  const t = useTranslations('results')
  const tErrors = useTranslations('errors')

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('uk-UA', {
      style: 'currency',
      currency: 'UAH',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  if (!result.success) {
    const errorKey = result.error?.replace('errors.', '') || 'invalidInput'
    const detailKey = `${errorKey}Detail`

    const detailParams: Record<string, string> = {}
    if (result.normativeArea) detailParams.normArea = result.normativeArea.toFixed(1)
    if (result.actualArea) detailParams.actualArea = result.actualArea.toFixed(1)
    if (result.excessArea) detailParams.excessArea = result.excessArea.toFixed(1)
    if (result.excessAreaPercent) detailParams.excessPercent = result.excessAreaPercent.toFixed(1)
    if (result.maxAreaExcessPercent !== undefined) detailParams.maxPercent = result.maxAreaExcessPercent.toString()
    if (result.maxBuildingAge !== undefined) detailParams.maxAge = result.maxBuildingAge.toString()
    if (result.buildingAge !== undefined) detailParams.actualAge = result.buildingAge.toString()
    if (result.limitPrice) detailParams.limitPrice = formatCurrency(result.limitPrice)
    if (result.actualPricePerSqM) detailParams.actualPrice = formatCurrency(result.actualPricePerSqM)
    if (result.excessPricePercent) detailParams.excessPercent = result.excessPricePercent.toFixed(1)

    const hasDetail = tErrors.has(detailKey)

    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold text-red-800 mb-3">
          {t('status')}: {t('notAllowed')}
        </h3>
        <div className="mb-4 p-4 bg-red-100 rounded-lg">
          <p className="text-red-800 font-medium text-lg mb-2">{tErrors(errorKey)}</p>
          {hasDetail && (
            <p className="text-red-700 text-sm leading-relaxed">{tErrors(detailKey, detailParams)}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {result.normativeArea > 0 && (
            <div className="border border-red-200 rounded-lg p-3 bg-white">
              <h4 className="font-semibold text-gray-800 mb-2 text-sm">{t('areaAnalysis')}</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('normativeArea')}</span>
                  <span className="font-medium text-gray-800">{result.normativeArea.toFixed(1)} m\u00B2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('actualArea')}</span>
                  <span className="font-medium text-gray-800">{result.actualArea.toFixed(1)} m\u00B2</span>
                </div>
                {result.excessArea > 0 && (
                  <div className="flex justify-between text-red-600 font-medium">
                    <span>{t('excessArea')}</span>
                    <span>+{result.excessArea.toFixed(1)} m\u00B2 ({result.excessAreaPercent.toFixed(1)}%)</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {result.limitPrice > 0 && (
            <div className="border border-red-200 rounded-lg p-3 bg-white">
              <h4 className="font-semibold text-gray-800 mb-2 text-sm">{t('priceAnalysis')}</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('limitPrice')}</span>
                  <span className="font-medium text-gray-800">{formatCurrency(result.limitPrice)}/m\u00B2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('actualPrice')}</span>
                  <span className="font-medium text-gray-800">{formatCurrency(result.actualPricePerSqM)}/m\u00B2</span>
                </div>
                {result.excessPrice > 0 && (
                  <div className="flex justify-between text-red-600 font-medium">
                    <span>{t('excessPrice')}</span>
                    <span>+{result.excessPricePercent.toFixed(1)}%</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    )
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

      {result.comparisonScenarios && result.comparisonScenarios.length > 0 && (
        <div className="mt-8 border-t pt-6">
          <h3 className="text-xl font-bold text-primary-800 mb-4">{t('comparisonTitle')}</h3>
          <p className="text-sm text-gray-500 mb-4">{t('comparisonDescription')}</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-primary-50">
                  <th className="border border-gray-200 px-3 py-2 text-left text-gray-700">{t('comparisonParam')}</th>
                  {result.comparisonScenarios.map((s, i) => (
                    <th key={i} className="border border-gray-200 px-3 py-2 text-center text-gray-700 min-w-[140px]">
                      <div className="font-bold">{t('downPayment')} {s.downPaymentPercent}%</div>
                      <div className="text-xs text-gray-500">{t('rate')} {(s.interestRate1 * 100).toFixed(0)}% / {(s.interestRate2 * 100).toFixed(0)}%</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-3 py-2 text-gray-700">{t('comparisonDownPayment')}</td>
                  {result.comparisonScenarios.map((s, i) => (
                    <td key={i} className="border border-gray-200 px-3 py-2 text-center font-medium">{formatCurrency(s.downPayment)}</td>
                  ))}
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-3 py-2 text-gray-700">{t('comparisonLoanAmount')}</td>
                  {result.comparisonScenarios.map((s, i) => (
                    <td key={i} className="border border-gray-200 px-3 py-2 text-center font-medium">{formatCurrency(s.loanAmount)}</td>
                  ))}
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2 text-gray-700">{t('comparisonPayment1')}</td>
                  {result.comparisonScenarios.map((s, i) => (
                    <td key={i} className="border border-gray-200 px-3 py-2 text-center font-semibold text-primary-700">{formatCurrency(s.monthlyPayment1)}</td>
                  ))}
                </tr>
                {result.comparisonScenarios.some(s => s.monthlyPayment2 > 0) && (
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-3 py-2 text-gray-700">{t('comparisonPayment2')}</td>
                    {result.comparisonScenarios.map((s, i) => (
                      <td key={i} className="border border-gray-200 px-3 py-2 text-center font-semibold text-primary-700">{s.monthlyPayment2 > 0 ? formatCurrency(s.monthlyPayment2) : '—'}</td>
                    ))}
                  </tr>
                )}
                <tr>
                  <td className="border border-gray-200 px-3 py-2 text-gray-700">{t('comparisonTotalInterest')}</td>
                  {result.comparisonScenarios.map((s, i) => (
                    <td key={i} className="border border-gray-200 px-3 py-2 text-center text-orange-600">{formatCurrency(s.totalInterest)}</td>
                  ))}
                </tr>
                <tr className="bg-primary-50 font-bold">
                  <td className="border border-gray-200 px-3 py-2 text-gray-800">{t('comparisonTotalPayment')}</td>
                  {result.comparisonScenarios.map((s, i) => (
                    <td key={i} className="border border-gray-200 px-3 py-2 text-center text-primary-800">{formatCurrency(s.totalPayment)}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
