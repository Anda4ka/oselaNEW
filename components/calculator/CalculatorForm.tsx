'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import type { CalculatorInput } from '@/lib/calculator/types'

interface CalculatorFormProps {
  onCalculate: (input: CalculatorInput) => void
  loading?: boolean
}

export default function CalculatorForm({ onCalculate, loading }: CalculatorFormProps) {
  const t = useTranslations('calculator')
  const tCommon = useTranslations('common')
  const [step, setStep] = useState(1)
  const [validationError, setValidationError] = useState('')
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

  const validateStep = (currentStep: number): boolean => {
    setValidationError('')
    switch (currentStep) {
      case 1:
        if (!input.category) {
          setValidationError(tCommon('required'))
          return false
        }
        return true
      case 2:
        if (!input.age || input.age < 18 || input.age > 70) {
          setValidationError(t('family.age') + ': 18-70')
          return false
        }
        if (!input.familySize || input.familySize < 1 || input.familySize > 10) {
          setValidationError(t('family.familySize') + ': 1-10')
          return false
        }
        return true
      case 3:
        if (!input.region) {
          setValidationError(t('property.region') + ' - ' + tCommon('required'))
          return false
        }
        if (!input.area || input.area < 10) {
          setValidationError(t('property.area') + ' - ' + tCommon('required'))
          return false
        }
        if (!input.totalCost || input.totalCost < 100000) {
          setValidationError(t('property.totalCost') + ' - ' + tCommon('required'))
          return false
        }
        if (input.buildingAge === undefined || input.buildingAge === null || input.buildingAge < 0) {
          setValidationError(t('property.buildingAge') + ' - ' + tCommon('required'))
          return false
        }
        return true
      case 4:
        if (!input.loanTerm || input.loanTerm < 1 || input.loanTerm > 20) {
          setValidationError(t('loan.loanTerm') + ': 1-20')
          return false
        }
        return true
      default:
        return true
    }
  }

  const handleNext = () => {
    if (!validateStep(step)) return

    if (step < 4) {
      setStep(step + 1)
    } else {
      onCalculate(input as CalculatorInput)
    }
  }

  const handleBack = () => {
    setValidationError('')
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
        <div className="hidden sm:flex justify-between text-sm text-gray-600">
          {[1, 2, 3, 4].map((s) => (
            <span key={s} className={step === s ? 'font-bold text-primary-600' : ''}>
              {t(`steps.${s}`)}
            </span>
          ))}
        </div>
        <div className="sm:hidden text-center text-sm font-bold text-primary-600">
          {t(`steps.${step}`)} ({step}/4)
        </div>
      </div>

      {validationError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
          {validationError}
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('category.label')}</h3>
          <p className="text-sm text-gray-500 mb-2">{t('category.hint')}</p>
          <div className="grid grid-cols-1 gap-3">
            {categories.map((cat) => (
              <label key={cat} className={`flex items-start space-x-3 p-3 border rounded hover:bg-gray-50 cursor-pointer ${input.category === cat ? 'border-primary-500 bg-primary-50' : ''}`}>
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
              {t('family.age')} *
            </label>
            <input
              type="number"
              min="18"
              max="70"
              value={input.age || ''}
              onChange={(e) => setInput({ ...input, age: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
              placeholder="18-70"
            />
            <p className="mt-1 text-sm text-gray-500">{t('family.ageHint')}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('family.familySize')} *
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={input.familySize || ''}
              onChange={(e) => setInput({ ...input, familySize: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
              placeholder="1-10"
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
              <label className={`flex items-center space-x-2 p-3 border rounded cursor-pointer ${input.propertyType === 'apartment' ? 'border-primary-500 bg-primary-50' : ''}`}>
                <input
                  type="radio"
                  value="apartment"
                  checked={input.propertyType === 'apartment'}
                  onChange={(e) => setInput({ ...input, propertyType: e.target.value as 'apartment' | 'house' })}
                />
                <span className="text-gray-700">{t('property.apartment')}</span>
              </label>
              <label className={`flex items-center space-x-2 p-3 border rounded cursor-pointer ${input.propertyType === 'house' ? 'border-primary-500 bg-primary-50' : ''}`}>
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
              {t('property.region')} *
            </label>
            <select
              value={input.region || ''}
              onChange={(e) => setInput({ ...input, region: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
            >
              <option value="">{tCommon('required')}</option>
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
              <label className={`flex items-start space-x-2 p-3 border rounded cursor-pointer ${input.settlementType === 'major' ? 'border-primary-500 bg-primary-50' : ''}`}>
                <input
                  type="radio"
                  value="major"
                  checked={input.settlementType === 'major'}
                  onChange={(e) => setInput({ ...input, settlementType: e.target.value as 'major' | 'other' })}
                  className="mt-1"
                />
                <span className="text-gray-700 text-sm">{t('property.settlementTypeMajor')}</span>
              </label>
              <label className={`flex items-start space-x-2 p-3 border rounded cursor-pointer ${input.settlementType === 'other' ? 'border-primary-500 bg-primary-50' : ''}`}>
                <input
                  type="radio"
                  value="other"
                  checked={input.settlementType === 'other'}
                  onChange={(e) => setInput({ ...input, settlementType: e.target.value as 'major' | 'other' })}
                  className="mt-1"
                />
                <span className="text-gray-700 text-sm">{t('property.settlementTypeOther')}</span>
              </label>
            </div>
            <p className="mt-1 text-sm text-gray-500">{t('property.settlementTypeHint')}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('property.area')} ({tCommon('sqm')}) *
            </label>
            <input
              type="number"
              min="10"
              max="200"
              step="0.1"
              value={input.area || ''}
              onChange={(e) => setInput({ ...input, area: parseFloat(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('property.totalCost')} ({tCommon('currency')}) *
            </label>
            <input
              type="number"
              min="100000"
              max="10000000"
              step="1000"
              value={input.totalCost || ''}
              onChange={(e) => setInput({ ...input, totalCost: parseFloat(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('property.buildingAge')} ({tCommon('years')}) *
            </label>
            <input
              type="number"
              min="0"
              max="20"
              value={input.buildingAge ?? ''}
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
              {t('loan.loanTerm')} ({tCommon('years')}) *
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
          disabled={loading}
          className="px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span>{tCommon('loading')}</span>
            </>
          ) : (
            <span>{step === 4 ? tCommon('calculate') : tCommon('next')}</span>
          )}
        </button>
      </div>
    </div>
  )
}
