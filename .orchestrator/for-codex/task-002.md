# Task: Implement frontline region building age exception

## Context
Project: єОселя mortgage calculator (Next.js 14, Prisma, PostgreSQL).

According to the official program rules (ukrfinzhytlo.in.ua, effective 10.02.2026):
- Military, security workers, medics, teachers, scientists, veterans (ratePeriod1 = 3% or 7%)
  can buy housing up to **20 years old** in FRONTLINE REGIONS
- In all other regions — still up to **3 years old** for these categories

Frontline regions (Постанова КМУ №856): Chernihiv, Sumy, Kharkiv, Zaporizhzhia, Kherson
(region codes in DB: 'Chernihiv', 'Sumy', 'Kharkiv', 'Zaporizhzhia', 'Kherson')

Currently the code stores ONE `maxBuildingAge` per category in the DB (always 3 for non-IDP),
with NO region-based logic. This needs to be fixed.

## What to do

### Step 1: Add `frontlineMaxBuildingAge` field to `UserCategory` in `prisma/schema.prisma`

Add a new optional field to the `UserCategory` model:
```prisma
model UserCategory {
  id                   Int      @id @default(autoincrement())
  code                 String   @unique
  nameUk               String
  nameRu               String
  nameEn               String
  ratePeriod1          Float
  ratePeriod2          Float
  maxBuildingAge       Int      // default building age limit (years)
  frontlineMaxBuildingAge Int   @default(3)  // building age limit in frontline regions
  createdAt            DateTime @default(now())
  updatedAt            DateTime @updatedAt
}
```

### Step 2: Update `prisma/seed.ts` — set `frontlineMaxBuildingAge` values

For categories that have frontline region exception, add `frontlineMaxBuildingAge: 20`:
```typescript
const userCategories = [
  { code: 'military', ..., maxBuildingAge: 3,  frontlineMaxBuildingAge: 20 },
  { code: 'security', ..., maxBuildingAge: 3,  frontlineMaxBuildingAge: 20 },
  { code: 'medic',    ..., maxBuildingAge: 3,  frontlineMaxBuildingAge: 20 },
  { code: 'teacher',  ..., maxBuildingAge: 3,  frontlineMaxBuildingAge: 20 },
  { code: 'scientist',..., maxBuildingAge: 3,  frontlineMaxBuildingAge: 20 },
  { code: 'idp',      ..., maxBuildingAge: 20, frontlineMaxBuildingAge: 20 },  // IDP: 20 everywhere
  { code: 'veteran',  ..., maxBuildingAge: 3,  frontlineMaxBuildingAge: 20 },
  { code: 'regular',  ..., maxBuildingAge: 3,  frontlineMaxBuildingAge: 3  },  // no exception
]
```

### Step 3: Update `app/api/calculator/route.ts`

Add frontline region check when building the `settings` object.
Add a constant for frontline region codes and override `maxBuildingAge` when needed:

```typescript
const FRONTLINE_REGIONS = ['Chernihiv', 'Sumy', 'Kharkiv', 'Zaporizhzhia', 'Kherson']

// Inside POST handler, replace the settings object:
const isFrontlineRegion = FRONTLINE_REGIONS.includes(input.region)
const effectiveMaxBuildingAge = isFrontlineRegion
  ? userCategory.frontlineMaxBuildingAge
  : userCategory.maxBuildingAge

const settings = {
  ...loanSettings,
  pricePerSqM: regionalPrice.pricePerSqM,
  maxBuildingAge: effectiveMaxBuildingAge,   // <-- was: userCategory.maxBuildingAge
  ratePeriod1: userCategory.ratePeriod1,
  ratePeriod2: userCategory.ratePeriod2
}
```

### Step 4: Add migration

After schema change, create a migration:
```
npx prisma migrate dev --name add_frontline_building_age
```

## Files to create/change
- `prisma/schema.prisma` — add `frontlineMaxBuildingAge` field to UserCategory
- `prisma/seed.ts` — add `frontlineMaxBuildingAge` values to all 8 categories
- `app/api/calculator/route.ts` — add FRONTLINE_REGIONS constant and override logic

## Requirements
- The new field must have a default value of `3` so existing DB rows don't break
- The `calculations.ts` file must NOT be changed — it already uses `settings.maxBuildingAge` correctly
- FRONTLINE_REGIONS list must use the exact region codes from the DB:
  `'Chernihiv'`, `'Sumy'`, `'Kharkiv'`, `'Zaporizhzhia'`, `'Kherson'`
- After this change, a military person buying in Kharkiv gets maxBuildingAge=20
- After this change, a military person buying in Lviv still gets maxBuildingAge=3
- IDP gets maxBuildingAge=20 everywhere (frontlineMaxBuildingAge=20, maxBuildingAge=20)
- `regular` category gets no exception (frontlineMaxBuildingAge=3)

## Restrictions
- Do NOT change `calculations.ts`
- Do NOT change `types.ts`
- Do NOT change frontend components
- Do NOT add new API endpoints

## Example of correct behavior after fix
| Category  | Region   | effectiveMaxBuildingAge |
|-----------|----------|------------------------|
| military  | Kharkiv  | 20 ✅ (frontline)       |
| military  | Lviv     | 3  ✅ (normal)          |
| teacher   | Sumy     | 20 ✅ (frontline)       |
| idp       | Kyiv     | 20 ✅ (IDP, any region) |
| veteran   | Zaporizhzhia | 20 ✅ (frontline)   |
| regular   | Kharkiv  | 3  ✅ (no exception)    |
