const { getRequestConfig } = require('next-intl/server');
const { notFound } = require('next/navigation');

const locales = ['uk', 'ru', 'en'];

async function loadMessages(locale) {
  switch (locale) {
    case 'uk':
      return require('./locales/uk.json');
    case 'ru':
      return require('./locales/ru.json');
    case 'en':
      return require('./locales/en.json');
    default:
      throw new Error(`Unsupported locale: ${locale}`);
  }
}

module.exports = getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale)) notFound();

  const messages = await loadMessages(locale);

  return {
    messages,
  };
});
