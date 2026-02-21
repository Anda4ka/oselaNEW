# Task: Quick UX wins — live results, price mask, settlement tiles, step-3 button, grid fix

## Context
Project: єОселя mortgage calculator (Next.js 14, Tailwind CSS).
Files to change:
1. `app/[locale]/calculator/page.tsx`
2. `components/calculator/CalculatorForm.tsx`
3. `app/[locale]/page.tsx`

No other files should be changed. No locale files to touch — use existing translation keys
or short hardcoded Ukrainian strings only for UI decoration (badges, hints).

---

## Fix 1: Live results (no waiting for full form)

**File:** `app/[locale]/calculator/page.tsx`

Currently `useState` initial state is:
```ts
const [input, setInput] = useState<Partial<CalculatorInput>>({
  category: 'military',
  propertyType: 'apartment',
  region: 'Kyiv',
  settlementType: 'major',
  loanTerm: 20,
})
```

Change it to include defaults for the remaining optional fields:
```ts
const [input, setInput] = useState<Partial<CalculatorInput>>({
  category: 'military',
  propertyType: 'apartment',
  region: 'Kyiv',
  settlementType: 'major',
  loanTerm: 20,
  age: 35,
  familySize: 2,
  buildingAge: 0,
})
```

This makes `isInputComplete()` return `true` as soon as the user fills in `area` and
`totalCost` (everything else already has a sensible default). Results appear immediately
without waiting for all 10 fields.

**Do NOT change** the `isInputComplete` function itself — only the initial state.

---

## Fix 2: Price field — text input with UAH formatting mask

**File:** `components/calculator/CalculatorForm.tsx`

Find the `totalCost` input (around line 232–234 in current file):
```tsx
<input type="number" min="100000" max="10000000" step="1000"
  value={input.totalCost || ''}
  onChange={(e) => update({ totalCost: parseFloat(e.target.value) || undefined })}
  className={inputClass} />
```

Replace with a text input that formats the number as `1 500 000` (space thousands separator):
```tsx
<input
  type="text"
  inputMode="numeric"
  value={input.totalCost ? input.totalCost.toLocaleString('uk-UA') : ''}
  onChange={(e) => {
    const raw = e.target.value.replace(/\s/g, '').replace(/[^\d]/g, '')
    const num = raw ? parseInt(raw, 10) : undefined
    update({ totalCost: num })
  }}
  className={inputClass}
  placeholder="1 500 000"
/>
```

Key points:
- `type="text"` removes the browser spinner (up/down arrows)
- `inputMode="numeric"` shows numeric keyboard on mobile
- Display: format with `toLocaleString('uk-UA')` → spaces as thousands separators
- Parse: strip all non-digits from what the user typed, then `parseInt`
- NO `min`/`max`/`step` attributes (those only apply to `type="number"`)

---

## Fix 3: Settlement type — tile buttons (compact design)

**File:** `components/calculator/CalculatorForm.tsx`

Find the settlement type section (currently two `<label>` rows with long text ~lines 215–226).
Replace the entire `<div className="space-y-2">` block with a compact two-tile row:

```tsx
<div className="flex gap-3">
  <label
    className={`flex-1 flex flex-col items-center justify-center py-3 px-2 border-2 rounded-xl cursor-pointer transition-all text-center min-h-[72px] ${
      input.settlementType === 'major'
        ? 'border-primary-500 bg-primary-50'
        : 'border-gray-200 bg-white hover:border-primary-300 hover:bg-primary-50/30'
    }`}
  >
    <input
      type="radio"
      value="major"
      checked={input.settlementType === 'major'}
      onChange={(e) => update({ settlementType: e.target.value as 'major' | 'other' })}
      className="sr-only"
    />
    <svg className="w-5 h-5 text-gray-500 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
    </svg>
    <span className={`text-xs font-semibold leading-tight ${input.settlementType === 'major' ? 'text-primary-800' : 'text-gray-700'}`}>
      Велике місто
    </span>
    <span className="text-xs text-gray-400 mt-0.5">&gt;300 тис.</span>
  </label>

  <label
    className={`flex-1 flex flex-col items-center justify-center py-3 px-2 border-2 rounded-xl cursor-pointer transition-all text-center min-h-[72px] ${
      input.settlementType === 'other'
        ? 'border-primary-500 bg-primary-50'
        : 'border-gray-200 bg-white hover:border-primary-300 hover:bg-primary-50/30'
    }`}
  >
    <input
      type="radio"
      value="other"
      checked={input.settlementType === 'other'}
      onChange={(e) => update({ settlementType: e.target.value as 'major' | 'other' })}
      className="sr-only"
    />
    <svg className="w-5 h-5 text-gray-500 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
    <span className={`text-xs font-semibold leading-tight ${input.settlementType === 'other' ? 'text-primary-800' : 'text-gray-700'}`}>
      Інше
    </span>
    <span className="text-xs text-gray-400 mt-0.5">до 300 тис.</span>
  </label>
</div>
```

Also keep the existing `settlementTypeHint` paragraph below the tiles if it exists (or remove it — the tiles
already communicate the threshold).

**Keep** the `{t('property.settlementType')}` label above unchanged.

---

## Fix 4: "Подати заявку через Дію" button at step 3

**File:** `app/[locale]/page.tsx`

Find the `steps` array rendering — step 3 (`key: 'step3'`). It currently renders just a title + description `<p>`.

After the `<p>` description for step3, add an `<a>` button:

```tsx
{step.key === 'step3' && (
  <a
    href="https://eoselia.diia.gov.ua"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 mt-3 px-5 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700 transition shadow-sm"
  >
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
    Подати заявку через Дію
  </a>
)}
```

This adds the "apply" button only after step 3 description. The condition `step.key === 'step3'`
ensures it only appears for that step.

---

## Fix 5: Category grid — fix layout when card expands

**File:** `app/[locale]/page.tsx`

Find the two category grids (for 3% and 7% categories). They currently use:
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
```

Add `items-start` to prevent grid rows from stretching when one card expands:
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
```

Apply this change to BOTH grids (the 3% group and the 7% group).

---

## Requirements
- All 5 fixes must be implemented
- No new imports needed (all standard HTML/React/Tailwind/next-intl)
- The component must stay `'use client'`
- All existing functionality (accordion, accordion state, categories, etc.) must continue to work
- `isInputComplete()` function in calculator/page.tsx must NOT be changed
- Do NOT modify: any lib/ files, any API routes, any locale files, CalculatorResults.tsx

## Files to change
- `app/[locale]/calculator/page.tsx` — Fix 1 only
- `components/calculator/CalculatorForm.tsx` — Fix 2 + Fix 3
- `app/[locale]/page.tsx` — Fix 4 + Fix 5
