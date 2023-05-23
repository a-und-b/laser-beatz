/** @type {import('next').NextConfig} */


const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['rna-cms.fra1.digitaloceanspaces.com'],
  },
  i18n: {
    locales: ['de'], defaultLocale: 'de',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    API_URL: process.env.API_URL,
    TOKEN: process.env.TOKEN,
  },
  output: 'standalone',
}

module.exports = nextConfig
