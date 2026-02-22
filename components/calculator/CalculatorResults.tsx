'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import type { CalculationResult, ComparisonScenario } from '@/lib/calculator/types'
import { formatCurrency } from '@/lib/utils'

function PaymentTimeline({
  monthlyPayment1,
  monthlyPayment2,
  loanTermYears,
  rate1Percent,
  rate2Percent,
  formatCurrency,
}: {
  monthlyPayment1: number
  monthlyPayment2: number
  loanTermYears: number
  rate1Percent: string
  rate2Percent: string
  formatCurrency: (v: number) => string
}) {
  const hasSecondPeriod = loanTermYears > 10
  const firstPeriodYears = hasSecondPeriod ? 10 : loanTermYears
  const firstWidthPercent = hasSecondPeriod
    ? Math.round((10 / loanTermYears) * 100)
    : 100

  return (
    <div className="rounded-xl border border-gray-100 overflow-hidden cursor-default">
      {/* Period blocks */}
      <div className="flex">
        <div
          className="bg-primary-50 px-3 py-3 border-r border-primary-100"
          style={{ width: `${firstWidthPercent}%` }}
        >
          <div className="text-[10px] text-primary-500 font-semibold uppercase tracking-wide mb-0.5">
            {hasSecondPeriod ? `Перші ${firstPeriodYears} р. · ${rate1Percent}%` : `${firstPeriodYears} р. · ${rate1Percent}%`}
          </div>
          <div className="text-sm font-bold text-primary-800">{formatCurrency(monthlyPayment1)}<span className="text-xs font-normal text-primary-400">/міс</span></div>
        </div>
        {hasSecondPeriod && (
          <div className="flex-1 bg-gray-50 px-3 py-3">
            <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide mb-0.5">
              Після 10 р. · {rate2Percent}%
            </div>
            <div className="text-sm font-bold text-gray-700">{formatCurrency(monthlyPayment2)}<span className="text-xs font-normal text-gray-400">/міс</span></div>
          </div>
        )}
      </div>
      {/* Timeline bar */}
      <div className="relative h-5 bg-gray-100 flex">
        <div
          className="bg-primary-400 flex items-center justify-start pl-1.5"
          style={{ width: `${firstWidthPercent}%` }}
        >
          <span className="text-[9px] text-white font-medium whitespace-nowrap">0 р.</span>
        </div>
        {hasSecondPeriod && (
          <div className="flex-1 bg-gray-300 flex items-center justify-end pr-1.5">
            <span className="text-[9px] text-gray-600 font-medium">{loanTermYears} р.</span>
          </div>
        )}
        {hasSecondPeriod && (
          <div className="absolute top-0 bottom-0 flex items-center" style={{ left: `${firstWidthPercent}%`, transform: 'translateX(-50%)' }}>
            <div className="bg-white border border-gray-300 rounded-full px-1 text-[9px] text-gray-500 font-semibold whitespace-nowrap z-10">
              10 р.
            </div>
          </div>
        )}
      </div>
      <p className="text-center text-xs text-gray-400 mt-1">Візуальна шкала платежів</p>
    </div>
  )
}

interface CalculatorResultsProps {
  result: CalculationResult
  loanTermYears: number
}

function StatusBadge({ status, t }: { status: 'pass' | 'warn' | 'fail'; t: (key: string) => string }) {
  const config = {
    pass: { bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-700', icon: '\u2705', label: t('statusPass') },
    warn: { bg: 'bg-amber-50 border-amber-200', text: 'text-amber-700', icon: '\u26A0\uFE0F', label: t('statusWarn') },
    fail: { bg: 'bg-red-50 border-red-200', text: 'text-red-700', icon: '\u274C', label: t('statusFail') },
  }
  const c = config[status]
  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-medium ${c.bg} ${c.text}`}>
      <span>{c.icon}</span>
      <span>{c.label}</span>
    </div>
  )
}

function DiagnosisBlock({ cause, actions }: { cause: string; actions: string[] }) {
  const t = useTranslations('results.diagnosis')
  return (
    <div className="rounded-xl border border-red-100 bg-red-50/50 p-4 space-y-3">
      <div>
        <div className="text-xs font-semibold text-red-500 uppercase tracking-wider mb-1">{t('cause')}</div>
        <p className="text-sm text-red-800 font-medium">{cause}</p>
      </div>
      <div>
        <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">{t('action')}</div>
        <ul className="space-y-1">
          {actions.map((a, i) => (
            <li key={i} className="text-sm text-gray-700 flex items-start gap-1.5">
              <span className="text-emerald-500 mt-0.5">&bull;</span>
              <span>{a}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function ScenarioCard({ scenario, isBase, hasP2, formatCurrency, t }: {
  scenario: ComparisonScenario; isBase: boolean; hasP2: boolean; formatCurrency: (v: number) => string; t: (key: string) => string
}) {
  return (
    <div className={`rounded-xl border-2 p-4 space-y-3 ${isBase ? 'border-primary-500 bg-primary-50/30' : 'border-gray-200'}`}>
      {isBase && <span className="inline-block text-xs font-semibold bg-primary-500 text-white px-2 py-0.5 rounded-full">{t('baseScenario')}</span>}
      <div className="text-xs text-gray-500">
        {t('downPayment')} {scenario.downPaymentPercent}% &middot; {t('rate')} {(scenario.interestRate1 * 100).toFixed(0)}%
      </div>
      <div>
        <div className="text-xs text-gray-500">{t('comparisonPayment1')}</div>
        <div className="text-lg font-bold text-primary-700">{formatCurrency(scenario.monthlyPayment1)}</div>
      </div>
      {hasP2 && scenario.monthlyPayment2 > 0 && (
        <div>
          <div className="text-xs text-gray-500">{t('comparisonPayment2')}</div>
          <div className="text-base font-bold text-primary-600">{formatCurrency(scenario.monthlyPayment2)}</div>
        </div>
      )}
      <div className="flex justify-between text-sm pt-2 border-t border-gray-100">
        <span className="text-gray-500">{t('comparisonDownPayment')}</span>
        <span className="text-gray-700">{formatCurrency(scenario.downPayment)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">{t('comparisonTotalInterest')}</span>
        <span className="text-amber-600">{formatCurrency(scenario.totalInterest)}</span>
      </div>
      <div className="flex justify-between text-sm font-bold pt-2 border-t border-gray-200 bg-gray-50 -mx-4 px-4 -mb-4 pb-4 rounded-b-xl">
        <span className="text-gray-800">{t('comparisonTotal')}</span>
        <span className="text-gray-900">{formatCurrency(scenario.totalPayment)}</span>
      </div>
    </div>
  )
}

export default function CalculatorResults({ result, loanTermYears }: CalculatorResultsProps) {
  const t = useTranslations('results')
  const tCommon = useTranslations('common')
  const tErrors = useTranslations('errors')
  const tDiag = useTranslations('results.diagnosis')
  const [showDetails, setShowDetails] = useState(false)
  const [showWhy, setShowWhy] = useState(false)

  const getStatus = (): 'pass' | 'warn' | 'fail' => {
    if (!result.success) return 'fail'
    if (result.warnings.length > 0 || result.additionalPayments.length > 0) return 'warn'
    return 'pass'
  }

  const status = getStatus()
  const hasSecondPeriod = loanTermYears > 10
  const rate1Percent = (result.interestRate1 * 100).toFixed(0)
  const rate2Percent = (result.interestRate2 * 100).toFixed(0)

  if (!result.success) {
    const errorKey = result.error?.replace('errors.', '') || 'invalidInput'

    const diagBlocks: { cause: string; actions: string[] }[] = []

    if (errorKey === 'buildingAgeExceeded' && result.maxBuildingAge !== undefined && result.buildingAge !== undefined) {
      diagBlocks.push({
        cause: tDiag('buildingAgeFail', { actual: result.buildingAge.toString(), max: result.maxBuildingAge.toString() }),
        actions: [
          tDiag('buildingAgeAction1', { max: result.maxBuildingAge.toString() }),
          tDiag('buildingAgeAction2'),
        ],
      })
    }

    if ((errorKey === 'areaExceeded' || errorKey === 'areaExceededOldBuilding') && result.normativeArea > 0) {
      diagBlocks.push({
        cause: tDiag('areaFail', { actual: result.actualArea.toFixed(1), norm: result.normativeArea.toFixed(1), percent: result.excessAreaPercent.toFixed(1) }),
        actions: [
          tDiag('areaAction1', { norm: result.normativeArea.toFixed(1) }),
          tDiag('areaAction2'),
        ],
      })
    }

    if (errorKey === 'priceExceeded' && result.limitPrice > 0) {
      diagBlocks.push({
        cause: tDiag('priceFail', { actual: formatCurrency(result.actualPricePerSqM), limit: formatCurrency(result.limitPrice), percent: result.excessPricePercent.toFixed(1) }),
        actions: [
          tDiag('priceAction1', { limit: formatCurrency(result.limitPrice) }),
          tDiag('priceAction2'),
        ],
      })
    }

    if (diagBlocks.length === 0) {
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

      diagBlocks.push({
        cause: tErrors(errorKey),
        actions: tErrors.has(detailKey) ? [tErrors(detailKey, detailParams)] : [],
      })
    }

    return (
      <div className="space-y-4">
        <StatusBadge status="fail" t={t} />
        {diagBlocks.map((diag, i) => (
          <DiagnosisBlock key={i} cause={diag.cause} actions={diag.actions} />
        ))}
      </div>
    )
  }

  const baseDownPayment = result.downPayment - result.additionalPayments.reduce((sum, p) => sum + p.amount, 0)
  const downPaymentPercent = result.downPayment > 0 && result.actualPricePerSqM > 0 && result.actualArea > 0
    ? Math.round((baseDownPayment / (result.actualPricePerSqM * result.actualArea)) * 100)
    : 20

  return (
    <div key={`res-${result.monthlyPayment1}-${result.loanAmount}`} className="space-y-5 animate-fade-slide-in">
      <div className="flex items-center justify-between">
        <StatusBadge status={status} t={t} />
      </div>

      <div className="bg-primary-50 rounded-xl p-5 space-y-1">
        <div className="text-sm text-gray-600">
          {hasSecondPeriod
            ? t('monthlyPaymentFirst10', { rate: rate1Percent })
            : t('fullTermSingleRate', { rate: rate1Percent })}
        </div>
        <div
          key={result.monthlyPayment1}
          className="text-3xl font-bold text-primary-800 animate-num-pop"
          style={{ fontVariantNumeric: 'tabular-nums' }}
        >
          {formatCurrency(result.monthlyPayment1)}
        </div>
        {hasSecondPeriod && result.monthlyPayment2 > 0 && (
          <>
            <div className="text-sm text-gray-600 mt-3">
              {t('monthlyPaymentAfter10', { rate: rate2Percent })}
            </div>
            <div
              key={result.monthlyPayment2}
              className="text-2xl font-bold text-primary-700 animate-num-pop"
              style={{ fontVariantNumeric: 'tabular-nums' }}
            >
              {formatCurrency(result.monthlyPayment2)}
            </div>
          </>
        )}
        <div className="mt-3 pt-3 border-t border-primary-100 flex items-center justify-between">
          <span className="text-xs text-gray-500">Рекомендований дохід</span>
          <span className="text-xs font-semibold text-gray-700">
            ≥ {formatCurrency(Math.ceil(result.monthlyPayment1 / 0.4 / 1000) * 1000)}/міс
          </span>
        </div>
        {hasSecondPeriod && (
          <p className="text-xs text-gray-500 mt-2 leading-relaxed">{t('paymentHint')}</p>
        )}
      </div>

      <PaymentTimeline
        monthlyPayment1={result.monthlyPayment1}
        monthlyPayment2={result.monthlyPayment2}
        loanTermYears={loanTermYears}
        rate1Percent={rate1Percent}
        rate2Percent={rate2Percent}
        formatCurrency={formatCurrency}
      />

      {status === 'warn' && result.additionalPayments.length > 0 && (
        <div className="space-y-2">
          {result.additionalPayments.map((payment, index) => {
            const isArea = payment.type.includes('area') || payment.type.includes('Area')
            const isPrice = payment.type.includes('price') || payment.type.includes('Price')
            let warnText = ''
            if (isArea && result.excessAreaPercent > 0) {
              warnText = tDiag('areaWarn', { percent: result.excessAreaPercent.toFixed(1), amount: formatCurrency(payment.amount) })
            } else if (isPrice && result.excessPricePercent > 0) {
              warnText = tDiag('priceWarn', { percent: result.excessPricePercent.toFixed(1), amount: formatCurrency(payment.amount) })
            }
            return warnText ? (
              <div key={index} className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                {warnText}
              </div>
            ) : null
          })}
        </div>
      )}

      <div className="bg-gray-50 rounded-xl p-4 space-y-2">
        <div className="text-sm font-semibold text-gray-700 mb-2">{t('financialSummary')}</div>
        {result.additionalPayments.length > 0 ? (
          <div className="font-mono text-sm space-y-1 text-gray-700">
            <div className="flex justify-between">
              <span>{formatCurrency(result.downPayment)} =</span>
            </div>
            <div className="flex justify-between pl-4 text-gray-600">
              <span>{formatCurrency(baseDownPayment)}</span>
              <span className="text-gray-400">({t('baseDownPaymentPercent', { percent: downPaymentPercent.toString() })})</span>
            </div>
            {result.additionalPayments.map((p, i) => (
              <div key={i} className="flex justify-between pl-4 text-amber-600">
                <span>+ {formatCurrency(p.amount)}</span>
                <span className="text-gray-400 text-xs">{t(p.type)}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="font-mono text-sm text-gray-700">
            <div className="flex justify-between">
              <span>{formatCurrency(result.downPayment)}</span>
              <span className="text-gray-400">= {t('baseDownPaymentPercent', { percent: downPaymentPercent.toString() })}</span>
            </div>
          </div>
        )}
        <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between text-sm">
          <span className="text-gray-600">{t('loanAmount')}</span>
          <span className="font-bold text-gray-800">{formatCurrency(result.loanAmount)}</span>
        </div>
      </div>

      <button
        onClick={() => setShowDetails(!showDetails)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors text-sm"
      >
        <span className="font-medium text-gray-700">{t('totalForFullTerm', { years: loanTermYears.toString() })}</span>
        <svg className={`w-4 h-4 text-gray-500 transition-transform ${showDetails ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {showDetails && (
        <div className="space-y-2 text-sm px-1">
          <div className="flex justify-between">
            <span className="text-gray-600">{t('totalInterest')}</span>
            <span className="text-amber-600 font-medium">{formatCurrency(result.totalInterest)}</span>
          </div>
          <div className="flex justify-between font-bold text-base">
            <span className="text-gray-800">{t('totalPayment')}</span>
            <span className="text-gray-900">{formatCurrency(result.totalPayment)}</span>
          </div>

          {result.normativeArea > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100 space-y-1">
              <div className="text-xs font-semibold text-gray-500 uppercase">{t('areaAnalysis')}</div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t('normativeArea')}</span>
                <span>{result.normativeArea.toFixed(1)} {tCommon('sqm')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t('actualArea')}</span>
                <span>{result.actualArea.toFixed(1)} {tCommon('sqm')}</span>
              </div>
              {result.excessArea > 0 && (
                <div className="flex justify-between text-sm text-amber-600">
                  <span>{t('excessArea')}</span>
                  <span>+{result.excessArea.toFixed(1)} {tCommon('sqm')} ({result.excessAreaPercent.toFixed(1)}%)</span>
                </div>
              )}
            </div>
          )}

          {result.limitPrice > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100 space-y-1">
              <div className="text-xs font-semibold text-gray-500 uppercase">{t('priceAnalysis')}</div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t('limitPrice')}</span>
                <span>{formatCurrency(result.limitPrice)}/{tCommon('sqm')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t('actualPrice')}</span>
                <span>{formatCurrency(result.actualPricePerSqM)}/{tCommon('sqm')}</span>
              </div>
              {result.excessPrice > 0 && (
                <div className="flex justify-between text-sm text-amber-600">
                  <span>{t('excessPrice')}</span>
                  <span>+{result.excessPricePercent.toFixed(1)}%</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {result.comparisonScenarios && result.comparisonScenarios.length > 0 && (() => {
        const hasP2 = result.comparisonScenarios!.some(s => s.monthlyPayment2 > 0)
        const sorted = [...result.comparisonScenarios!].sort((a, b) => a.interestRate1 - b.interestRate1)
        const s20 = sorted.filter(s => s.downPaymentPercent === 20)
        const s10 = sorted.filter(s => s.downPaymentPercent === 10)
        const allSorted = [...s20, ...s10]

        const baseRate = result.interestRate1
        const baseDp = result.downPayment > 0 && result.actualPricePerSqM > 0 && result.actualArea > 0
          ? Math.round((baseDownPayment / (result.actualPricePerSqM * result.actualArea)) * 100)
          : 20

        return (
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-base font-bold text-gray-800 mb-1">{t('comparisonTitle')}</h3>
            <p className="text-xs text-gray-400 mb-4">{t('comparisonDescription')}</p>

            <div className="grid grid-cols-2 gap-3 md:hidden">
              {allSorted.map((s, i) => (
                <ScenarioCard
                  key={i}
                  scenario={s}
                  isBase={s.downPaymentPercent === baseDp && Math.abs(s.interestRate1 - baseRate) < 0.001}
                  hasP2={hasP2}
                  formatCurrency={formatCurrency}
                  t={t}
                />
              ))}
            </div>

            <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-100">
              <table className="w-full text-sm" style={{ fontVariantNumeric: 'tabular-nums' }}>
                <thead>
                  <tr>
                    <th rowSpan={2} className="bg-gray-50 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-100 w-[180px]">{t('comparisonParam')}</th>
                    <th colSpan={2} className="bg-primary-50 px-4 py-2 text-center text-sm font-bold text-primary-800 border-r border-gray-100">{t('downPayment')} 20%</th>
                    <th colSpan={2} className="bg-primary-50 px-4 py-2 text-center text-sm font-bold text-primary-800">{t('downPayment')} 10%</th>
                  </tr>
                  <tr>
                    {allSorted.map((s, i) => {
                      const isBaseCol = s.downPaymentPercent === baseDp && Math.abs(s.interestRate1 - baseRate) < 0.001
                      return (
                        <th key={i} className={`px-4 py-2 text-center min-w-[130px] ${isBaseCol ? 'bg-blue-600 text-white ring-2 ring-blue-400' : 'bg-gray-50'} ${i === 1 ? 'border-r border-gray-100' : ''}`}>
                          <div className="flex flex-col items-center gap-1">
                            <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${
                              s.interestRate1 <= 0.04
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${s.interestRate1 <= 0.04 ? 'bg-emerald-500' : 'bg-blue-500'}`} />
                              {(s.interestRate1 * 100).toFixed(0)}%
                            </span>
                            <span className={`text-[10px] font-normal ${isBaseCol ? 'text-blue-100' : 'text-gray-400'}`}>
                              після 10р: {(s.interestRate2 * 100).toFixed(0)}%
                            </span>
                          </div>
                        </th>
                      )
                    })}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <tr>
                    <td className="px-4 py-3 text-gray-800 font-medium border-r border-gray-100">{t('comparisonPayment1')}</td>
                    {allSorted.map((s, i) => {
                      const isBaseCol = s.downPaymentPercent === baseDp && Math.abs(s.interestRate1 - baseRate) < 0.001
                      return (
                        <td key={i} className={`px-4 py-3 text-right font-bold text-primary-700 ${isBaseCol ? 'bg-blue-50' : ''} ${i === 1 ? 'border-r border-gray-100' : ''}`}>{formatCurrency(s.monthlyPayment1)}</td>
                      )
                    })}
                  </tr>
                  {hasP2 && (
                    <tr className="bg-gray-50/50">
                      <td className="px-4 py-3 text-gray-800 font-medium border-r border-gray-100">{t('comparisonPayment2')}</td>
                      {allSorted.map((s, i) => {
                        const isBaseCol = s.downPaymentPercent === baseDp && Math.abs(s.interestRate1 - baseRate) < 0.001
                        return (
                          <td key={i} className={`px-4 py-3 text-right font-bold text-primary-700 ${isBaseCol ? 'bg-blue-50' : ''} ${i === 1 ? 'border-r border-gray-100' : ''}`}>{s.monthlyPayment2 > 0 ? formatCurrency(s.monthlyPayment2) : '\u2014'}</td>
                        )
                      })}
                    </tr>
                  )}
                  <tr className={hasP2 ? '' : 'bg-gray-50/50'}>
                    <td className="px-4 py-3 text-gray-500 border-r border-gray-100">{t('comparisonTotalInterest')}</td>
                    {allSorted.map((s, i) => {
                      const isBaseCol = s.downPaymentPercent === baseDp && Math.abs(s.interestRate1 - baseRate) < 0.001
                      return (
                        <td key={i} className={`px-4 py-3 text-right text-amber-600 ${isBaseCol ? 'bg-blue-50' : ''} ${i === 1 ? 'border-r border-gray-100' : ''}`}>{formatCurrency(s.totalInterest)}</td>
                      )
                    })}
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-500 text-xs border-r border-gray-100">{t('comparisonDownPayment')}</td>
                    {allSorted.map((s, i) => {
                      const isBaseCol = s.downPaymentPercent === baseDp && Math.abs(s.interestRate1 - baseRate) < 0.001
                      return (
                        <td key={i} className={`px-4 py-3 text-right text-gray-500 text-xs ${isBaseCol ? 'bg-blue-50' : ''} ${i === 1 ? 'border-r border-gray-100' : ''}`}>{formatCurrency(s.downPayment)}</td>
                      )
                    })}
                  </tr>
                  <tr className="bg-gray-50/50">
                    <td className="px-4 py-3 text-gray-500 text-xs border-r border-gray-100">{t('comparisonLoanAmount')}</td>
                    {allSorted.map((s, i) => {
                      const isBaseCol = s.downPaymentPercent === baseDp && Math.abs(s.interestRate1 - baseRate) < 0.001
                      return (
                        <td key={i} className={`px-4 py-3 text-right text-gray-500 text-xs ${isBaseCol ? 'bg-blue-50' : ''} ${i === 1 ? 'border-r border-gray-100' : ''}`}>{formatCurrency(s.loanAmount)}</td>
                      )
                    })}
                  </tr>
                  <tr className="bg-primary-800">
                    <td className="px-4 py-3.5 text-white font-bold rounded-bl-xl border-r border-primary-700">{t('comparisonTotalPayment')}</td>
                    {allSorted.map((s, i) => (
                      <td key={i} className={`px-4 py-3.5 text-right text-white font-bold ${i === 1 ? 'border-r border-primary-700' : ''} ${i === 3 ? 'rounded-br-xl' : ''}`}>{formatCurrency(s.totalPayment)}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )
      })()}

      <button
        onClick={() => setShowWhy(!showWhy)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors text-sm"
      >
        <span className="font-medium text-gray-700">{t('whyThisResult')}</span>
        <svg className={`w-4 h-4 text-gray-500 transition-transform ${showWhy ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {showWhy && (
        <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm text-gray-700">
          <div>{t('whyRate', { rate1: rate1Percent, rate2: rate2Percent })}</div>
          <div>{t('whyTerm', { years: loanTermYears.toString() })}</div>
          {result.normativeArea > 0 && (
            <div>{t('whyArea', { actual: result.actualArea.toFixed(1), norm: result.normativeArea.toFixed(1) })}</div>
          )}
        </div>
      )}

      <div className="pt-2 print:hidden">
        <button
          onClick={() => window.print()}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.056 48.056 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
          </svg>
          {t('printBtn')}
        </button>
      </div>
    </div>
  )
}
