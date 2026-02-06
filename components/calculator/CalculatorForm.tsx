'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import type { CalculatorInput } from '@/lib/calculator/types'

interface CalculatorFormProps {
  onCalculate: (input: CalculatorInput) => void
}

export default function CalculatorForm({ onCalculate }: CalculatorFormProps) {
  const t = useTranslations('calculator')
  const tCommon = useTranslations('common')
  const [step, setStep] = useState(1)
  const [input, setInput] = useState<Partial<CalculatorInput>>({
    category: 'military',
    propertyType: 'apartment',
    region: 'Kyiv',
    settlementType: 'major',
    loanTerm: 20
  })

  const categories = ['military', 'security', 'medic', 'teacher', 'scientist', 'idp', 'veteran', 'regular']

  const regions = [
    { code: 'Kyiv', nameUk: 'Київ' },
    { code: 'Vinnytsia', nameUk: 'Вінницька' },
    { code: 'Volyn', nameUk: 'Волинська' },
    { code: 'Dnipropetrovsk', nameUk: 'Дніпропетровська' },
    { code: 'Donetsk', nameUk: 'Донецька' },
    { code: 'Zhytomyr', nameUk: 'Житомирська' },
    { code: 'Zakarpattia', nameUk: 'Закарпатська' },
    { code: 'Zaporizhzhia', nameUk: 'Запорізька' },
    { code: 'IvanoFrankivsk', nameUk: 'Івано-Франківська' },
    { code: 'KyivRegion', nameUk: 'Київська' },
    { code: 'Kirovohrad', nameUk: 'Кіровоградська' },
    { code: 'Luhansk', nameUk: 'Луганська' },
    { code: 'Lviv', nameUk: 'Львівська' },
    { code: 'Mykolaiv', nameUk: 'Миколаївська' },
    { code: 'Odesa', nameUk: 'Одеська' },
    { code: 'Poltava', nameUk: 'Полтавська' },
    { code: 'Rivne', nameUk: 'Рівненська' },
    { code: 'Sumy', nameUk: 'Сумська' },
    { code: 'Ternopil', nameUk: 'Тернопільська' },
    { code: 'Kharkiv', nameUk: 'Харківська' },
    { code: 'Kherson', nameUk: 'Херсонська' },
    { code: 'Khmelnytskyi', nameUk: 'Хмельницька' },
    { code: 'Cherkasy', nameUk: 'Черкаська' },
    { code: 'Chernivtsi', nameUk: 'Чернівецька' },
    { code: 'Chernihiv', nameUk: 'Чернігівська' },
  ]

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    } else {
      if (!input.age || !input.familySize || !input.area || !input.totalCost || !input.buildingAge || !input.region || !input.settlementType) {
        alert(t('common.required'))
        return
      }
      onCalculate(input as CalculatorInput)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-primary-800 mb-6">{t('title')}</h2>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`flex-1 h-1 mx-1 rounded ${
                step >= s ? 'bg-primary-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          {[1, 2, 3, 4].map((s) => (
            <span key={s} className={step === s ? 'font-bold text-primary-600' : ''}>
              {t(`steps.${s}`)}
            </span>
          ))}
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('category.label')}</h3>
          <div className="grid grid-cols-1 gap-3">
            {categories.map((cat) => (
              <label key={cat} className="flex items-start space-x-3 p-3 border rounded hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  value={cat}
                  checked={input.category === cat}
                  onChange={(e) => setInput({ ...input, category: e.target.value })}
                  className="mt-1"
                />
                <span className="text-gray-700">{t(`category.${cat}`)}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('steps.2')}</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('family.age')}
            </label>
            <input
              type="number"
              min="18"
              max="70"
              value={input.age || ''}
              onChange={(e) => setInput({ ...input, age: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
            />
            <p className="mt-1 text-sm text-gray-500">{t('family.ageHint')}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('family.familySize')}
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={input.familySize || ''}
              onChange={(e) => setInput({ ...input, familySize: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
            />
            <p className="mt-1 text-sm text-gray-500">{t('family.familySizeHint')}</p>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('steps.3')}</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('property.propertyType')}
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="apartment"
                  checked={input.propertyType === 'apartment'}
                  onChange={(e) => setInput({ ...input, propertyType: e.target.value as 'apartment' | 'house' })}
                />
                <span className="text-gray-700">{t('property.apartment')}</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="house"
                  checked={input.propertyType === 'house'}
                  onChange={(e) => setInput({ ...input, propertyType: e.target.value as 'apartment' | 'house' })}
                />
                <span className="text-gray-700">{t('property.house')}</span>
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('property.region')}
            </label>
            <select
              value={input.region || ''}
              onChange={(e) => setInput({ ...input, region: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
            >
              <option value="">{t('common.required')}</option>
              {regions.map((region) => (
                <option key={region.code} value={region.code}>
                  {region.nameUk}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('property.settlementType')}
            </label>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="major"
                  checked={input.settlementType === 'major'}
                  onChange={(e) => setInput({ ...input, settlementType: e.target.value as 'major' | 'other' })}
                />
                <span className="text-gray-700">{t('property.settlementTypeMajor')}</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="other"
                  checked={input.settlementType === 'other'}
                  onChange={(e) => setInput({ ...input, settlementType: e.target.value as 'major' | 'other' })}
                />
                <span className="text-gray-700">{t('property.settlementTypeOther')}</span>
              </label>
            </div>
            <p className="mt-1 text-sm text-gray-500">{t('property.settlementTypeHint')}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('property.area')}
            </label>
            <input
              type="number"
              min="20"
              max="150"
              step="0.1"
              value={input.area || ''}
              onChange={(e) => setInput({ ...input, area: parseFloat(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('property.totalCost')}
            </label>
            <input
              type="number"
              min="250000"
              max="10000000"
              step="1000"
              value={input.totalCost || ''}
              onChange={(e) => setInput({ ...input, totalCost: parseFloat(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('property.buildingAge')}
            </label>
            <input
              type="number"
              min="0"
              max="20"
              value={input.buildingAge || ''}
              onChange={(e) => setInput({ ...input, buildingAge: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
            />
            <p className="mt-1 text-sm text-gray-500">{t('property.buildingAgeHint')}</p>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('steps.4')}</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('loan.loanTerm')}
            </label>
            <input
              type="number"
              min="1"
              max="20"
              value={input.loanTerm || 20}
              onChange={(e) => setInput({ ...input, loanTerm: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
            />
            <p className="mt-1 text-sm text-gray-500">{t('loan.loanTermHint')}</p>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-8">
        <button
          onClick={handleBack}
          disabled={step === 1}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700"
        >
          {tCommon('back')}
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
        >
          {step === 4 ? tCommon('calculate') : tCommon('next')}
        </button>
      </div>
    </div>
  )
}
