# Task: URL sharing — persist calculator state in URL + "Copy link" button

## Context
Project: єОселя mortgage calculator (Next.js 14, App Router, Tailwind CSS, next-intl).
Stack: React 18, TypeScript, `useSearchParams` / `useRouter` from `next/navigation`.

**Goal:** Users can share their mortgage calculation by copying the URL.
When someone opens the link, the form auto-fills from URL search params and the result
appears immediately.

File to change: `app/[locale]/calculator/page.tsx` **only**.

---

## What to implement

### Step 1: Read initial form state from URL params

At the top of the `CalculatorPage` component, read `useSearchParams()` and use it to
initialize the form state.

Add this import at the top:
```ts
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
```

Add inside the component, before the `useState`:
```ts
const searchParams = useSearchParams()
const pathname = usePathname()
const router = useRouter()
```

Change the initial `useState` value from a static object to a function that reads URL params:

```ts
const [input, setInput] = useState<Partial<CalculatorInput>>(() => {
  const category = searchParams.get('category') || 'military'
  const propertyType = searchParams.get('propertyType') || 'apartment'
  const region = searchParams.get('region') || 'Kyiv'
  const settlementType = searchParams.get('settlementType') || 'major'
  const loanTerm = searchParams.get('loanTerm') ? parseInt(searchParams.get('loanTerm')!) : 20
  const age = searchParams.get('age') ? parseInt(searchParams.get('age')!) : undefined
  const familySize = searchParams.get('familySize') ? parseInt(searchParams.get('familySize')!) : undefined
  const area = searchParams.get('area') ? parseFloat(searchParams.get('area')!) : undefined
  const totalCost = searchParams.get('totalCost') ? parseInt(searchParams.get('totalCost')!) : undefined
  const buildingAgeStr = searchParams.get('buildingAge')
  const buildingAge = buildingAgeStr !== null ? parseInt(buildingAgeStr) : undefined
  const cityName = searchParams.get('cityName') || undefined

  return {
    category,
    propertyType: propertyType as 'apartment' | 'house',
    region,
    settlementType: settlementType as 'major' | 'other',
    loanTerm,
    ...(age !== undefined && { age }),
    ...(familySize !== undefined && { familySize }),
    ...(area !== undefined && { area }),
    ...(totalCost !== undefined && { totalCost }),
    ...(buildingAge !== undefined && { buildingAge }),
    ...(cityName && { cityName }),
  }
})
```

### Step 2: Sync URL as form changes

Modify `handleInputChange` to also update the URL (without page reload):

```ts
const handleInputChange = (newInput: Partial<CalculatorInput>) => {
  setInput(newInput)

  // Sync to URL params
  const params = new URLSearchParams()
  if (newInput.category) params.set('category', newInput.category)
  if (newInput.propertyType) params.set('propertyType', newInput.propertyType)
  if (newInput.region) params.set('region', newInput.region)
  if (newInput.settlementType) params.set('settlementType', newInput.settlementType)
  if (newInput.loanTerm) params.set('loanTerm', String(newInput.loanTerm))
  if (newInput.age) params.set('age', String(newInput.age))
  if (newInput.familySize) params.set('familySize', String(newInput.familySize))
  if (newInput.area) params.set('area', String(newInput.area))
  if (newInput.totalCost) params.set('totalCost', String(newInput.totalCost))
  if (newInput.buildingAge !== undefined && newInput.buildingAge !== null) {
    params.set('buildingAge', String(newInput.buildingAge))
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cityName = (newInput as any).cityName
  if (cityName) params.set('cityName', cityName)

  router.replace(`${pathname}?${params.toString()}`, { scroll: false })
}
```

### Step 3: Add "Поділитися" button in the results panel

Add a `copied` state near the top of the component:
```ts
const [copied, setCopied] = useState(false)
```

Add a share handler:
```ts
const handleShare = () => {
  navigator.clipboard.writeText(window.location.href).then(() => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }).catch(() => {
    // Fallback: select the URL manually
    const url = window.location.href
    const input = document.createElement('input')
    input.value = url
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  })
}
```

In the desktop results panel, find this line:
```tsx
{result && !loading && (
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
    <CalculatorResults result={result} loanTermYears={input.loanTerm || 20} />
  </div>
)}
```

Replace with:
```tsx
{result && !loading && (
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
    <CalculatorResults result={result} loanTermYears={input.loanTerm || 20} />
    <div className="mt-4 pt-4 border-t border-gray-100">
      <button
        onClick={handleShare}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors"
      >
        {copied ? (
          <>
            <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-emerald-600 font-medium">Посилання скопійовано!</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
            </svg>
            <span>Поділитися результатом</span>
          </>
        )}
      </button>
    </div>
  </div>
)}
```

Also add the same share button in the **mobile bottom sheet** — find the mobile panel's expanded view:
```tsx
{mobileOpen && (
  <div className="max-h-[70vh] overflow-y-auto px-5 pb-6 border-t border-gray-100">
    <CalculatorResults result={result} loanTermYears={input.loanTerm || 20} />
  </div>
)}
```

Replace with:
```tsx
{mobileOpen && (
  <div className="max-h-[70vh] overflow-y-auto px-5 pb-6 border-t border-gray-100">
    <CalculatorResults result={result} loanTermYears={input.loanTerm || 20} />
    <div className="mt-4 pt-4 border-t border-gray-100">
      <button
        onClick={handleShare}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
      >
        {copied ? (
          <>
            <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-emerald-600 font-medium">Скопійовано!</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
            </svg>
            <span>Поділитися</span>
          </>
        )}
      </button>
    </div>
  </div>
)}
```

---

## Requirements
- Only change `app/[locale]/calculator/page.tsx`
- Keep all existing functionality unchanged (debounce, abort controller, mobile sheet, etc.)
- `useSearchParams` requires the component to be wrapped in `<Suspense>` in Next.js App Router.
  The file already has `'use client'` at the top. If TypeScript complains about `useSearchParams`
  needing Suspense, wrap the default export with a Suspense boundary:

  ```tsx
  // Add this at the bottom of the file, replacing the default export:
  function CalculatorPageInner() {
    // ... move all the current component code here
  }

  export default function CalculatorPage() {
    return (
      <React.Suspense fallback={null}>
        <CalculatorPageInner />
      </React.Suspense>
    )
  }
  ```

  But only do this if actually needed (if Next.js build shows a Suspense error).
  In development mode it often works without the wrapper.

- The share button appears ONLY when `result && !loading` (same condition as the results div)
- The copied state resets to false after 2500ms
- Do NOT change: CalculatorForm, CalculatorResults, lib files, API routes, locale files

## Files to change
- `app/[locale]/calculator/page.tsx` — all changes
