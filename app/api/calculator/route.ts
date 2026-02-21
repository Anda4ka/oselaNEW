import { NextRequest, NextResponse } from 'next/server'
import { calculateMortgage } from '@/lib/calculator/calculations'
import type { CalculatorInput } from '@/lib/calculator/types'
import { REGIONAL_PRICES, USER_CATEGORIES, LOAN_SETTINGS, FRONTLINE_REGIONS } from '@/lib/config'

export async function POST(request: NextRequest) {
  try {
    const input: CalculatorInput = await request.json()
    
    if (!input.region || !input.settlementType) {
      return NextResponse.json(
        { success: false, error: 'errors.missingFields' },
        { status: 400 }
      )
    }
    
    const userCategory = USER_CATEGORIES[input.category]

    if (!userCategory) {
      return NextResponse.json(
        { success: false, error: 'Invalid category' },
        { status: 400 }
      )
    }

    const regionalPrice = REGIONAL_PRICES[input.region]

    if (!regionalPrice) {
      return NextResponse.json(
        { success: false, error: 'Invalid region' },
        { status: 400 }
      )
    }

    const isFrontlineRegion = FRONTLINE_REGIONS.includes(input.region)
    const effectiveMaxBuildingAge = isFrontlineRegion
      ? userCategory.frontlineMaxBuildingAge
      : userCategory.maxBuildingAge

    const settings = {
      ...LOAN_SETTINGS,
      pricePerSqM: regionalPrice.pricePerSqM,
      maxBuildingAge: effectiveMaxBuildingAge,
      ratePeriod1: userCategory.ratePeriod1,
      ratePeriod2: userCategory.ratePeriod2,
    }
    
    const result = calculateMortgage(input, settings)
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Calculator error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
