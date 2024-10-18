/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.NODE_ENV === 'production' ? '/a-z' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/a-z/' : '',
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig
