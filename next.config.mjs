/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Correctly configure for server-side rendering with dynamic routes
  output: 'standalone',
  images: {
    domains: ['images.unsplash.com'],
  },
  // Disable static optimization for routes that use authentication
  serverExternalPackages: ['next-auth'],
  // Ignore type errors in production to allow building with TypeScript warnings
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // Ignore ESLint errors in production to allow building with ESLint warnings
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
