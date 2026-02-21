# Task: Replace Prisma/DB with static config.ts (no database needed)

## Context
Project: єОселя mortgage calculator (Next.js 14, TypeScript).
Goal: eliminate the PostgreSQL/Prisma dependency entirely. All reference data
(regional prices, user categories, settings) is static and can live in a single
TypeScript config file. The admin panel should still work for viewing data,
but write (PUT) is disabled until DB is added later.

## Files to CREATE

### `lib/config.ts` — single source of truth for all static data

```typescript
// lib/config.ts
// Source: Мінрозвитку №1155 від 16.07.2025 (prices as of 01.07.2025)
// Program rules: Постанова КМУ №856, effective 10.02.2026

export const FRONTLINE_REGIONS = ['Chernihiv', 'Sumy', 'Kharkiv', 'Zaporizhzhia', 'Kherson']

export const REGIONAL_PRICES: Record<string, { regionUk: string; regionEn: string; pricePerSqM: number }> = {
  Kyiv:             { regionUk: 'Київ',              regionEn: 'Kyiv',             pricePerSqM: 29665 },
  Vinnytsia:        { regionUk: 'Вінницька',         regionEn: 'Vinnytsia',        pricePerSqM: 24475 },
  Volyn:            { regionUk: 'Волинська',         regionEn: 'Volyn',            pricePerSqM: 24399 },
  Dnipropetrovsk:   { regionUk: 'Дніпропетровська',  regionEn: 'Dnipropetrovsk',   pricePerSqM: 24608 },
  Donetsk:          { regionUk: 'Донецька',          regionEn: 'Donetsk',          pricePerSqM: 26661 },
  Zhytomyr:         { regionUk: 'Житомирська',       regionEn: 'Zhytomyr',         pricePerSqM: 22312 },
  Zakarpattia:      { regionUk: 'Закарпатська',      regionEn: 'Zakarpattia',      pricePerSqM: 22034 },
  Zaporizhzhia:     { regionUk: 'Запорізька',        regionEn: 'Zaporizhzhia',     pricePerSqM: 24583 },
  IvanoFrankivsk:   { regionUk: 'Івано-Франківська', regionEn: 'Ivano-Frankivsk',  pricePerSqM: 22824 },
  KyivRegion:       { regionUk: 'Київська',          regionEn: 'Kyiv Region',      pricePerSqM: 25351 },
  Kirovohrad:       { regionUk: 'Кіровоградська',    regionEn: 'Kirovohrad',       pricePerSqM: 21572 },
  Luhansk:          { regionUk: 'Луганська',         regionEn: 'Luhansk',          pricePerSqM: 24348 },
  Lviv:             { regionUk: 'Львівська',         regionEn: 'Lviv',             pricePerSqM: 25244 },
  Mykolaiv:         { regionUk: 'Миколаївська',      regionEn: 'Mykolaiv',         pricePerSqM: 25344 },
  Odesa:            { regionUk: 'Одеська',           regionEn: 'Odesa',            pricePerSqM: 24316 },
  Poltava:          { regionUk: 'Полтавська',        regionEn: 'Poltava',          pricePerSqM: 22569 },
  Rivne:            { regionUk: 'Рівненська',        regionEn: 'Rivne',            pricePerSqM: 24930 },
  Sumy:             { regionUk: 'Сумська',           regionEn: 'Sumy',             pricePerSqM: 23812 },
  Ternopil:         { regionUk: 'Тернопільська',     regionEn: 'Ternopil',         pricePerSqM: 23791 },
  Kharkiv:          { regionUk: 'Харківська',        regionEn: 'Kharkiv',          pricePerSqM: 26678 },
  Kherson:          { regionUk: 'Херсонська',        regionEn: 'Kherson',          pricePerSqM: 23094 },
  Khmelnytskyi:     { regionUk: 'Хмельницька',      regionEn: 'Khmelnytskyi',     pricePerSqM: 24427 },
  Cherkasy:         { regionUk: 'Черкаська',         regionEn: 'Cherkasy',         pricePerSqM: 25000 },
  Chernivtsi:       { regionUk: 'Чернівецька',       regionEn: 'Chernivtsi',       pricePerSqM: 23495 },
  Chernihiv:        { regionUk: 'Чернігівська',      regionEn: 'Chernihiv',        pricePerSqM: 25413 },
}

export const USER_CATEGORIES: Record<string, {
  nameUk: string; nameRu: string; nameEn: string
  ratePeriod1: number; ratePeriod2: number
  maxBuildingAge: number; frontlineMaxBuildingAge: number
}> = {
  military:  { nameUk: 'Військовослужбовець за контрактом',             nameRu: 'Военнослужащий по контракту',                         nameEn: 'Contract Military',            ratePeriod1: 0.03, ratePeriod2: 0.06, maxBuildingAge: 3,  frontlineMaxBuildingAge: 20 },
  security:  { nameUk: 'Працівник сектору безпеки',                     nameRu: 'Работник сектора безопасности',                       nameEn: 'Security Sector Employee',     ratePeriod1: 0.03, ratePeriod2: 0.06, maxBuildingAge: 3,  frontlineMaxBuildingAge: 20 },
  medic:     { nameUk: 'Медичний працівник (державний/комунальний)',     nameRu: 'Медицинский работник (государственный/коммунальный)', nameEn: 'Healthcare Worker (Public)',   ratePeriod1: 0.03, ratePeriod2: 0.06, maxBuildingAge: 3,  frontlineMaxBuildingAge: 20 },
  teacher:   { nameUk: 'Педагог (державний/комунальний)',               nameRu: 'Педагог (государственный/коммунальный)',              nameEn: 'Teacher (Public)',             ratePeriod1: 0.03, ratePeriod2: 0.06, maxBuildingAge: 3,  frontlineMaxBuildingAge: 20 },
  scientist: { nameUk: 'Науковець (державний/комунальний)',             nameRu: 'Ученый (государственный/коммунальный)',               nameEn: 'Scientist (Public)',           ratePeriod1: 0.03, ratePeriod2: 0.06, maxBuildingAge: 3,  frontlineMaxBuildingAge: 20 },
  idp:       { nameUk: 'Внутрішньо переміщена особа (ВПО)',             nameRu: 'Внутренне перемещенное лицо (ВПО)',                   nameEn: 'Internally Displaced Person',  ratePeriod1: 0.07, ratePeriod2: 0.10, maxBuildingAge: 20, frontlineMaxBuildingAge: 20 },
  veteran:   { nameUk: 'Ветеран війни',                                 nameRu: 'Ветеран войны',                                      nameEn: 'War Veteran',                  ratePeriod1: 0.07, ratePeriod2: 0.10, maxBuildingAge: 3,  frontlineMaxBuildingAge: 20 },
  regular:   { nameUk: 'Громадянин без власного житла',                 nameRu: 'Гражданин без собственного жилья',                   nameEn: 'Citizen without housing',      ratePeriod1: 0.07, ratePeriod2: 0.10, maxBuildingAge: 3,  frontlineMaxBuildingAge: 3  },
}

export const PROPERTY_TYPES: Record<string, { nameUk: string; nameRu: string; nameEn: string; baseArea: number; maxArea: number }> = {
  apartment: { nameUk: 'Квартира',          nameRu: 'Квартира',    nameEn: 'Apartment', baseArea: 52.5, maxArea: 115.5 },
  house:     { nameUk: 'Житловий будинок',  nameRu: 'Жилой дом',   nameEn: 'House',     baseArea: 62.5, maxArea: 125.5 },
}

export const LOAN_SETTINGS = {
  minLoanAmount:        200000,
  maxLoanAmount:        5000000,
  minTermMonths:        12,
  maxTermMonths:        240,
  downPaymentPercent:   20,
  downPaymentPercent26: 10,
  maxAreaExcessPercent: 10,
  maxPriceExcessPercent: 10,
}
```

## Files to CHANGE

### `app/api/calculator/route.ts` — remove all Prisma, use config

Replace the entire file content with:

```typescript
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
```

### `app/api/admin/login/route.ts` — remove Prisma, use env password directly

Replace the entire file content with:

```typescript
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    const adminUser = process.env.ADMIN_USERNAME || 'admin'
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

    if (username !== adminUser || password !== adminPassword) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const response = NextResponse.json({ success: true, message: 'Login successful' })
    response.cookies.set('admin-session', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
    })
    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

### `app/api/admin/settings/route.ts` — remove Prisma, serve config data read-only

Replace the entire file content with:

```typescript
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
    staticMode: true, // hint for frontend
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
```

## Files to NOT change
- `lib/calculator/calculations.ts` — no changes
- `lib/calculator/types.ts` — no changes
- `prisma/` folder — leave as-is (for future DB re-integration)
- `lib/prisma.ts` — leave as-is (not imported anymore, but keep for future)
- All frontend components (`.tsx` files) — no changes
- `prisma/schema.prisma` — no changes

## Requirements
- After these changes, `npm run dev` must work WITHOUT any DATABASE_URL
- No import of `@/lib/prisma` in any of the 3 changed API routes
- The calculator API (`/api/calculator`) must work identically to before
- The admin login must work with username `admin` and password from `ADMIN_PASSWORD` env (default `admin123`)
- The admin settings GET must return the same JSON shape as before (with `id` fields)

## .env update
Also update `.env` — the `DATABASE_URL` line is no longer required.
Add a comment but keep the line for future use:
```
# DATABASE_URL not required in static mode (add PostgreSQL URL when enabling DB later)
# DATABASE_URL="postgresql://user:password@host:5432/dbname"
ADMIN_PASSWORD="admin123"
NEXT_PUBLIC_APP_URL="http://localhost:5000"
NEXTAUTH_SECRET="replit-secret-key-eoselia-calc"
NEXTAUTH_URL="http://localhost:5000"
```
