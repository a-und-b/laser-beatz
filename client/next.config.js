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
  }
}

module.exports = nextConfig
