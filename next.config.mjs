import { withPlausibleProxy } from "next-plausible"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // webpack(config) {
  //   config.module.rules.push({
  //     test: /\.svg$/u,
  //     use: ["@svgr/webpack"],
  //   })

  //   return config
  // },
  // eslint-disable-next-line require-await
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/hire",
      },
      {
        source: "/:params*",
        has: [
          {
            type: "host",
            value: "hire.*",
          },
        ],
        destination: "/hire/?id=:params*",
      },
    ]
  },
  experimental: {
    appDir: true,
    swcMinify: true,
    // serverComponentsExternalPackages: ["pdfkit", "markdown-it"],
  },
}

export default withPlausibleProxy()(nextConfig)
