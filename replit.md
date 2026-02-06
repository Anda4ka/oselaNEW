# єОселя Mortgage Calculator

## Overview
A Ukrainian mortgage calculator for the "єОселя" government housing program. Built with Next.js 14, Prisma ORM, and PostgreSQL. Supports internationalization (Ukrainian, English, Russian) via next-intl.

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

## Configuration
- Port: 5000 (dev and production)
- Host: 0.0.0.0
- Database: PostgreSQL via DATABASE_URL environment variable
- Admin default credentials: admin / admin123

## Calculator Logic
- **Normative area**: 52.5 m² (apartment) / 62.5 m² (house) for 1-2 people, +21 m² per additional person, max 115.5/125.5 m²
- **Area excess**: Up to 10% allowed for buildings ≤3 years old (excess paid from own funds). >10% or buildings >3 years → rejected with detailed explanation
- **Price excess**: Up to 10% above limit price allowed (excess paid from own funds). >10% → rejected
- **Two-period rates**: Period 1 (first 10 years) at 3%/7%, Period 2 (remaining years) at 6%/10%
- **Down payment**: 20% standard, 10% for age <26
- **Error display**: Rejection reasons show detailed breakdown with normative vs actual values, percentages, and actionable suggestions

## Running
- Dev: `npm run dev` (runs on port 5000)
- Build: `npm run build`
- Start: `npm run start` (runs on port 5000)
- Seed DB: `npx prisma db seed`
