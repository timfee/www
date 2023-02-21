import { withPlausibleProxy } from 'next-plausible'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },

  experimental: {
    appDir: true,
    swcMinify: true,
    serverComponentsExternalPackages: ['pdfkit', 'markdown-it'],
  },
}

export default withPlausibleProxy()(nextConfig)
