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
    ]
  },
}

export default withPlausibleProxy()(withContentlayer(nextConfig))
