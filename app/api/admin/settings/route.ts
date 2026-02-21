import { NextRequest, NextResponse } from 'next/server'
import { REGIONAL_PRICES, USER_CATEGORIES, PROPERTY_TYPES, LOAN_SETTINGS } from '@/lib/config'

function checkAuth(request: NextRequest) {
  const session = request.cookies.get('admin-session')
  return session?.value === 'true'
}

export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  // Convert Record objects to arrays for frontend compatibility
  const regionalPrices = Object.entries(REGIONAL_PRICES).map(([region, data], i) => ({
    id: i + 1, region, ...data
  }))
  const userCategories = Object.entries(USER_CATEGORIES).map(([code, data], i) => ({
    id: i + 1, code, ...data
  }))
  const propertyTypes = Object.entries(PROPERTY_TYPES).map(([code, data], i) => ({
    id: i + 1, code, ...data
  }))

  return NextResponse.json({
    success: true,
    data: {
      regionalPrices,
      loanSettings: { id: 1, ...LOAN_SETTINGS },
      userCategories,
      propertyTypes,
    },
    staticMode: true,
  })
}

export async function PUT(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }
  // Write operations disabled in static mode
  return NextResponse.json(
    { success: false, error: 'Static mode: edit lib/config.ts to change settings' },
    { status: 503 }
  )
}
