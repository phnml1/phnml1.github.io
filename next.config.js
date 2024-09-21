/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		});
		return config;
	},
	images: {
    loader: 'custom',
    loaderFile: './utils/imageLoader.ts',
  },
}

module.exports = nextConfig;
