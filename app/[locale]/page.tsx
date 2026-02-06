'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const t = useTranslations('home')
  const locale = useLocale()
  const router = useRouter()

  const categories = [
    { key: 'military', rate: '3%', color: 'bg-blue-500' },
    { key: 'security', rate: '3%', color: 'bg-blue-500' },
    { key: 'medic', rate: '3%', color: 'bg-green-500' },
    { key: 'teacher', rate: '3%', color: 'bg-yellow-500' },
    { key: 'scientist', rate: '3%', color: 'bg-purple-500' },
    { key: 'idp', rate: '7%', color: 'bg-orange-500' },
    { key: 'veteran', rate: '7%', color: 'bg-red-500' },
    { key: 'regular', rate: '7%', color: 'bg-gray-500' },
  ]

  const features = [
    { key: 'feature1', icon: '💰' },
    { key: 'feature2', icon: '🏠' },
    { key: 'feature3', icon: '📋' },
    { key: 'feature4', icon: '⚡' },
  ]

  const steps = [
    { key: 'step1', num: '1' },
    { key: 'step2', num: '2' },
    { key: 'step3', num: '3' },
  ]

  const locales = [
    { code: 'uk', label: 'UA' },
    { code: 'en', label: 'EN' },
    { code: 'ru', label: 'RU' },
  ]

  const switchLocale = (newLocale: string) => {
    const currentPath = window.location.pathname
    const pathWithoutLocale = currentPath.replace(/^\/(uk|en|ru)/, '')
    router.push(`/${newLocale}${pathWithoutLocale || ''}`)
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary-800">єОселя</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href={`/${locale}/calculator`} 
                className="hidden sm:inline text-gray-700 hover:text-primary-600 transition"
              >
                {t('nav.calculator')}
              </Link>
              <Link 
                href={`/${locale}/admin`} 
                className="hidden sm:inline text-gray-700 hover:text-primary-600 transition"
              >
                {t('nav.admin')}
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
              <Link 
                href={`/${locale}/calculator`} 
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition"
              >
                {t('calculateNow')}
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <section className="bg-gradient-to-b from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('hero.title')}</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href={`/${locale}/calculator`} 
              className="px-8 py-4 bg-white text-primary-700 rounded-lg font-semibold text-lg hover:bg-gray-100 transition shadow-lg"
            >
              {t('hero.calculateBtn')}
            </Link>
            <a 
              href="https://eoselia.diia.gov.ua" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-700 transition"
            >
              {t('hero.learnMore')}
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            {t('categories.title')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <div key={cat.key} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition">
                <div className={`inline-block px-3 py-1 ${cat.color} text-white rounded-full text-sm font-semibold mb-3`}>
                  {cat.rate}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {t(`categories.${cat.key}`)}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            {t('features.title')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {t(`features.${feature.key}.title`)}
                </h3>
                <p className="text-gray-600">
                  {t(`features.${feature.key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            {t('howItWorks.title')}
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {steps.map((step) => (
                <div key={step.key} className="flex items-start space-x-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {t(`howItWorks.${step.key}.title`)}
                    </h3>
                    <p className="text-gray-600">
                      {t(`howItWorks.${step.key}.description`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">{t('cta.title')}</h2>
          <p className="text-xl mb-8 opacity-90">{t('cta.subtitle')}</p>
          <Link 
            href={`/${locale}/calculator`} 
            className="inline-block px-8 py-4 bg-white text-primary-700 rounded-lg font-semibold text-lg hover:bg-gray-100 transition shadow-lg"
          >
            {t('cta.btn')}
          </Link>
        </div>
      </section>

       <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">{t('footer.rights')}</p>
          <a 
            href="https://eoselia.diia.gov.ua" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition"
          >
            {t('footer.official')}
          </a>
        </div>
      </footer>
    </div>
  )
}
