'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const locales = [
    { code: 'uk', label: 'UA' },
    { code: 'en', label: 'EN' },
    { code: 'ru', label: 'RU' },
  ]

  const switchLocale = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '')
    router.push(`/${newLocale}${pathWithoutLocale}`)
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href={`/${locale}`} className="text-2xl font-bold text-primary-800">
            єОселя
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              href={`/${locale}`}
              className="hidden sm:inline text-gray-700 hover:text-primary-600 transition"
            >
              {t('home')}
            </Link>
            <Link
              href={`/${locale}/calculator`}
              className="hidden sm:inline text-gray-700 hover:text-primary-600 transition"
            >
              {t('calculator')}
            </Link>
            <Link
              href={`/${locale}/admin`}
              className="hidden sm:inline text-gray-700 hover:text-primary-600 transition"
            >
              {t('admin')}
            </Link>
            <div className="flex items-center space-x-1 border-l pl-4 ml-2">
              {locales.map((loc) => (
                <button
                  key={loc.code}
                  onClick={() => switchLocale(loc.code)}
                  className={`px-2 py-1 text-sm rounded ${
                    locale === loc.code
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {loc.label}
                </button>
              ))}
            </div>
            <button
              className="sm:hidden text-gray-700 p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? t('closeMenu') : t('openMenu')}
              aria-expanded={menuOpen}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="sm:hidden mt-4 space-y-2 border-t pt-4">
            <Link href={`/${locale}`} className="block py-2 text-gray-700 hover:text-primary-600" onClick={() => setMenuOpen(false)}>
              {t('home')}
            </Link>
            <Link href={`/${locale}/calculator`} className="block py-2 text-gray-700 hover:text-primary-600" onClick={() => setMenuOpen(false)}>
              {t('calculator')}
            </Link>
            <Link href={`/${locale}/admin`} className="block py-2 text-gray-700 hover:text-primary-600" onClick={() => setMenuOpen(false)}>
              {t('admin')}
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
