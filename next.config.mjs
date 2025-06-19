// next.config.js
import withMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    mdxRs: false, // MDX-RS 비활성화로 안정성 향상
  },
}

export default withMDX({
  extension: /\.mdx?$/,
})(nextConfig)
