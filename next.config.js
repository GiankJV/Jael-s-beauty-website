/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enforce React Strict Mode during development
  reactStrictMode: true,
  // Opt‑in to more efficient WebP/AVIF images
  images: {
    formats: ['image/avif', 'image/webp'],
    // Add remote patterns here if you load images from Instagram/Facebook
    domains: []
  }
};

module.exports = nextConfig;