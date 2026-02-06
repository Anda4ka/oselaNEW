import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const locales = ['uk', 'ru', 'en'] as const;
export type Locale = (typeof locales)[number];

async function loadMessages(locale: string) {
  switch (locale) {
    case 'uk':
      return (await import('./locales/uk.json')).default;
    case 'ru':
      return (await import('./locales/ru.json')).default;
    case 'en':
      return (await import('./locales/en.json')).default;
    default:
      throw new Error(`Unsupported locale: ${locale}`);
  }
}

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locale)) notFound();

  const messages = await loadMessages(locale);

  return {
    messages,
  };
});
