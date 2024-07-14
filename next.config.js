/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // transpilePackages: [
  // '@metaplex-foundation/js']
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push('pino-pretty', 'encoding');
    return config;
  },
};

module.exports = nextConfig;
