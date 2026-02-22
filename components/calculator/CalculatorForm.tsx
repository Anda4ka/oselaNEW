'use client'

import React, { useState, useEffect, useId, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import type { CalculatorInput } from '@/lib/calculator/types'
import CityAutocomplete from './CityAutocomplete'

interface CalculatorFormProps {
  input: Partial<CalculatorInput>
  onInputChange: (input: Partial<CalculatorInput>) => void
}

function AccordionSection({
  title,
  defaultOpen = false,
  children,
  isComplete = false,
  summary,
}: {
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
  isComplete?: boolean
  summary?: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()

  useEffect(() => {
    if (isComplete) {
      setOpen(false)
    }
  }, [isComplete])

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={id}
        className={`w-full flex items-center justify-between px-5 py-4 transition-colors ${
          isComplete && !open
            ? 'bg-emerald-50 hover:bg-emerald-100'
            : 'bg-gray-50 hover:bg-gray-100'
        }`}
      >
        <div className="flex items-center gap-2">
          {isComplete && !open && (
            <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          )}
          <span className={`font-semibold ${isComplete && !open ? 'text-emerald-800' : 'text-gray-800'}`}>
            {title}
          </span>
        </div>
        <svg
          className={`w-5 h-5 transition-transform flex-shrink-0 ${open ? 'rotate-180' : ''} ${isComplete && !open ? 'text-emerald-400' : 'text-gray-500'}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {!open && isComplete && summary && (
        <div className="px-5 py-2 bg-emerald-50 border-t border-emerald-100 flex flex-wrap gap-1.5">
          {summary}
        </div>
      )}

      {open && <div id={id} role="region" className="px-5 py-4 space-y-4">{children}</div>}
    </div>
  )
}

// Currency mask: formats number as "1 000 000" (UA style spaces)
function formatCurrencyInput(value: number | undefined): string {
  if (!value && value !== 0) return ''
  return new Intl.NumberFormat('uk-UA', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    useGrouping: true,
  }).format(value)
}

function parseCurrencyInput(raw: string): number | undefined {
  // Remove all non-digit characters
  const digits = raw.replace(/\D/g, '')
  if (!digits) return undefined
  const n = parseInt(digits, 10)
  return isNaN(n) ? undefined : n
}

function CurrencyInput({
  value,
  onChange,
  placeholder,
  className,
}: {
  value: number | undefined
  onChange: (v: number | undefined) => void
  placeholder?: string
  className?: string
}) {
  const [focused, setFocused] = useState(false)
  // While focused show raw digits; while blurred show formatted
  const displayValue = focused
    ? (value !== undefined ? String(value) : '')
    : formatCurrencyInput(value)

  return (
    <div className="relative">
      <input
        type="text"
        inputMode="numeric"
        value={displayValue}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={e => onChange(parseCurrencyInput(e.target.value))}
        className={className}
      />
      {!focused && value !== undefined && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none">₴</span>
      )}
    </div>
  )
}

export default function CalculatorForm({ input, onInputChange }: CalculatorFormProps) {
  const t = useTranslations('calculator')
  const tCommon = useTranslations('common')

  type CategoryItem = { key: string; rate: string; icon: React.ReactNode }
  const categories: CategoryItem[] = [
    {
      key: 'military', rate: '3%',
      icon: <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
    },
    {
      key: 'security', rate: '3%',
      icon: <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
    },
    {
      key: 'medic', rate: '3%',
      icon: <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
    },
    {
      key: 'teacher', rate: '3%',
      icon: <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>
    },
    {
      key: 'scientist', rate: '3%',
      icon: <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" /></svg>
    },
    {
      key: 'idp', rate: '7%',
      icon: <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0110.5 3h6a2.25 2.25 0 012.25 2.25v13.5A2.25 2.25 0 0116.5 21h-6a2.25 2.25 0 01-2.25-2.25V15m-3 0l-3-3m0 0l3-3m-3 3H15" /></svg>
    },
    {
      key: 'veteran', rate: '7%',
      icon: <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>
    },
    {
      key: 'regular', rate: '7%',
      icon: <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
    },
  ]

  const update = (patch: Partial<CalculatorInput>) => {
    onInputChange({ ...input, ...patch })
  }

  const handleCitySelect = useCallback(
    (city: { name: string; region: string; settlementType: 'major' | 'other' }) => {
      onInputChange({
        ...input,
        region: city.region,
        settlementType: city.settlementType,
      })
    },
    [input, onInputChange]
  )

  // Derive city display name from current input (show name if we have one stored, else empty)
  const cityDisplayName = input.cityName || ''

  const inputClass = 'w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 text-sm'

  // --- Section completion ---
  const isFamilyComplete = !!(input.age && input.age >= 18 && input.familySize && input.familySize >= 1)
  const isPropertyComplete = !!(input.region && input.settlementType && input.area && input.area >= 10 && input.totalCost && input.totalCost >= 100000 && input.buildingAge !== undefined)
  const isLoanComplete = !!(input.loanTerm && input.loanTerm >= 1)

  // --- Section summaries (compact chips) ---

  const Chip = ({ children, color = 'gray' }: { children: React.ReactNode; color?: 'gray' | 'emerald' | 'blue' }) => {
    const cls = color === 'emerald'
      ? 'bg-emerald-100 text-emerald-700'
      : color === 'blue'
        ? 'bg-blue-100 text-blue-700'
        : 'bg-gray-100 text-gray-600'
    return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${cls}`}>{children}</span>
  }

  const familySummary = (input.age && input.familySize) ? (
    <>
      <Chip>{input.age} р.</Chip>
      <Chip>{input.familySize} {input.familySize === 1 ? 'особа' : input.familySize < 5 ? 'особи' : 'осіб'}</Chip>
      {input.age < 26 && <Chip color="emerald">внесок 10%</Chip>}
    </>
  ) : null

  const cityDisplayNameForSummary = input.cityName || input.region || ''
  const propertySummary = (input.region && input.area && input.totalCost) ? (
    <>
      {cityDisplayNameForSummary && <Chip>{cityDisplayNameForSummary}</Chip>}
      <Chip>{input.area} м²</Chip>
      <Chip>{input.propertyType === 'house' ? 'Будинок' : 'Квартира'}</Chip>
    </>
  ) : null

  const loanSummary = input.loanTerm ? (
    <Chip>{input.loanTerm} {input.loanTerm === 1 ? 'рік' : input.loanTerm < 5 ? 'роки' : 'років'}</Chip>
  ) : null

  return (
    <div className="space-y-3">
      {/* Quick-fill presets */}
      <div>
        <p className="text-xs text-gray-400 mb-2">{t('quickStart')}</p>
        <div className="flex gap-2 flex-wrap">
          {[
            {
              label: t('presetMilitary'),
              values: {
                category: 'military', propertyType: 'apartment' as const,
                region: 'Kyiv', settlementType: 'major' as const,
                area: 60, totalCost: 3000000, buildingAge: 2, loanTerm: 20,
                age: 35, familySize: 3, cityName: 'Київ',
              },
            },
            {
              label: t('presetMedic'),
              values: {
                category: 'medic', propertyType: 'apartment' as const,
                region: 'Kharkiv', settlementType: 'major' as const,
                area: 45, totalCost: 1800000, buildingAge: 2, loanTerm: 20,
                age: 28, familySize: 2, cityName: 'Харків',
              },
            },
            {
              label: t('presetIdp'),
              values: {
                category: 'idp', propertyType: 'apartment' as const,
                region: 'Lviv', settlementType: 'major' as const,
                area: 50, totalCost: 2200000, buildingAge: 5, loanTerm: 15,
                age: 40, familySize: 2, cityName: 'Львів',
              },
            },
          ].map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => onInputChange({ ...input, ...preset.values })}
              className="text-xs px-3 py-1.5 rounded-full border border-gray-200 bg-white text-gray-600 hover:border-primary-400 hover:text-primary-700 hover:bg-primary-50 transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <AccordionSection
        title={t('sections.category')}
        defaultOpen={true}
      >
        <p className="text-sm text-gray-500">{t('category.hint')}</p>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((cat) => {
            const isSelected = input.category === cat.key
            return (
              <label
                key={cat.key}
                className={`relative flex flex-col items-start p-3 border-2 rounded-xl cursor-pointer transition-all min-h-[80px] ${isSelected
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 bg-white hover:border-primary-300 hover:bg-primary-50/30'
                  }`}
              >
                <input
                  type="radio"
                  value={cat.key}
                  checked={isSelected}
                  onChange={(e) => update({ category: e.target.value })}
                  className="sr-only"
                />
                <span className="mb-1.5">{cat.icon}</span>
                <span className={`text-xs leading-tight font-medium ${isSelected ? 'text-primary-800' : 'text-gray-700'}`}>
                  {t(`category.${cat.key}`)}
                </span>
                <span className={`absolute top-2 right-2 text-xs font-bold px-1.5 py-0.5 rounded-full ${cat.rate === '3%'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-blue-100 text-blue-700'
                  }`}>
                  {cat.rate}
                </span>
              </label>
            )
          })}
        </div>
      </AccordionSection>

      <AccordionSection
        title={t('sections.family')}
        defaultOpen={true}
        isComplete={isFamilyComplete}
        summary={familySummary}
      >
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('family.age')}
            </label>
            <input
              type="number"
              min="18"
              max="70"
              value={input.age || ''}
              onChange={(e) => update({ age: parseInt(e.target.value) || undefined })}
              className={inputClass}
              placeholder="18-70"
            />
            {/* More prominent age hint */}
            <p className="mt-1.5 text-xs text-amber-700 bg-amber-50 rounded-lg px-2 py-1.5 leading-snug">
              {t('family.ageHint')}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('family.familySize')}
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={input.familySize || ''}
              onChange={(e) => update({ familySize: parseInt(e.target.value) || undefined })}
              className={inputClass}
              placeholder="1-10"
            />
            <p className="mt-1 text-xs text-gray-500">{t('family.familySizeHint')}</p>
          </div>
        </div>
      </AccordionSection>

      <AccordionSection
        title={t('sections.property')}
        defaultOpen={true}
        isComplete={isPropertyComplete}
        summary={propertySummary}
      >
        {/* Property type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('property.propertyType')}
          </label>
          <div className="flex space-x-3">
            <label className={`flex-1 flex items-center justify-center space-x-2 py-2.5 border rounded-lg cursor-pointer transition-colors text-sm ${input.propertyType === 'apartment' ? 'border-primary-500 bg-primary-50 font-medium' : 'hover:bg-gray-50'}`}>
              <input type="radio" value="apartment" checked={input.propertyType === 'apartment'} onChange={(e) => update({ propertyType: e.target.value as 'apartment' | 'house' })} className="sr-only" />
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
              </svg>
              <span>{t('property.apartment')}</span>
            </label>
            <label className={`flex-1 flex items-center justify-center space-x-2 py-2.5 border rounded-lg cursor-pointer transition-colors text-sm ${input.propertyType === 'house' ? 'border-primary-500 bg-primary-50 font-medium' : 'hover:bg-gray-50'}`}>
              <input type="radio" value="house" checked={input.propertyType === 'house'} onChange={(e) => update({ propertyType: e.target.value as 'apartment' | 'house' })} className="sr-only" />
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              <span>{t('property.house')}</span>
            </label>
          </div>
        </div>

        {/* City autocomplete — replaces region select + settlementType radio */}
        <div>
          <CityAutocomplete
            value={cityDisplayName}
            onSelect={(city) => {
              // Store city name + region + settlementType
              onInputChange({
                ...input,
                region: city.region,
                settlementType: city.settlementType,
                // Store display name for controlled input
                cityName: city.name,
              })
            }}
            label={t('property.region')}
            placeholder={t('property.regionPlaceholder')}
            inputClassName={inputClass}
          />
          {/* Show resolved values as small badges */}
          {input.region && (
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                {input.settlementType === 'major' ? '🏙 Велике місто (>300 тис.)' : '🏘 Інший населений пункт'}
              </span>
            </div>
          )}
        </div>

        {/* Area */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('property.area')} ({tCommon('sqm')})</label>
          <input type="number" min="10" max="200" step="0.1" value={input.area || ''} onChange={(e) => update({ area: parseFloat(e.target.value) || undefined })} className={inputClass} placeholder={t('property.areaPlaceholder')} />
        </div>

        {/* Total cost — currency masked input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('property.totalCost')} ({tCommon('currency')})</label>
          <CurrencyInput
            value={input.totalCost}
            onChange={(v) => update({ totalCost: v })}
            placeholder={t('property.totalCostPlaceholder')}
            className={inputClass}
          />
          <p className="mt-1 text-xs text-gray-400">{t('property.totalCostHint')}</p>
        </div>

        {/* Building age */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('property.buildingAge')} ({tCommon('years')})</label>
          <input type="number" min="0" max="20" value={input.buildingAge ?? ''} onChange={(e) => update({ buildingAge: e.target.value === '' ? undefined : parseInt(e.target.value) })} className={`${inputClass} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`} />
          <p className="mt-1 text-xs text-gray-500">{t('property.buildingAgeHint')}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">3 {tCommon('years')} standard</span>
            <span className="px-2 py-1 text-xs rounded-full bg-blue-50 text-blue-700">10 {tCommon('years')} IDP</span>
            <span className="px-2 py-1 text-xs rounded-full bg-amber-50 text-amber-700">20 {tCommon('years')} frontline</span>
          </div>
        </div>
      </AccordionSection>

      <AccordionSection
        title={t('sections.loan')}
        defaultOpen={true}
        isComplete={isLoanComplete}
        summary={loanSummary}
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('loan.loanTerm')} - <span className="font-bold text-primary-700">{input.loanTerm || 20} {tCommon('years')}</span>
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => update({ loanTerm: Math.max(1, (input.loanTerm || 20) - 1) })}
              className="w-10 h-10 flex-shrink-0 rounded-lg border-2 border-gray-300 flex items-center justify-center text-xl font-bold text-gray-600 hover:border-primary-400 hover:text-primary-600 transition active:scale-95"
              aria-label="Зменшити"
            >-</button>
            <input
              type="range"
              min="1"
              max="20"
              value={input.loanTerm || 20}
              onChange={(e) => update({ loanTerm: parseInt(e.target.value) })}
              className="flex-1 accent-primary-500"
            />
            <button
              type="button"
              onClick={() => update({ loanTerm: Math.min(20, (input.loanTerm || 20) + 1) })}
              className="w-10 h-10 flex-shrink-0 rounded-lg border-2 border-gray-300 flex items-center justify-center text-xl font-bold text-gray-600 hover:border-primary-400 hover:text-primary-600 transition active:scale-95"
              aria-label="Збільшити"
            >+</button>
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1 px-1">
            <span>1 {tCommon('years')}</span>
            <span>20 {tCommon('years')}</span>
          </div>
        </div>
      </AccordionSection>
    </div>
  )
}
