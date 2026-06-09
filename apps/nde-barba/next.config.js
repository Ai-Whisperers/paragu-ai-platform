/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  // Fix path alias for Next.js 15
  webpack: (config) => {
    config.resolve.alias['@'] = '/src';
    return config;
  },
};

module.exports = nextConfig;