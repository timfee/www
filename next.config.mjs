import { withContentlayer } from "next-contentlayer"
import { withPlausibleProxy } from "next-plausible"

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async redirects() {
    return [
      {
        source: "/blueprint",
        destination: "https://timfeeley.com/posts/my-blueprint",
        permanent: true,
      },
      {
        source: "/fb-refresh",
        destination:
          "https://docs.google.com/presentation/d/12DNQ2-z-3-vOGlcL5KHndKCgBgMa_yoC15Pm6eotVYc",
        permanent: true,
      },
    ]
  },
}

export default withPlausibleProxy()(withContentlayer(nextConfig))
