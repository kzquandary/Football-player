/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["upload.wikimedia.org"],
  },
  distDir: 'build',
};

module.exports = nextConfig;
