/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  turbopack: {}, // Silence Turbopack warning for Next.js 16
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  // Fix path alias for Next.js 15+
  webpack: (config) => {
    config.resolve.alias['@'] = '/src';
    return config;
  },
};

module.exports = nextConfig;