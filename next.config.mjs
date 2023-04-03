import { withContentlayer } from "next-contentlayer"
import { withPlausibleProxy } from "next-plausible"

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    mdxRs: true,
  },
}

export default withPlausibleProxy()(withContentlayer(nextConfig))
