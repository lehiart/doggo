/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'cloudflare-ipfs.com',
      'avatars.githubusercontent.com',
      'loremflickr.com',
      'unsplash.com',
      'source.unsplash.com',
      'www-doggo.s3.us-east-005.backblazeb2.com',
      'www-doggo-pack-pictures.s3.us-east-005.backblazeb2.com',
      'www-doggo-profile-pictures.s3.us-east-005.backblazeb2.com',
      'www-doggo-company-pictures.s3.us-east-005.backblazeb2.com',
      'platform-lookaside.fbsbx.com',
      's3.us-east-005.backblazeb2.com',
    ],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
