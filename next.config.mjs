import nextMDX from "@next/mdx"
import { rehypePlugins } from "./mdx/rehype.mjs"

const withMDX = nextMDX({
  options: {
    rehypePlugins,
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "mdx"],
  experimental: {
    scrollRestoration: true,
  },
}

export default withMDX(nextConfig)
