/** @type {import('next').NextConfig} */
const nextConfig = {
	// Silence workspace root inference warning due to multiple lockfiles
	// by explicitly setting the tracing root to this project directory.
	outputFileTracingRoot: process.cwd(),
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
		],
	},
	experimental: {
		serverActions: {
			bodySizeLimit: "2mb",
		},
	},
	turbopack: {},
	reactStrictMode: true,
};

export default nextConfig;
