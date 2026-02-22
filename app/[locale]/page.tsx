'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { useState, type ReactNode } from 'react'
import Navbar from '@/components/Navbar'

export default function HomePage() {
  const t = useTranslations('home')
  const locale = useLocale()
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  const categories = [
    {
      key: 'military',
      rate: '3%',
      details: [
        t('categories.details.downPayment20'),
        t('categories.details.newBuilding3'),
        t('categories.details.newBuilding20frontline'),
        t('categories.details.loan200to5m'),
      ],
    },
    {
      key: 'security',
      rate: '3%',
      details: [
        t('categories.details.downPayment20'),
        t('categories.details.newBuilding3'),
        t('categories.details.newBuilding20frontline'),
        t('categories.details.loan200to5m'),
      ],
    },
    {
      key: 'medic',
      rate: '3%',
      details: [
        t('categories.details.downPayment20'),
        t('categories.details.newBuilding3'),
        t('categories.details.newBuilding20frontline'),
        t('categories.details.loan200to5m'),
      ],
    },
    {
      key: 'teacher',
      rate: '3%',
      details: [
        t('categories.details.downPayment20'),
        t('categories.details.newBuilding3'),
        t('categories.details.newBuilding20frontline'),
        t('categories.details.loan200to5m'),
      ],
    },
    {
      key: 'scientist',
      rate: '3%',
      details: [
        t('categories.details.downPayment20'),
        t('categories.details.newBuilding3'),
        t('categories.details.newBuilding20frontline'),
        t('categories.details.loan200to5m'),
      ],
    },
    {
      key: 'idp',
      rate: '7%',
      details: [
        t('categories.details.downPayment20'),
        t('categories.details.idpBuilding20'),
        t('categories.details.loan200to5m'),
      ],
    },
    {
      key: 'veteran',
      rate: '7%',
      details: [
        t('categories.details.downPayment20'),
        t('categories.details.newBuilding3'),
        t('categories.details.newBuilding20frontline'),
        t('categories.details.loan200to5m'),
      ],
    },
    {
      key: 'regular',
      rate: '7%',
      details: [
        t('categories.details.downPayment20'),
        t('categories.details.newBuilding3'),
        t('categories.details.loan200to5m'),
      ],
    },
  ]

  const features: { key: string; icon: ReactNode }[] = [
    {
      key: 'feature1',
      icon: (
        <svg className="w-10 h-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
        </svg>
      ),
    },
    {
      key: 'feature2',
      icon: (
        <svg className="w-10 h-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      ),
    },
    {
      key: 'feature3',
      icon: (
        <svg className="w-10 h-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
        </svg>
      ),
    },
    {
      key: 'feature4',
      icon: (
        <svg className="w-10 h-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
    },
  ]

  const steps = [
    { key: 'step1', num: '1' },
    { key: 'step2', num: '2' },
    { key: 'step3', num: '3' },
  ]

  const threePercentCategories = categories.filter((cat) => cat.rate === '3%')
  const sevenPercentCategories = categories.filter((cat) => cat.rate === '7%')

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="bg-gradient-to-b from-primary-600 to-primary-800 text-white py-28 md:py-36">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('hero.title')}</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">{t('hero.subtitle')}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {/* Primary CTA — filled solid white on dark hero */}
            <Link
              href={`/${locale}/calculator`}
              className="px-10 py-5 bg-white text-primary-700 rounded-xl font-bold text-xl hover:bg-gray-50 transition shadow-xl ring-2 ring-white/30"
            >
              {t('hero.calculateBtn')}
            </Link>
            {/* Secondary — ghost/outline */}
            <a
              href="https://eoselia.diia.gov.ua"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/10 border-2 border-white/40 text-white/80 rounded-xl font-semibold text-lg hover:bg-white/20 hover:border-white/70 hover:text-white transition"
            >
              {t('hero.learnMore')}
            </a>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/90">20+ банків</div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/90">до 5 млн грн</div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/90">до 20 років</div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">{t('categories.title')}</h2>
          <div className="max-w-6xl mx-auto">
            <div className="mb-10">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="text-2xl font-bold text-emerald-600">3%</span>
                <span className="text-gray-500 text-sm">річних • перші 10 років</span>
                <span className="ml-auto text-xs text-gray-400">6% після 10 років</span>
              </div>
              <div className="flex flex-wrap justify-center gap-4 items-start">
                {threePercentCategories.map((cat) => (
                  <div
                    key={cat.key}
                    className={`w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] bg-white rounded-xl border-2 cursor-pointer transition-all duration-200 p-5 ${expandedCard === cat.key
                        ? 'border-primary-400 shadow-md'
                        : 'border-gray-100 shadow-sm hover:border-primary-200 hover:shadow-md'
                      }`}
                    onClick={() => setExpandedCard(expandedCard === cat.key ? null : cat.key)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold mb-2 bg-emerald-100 text-emerald-700">
                          {cat.rate}
                        </div>
                        <h3 className="text-sm font-semibold text-gray-800">{t(`categories.${cat.key}`)}</h3>
                      </div>
                      <svg
                        className={`w-4 h-4 text-gray-400 mt-1 flex-shrink-0 transition-transform ${expandedCard === cat.key ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
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
                ))}
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="text-2xl font-bold text-blue-600">7%</span>
                <span className="text-gray-500 text-sm">річних • перші 10 років</span>
                <span className="ml-auto text-xs text-gray-400">10% після 10 років</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
                {sevenPercentCategories.map((cat) => (
                  <div
                    key={cat.key}
                    className={`bg-white rounded-xl border-2 cursor-pointer transition-all duration-200 p-5 ${expandedCard === cat.key
                        ? 'border-primary-400 shadow-md'
                        : 'border-gray-100 shadow-sm hover:border-primary-200 hover:shadow-md'
                      }`}
                    onClick={() => setExpandedCard(expandedCard === cat.key ? null : cat.key)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold mb-2 bg-blue-100 text-blue-700">
                          {cat.rate}
                        </div>
                        <h3 className="text-sm font-semibold text-gray-800">{t(`categories.${cat.key}`)}</h3>
                      </div>
                      <svg
                        className={`w-4 h-4 text-gray-400 mt-1 flex-shrink-0 transition-transform ${expandedCard === cat.key ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
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
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">{t('features.title')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-5">
                  <div className="w-20 h-20 rounded-2xl bg-primary-50 flex items-center justify-center">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{t(`features.${feature.key}.title`)}</h3>
                <p className="text-gray-600">{t(`features.${feature.key}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">{t('howItWorks.title')}</h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {steps.map((step, idx) => (
                <div key={step.key} className={`flex items-start space-x-6 ${idx < steps.length - 1 ? 'pb-10' : ''}`}>
                  {/* Circle + vertical connector */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold z-10">
                      {step.num}
                    </div>
                    {idx < steps.length - 1 && (
                      <div className="w-0.5 flex-1 bg-primary-200 mt-2 min-h-[2rem]" />
                    )}
                  </div>
                  {/* Content */}
                  <div className="pt-2">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{t(`howItWorks.${step.key}.title`)}</h3>
                    <p className="text-gray-600">{t(`howItWorks.${step.key}.description`)}</p>
                    {step.key === 'step3' && (
                      <a
                        href="https://eoselia.diia.gov.ua"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white rounded-xl font-semibold text-sm hover:bg-primary-700 transition shadow-md"
                      >
                        Подати заявку в Дії
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </a>
                    )}
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

      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              {/* Distinct footer logo */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 22V12h6v10" />
                  </svg>
                </div>
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-primary-200 bg-clip-text text-transparent">єОселя</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">{t('footer.description')}</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">{t('footer.usefulLinks')}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="https://eoselia.diia.gov.ua" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                    {t('footer.official')}
                  </a>
                </li>
                <li>
                  <a href="https://ukrfinzhytlo.in.ua/e-oselia/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                    {t('footer.ukrfinzhytlo')}
                  </a>
                </li>
                <li>
                  <a href="https://zakon.rada.gov.ua/laws/show/856-2022-%D0%BF" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                    {t('footer.resolution856')}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">{t('footer.bankPartners')}</h4>
              <ul className="space-y-1 text-sm text-gray-400 columns-2">
                {['Ощадбанк', 'ПриватБанк', 'Укргазбанк', 'Sense Bank', 'Sky Bank', 'Глобус Банк'].map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center">
            <p className="text-xs text-gray-500">{t('footer.rights')}</p>
            {/* Disclaimer — legal text, needs to be readable */}
            <p className="mt-2 text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed">{t('footer.disclaimer')}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
