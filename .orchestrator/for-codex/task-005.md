# Task: Calculator form UX improvements — tiles, 2-column grid, slider buttons

## Context
Project: єОселя mortgage calculator (Next.js 14, Tailwind CSS).
Files to change: `components/calculator/CalculatorForm.tsx` only.
No other files should be changed.

Current problems to fix:
1. Category radio buttons are small list items — need large tile-style buttons with clear visual hierarchy
2. Age + family size inputs are stacked vertically — should be 2-column grid to save space
3. Loan term slider has no +/- buttons — hard to use on mobile with precision
4. Property type toggle (квартира/будинок) is OK but can look better with icons
5. Building age input has no visual hint about allowed limits per context

## What to do

### Fix 1: Category selector — large tile buttons

Replace the current list of radio labels in the category section.
Currently: small `px-3 py-2.5` rows with tiny radio input.

New design — large tile cards in a 2-column grid, each showing:
- Category icon (inline SVG, w-6 h-6)
- Category name
- Rate badge
- NO visible radio input (use `sr-only`)

```jsx
// Replace the categories radio section with:
<div className="grid grid-cols-2 gap-2">
  {categories.map((cat) => {
    const isSelected = input.category === cat.key
    return (
      <label
        key={cat.key}
        className={`relative flex flex-col items-start p-3 border-2 rounded-xl cursor-pointer transition-all min-h-[80px]
          ${isSelected
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-200 bg-white hover:border-primary-300 hover:bg-primary-50/30'
          }`}
      >
        <input
          type="radio"
          value={cat.key}
          checked={isSelected}
          onChange={(e) => update({ category: e.target.value })}
          className="sr-only"
        />
        <span className="mb-1.5">{cat.icon}</span>
        <span className={`text-xs leading-tight font-medium ${isSelected ? 'text-primary-800' : 'text-gray-700'}`}>
          {t(`category.${cat.key}`)}
        </span>
        <span className={`absolute top-2 right-2 text-xs font-bold px-1.5 py-0.5 rounded-full
          ${cat.rate === '3%'
            ? 'bg-emerald-100 text-emerald-700'
            : 'bg-blue-100 text-blue-700'
          }`}>
          {cat.rate}
        </span>
      </label>
    )
  })}
</div>
```

Add icons and rates to the categories array (use inline SVG, `w-6 h-6 text-gray-500`):
```typescript
const categories = [
  {
    key: 'military', rate: '3%',
    icon: <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
  },
  {
    key: 'security', rate: '3%',
    icon: <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
  },
  {
    key: 'medic', rate: '3%',
    icon: <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
  },
  {
    key: 'teacher', rate: '3%',
    icon: <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>
  },
  {
    key: 'scientist', rate: '3%',
    icon: <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" /></svg>
  },
  {
    key: 'idp', rate: '7%',
    icon: <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0110.5 3h6a2.25 2.25 0 012.25 2.25v13.5A2.25 2.25 0 0116.5 21h-6a2.25 2.25 0 01-2.25-2.25V15m-3 0l-3-3m0 0l3-3m-3 3H15" /></svg>
  },
  {
    key: 'veteran', rate: '7%',
    icon: <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>
  },
  {
    key: 'regular', rate: '7%',
    icon: <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
  },
]
```

Note: since JSX is used in the array, the type should be:
```typescript
type CategoryItem = { key: string; rate: string; icon: React.ReactNode }
const categories: CategoryItem[] = [...]
```

### Fix 2: Age + family size — 2-column grid

In the "family" AccordionSection, wrap both inputs in a grid:
```jsx
<div className="grid grid-cols-2 gap-3">
  <div>
    <label ...>{t('family.age')}</label>
    <input type="number" ... />
    <p className="mt-1 text-xs text-gray-500">{t('family.ageHint')}</p>
  </div>
  <div>
    <label ...>{t('family.familySize')}</label>
    <input type="number" ... />
    <p className="mt-1 text-xs text-gray-500">{t('family.familySizeHint')}</p>
  </div>
</div>
```

### Fix 3: Loan term slider — add +/- buttons

Replace the plain `<input type="range">` section with:
```jsx
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    {t('loan.loanTerm')} — <span className="font-bold text-primary-700">{input.loanTerm || 20} {tCommon('years')}</span>
  </label>
  <div className="flex items-center gap-3">
    <button
      type="button"
      onClick={() => update({ loanTerm: Math.max(1, (input.loanTerm || 20) - 1) })}
      className="w-10 h-10 flex-shrink-0 rounded-lg border-2 border-gray-300 flex items-center justify-center text-xl font-bold text-gray-600 hover:border-primary-400 hover:text-primary-600 transition active:scale-95"
      aria-label="Зменшити"
    >−</button>
    <input
      type="range"
      min="1"
      max="20"
      value={input.loanTerm || 20}
      onChange={(e) => update({ loanTerm: parseInt(e.target.value) })}
      className="flex-1 accent-primary-500"
    />
    <button
      type="button"
      onClick={() => update({ loanTerm: Math.min(20, (input.loanTerm || 20) + 1) })}
      className="w-10 h-10 flex-shrink-0 rounded-lg border-2 border-gray-300 flex items-center justify-center text-xl font-bold text-gray-600 hover:border-primary-400 hover:text-primary-600 transition active:scale-95"
      aria-label="Збільшити"
    >+</button>
  </div>
  <div className="flex justify-between text-xs text-gray-400 mt-1 px-1">
    <span>1 {tCommon('years')}</span>
    <span>20 {tCommon('years')}</span>
  </div>
</div>
```

### Fix 4: Property type toggle — add icons

In the property type section, add a small icon before the label text:
```jsx
// Apartment label content:
<>
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
  </svg>
  <span>{t('property.apartment')}</span>
</>

// House label content:
<>
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>
  <span>{t('property.house')}</span>
</>
```

## Files to change
- `components/calculator/CalculatorForm.tsx` — all changes

## Files NOT to change
- `app/[locale]/calculator/page.tsx`
- `components/calculator/CalculatorResults.tsx`
- Any API routes, lib files, locale files

## Requirements
- The component must still be `'use client'` (already is)
- All existing functionality must work identically (onChange handlers, accordion, etc.)
- Import `React` at top if JSX in arrays requires it: `import React from 'react'`
- Touch targets for +/- buttons must be minimum 40×40px (w-10 h-10 = 40px ✓)
- The 2-column grid for age+family must NOT break below 320px — use `grid-cols-2` (both fields are short numbers, OK)
- NO emoji anywhere
