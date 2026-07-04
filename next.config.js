/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  ...(isProd && { output: 'export' }),
  reactStrictMode: true,
  images: isProd
    ? {
        unoptimized: true,
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'github.com',
            pathname: '/user-attachments/assets/**',
          },
        ],
      }
    : {
        unoptimized: true,
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'github.com',
            pathname: '/user-attachments/assets/**',
          },
        ],
      },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
};

module.exports = nextConfig;
