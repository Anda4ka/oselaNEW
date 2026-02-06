import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = request.cookies.get('admin-session')
    
    if (!session || session.value !== 'true') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const [regionalPrices, loanSettings, userCategories, propertyTypes] = await Promise.all([
      prisma.regionalPrice.findMany({ orderBy: { region: 'asc' } }),
      prisma.loanSettings.findFirst(),
      prisma.userCategory.findMany({ orderBy: { code: 'asc' } }),
      prisma.propertyType.findMany({ orderBy: { code: 'asc' } })
    ])
    
    return NextResponse.json({
      success: true,
      data: {
        regionalPrices,
        loanSettings,
        userCategories,
        propertyTypes
      }
    })
  } catch (error) {
    console.error('Get settings error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = request.cookies.get('admin-session')
    
    if (!session || session.value !== 'true') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const data = await request.json()
    
    if (data.regionalPrices) {
      for (const price of data.regionalPrices) {
        await prisma.regionalPrice.update({
          where: { id: price.id },
          data: { pricePerSqM: price.pricePerSqM }
        })
      }
    }
    
    if (data.loanSettings) {
      await prisma.loanSettings.update({
        where: { id: data.loanSettings.id },
        data: {
          ratePeriod1: data.loanSettings.ratePeriod1,
          ratePeriod2: data.loanSettings.ratePeriod2,
          minLoanAmount: data.loanSettings.minLoanAmount,
          maxLoanAmount: data.loanSettings.maxLoanAmount,
          downPaymentPercent: data.loanSettings.downPaymentPercent,
          maxAreaExcessPercent: data.loanSettings.maxAreaExcessPercent,
          maxPriceExcessPercent: data.loanSettings.maxPriceExcessPercent
        }
      })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Update settings error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
