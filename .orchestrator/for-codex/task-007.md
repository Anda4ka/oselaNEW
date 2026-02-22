# Task: Bug fixes and styling polish

## Context
Project: єОселя mortgage calculator (Next.js 14, Tailwind CSS, next-intl).
This task fixes 4 issues found during code review after UX critique.

Files to change:
1. `components/calculator/CalculatorResults.tsx`
2. `components/calculator/CalculatorForm.tsx`
3. `app/[locale]/calculator/page.tsx`

---

## Fix 1: m² renders as literal `m\u00B2` in JSX text nodes

**File:** `components/calculator/CalculatorResults.tsx`

**Problem:** In JSX, `\u00B2` inside a text node (not inside `{}`) is NOT processed as a
JavaScript unicode escape — it renders literally as the characters `\u00B2`.

**Fix:** Replace every occurrence of `m\u00B2` in JSX text nodes with the actual Unicode
character `m²` (copy-paste the superscript character directly).

Find and replace ALL occurrences in this file (there are 5):
- `m\u00B2` → `m²`

Specific locations:
- In the `normativeArea` row: `{result.normativeArea.toFixed(1)} m\u00B2`  → `{result.normativeArea.toFixed(1)} m²`
- In the `actualArea` row: `{result.actualArea.toFixed(1)} m\u00B2` → `{result.actualArea.toFixed(1)} m²`
- In the excess area row: `+{result.excessArea.toFixed(1)} m\u00B2 ({...}%)` → `+{result.excessArea.toFixed(1)} m² ({...}%)`
- In the limitPrice row: `{formatCurrency(result.limitPrice)}/m\u00B2` → `{formatCurrency(result.limitPrice)}/m²`
- In the actualPrice row: `{formatCurrency(result.actualPricePerSqM)}/m\u00B2` → `{formatCurrency(result.actualPricePerSqM)}/m²`

**Do NOT change** anything else in this file — only the 5 `m\u00B2` → `m²` replacements.

---

## Fix 2: Remove spinner arrows from buildingAge input

**File:** `components/calculator/CalculatorForm.tsx`

**Problem:** The `totalCost` field uses `type="text"` (no spinners). The `buildingAge` field
uses `type="number"` and shows browser spinner arrows. The critique says this is inconsistent.

**Fix:** Add CSS classes to hide the spinner on the `buildingAge` input only.

Find this input (around the "Вік будинку" section):
```tsx
<input type="number" min="0" max="20" value={input.buildingAge ?? ''} onChange={(e) => update({ buildingAge: e.target.value === '' ? undefined : parseInt(e.target.value) })} className={inputClass} />
```

Replace `className={inputClass}` with:
```tsx
className={`${inputClass} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
```

Keep everything else in this input unchanged (`type`, `min`, `max`, `value`, `onChange`).

**Do NOT change** any other inputs in this file.

---

## Fix 3: Age hint — make it look informational, not like a link

**File:** `components/calculator/CalculatorForm.tsx`

**Problem:** The age hint paragraph under the "Вік" input is styled with
`text-sm text-primary-700 font-medium bg-primary-50` which looks like a clickable link.
It's just an informational hint.

Find this paragraph (in the "family" AccordionSection, after the age input):
```tsx
<p className="mt-1.5 text-sm text-primary-700 font-medium bg-primary-50 rounded-lg px-2 py-1.5 leading-snug">
  {t('family.ageHint')}
</p>
```

Replace with:
```tsx
<p className="mt-1.5 text-xs text-amber-700 bg-amber-50 rounded-lg px-2 py-1.5 leading-snug">
  {t('family.ageHint')}
</p>
```

Changes: `text-sm` → `text-xs`, `text-primary-700` → `text-amber-700`,
`font-medium` removed, `bg-primary-50` → `bg-amber-50`.
This makes it look like a subtle info/tip box, not a link.

---

## Fix 4: Sticky results panel — add max-height + internal scroll

**File:** `app/[locale]/calculator/page.tsx`

**Problem:** The sticky results panel has `sticky top-6` but when the results include the
comparison table (tall content), it overflows below the viewport bottom and users can't see it.

Find the sticky container in the desktop results section:
```tsx
<div className="sticky top-6">
```

Replace with:
```tsx
<div className="sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto">
```

This keeps the panel anchored at the top but allows internal scrolling if content is taller
than the visible area. The `3rem` accounts for `top-6` (1.5rem) × 2 for top+bottom spacing.

**Do NOT change** anything else in this file.

---

## Requirements
- Fix all 4 issues exactly as specified
- No functional changes — only visual/layout fixes
- Do NOT modify: lib files, API routes, locale files, any other components
- The `²` character in Fix 1 must be the actual Unicode superscript-two character (U+00B2),
  NOT a HTML entity (`&sup2;`) and NOT a JSX expression (`{'\u00B2'}`) — just paste it directly

## Files to change
- `components/calculator/CalculatorResults.tsx` — Fix 1 only
- `components/calculator/CalculatorForm.tsx` — Fix 2 + Fix 3
- `app/[locale]/calculator/page.tsx` — Fix 4 only
