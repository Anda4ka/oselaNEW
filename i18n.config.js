const { getRequestConfig } = require('next-intl/server');

const locales = ['uk', 'ru', 'en'];

module.exports = getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  if (!locale || !locales.includes(locale)) {
    return {
      locale: 'uk',
      messages: require('./locales/uk.json'),
    };
  }

  let messages;
  switch (locale) {
    case 'uk':
      messages = require('./locales/uk.json');
      break;
    case 'ru':
      messages = require('./locales/ru.json');
      break;
    case 'en':
      messages = require('./locales/en.json');
      break;
    default:
      messages = require('./locales/uk.json');
  }

  return {
    locale,
    messages,
  };
});
