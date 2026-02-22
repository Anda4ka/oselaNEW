# Task: Results enhancements — table headers, payment timeline, PDF export

## Context
Project: єОселя mortgage calculator (Next.js 14, Tailwind CSS).
This task improves the results panel with 3 changes:
1. Redesign comparison table column headers (color badges instead of cramped text)
2. Add a visual payment timeline strip showing the two payment periods
3. Add PDF/print export button

Files to change:
1. `components/calculator/CalculatorResults.tsx`
2. `app/globals.css`

---

## Change 1: Redesign comparison table sub-headers

**File:** `components/calculator/CalculatorResults.tsx`

Find the second `<tr>` inside `<thead>` — the one that renders sub-column headers.
Currently it does this per column:
```tsx
<th key={i} className={`px-4 py-2 text-center text-xs font-semibold min-w-[130px] ${...}`}>
  {t('rate')} {(s.interestRate1 * 100).toFixed(0)}%
  <span className="font-normal text-gray-400"> / {t('after10y')} {(s.interestRate2 * 100).toFixed(0)}%</span>
</th>
```

Replace with:
```tsx
<th key={i} className={`px-4 py-2 text-center min-w-[130px] ${isBaseCol ? 'bg-primary-100' : 'bg-gray-50'} ${i === 1 ? 'border-r border-gray-100' : ''}`}>
  <div className="flex flex-col items-center gap-1">
    <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${
      s.interestRate1 <= 0.04
        ? 'bg-emerald-100 text-emerald-700'
        : 'bg-blue-100 text-blue-700'
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.interestRate1 <= 0.04 ? 'bg-emerald-500' : 'bg-blue-500'}`} />
      {(s.interestRate1 * 100).toFixed(0)}%
    </span>
    <span className="text-[10px] text-gray-400 font-normal">
      після 10р: {(s.interestRate2 * 100).toFixed(0)}%
    </span>
  </div>
</th>
```

---

## Change 2: Add payment timeline visualization

**File:** `components/calculator/CalculatorResults.tsx`

Add a new component at the top of the file (after the imports, before `StatusBadge`):

```tsx
function PaymentTimeline({
  monthlyPayment1,
  monthlyPayment2,
  loanTermYears,
  rate1Percent,
  rate2Percent,
  formatCurrency,
}: {
  monthlyPayment1: number
  monthlyPayment2: number
  loanTermYears: number
  rate1Percent: string
  rate2Percent: string
  formatCurrency: (v: number) => string
}) {
  const hasSecondPeriod = loanTermYears > 10
  const firstPeriodYears = hasSecondPeriod ? 10 : loanTermYears
  const secondPeriodYears = hasSecondPeriod ? loanTermYears - 10 : 0
  const firstWidthPercent = hasSecondPeriod
    ? Math.round((10 / loanTermYears) * 100)
    : 100

  return (
    <div className="rounded-xl border border-gray-100 overflow-hidden">
      {/* Period blocks */}
      <div className="flex">
        <div
          className="bg-primary-50 px-3 py-3 border-r border-primary-100"
          style={{ width: `${firstWidthPercent}%` }}
        >
          <div className="text-[10px] text-primary-500 font-semibold uppercase tracking-wide mb-0.5">
            {hasSecondPeriod ? `Перші ${firstPeriodYears} р. · ${rate1Percent}%` : `${firstPeriodYears} р. · ${rate1Percent}%`}
          </div>
          <div className="text-sm font-bold text-primary-800">{formatCurrency(monthlyPayment1)}<span className="text-xs font-normal text-primary-400">/міс</span></div>
        </div>
        {hasSecondPeriod && (
          <div className="flex-1 bg-gray-50 px-3 py-3">
            <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide mb-0.5">
              Після 10 р. · {rate2Percent}%
            </div>
            <div className="text-sm font-bold text-gray-700">{formatCurrency(monthlyPayment2)}<span className="text-xs font-normal text-gray-400">/міс</span></div>
          </div>
        )}
      </div>
      {/* Timeline bar */}
      <div className="relative h-5 bg-gray-100 flex">
        <div
          className="bg-primary-400 flex items-center justify-start pl-1.5"
          style={{ width: `${firstWidthPercent}%` }}
        >
          <span className="text-[9px] text-white font-medium whitespace-nowrap">0 р.</span>
        </div>
        {hasSecondPeriod && (
          <div className="flex-1 bg-gray-300 flex items-center justify-end pr-1.5">
            <span className="text-[9px] text-gray-600 font-medium">{loanTermYears} р.</span>
          </div>
        )}
        {hasSecondPeriod && (
          <div className="absolute top-0 bottom-0 flex items-center" style={{ left: `${firstWidthPercent}%`, transform: 'translateX(-50%)' }}>
            <div className="bg-white border border-gray-300 rounded-full px-1 text-[9px] text-gray-500 font-semibold whitespace-nowrap z-10">
              10 р.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
```

**Where to insert it in the main render:**

Find the payment display block (the `<div className="bg-primary-50 rounded-xl p-5 space-y-1">` block).
AFTER the closing `</div>` of this block (and before the `{status === 'warn' && ...}` block),
add:

```tsx
<PaymentTimeline
  monthlyPayment1={result.monthlyPayment1}
  monthlyPayment2={result.monthlyPayment2}
  loanTermYears={loanTermYears}
  rate1Percent={rate1Percent}
  rate2Percent={rate2Percent}
  formatCurrency={formatCurrency}
/>
```

---

## Change 3: Add PDF/print export button + print styles

### 3a: Add print button at the bottom of CalculatorResults.tsx

Find the LAST element in the success return (the `showWhy` block's closing brace and `</div>`).
AFTER it, and BEFORE the final `</div>` that closes `<div className="space-y-5">`, add:

```tsx
<div className="pt-2 print:hidden">
  <button
    onClick={() => window.print()}
    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-colors"
  >
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.056 48.056 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
    </svg>
    Завантажити / Надрукувати
  </button>
</div>
```

### 3b: Add print styles to globals.css

**File:** `app/globals.css`

Append at the end of the file:

```css
@media print {
  /* Hide everything except the results panel */
  .print\:hidden { display: none !important; }

  /* Show only the results card */
  nav,
  header,
  [class*="Navbar"],
  [class*="CalculatorForm"],
  .lg\:w-\[420px\],
  .fixed {
    display: none !important;
  }

  /* Remove shadows and borders for clean print */
  .shadow-lg,
  .shadow-sm,
  .shadow-2xl {
    box-shadow: none !important;
  }

  /* Ensure full width for results */
  .flex-1 {
    width: 100% !important;
  }

  /* Page margins */
  @page {
    margin: 20mm 15mm;
  }

  body {
    font-size: 12pt;
  }
}
```

---

## Requirements
- Do NOT add any npm packages (no chart libraries, no jsPDF)
- The `PaymentTimeline` component must handle the case where `loanTermYears <= 10` (show only one period block at 100% width)
- The print button must have `print:hidden` class so it doesn't appear in the PDF
- `window.print()` only works client-side — the component already has `'use client'` at the top so it's fine
- Do NOT modify any other files except `CalculatorResults.tsx` and `globals.css`

## Files to change
- `components/calculator/CalculatorResults.tsx` — Changes 1, 2, 3a
- `app/globals.css` — Change 3b
