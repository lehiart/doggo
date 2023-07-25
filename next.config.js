/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "cloudflare-ipfs.com",
      "avatars.githubusercontent.com",
      "loremflickr.com",
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
