# Task: Homepage UI improvements — SVG icons, interactive categories, hero, footer

## Context
Project: єОселя mortgage calculator (Next.js 14, Tailwind CSS).
File to change: `app/[locale]/page.tsx` only.
No other files should be changed.

Current problems to fix:
1. Emoji icons (💰🏠📋⚡) in features section — replace with inline SVG
2. Category cards are static — add expandable details on click
3. Hero section looks thin — make it taller and fix button hierarchy
4. Footer is one line — expand it
5. 3% vs 7% rate categories look nearly identical — add visual grouping

## What to do

### Fix 1: Hero section
- Change `py-20` → `py-28 md:py-36`
- The "Розрахувати іпотеку" button is the PRIMARY action — give it solid filled white bg (already has it ✓). Make it slightly larger: `px-10 py-5 text-xl`
- The "Дізнатися більше" button is SECONDARY — make it visually lighter: `border-white/60 text-white/90 hover:border-white hover:text-white`
- Add a subtle decorative element below the hero buttons: a small row of 3 stat badges (inline, centered):
  ```
  [🏦 20+ банків] [💵 до 5 млн грн] [📅 до 20 років]
  ```
  Style: `mt-8 flex flex-wrap justify-center gap-3` with each badge as `bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/90`

### Fix 2: Category cards — visual grouping and expandable details
Replace the current flat grid with TWO grouped sections: "3% річних" and "7% річних".

Structure:
```jsx
// Group 1: Пільгова ставка (3%)
<div className="mb-10">
  <div className="flex items-center gap-3 mb-6">
    <span className="text-2xl font-bold text-emerald-600">3%</span>
    <span className="text-gray-500 text-sm">річних • перші 10 років</span>
    <span className="ml-auto text-xs text-gray-400">6% після 10 років</span>
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {/* military, security, medic, teacher, scientist */}
  </div>
</div>

// Group 2: Стандартна ставка (7%)
<div>
  <div className="flex items-center gap-3 mb-6">
    <span className="text-2xl font-bold text-blue-600">7%</span>
    <span className="text-gray-500 text-sm">річних • перші 10 років</span>
    <span className="ml-auto text-xs text-gray-400">10% після 10 років</span>
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {/* idp, veteran, regular */}
  </div>
</div>
```

Each category card — make it interactive with `useState` for expanded state:
```jsx
// Add to component: const [expandedCard, setExpandedCard] = useState<string | null>(null)

<div
  key={cat.key}
  className={`bg-white rounded-xl border-2 cursor-pointer transition-all duration-200 p-5
    ${expandedCard === cat.key
      ? 'border-primary-400 shadow-md'
      : 'border-gray-100 shadow-sm hover:border-primary-200 hover:shadow-md'
    }`}
  onClick={() => setExpandedCard(expandedCard === cat.key ? null : cat.key)}
>
  <div className="flex items-start justify-between">
    <div>
      <div className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold mb-2
        ${cat.rate === '3%' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
        {cat.rate}
      </div>
      <h3 className="text-sm font-semibold text-gray-800">{t(`categories.${cat.key}`)}</h3>
    </div>
    <svg className={`w-4 h-4 text-gray-400 mt-1 flex-shrink-0 transition-transform ${expandedCard === cat.key ? 'rotate-180' : ''}`}
      fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </div>

  {expandedCard === cat.key && (
    <div className="mt-3 pt-3 border-t border-gray-100 space-y-1 text-xs text-gray-600">
      {cat.details.map((d, i) => (
        <div key={i} className="flex items-start gap-1.5">
          <span className="text-primary-500 mt-0.5">•</span>
          <span>{d}</span>
        </div>
      ))}
    </div>
  )}
</div>
```

Add `details` array to each category (use translation keys t()):
```typescript
const categories = [
  { key: 'military',  rate: '3%', details: [t('categories.details.downPayment20'), t('categories.details.newBuilding3'), t('categories.details.newBuilding20frontline'), t('categories.details.loan200to5m')] },
  { key: 'security',  rate: '3%', details: [t('categories.details.downPayment20'), t('categories.details.newBuilding3'), t('categories.details.newBuilding20frontline'), t('categories.details.loan200to5m')] },
  { key: 'medic',     rate: '3%', details: [t('categories.details.downPayment20'), t('categories.details.newBuilding3'), t('categories.details.newBuilding20frontline'), t('categories.details.loan200to5m')] },
  { key: 'teacher',   rate: '3%', details: [t('categories.details.downPayment20'), t('categories.details.newBuilding3'), t('categories.details.newBuilding20frontline'), t('categories.details.loan200to5m')] },
  { key: 'scientist', rate: '3%', details: [t('categories.details.downPayment20'), t('categories.details.newBuilding3'), t('categories.details.newBuilding20frontline'), t('categories.details.loan200to5m')] },
  { key: 'idp',       rate: '7%', details: [t('categories.details.downPayment20'), t('categories.details.idpBuilding20'), t('categories.details.loan200to5m')] },
  { key: 'veteran',   rate: '7%', details: [t('categories.details.downPayment20'), t('categories.details.newBuilding3'), t('categories.details.newBuilding20frontline'), t('categories.details.loan200to5m')] },
  { key: 'regular',   rate: '7%', details: [t('categories.details.downPayment20'), t('categories.details.newBuilding3'), t('categories.details.loan200to5m')] },
]
```

Add the translation keys to all THREE locale files (`locales/uk.json`, `locales/en.json`, `locales/ru.json`):

**uk.json** — inside `"categories"`:
```json
"details": {
  "downPayment20": "Перший внесок від 20% (10% до 26 років)",
  "newBuilding3": "Будинок до 3 років",
  "newBuilding20frontline": "До 20 років у прифронтових регіонах",
  "idpBuilding20": "Будинок до 20 років (усі регіони)",
  "loan200to5m": "Кредит від 200 тис. до 5 млн грн"
}
```

**en.json** — inside `"categories"`:
```json
"details": {
  "downPayment20": "Down payment from 20% (10% under 26)",
  "newBuilding3": "Building up to 3 years old",
  "newBuilding20frontline": "Up to 20 years in frontline regions",
  "idpBuilding20": "Building up to 20 years old (all regions)",
  "loan200to5m": "Loan from 200K to 5M UAH"
}
```

**ru.json** — inside `"categories"`:
```json
"details": {
  "downPayment20": "Первый взнос от 20% (10% до 26 лет)",
  "newBuilding3": "Дом до 3 лет",
  "newBuilding20frontline": "До 20 лет в прифронтовых регионах",
  "idpBuilding20": "Дом до 20 лет (все регионы)",
  "loan200to5m": "Кредит от 200 тыс. до 5 млн грн"
}
```

### Fix 3: Features section — replace emoji with inline SVG

Replace the `features` array. Change `icon` field from emoji string to a JSX SVG component.
Use `React.ReactNode` type for icon. The 4 icons to use (Tailwind `w-10 h-10 text-primary-600`):

Feature 1 (💰 → банк/гроші):
```jsx
<svg className="w-10 h-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
</svg>
```

Feature 2 (🏠 → дім):
```jsx
<svg className="w-10 h-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>
```

Feature 3 (📋 → документ):
```jsx
<svg className="w-10 h-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
</svg>
```

Feature 4 (⚡ → блискавка/швидко):
```jsx
<svg className="w-10 h-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
</svg>
```

Change features array type: `icon` is now `React.ReactNode`.
Change rendering from `<div className="text-5xl mb-4">{feature.icon}</div>` to:
`<div className="flex justify-center mb-4">{feature.icon}</div>`

Add a background circle around the icon:
```jsx
<div className="flex justify-center mb-5">
  <div className="w-20 h-20 rounded-2xl bg-primary-50 flex items-center justify-center">
    {feature.icon}
  </div>
</div>
```

### Fix 4: Footer — expand it

Replace the current `<footer>` with:
```jsx
<footer className="bg-gray-900 text-white">
  <div className="container mx-auto px-4 py-12">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
      {/* Column 1: Brand */}
      <div>
        <div className="text-2xl font-bold text-white mb-3">єОселя</div>
        <p className="text-gray-400 text-sm leading-relaxed">
          {t('footer.description')}
        </p>
      </div>
      {/* Column 2: Links */}
      <div>
        <h4 className="font-semibold text-white mb-3">{t('footer.usefulLinks')}</h4>
        <ul className="space-y-2 text-sm text-gray-400">
          <li><a href="https://eoselia.diia.gov.ua" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">{t('footer.official')}</a></li>
          <li><a href="https://ukrfinzhytlo.in.ua/e-oselia/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">{t('footer.ukrfinzhytlo')}</a></li>
          <li><a href="https://zakon.rada.gov.ua/laws/show/856-2022-%D0%BF" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">{t('footer.resolution856')}</a></li>
        </ul>
      </div>
      {/* Column 3: Banks */}
      <div>
        <h4 className="font-semibold text-white mb-3">{t('footer.bankPartners')}</h4>
        <ul className="space-y-1 text-sm text-gray-400 columns-2">
          {['Ощадбанк', 'ПриватБанк', 'Укргазбанк', 'Sense Bank', 'Sky Bank', 'Глобус Банк'].map(b => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>
    </div>
    <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
      <p>{t('footer.rights')}</p>
      <p className="mt-1">{t('footer.disclaimer')}</p>
    </div>
  </div>
</footer>
```

Add to all 3 locale files, inside `"footer"`:

**uk.json:**
```json
"description": "Неофіційний калькулятор програми державного іпотечного кредитування єОселя. Дані актуальні станом на лютий 2026 року.",
"usefulLinks": "Корисні посилання",
"ukrfinzhytlo": "Укрфінжитло (оператор програми)",
"resolution856": "Постанова КМУ №856",
"bankPartners": "Банки-партнери",
"disclaimer": "Це неофіційний калькулятор. Для оформлення кредиту звертайтесь до банків-партнерів програми."
```

**en.json:**
```json
"description": "Unofficial calculator for the єОселя state mortgage program. Data current as of February 2026.",
"usefulLinks": "Useful links",
"ukrfinzhytlo": "Ukrfinzhytlo (program operator)",
"resolution856": "CMU Resolution No. 856",
"bankPartners": "Partner banks",
"disclaimer": "This is an unofficial calculator. To apply for a loan, contact the program's partner banks."
```

**ru.json:**
```json
"description": "Неофициальный калькулятор программы государственного ипотечного кредитования єОселя. Данные актуальны на февраль 2026 года.",
"usefulLinks": "Полезные ссылки",
"ukrfinzhytlo": "Укрфінжитло (оператор программы)",
"resolution856": "Постановление КМУ №856",
"bankPartners": "Банки-партнёры",
"disclaimer": "Это неофициальный калькулятор. Для оформления кредита обращайтесь в банки-партнёры программы."
```

## Files to change
- `app/[locale]/page.tsx` — main changes
- `locales/uk.json` — add new translation keys
- `locales/en.json` — add new translation keys
- `locales/ru.json` — add new translation keys

## Files NOT to change
- All components in `components/`
- All API routes
- `lib/` files
- `tailwind.config.ts`

## Requirements
- NO emoji anywhere in the JSX — only SVG or text
- Category cards must be interactive (click to expand/collapse details)
- The two rate groups (3% and 7%) must be visually separated with group headers
- Footer must have 3 columns on desktop, stack on mobile
- All new translation keys must exist in all 3 locale files
- `'use client'` is already at top of page.tsx — keep it (needed for useState)
