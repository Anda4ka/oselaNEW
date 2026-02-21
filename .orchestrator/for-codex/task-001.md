# Task: Fix seed data — IDP building age + update regional prices to 01.07.2025

## Context
Project: єОселя mortgage calculator (Next.js 14, Prisma, PostgreSQL).
File to change: `prisma/seed.ts`

The seed file currently contains:
1. IDP category with incorrect `maxBuildingAge: 10` (should be 20)
2. Regional construction prices based on Minregion order dated 01.01.2025 — these are outdated. The current valid order is №1155 dated 16.07.2025 (prices as of 01.07.2025).

## What to do

### Fix 1: IDP maxBuildingAge
In the `userCategories` array, change the `idp` entry:
```
// BEFORE:
{ code: 'idp', ..., ratePeriod1: 0.07, ratePeriod2: 0.10, maxBuildingAge: 10 },

// AFTER:
{ code: 'idp', ..., ratePeriod1: 0.07, ratePeriod2: 0.10, maxBuildingAge: 20 },
```

### Fix 2: Update all 25 regional prices
Replace the entire `regionalPrices` array with the updated values from Minregion order №1155 (01.07.2025):

```typescript
const regionalPrices = [
  { region: 'Kyiv',             regionUk: 'Київ',              regionEn: 'Kyiv',             pricePerSqM: 29665 },
  { region: 'Vinnytsia',        regionUk: 'Вінницька',         regionEn: 'Vinnytsia',        pricePerSqM: 24475 },
  { region: 'Volyn',            regionUk: 'Волинська',         regionEn: 'Volyn',            pricePerSqM: 24399 },
  { region: 'Dnipropetrovsk',   regionUk: 'Дніпропетровська',  regionEn: 'Dnipropetrovsk',   pricePerSqM: 24608 },
  { region: 'Donetsk',          regionUk: 'Донецька',          regionEn: 'Donetsk',          pricePerSqM: 26661 },
  { region: 'Zhytomyr',         regionUk: 'Житомирська',       regionEn: 'Zhytomyr',         pricePerSqM: 22312 },
  { region: 'Zakarpattia',      regionUk: 'Закарпатська',      regionEn: 'Zakarpattia',      pricePerSqM: 22034 },
  { region: 'Zaporizhzhia',     regionUk: 'Запорізька',        regionEn: 'Zaporizhzhia',     pricePerSqM: 24583 },
  { region: 'IvanoFrankivsk',   regionUk: 'Івано-Франківська', regionEn: 'Ivano-Frankivsk',  pricePerSqM: 22824 },
  { region: 'KyivRegion',       regionUk: 'Київська',          regionEn: 'Kyiv Region',      pricePerSqM: 25351 },
  { region: 'Kirovohrad',       regionUk: 'Кіровоградська',    regionEn: 'Kirovohrad',       pricePerSqM: 21572 },
  { region: 'Luhansk',          regionUk: 'Луганська',         regionEn: 'Luhansk',          pricePerSqM: 24348 },
  { region: 'Lviv',             regionUk: 'Львівська',         regionEn: 'Lviv',             pricePerSqM: 25244 },
  { region: 'Mykolaiv',         regionUk: 'Миколаївська',      regionEn: 'Mykolaiv',         pricePerSqM: 25344 },
  { region: 'Odesa',            regionUk: 'Одеська',           regionEn: 'Odesa',            pricePerSqM: 24316 },
  { region: 'Poltava',          regionUk: 'Полтавська',        regionEn: 'Poltava',          pricePerSqM: 22569 },
  { region: 'Rivne',            regionUk: 'Рівненська',        regionEn: 'Rivne',            pricePerSqM: 24930 },
  { region: 'Sumy',             regionUk: 'Сумська',           regionEn: 'Sumy',             pricePerSqM: 23812 },
  { region: 'Ternopil',         regionUk: 'Тернопільська',     regionEn: 'Ternopil',         pricePerSqM: 23791 },
  { region: 'Kharkiv',          regionUk: 'Харківська',        regionEn: 'Kharkiv',          pricePerSqM: 26678 },
  { region: 'Kherson',          regionUk: 'Херсонська',        regionEn: 'Kherson',          pricePerSqM: 23094 },
  { region: 'Khmelnytskyi',     regionUk: 'Хмельницька',       regionEn: 'Khmelnytskyi',     pricePerSqM: 24427 },
  { region: 'Cherkasy',         regionUk: 'Черкаська',         regionEn: 'Cherkasy',         pricePerSqM: 25000 },
  { region: 'Chernivtsi',       regionUk: 'Чернівецька',       regionEn: 'Chernivtsi',       pricePerSqM: 23495 },
  { region: 'Chernihiv',        regionUk: 'Чернігівська',      regionEn: 'Chernihiv',        pricePerSqM: 25413 },
]
```

Also update the comment above the array from:
```
// 1. Регіональні ціни з doc.md (01.01.2025)
```
to:
```
// 1. Регіональні ціни (Наказ Мінрозвитку №1155 від 16.07.2025, станом на 01.07.2025)
```

## Files to change
- `prisma/seed.ts` — only this file

## Requirements
- Change ONLY `maxBuildingAge` for `idp` (line ~46)
- Replace ALL 25 price values in `regionalPrices` array
- Do NOT change any other category fields, table structure, or logic
- Do NOT change `route.ts`, `calculations.ts`, or any other file

## Restrictions
- Do NOT change: schema.prisma, calculations.ts, route.ts, types.ts
- Do NOT change category rates (ratePeriod1, ratePeriod2) for any category
- Do NOT change loanSettings values

## Expected result
After running `npm run prisma:seed`:
- IDP category has maxBuildingAge = 20
- All 25 regions have updated prices (avg ~6.5% higher than before)
