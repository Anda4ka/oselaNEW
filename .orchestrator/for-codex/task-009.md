# Task: Animations + Recommended Income

## Context
Project: єОселя mortgage calculator (Next.js 14, Tailwind CSS).
This task adds micro-animations to make the calculator feel "live", and a recommended
income hint so users immediately know if they can afford the mortgage.

Files to change:
1. `app/globals.css`
2. `tailwind.config.ts`
3. `components/calculator/CalculatorResults.tsx`

---

## Fix 1: Add keyframe animations to globals.css

**File:** `app/globals.css`

Append these keyframes AFTER the existing `@tailwind utilities;` line:

```css
@keyframes num-pop {
  0%   { opacity: 0.3; transform: translateY(-7px) scale(0.97); }
  65%  { opacity: 1;   transform: translateY(1px)  scale(1.00); }
  100% { opacity: 1;   transform: translateY(0)    scale(1);    }
}

@keyframes fade-slide-in {
  0%   { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0);    }
}
```

---

## Fix 2: Register animation utilities in tailwind.config.ts

**File:** `tailwind.config.ts`

In `theme.extend`, add `keyframes` and `animation` alongside the existing `colors`:

```ts
theme: {
  extend: {
    colors: {
      primary: { /* existing — do NOT touch */ },
    },
    keyframes: {
      'num-pop': {
        '0%':   { opacity: '0.3', transform: 'translateY(-7px) scale(0.97)' },
        '65%':  { opacity: '1',   transform: 'translateY(1px)  scale(1)'    },
        '100%': { opacity: '1',   transform: 'translateY(0)    scale(1)'    },
      },
      'fade-slide-in': {
        '0%':   { opacity: '0', transform: 'translateY(10px)' },
        '100%': { opacity: '1', transform: 'translateY(0)'    },
      },
    },
    animation: {
      'num-pop':       'num-pop 0.25s ease-out',
      'fade-slide-in': 'fade-slide-in 0.3s ease-out',
    },
  },
},
```

---

## Fix 3: Apply animations in CalculatorResults.tsx

**File:** `components/calculator/CalculatorResults.tsx`

### 3a. Fade-in the entire results panel on each new result

Find the main success return's outermost div (line ~182):
```tsx
return (
  <div className="space-y-5">
```

Replace with (add `key` + animation class):
```tsx
return (
  <div key={`res-${result.monthlyPayment1}-${result.loanAmount}`} className="space-y-5 animate-fade-slide-in">
```

The `key` forces React to remount (and re-animate) each time the result changes.

### 3b. Animate the monthly payment numbers

Find the main payment display block (around line 194):
```tsx
<div className="text-3xl font-bold text-primary-800" style={{ fontVariantNumeric: 'tabular-nums' }}>
  {formatCurrency(result.monthlyPayment1)}
</div>
```

Replace with:
```tsx
<div
  key={result.monthlyPayment1}
  className="text-3xl font-bold text-primary-800 animate-num-pop"
  style={{ fontVariantNumeric: 'tabular-nums' }}
>
  {formatCurrency(result.monthlyPayment1)}
</div>
```

Also animate the second period payment (around line 202):
```tsx
<div className="text-2xl font-bold text-primary-700" style={{ fontVariantNumeric: 'tabular-nums' }}>
  {formatCurrency(result.monthlyPayment2)}
</div>
```

Replace with:
```tsx
<div
  key={result.monthlyPayment2}
  className="text-2xl font-bold text-primary-700 animate-num-pop"
  style={{ fontVariantNumeric: 'tabular-nums' }}
>
  {formatCurrency(result.monthlyPayment2)}
</div>
```

### 3c. Add "Recommended income" hint

Find the payment display block — the `<div className="bg-primary-50 rounded-xl p-5 space-y-1">`.
Inside it, AFTER the closing of `{hasSecondPeriod && (...)}` block and BEFORE the closing `</div>`
of the bg-primary-50 container, add:

```tsx
<div className="mt-3 pt-3 border-t border-primary-100 flex items-center justify-between">
  <span className="text-xs text-gray-500">Рекомендований дохід</span>
  <span className="text-xs font-semibold text-gray-700">
    ≥ {formatCurrency(Math.ceil(result.monthlyPayment1 / 0.4 / 1000) * 1000)}/міс
  </span>
</div>
```

The formula: `monthlyPayment1 / 0.4`, rounded up to nearest 1000 ₴.
This represents the 40% debt-to-income ratio rule (платіж не більше 40% доходу).

---

## Requirements
- Do NOT add any npm packages
- The `key` prop on the divs is intentional — it triggers re-mounting (re-animation) on value change
- The recommended income must be shown only inside the success path (it's already inside the block that renders only when `result.success` is truthy)
- Do NOT touch the fail/error path rendering

## Files to change
- `app/globals.css` — Fix 1
- `tailwind.config.ts` — Fix 2
- `components/calculator/CalculatorResults.tsx` — Fix 3 (a, b, c)
