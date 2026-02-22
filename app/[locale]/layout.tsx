import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import '../globals.css';

const locales = ['uk', 'ru', 'en'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const titles: Record<string, string> = {
    uk: 'єОселя — Калькулятор іпотеки',
    en: 'єОселя — Mortgage Calculator',
    ru: 'єОселя — Калькулятор ипотеки',
  };
  const descriptions: Record<string, string> = {
    uk: 'Неофіційний калькулятор державної іпотечної програми єОселя. Розрахуйте щомісячний платіж за 2 хвилини.',
    en: 'Unofficial calculator for the єОселя state mortgage program. Calculate monthly payment in 2 minutes.',
    ru: 'Неофициальный калькулятор государственной ипотечной программы єОселя. Рассчитайте ежемесячный платёж за 2 минуты.',
  };
  const locale = params.locale || 'uk';

  return {
    title: {
      default: titles[locale] || titles.uk,
      template: '%s | єОселя',
    },
    description: descriptions[locale] || descriptions.uk,
    openGraph: {
      title: titles[locale] || titles.uk,
      description: descriptions[locale] || descriptions.uk,
      type: 'website',
    },
    icons: {
      icon: '/icon',
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className="antialiased">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen bg-gray-50">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
