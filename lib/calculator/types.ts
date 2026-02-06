export interface CalculatorInput {
  category: string
  age: number
  familySize: number
  propertyType: 'apartment' | 'house'
  region: string
  settlementType: 'major' | 'other'
  area: number
  totalCost: number
  buildingAge: number
  loanTerm: number
}

export interface CalculationResult {
  success: boolean
  error?: string
  normativeArea: number
  actualArea: number
  limitPrice: number
  actualPricePerSqM: number
  downPayment: number
  loanAmount: number
  interestRate1: number
  interestRate2: number
  monthlyPayment1: number
  monthlyPayment2: number
  totalInterest: number
  totalPayment: number
  excessArea: number
  excessAreaPercent: number
  excessPrice: number
  excessPricePercent: number
  warnings: string[]
  additionalPayments: AdditionalPayment[]
}

export interface AdditionalPayment {
  type: string
  amount: number
  details: string
}

export interface CategoryData {
  code: string
  nameUk: string
  ratePeriod1: number
  ratePeriod2: number
  maxBuildingAge: number
}

export interface RegionalPriceData {
  region: string
  regionUk: string
  pricePerSqM: number
}
