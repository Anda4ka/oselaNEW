import type { CalculatorInput, CalculationResult, AdditionalPayment, ComparisonScenario } from './types'

export function calculateNormativeArea(familySize: number, propertyType: 'apartment' | 'house'): number {
  const baseArea = propertyType === 'apartment' ? 52.5 : 62.5
  const maxArea = propertyType === 'apartment' ? 115.5 : 125.5
  
  if (familySize <= 2) {
    return baseArea
  }
  
  const calculatedArea = baseArea + (familySize - 2) * 21
  return Math.min(calculatedArea, maxArea)
}

export function calculateLimitPrice(basePrice: number, settlementType: 'major' | 'other'): number {
  const coefficient = settlementType === 'other' ? 1.75 : 2.0
  return basePrice * coefficient
}

export function calculateDownPayment(
  totalCost: number,
  age: number,
  downPaymentPercent: number,
  downPaymentPercent26: number
): number {
  const rate = age < 26 ? downPaymentPercent26 / 100 : downPaymentPercent / 100
  return totalCost * rate
}

export function calculateMonthlyPayment(
  loanAmount: number,
  annualRate: number,
  termMonths: number
): number {
  if (loanAmount <= 0 || annualRate <= 0 || termMonths <= 0) return 0
  
  const monthlyRate = annualRate / 12
  const payment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
                 (Math.pow(1 + monthlyRate, termMonths) - 1)
  
  return payment
}

export function checkAreaExcess(
  actualArea: number,
  normativeArea: number,
  buildingAge: number,
  maxBuildingAge: number,
  maxExcessPercent: number,
  pricePerSqM: number
): { allowed: boolean; error?: string; excessArea: number; excessPercent: number; payment: number } {
  if (actualArea <= normativeArea) {
    return { allowed: true, excessArea: 0, excessPercent: 0, payment: 0 }
  }
  
  const excessArea = actualArea - normativeArea
  const excessPercent = (excessArea / normativeArea) * 100
  
  if (buildingAge > maxBuildingAge) {
    return {
      allowed: false,
      error: 'errors.buildingAgeExceeded',
      excessArea,
      excessPercent,
      payment: 0
    }
  }
  
  if (buildingAge > 3 && excessArea > 0) {
    return {
      allowed: false,
      error: 'errors.areaExceededOldBuilding',
      excessArea,
      excessPercent,
      payment: 0
    }
  }
  
  if (excessPercent > maxExcessPercent) {
    return {
      allowed: false,
      error: 'errors.areaExceeded',
      excessArea,
      excessPercent,
      payment: 0
    }
  }
  
  const payment = excessArea * pricePerSqM
  
  return { allowed: true, excessArea, excessPercent, payment }
}

export function checkPriceExcess(
  actualPrice: number,
  limitPrice: number,
  area: number,
  maxExcessPercent: number
): { allowed: boolean; error?: string; excessPrice: number; excessPercent: number; payment: number } {
  if (actualPrice <= limitPrice) {
    return { allowed: true, excessPrice: 0, excessPercent: 0, payment: 0 }
  }
  
  const excessPrice = actualPrice - limitPrice
  const excessPercent = (excessPrice / limitPrice) * 100
  
  if (excessPercent > maxExcessPercent) {
    return {
      allowed: false,
      error: 'errors.priceExceeded',
      excessPrice,
      excessPercent,
      payment: 0
    }
  }
  
  const payment = excessPrice * area
  
  return { allowed: true, excessPrice, excessPercent, payment }
}

export function calculatePaymentSchedule(
  loanAmount: number,
  rate1: number,
  rate2: number,
  termMonths: number
): { payment1: number; payment2: number; totalInterest: number; totalPayment: number } {
  const monthlyRate1 = rate1 / 12
  
  const firstPeriodMonths = Math.min(120, termMonths)
  const secondPeriodMonths = termMonths > 120 ? termMonths - 120 : 0
  
  const payment1 = secondPeriodMonths > 0
    ? calculateMonthlyPayment(loanAmount, rate1, termMonths)
    : calculateMonthlyPayment(loanAmount, rate1, firstPeriodMonths)
  
  let remainingBalance = loanAmount
  let totalInterest = 0
  
  for (let i = 0; i < firstPeriodMonths; i++) {
    const interestPayment = remainingBalance * monthlyRate1
    const principalPayment = payment1 - interestPayment
    remainingBalance -= principalPayment
    totalInterest += interestPayment
  }
  
  let payment2 = 0
  
  if (secondPeriodMonths > 0 && remainingBalance > 1) {
    const monthlyRate2 = rate2 / 12
    payment2 = calculateMonthlyPayment(remainingBalance, rate2, secondPeriodMonths)
    
    for (let i = 0; i < secondPeriodMonths; i++) {
      const interestPayment = remainingBalance * monthlyRate2
      const principalPayment = payment2 - interestPayment
      remainingBalance -= principalPayment
      totalInterest += interestPayment
    }
  }
  
  const totalPayment = loanAmount + totalInterest
  
  return { payment1, payment2, totalInterest, totalPayment }
}

export function generateComparisonScenarios(
  totalCost: number,
  additionalPaymentsTotal: number,
  termMonths: number
): ComparisonScenario[] {
  const scenarios: ComparisonScenario[] = []

  const downPaymentRates = [20, 10]
  const interestRates = [
    { rate1: 0.03, rate2: 0.06 },
    { rate1: 0.07, rate2: 0.10 }
  ]

  for (const dpPercent of downPaymentRates) {
    for (const rates of interestRates) {
      const baseDownPayment = totalCost * (dpPercent / 100)
      const fullDownPayment = baseDownPayment + additionalPaymentsTotal
      const loanAmount = totalCost - fullDownPayment

      if (loanAmount <= 0) continue

      const schedule = calculatePaymentSchedule(
        loanAmount,
        rates.rate1,
        rates.rate2,
        termMonths
      )

      scenarios.push({
        label: `${dpPercent}% + ${(rates.rate1 * 100).toFixed(0)}%/${(rates.rate2 * 100).toFixed(0)}%`,
        downPaymentPercent: dpPercent,
        interestRate1: rates.rate1,
        interestRate2: rates.rate2,
        downPayment: fullDownPayment,
        loanAmount,
        monthlyPayment1: schedule.payment1,
        monthlyPayment2: schedule.payment2,
        totalInterest: schedule.totalInterest,
        totalPayment: schedule.totalPayment
      })
    }
  }

  return scenarios
}

export function calculateMortgage(input: CalculatorInput, settings: any): CalculationResult {
  const warnings: string[] = []
  const additionalPayments: AdditionalPayment[] = []
  
  const normativeArea = calculateNormativeArea(input.familySize, input.propertyType)
  const actualPricePerSqM = input.totalCost / input.area
  
  const areaCheck = checkAreaExcess(
    input.area,
    normativeArea,
    input.buildingAge,
    settings.maxBuildingAge,
    settings.maxAreaExcessPercent,
    actualPricePerSqM
  )
  
  if (!areaCheck.allowed) {
    return {
      success: false,
      error: areaCheck.error,
      normativeArea,
      actualArea: input.area,
      limitPrice: 0,
      actualPricePerSqM,
      downPayment: 0,
      loanAmount: 0,
      interestRate1: 0,
      interestRate2: 0,
      monthlyPayment1: 0,
      monthlyPayment2: 0,
      totalInterest: 0,
      totalPayment: 0,
      excessArea: areaCheck.excessArea,
      excessAreaPercent: areaCheck.excessPercent,
      excessPrice: 0,
      excessPricePercent: 0,
      maxAreaExcessPercent: settings.maxAreaExcessPercent,
      maxBuildingAge: settings.maxBuildingAge,
      buildingAge: input.buildingAge,
      warnings,
      additionalPayments
    }
  }
  
  const limitPrice = calculateLimitPrice(settings.pricePerSqM, input.settlementType)
  
  const priceCheck = checkPriceExcess(
    actualPricePerSqM,
    limitPrice,
    input.area,
    settings.maxPriceExcessPercent
  )
  
  if (!priceCheck.allowed) {
    return {
      success: false,
      error: priceCheck.error,
      normativeArea,
      actualArea: input.area,
      limitPrice,
      actualPricePerSqM,
      downPayment: 0,
      loanAmount: 0,
      interestRate1: 0,
      interestRate2: 0,
      monthlyPayment1: 0,
      monthlyPayment2: 0,
      totalInterest: 0,
      totalPayment: 0,
      excessArea: areaCheck.excessArea,
      excessAreaPercent: areaCheck.excessPercent,
      excessPrice: priceCheck.excessPrice,
      excessPricePercent: priceCheck.excessPercent,
      maxAreaExcessPercent: settings.maxAreaExcessPercent,
      maxBuildingAge: settings.maxBuildingAge,
      buildingAge: input.buildingAge,
      warnings,
      additionalPayments
    }
  }
  
  let downPayment = calculateDownPayment(
    input.totalCost,
    input.age,
    settings.downPaymentPercent,
    settings.downPaymentPercent26 || 10
  )
  
  if (areaCheck.excessArea > 0) {
    downPayment += areaCheck.payment
    additionalPayments.push({
      type: 'areaExcessPayment',
      amount: areaCheck.payment,
      details: `${areaCheck.excessArea.toFixed(1)} м² × ${actualPricePerSqM.toFixed(0)} грн/м²`
    })
    warnings.push(`${areaCheck.excessArea.toFixed(1)} м² (${areaCheck.excessPercent.toFixed(1)}%)`)
  }
  
  if (priceCheck.excessPrice > 0) {
    downPayment += priceCheck.payment
    additionalPayments.push({
      type: 'priceExcessPayment',
      amount: priceCheck.payment,
      details: `${priceCheck.excessPrice.toFixed(0)} грн/м² × ${input.area} м²`
    })
    warnings.push(`${priceCheck.excessPrice.toFixed(0)} грн/м² (${priceCheck.excessPercent.toFixed(1)}%)`)
  }
  
  const loanAmount = input.totalCost - downPayment
  
  if (loanAmount < settings.minLoanAmount) {
    return {
      success: false,
      error: 'errors.loanTooSmall',
      normativeArea,
      actualArea: input.area,
      limitPrice,
      actualPricePerSqM,
      downPayment,
      loanAmount,
      interestRate1: 0,
      interestRate2: 0,
      monthlyPayment1: 0,
      monthlyPayment2: 0,
      totalInterest: 0,
      totalPayment: 0,
      excessArea: areaCheck.excessArea,
      excessAreaPercent: areaCheck.excessPercent,
      excessPrice: priceCheck.excessPrice,
      excessPricePercent: priceCheck.excessPercent,
      warnings,
      additionalPayments
    }
  }
  
  if (loanAmount > settings.maxLoanAmount) {
    return {
      success: false,
      error: 'errors.loanTooLarge',
      normativeArea,
      actualArea: input.area,
      limitPrice,
      actualPricePerSqM,
      downPayment,
      loanAmount,
      interestRate1: 0,
      interestRate2: 0,
      monthlyPayment1: 0,
      monthlyPayment2: 0,
      totalInterest: 0,
      totalPayment: 0,
      excessArea: areaCheck.excessArea,
      excessAreaPercent: areaCheck.excessPercent,
      excessPrice: priceCheck.excessPrice,
      excessPricePercent: priceCheck.excessPercent,
      warnings,
      additionalPayments
    }
  }
  
  const interestRate1 = settings.ratePeriod1
  const interestRate2 = settings.ratePeriod2
  const termMonths = input.loanTerm * 12
  
  const { payment1, payment2, totalInterest, totalPayment } = calculatePaymentSchedule(
    loanAmount,
    interestRate1,
    interestRate2,
    termMonths
  )

  const additionalPaymentsTotal = additionalPayments.reduce((sum, p) => sum + p.amount, 0)
  const comparisonScenarios = generateComparisonScenarios(
    input.totalCost,
    additionalPaymentsTotal,
    termMonths
  )
  
  return {
    success: true,
    normativeArea,
    actualArea: input.area,
    limitPrice,
    actualPricePerSqM,
    downPayment,
    loanAmount,
    interestRate1,
    interestRate2,
    monthlyPayment1: payment1,
    monthlyPayment2: payment2,
    totalInterest,
    totalPayment,
    excessArea: areaCheck.excessArea,
    excessAreaPercent: areaCheck.excessPercent,
    excessPrice: priceCheck.excessPrice,
    excessPricePercent: priceCheck.excessPercent,
    warnings,
    additionalPayments,
    comparisonScenarios
  }
}
