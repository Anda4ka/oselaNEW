import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { calculateMortgage } from '@/lib/calculator/calculations'
import type { CalculatorInput } from '@/lib/calculator/types'

export async function POST(request: NextRequest) {
  try {
    const input: CalculatorInput = await request.json()
    
    if (!input.region || !input.settlementType) {
      return NextResponse.json(
        { success: false, error: 'errors.missingFields' },
        { status: 400 }
      )
    }
    
    const userCategory = await prisma.userCategory.findUnique({
      where: { code: input.category }
    })
    
    if (!userCategory) {
      return NextResponse.json(
        { success: false, error: 'Invalid category' },
        { status: 400 }
      )
    }
    
    const regionalPrice = await prisma.regionalPrice.findUnique({
      where: { region: input.region }
    })
    
    if (!regionalPrice) {
      return NextResponse.json(
        { success: false, error: 'Invalid region' },
        { status: 400 }
      )
    }
    
    const loanSettings = await prisma.loanSettings.findFirst()
    
    if (!loanSettings) {
      return NextResponse.json(
        { success: false, error: 'Settings not found' },
        { status: 500 }
      )
    }
    
    const settings = {
      ...loanSettings,
      pricePerSqM: regionalPrice.pricePerSqM
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
