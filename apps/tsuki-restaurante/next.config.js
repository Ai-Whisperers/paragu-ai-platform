/** @type {import('next').NextConfig} */
const config = {
  output: "standalone",
  poweredByHeader: false,
  typescript: { ignoreBuildErrors: true },
};
module.exports = config;