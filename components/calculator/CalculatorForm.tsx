'use client'

import { useState, useId } from 'react'
import { useTranslations } from 'next-intl'
import type { CalculatorInput } from '@/lib/calculator/types'

interface CalculatorFormProps {
  input: Partial<CalculatorInput>
  onInputChange: (input: Partial<CalculatorInput>) => void
}

function AccordionSection({ title, defaultOpen = false, children }: { title: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={id}
        className="w-full flex items-center justify-between px-5 py-4 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <span className="font-semibold text-gray-800">{title}</span>
        <svg className={`w-5 h-5 text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div id={id} role="region" className="px-5 py-4 space-y-4">{children}</div>}
    </div>
  )
}

export default function CalculatorForm({ input, onInputChange }: CalculatorFormProps) {
  const t = useTranslations('calculator')
  const tCommon = useTranslations('common')

  const categories = ['military', 'security', 'medic', 'teacher', 'scientist', 'idp', 'veteran', 'regular']
  const regions = [
    'Kyiv',
    'Vinnytsia',
    'Volyn',
    'Dnipropetrovsk',
    'Donetsk',
    'Zhytomyr',
    'Zakarpattia',
    'Zaporizhzhia',
    'IvanoFrankivsk',
    'KyivRegion',
    'Kirovohrad',
    'Luhansk',
    'Lviv',
    'Mykolaiv',
    'Odesa',
    'Poltava',
    'Rivne',
    'Sumy',
    'Ternopil',
    'Kharkiv',
    'Kherson',
    'Khmelnytskyi',
    'Cherkasy',
    'Chernivtsi',
    'Chernihiv',
  ]

  const update = (patch: Partial<CalculatorInput>) => {
    onInputChange({ ...input, ...patch })
  }

  const inputClass = 'w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 text-sm'

  return (
    <div className="space-y-3">
      <AccordionSection title={t('sections.category')} defaultOpen={true}>
        <p className="text-sm text-gray-500">{t('category.hint')}</p>
        <div className="grid grid-cols-1 gap-2">
          {categories.map((cat) => (
            <label key={cat} className={`flex items-center space-x-3 px-3 py-2.5 border rounded-lg cursor-pointer transition-colors text-sm ${input.category === cat ? 'border-primary-500 bg-primary-50' : 'hover:bg-gray-50'}`}>
              <input
                type="radio"
                value={cat}
                checked={input.category === cat}
                onChange={(e) => update({ category: e.target.value })}
                className="text-primary-500"
              />
              <span className="text-gray-700">{t(`category.${cat}`)}</span>
            </label>
          ))}
        </div>
      </AccordionSection>

      <AccordionSection title={t('sections.family')} defaultOpen={true}>
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
          <p className="mt-1 text-xs text-gray-500">{t('family.ageHint')}</p>
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
      </AccordionSection>

      <AccordionSection title={t('sections.property')} defaultOpen={true}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('property.propertyType')}
          </label>
          <div className="flex space-x-3">
            <label className={`flex-1 flex items-center justify-center space-x-2 py-2.5 border rounded-lg cursor-pointer transition-colors text-sm ${input.propertyType === 'apartment' ? 'border-primary-500 bg-primary-50 font-medium' : 'hover:bg-gray-50'}`}>
              <input type="radio" value="apartment" checked={input.propertyType === 'apartment'} onChange={(e) => update({ propertyType: e.target.value as 'apartment' | 'house' })} className="sr-only" />
              <span className="text-gray-700">{t('property.apartment')}</span>
            </label>
            <label className={`flex-1 flex items-center justify-center space-x-2 py-2.5 border rounded-lg cursor-pointer transition-colors text-sm ${input.propertyType === 'house' ? 'border-primary-500 bg-primary-50 font-medium' : 'hover:bg-gray-50'}`}>
              <input type="radio" value="house" checked={input.propertyType === 'house'} onChange={(e) => update({ propertyType: e.target.value as 'apartment' | 'house' })} className="sr-only" />
              <span className="text-gray-700">{t('property.house')}</span>
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('property.region')}</label>
          <select value={input.region || ''} onChange={(e) => update({ region: e.target.value })} className={inputClass}>
            <option value="">{tCommon('required')}</option>
            {regions.map((regionCode) => (
              <option key={regionCode} value={regionCode}>{t(`regions.${regionCode}`)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('property.settlementType')}</label>
          <div className="space-y-2">
            <label className={`flex items-start space-x-2 px-3 py-2.5 border rounded-lg cursor-pointer transition-colors text-sm ${input.settlementType === 'major' ? 'border-primary-500 bg-primary-50' : 'hover:bg-gray-50'}`}>
              <input type="radio" value="major" checked={input.settlementType === 'major'} onChange={(e) => update({ settlementType: e.target.value as 'major' | 'other' })} className="mt-0.5" />
              <span className="text-gray-700">{t('property.settlementTypeMajor')}</span>
            </label>
            <label className={`flex items-start space-x-2 px-3 py-2.5 border rounded-lg cursor-pointer transition-colors text-sm ${input.settlementType === 'other' ? 'border-primary-500 bg-primary-50' : 'hover:bg-gray-50'}`}>
              <input type="radio" value="other" checked={input.settlementType === 'other'} onChange={(e) => update({ settlementType: e.target.value as 'major' | 'other' })} className="mt-0.5" />
              <span className="text-gray-700">{t('property.settlementTypeOther')}</span>
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('property.area')} ({tCommon('sqm')})</label>
          <input type="number" min="10" max="200" step="0.1" value={input.area || ''} onChange={(e) => update({ area: parseFloat(e.target.value) || undefined })} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('property.totalCost')} ({tCommon('currency')})</label>
          <input type="number" min="100000" max="10000000" step="1000" value={input.totalCost || ''} onChange={(e) => update({ totalCost: parseFloat(e.target.value) || undefined })} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('property.buildingAge')} ({tCommon('years')})</label>
          <input type="number" min="0" max="20" value={input.buildingAge ?? ''} onChange={(e) => update({ buildingAge: e.target.value === '' ? undefined : parseInt(e.target.value) })} className={inputClass} />
          <p className="mt-1 text-xs text-gray-500">{t('property.buildingAgeHint')}</p>
        </div>
      </AccordionSection>

      <AccordionSection title={t('sections.loan')} defaultOpen={true}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('loan.loanTerm')} ({tCommon('years')})</label>
          <input type="range" min="1" max="20" value={input.loanTerm || 20} onChange={(e) => update({ loanTerm: parseInt(e.target.value) })} className="w-full accent-primary-500" />
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>1</span>
            <span className="font-bold text-primary-700">{input.loanTerm || 20} {tCommon('years')}</span>
            <span>20</span>
          </div>
        </div>
      </AccordionSection>
    </div>
  )
}
