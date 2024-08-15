/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

module.exports = nextConfig;
