const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};
module.exports = nextConfig;
