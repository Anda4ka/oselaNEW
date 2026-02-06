const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n.config.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ['*.replit.dev', '*.pike.replit.dev', '*.repl.co'],
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
        ],
      },
    ];
  },
}

module.exports = withNextIntl(nextConfig);
