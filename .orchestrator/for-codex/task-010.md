# Task: Form UX — Quick-fill presets + Auto-collapse completed sections

## Context
Project: єОселя mortgage calculator (Next.js 14, Tailwind CSS, next-intl).
Currently the form shows 4 open accordion sections at once — it looks overwhelming.
This task adds:
1. Quick-fill preset buttons (3 typical scenarios) above the form
2. Auto-collapse: when a section is "complete", it collapses and shows a compact summary row

Files to change:
1. `components/calculator/CalculatorForm.tsx`

No other files should be changed.

---

## Change 1: Make AccordionSection support completion summary

**Current AccordionSection signature:**
```tsx
function AccordionSection({ title, defaultOpen = false, children }: {
  title: string; defaultOpen?: boolean; children: React.ReactNode
})
```

**New signature** — add two optional props:
```tsx
function AccordionSection({
  title,
  defaultOpen = false,
  children,
  isComplete = false,
  summary,
}: {
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
  isComplete?: boolean
  summary?: React.ReactNode
})
```

**Behavior changes:**
1. Add `useEffect` inside the component that auto-collapses when `isComplete` becomes true:
```tsx
useEffect(() => {
  if (isComplete) {
    setOpen(false)
  }
}, [isComplete])
```

2. When `!open && isComplete && summary` is true, show the summary row between the header
   button and the children area. The header button should still be clickable to re-open.

**Updated JSX — the return should become:**
```tsx
return (
  <div className="border border-gray-200 rounded-xl overflow-hidden">
    <button
      type="button"
      onClick={() => setOpen(!open)}
      aria-expanded={open}
      aria-controls={id}
      className={`w-full flex items-center justify-between px-5 py-4 transition-colors ${
        isComplete && !open
          ? 'bg-emerald-50 hover:bg-emerald-100'
          : 'bg-gray-50 hover:bg-gray-100'
      }`}
    >
      <div className="flex items-center gap-2">
        {isComplete && !open && (
          <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        )}
        <span className={`font-semibold ${isComplete && !open ? 'text-emerald-800' : 'text-gray-800'}`}>
          {title}
        </span>
      </div>
      <svg
        className={`w-5 h-5 transition-transform flex-shrink-0 ${open ? 'rotate-180' : ''} ${isComplete && !open ? 'text-emerald-400' : 'text-gray-500'}`}
        fill="none" viewBox="0 0 24 24" stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    {/* Summary chips row — shown when collapsed + complete */}
    {!open && isComplete && summary && (
      <div className="px-5 py-2 bg-emerald-50 border-t border-emerald-100 flex flex-wrap gap-1.5">
        {summary}
      </div>
    )}

    {open && <div id={id} role="region" className="px-5 py-4 space-y-4">{children}</div>}
  </div>
)
```

---

## Change 2: Compute completion + summary for each section

In the `CalculatorForm` component body (before the `return`), add these computed values:

```tsx
// --- Section completion ---
const isCategoryComplete = !!input.category
const isFamilyComplete = !!(input.age && input.age >= 18 && input.familySize && input.familySize >= 1)
const isPropertyComplete = !!(input.region && input.settlementType && input.area && input.area >= 10 && input.totalCost && input.totalCost >= 100000 && input.buildingAge !== undefined)
const isLoanComplete = !!(input.loanTerm && input.loanTerm >= 1)

// --- Section summaries (compact chips) ---
const categoryLabel: Record<string, string> = {
  military: 'Військовий', security: 'Поліція/СБУ', medic: 'Медик',
  teacher: 'Вчитель', scientist: 'Науковець', idp: 'ВПО',
  veteran: 'Ветеран', regular: 'Загальна',
}
const rateLabel: Record<string, string> = {
  military: '3%', security: '3%', medic: '3%', teacher: '3%',
  scientist: '3%', idp: '7%', veteran: '7%', regular: '7%',
}

const Chip = ({ children, color = 'gray' }: { children: React.ReactNode; color?: 'gray' | 'emerald' | 'blue' }) => {
  const cls = color === 'emerald'
    ? 'bg-emerald-100 text-emerald-700'
    : color === 'blue'
    ? 'bg-blue-100 text-blue-700'
    : 'bg-gray-100 text-gray-600'
  return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${cls}`}>{children}</span>
}

const categorySummary = input.category ? (
  <>
    <Chip>{categoryLabel[input.category] ?? input.category}</Chip>
    <Chip color={rateLabel[input.category] === '3%' ? 'emerald' : 'blue'}>
      {rateLabel[input.category]}
    </Chip>
  </>
) : null

const familySummary = (input.age && input.familySize) ? (
  <>
    <Chip>{input.age} р.</Chip>
    <Chip>{input.familySize} {input.familySize === 1 ? 'особа' : input.familySize < 5 ? 'особи' : 'осіб'}</Chip>
    {input.age < 26 && <Chip color="emerald">внесок 10%</Chip>}
  </>
) : null

const cityDisplayNameForSummary = (input as any).cityName || input.region || ''
const propertySummary = (input.region && input.area && input.totalCost) ? (
  <>
    {cityDisplayNameForSummary && <Chip>{cityDisplayNameForSummary}</Chip>}
    <Chip>{input.area} м²</Chip>
    <Chip>{input.propertyType === 'house' ? 'Будинок' : 'Квартира'}</Chip>
  </>
) : null

const loanSummary = input.loanTerm ? (
  <Chip>{input.loanTerm} {input.loanTerm === 1 ? 'рік' : input.loanTerm < 5 ? 'роки' : 'років'}</Chip>
) : null
```

---

## Change 3: Pass completion + summary to AccordionSection

Update all 4 AccordionSection usages in the JSX:

```tsx
<AccordionSection
  title={t('sections.category')}
  defaultOpen={true}
  isComplete={isCategoryComplete}
  summary={categorySummary}
>
  {/* existing content unchanged */}
</AccordionSection>

<AccordionSection
  title={t('sections.family')}
  defaultOpen={true}
  isComplete={isFamilyComplete}
  summary={familySummary}
>
  {/* existing content unchanged */}
</AccordionSection>

<AccordionSection
  title={t('sections.property')}
  defaultOpen={true}
  isComplete={isPropertyComplete}
  summary={propertySummary}
>
  {/* existing content unchanged */}
</AccordionSection>

<AccordionSection
  title={t('sections.loan')}
  defaultOpen={true}
  isComplete={isLoanComplete}
  summary={loanSummary}
>
  {/* existing content unchanged */}
</AccordionSection>
```

---

## Change 4: Add quick-fill preset buttons above the accordion sections

Add this BEFORE the first `<AccordionSection>` (i.e., as the first child in the `<div className="space-y-3">`):

```tsx
{/* Quick-fill presets */}
<div>
  <p className="text-xs text-gray-400 mb-2">Швидкий старт:</p>
  <div className="flex gap-2 flex-wrap">
    {[
      {
        label: '🪖 Військовий · Київ · 60м²',
        values: {
          category: 'military', propertyType: 'apartment' as const,
          region: 'Kyiv', settlementType: 'major' as const,
          area: 60, totalCost: 3000000, buildingAge: 0, loanTerm: 20,
          age: 35, familySize: 3, cityName: 'Київ',
        },
      },
      {
        label: '🏥 Медик · Харків · 45м²',
        values: {
          category: 'medic', propertyType: 'apartment' as const,
          region: 'Kharkiv', settlementType: 'major' as const,
          area: 45, totalCost: 1800000, buildingAge: 0, loanTerm: 20,
          age: 28, familySize: 2, cityName: 'Харків',
        },
      },
      {
        label: '🚶 ВПО · Львів · 50м²',
        values: {
          category: 'idp', propertyType: 'apartment' as const,
          region: 'Lviv', settlementType: 'major' as const,
          area: 50, totalCost: 2200000, buildingAge: 5, loanTerm: 15,
          age: 40, familySize: 2, cityName: 'Львів',
        },
      },
    ].map((preset) => (
      <button
        key={preset.label}
        type="button"
        onClick={() => onInputChange({ ...input, ...preset.values } as any)}
        className="text-xs px-3 py-1.5 rounded-full border border-gray-200 bg-white text-gray-600 hover:border-primary-400 hover:text-primary-700 hover:bg-primary-50 transition-colors"
      >
        {preset.label}
      </button>
    ))}
  </div>
</div>
```

Note: `cityName` in the preset values will be passed via `as any` since it's not in the `CalculatorInput` type but is read in the parent page as an extended field. This pattern already exists in the codebase.

---

## Requirements
- Only change `components/calculator/CalculatorForm.tsx`
- Do NOT add new imports — all needed (`useState`, `useEffect`, `useCallback`, `React`) are already imported or available
- `useEffect` import must be added if not already present: add `useEffect` to the existing `import React, { useState, useId, useCallback } from 'react'` → `import React, { useState, useEffect, useId, useCallback } from 'react'`
- The `Chip` component must be defined INSIDE the `CalculatorForm` function body (not at module level) to have access to the color prop logic — unless you prefer to define it at module level. Either is fine.
- All existing form functionality must continue to work (autocomplete, categories, sliders, etc.)
- The summary shows ONLY when section is collapsed AND complete. When user clicks to re-open, content shows normally.

## Files to change
- `components/calculator/CalculatorForm.tsx` — all changes
