# єОселя Mortgage Calculator

## Overview
A Ukrainian mortgage calculator for the "єОселя" government housing program. Built with Next.js 14, Prisma ORM, and PostgreSQL. Supports internationalization (Ukrainian, English, Russian) via next-intl.

## Recent Changes (Feb 2026)
- **Major UI Overhaul**: Transformed from 4-step wizard to single-page live calculator
- **Live Recalculation**: Debounced (400ms) API calls on every input change, no "Calculate" button
- **Two-Column Layout**: Form on left (accordion sections), sticky result panel on right (desktop)
- **Mobile Bottom Bar**: Fixed bottom bar with key numbers (payment, down payment, status) + expandable drawer
- **Diagnosis Blocks**: Replaced error messages with structured "Cause + Action" blocks
- **Financial Formula**: Down payment shown as formula breakdown instead of flat list
- **Status Indicators**: Three statuses (✅ Eligible, ⚠️ With surcharges, ❌ Not eligible)
- **Better Payment Labels**: Explicit rate and period info in labels (e.g., "first 10 years, rate 3%")
- **"Why This Result"**: Collapsible block showing calculation factors (rate, term, area vs norm)
- **Mobile Scenario Cards**: Comparison scenarios as 2x2 grid of cards on mobile, table on desktop
- **Loan Term Slider**: Range input instead of number field for better UX

## Project Architecture
- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL (via Prisma ORM)
- **Styling**: Tailwind CSS
- **i18n**: next-intl with Ukrainian, English, Russian locales
- **Auth**: Simple admin authentication with bcryptjs

## Key Directories
- `app/` - Next.js App Router pages and API routes
- `app/[locale]/` - Locale-based routing
- `app/api/` - API endpoints (calculator, admin login/logout/settings)
- `components/` - React components (admin panel, calculator form/results)
- `lib/` - Utilities (calculator logic, Prisma client)
- `prisma/` - Database schema and seed data
- `locales/` - Translation files (en.json, uk.json, ru.json)

## Key Components
- `CalculatorForm.tsx` - Single-page accordion form (Category, Family, Property, Loan sections)
- `CalculatorResults.tsx` - Results panel with StatusBadge, DiagnosisBlock, ScenarioCard, financial formula, collapsible details
- `app/[locale]/calculator/page.tsx` - Page orchestrator with debounced API calls, two-column layout, mobile bottom bar

## Configuration
- Port: 5000 (dev and production)
- Host: 0.0.0.0
- Database: PostgreSQL via DATABASE_URL environment variable
- Admin default credentials: admin / admin123

## Calculator Logic
- **Normative area**: 52.5 m² (apartment) / 62.5 m² (house) for 1-2 people, +21 m² per additional person, max 115.5/125.5 m²
- **Area excess**: Up to 10% allowed for buildings ≤3 years old (excess paid from own funds). >10% or buildings >3 years → rejected with detailed explanation
- **Price excess**: Up to 10% above limit price allowed (excess paid from own funds). >10% → rejected
- **Two-period rates**: Period 1 (first 10 years) at 3%/7%, Period 2 (remaining years) at 6%/10%. For terms >10 years, payment1 is calculated using full-term amortization at rate1, then remaining balance is re-amortized at rate2.
- **Down payment**: 20% standard, 10% for age <26
- **Comparison scenarios**: Results include a comparison table showing 4 scenarios: 20%+3%, 20%+7%, 10%+3%, 10%+7% side by side with monthly payments, interest, and totals
- **Error display**: Diagnosis blocks with structured "Cause + What to change" format

## User Preferences
- Ukrainian-first UI with multi-language support
- Mobile-first design approach
- Honest, transparent financial information without hidden surprises
- Live recalculation without manual "Calculate" button
- Accordion sections instead of wizard steps

## Running
- Dev: `npm run dev` (runs on port 5000)
- Build: `npm run build`
- Start: `npm run start` (runs on port 5000)
- Seed DB: `npx prisma db seed`
