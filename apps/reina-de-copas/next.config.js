/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.minegocio.com.py' },
      { protocol: 'https', hostname: 'drive.google.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'paragu-ai.com' },
      { protocol: 'https', hostname: 'd2me19eryazmrx.cloudfront.net' },
    ],
  },
}

module.exports = nextConfig