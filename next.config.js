/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      "",
      "source.unsplash.com",
      "images.unsplash.com",
      "api-staging.sisva.id",
      "lottie.host",
    ],
  },
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
