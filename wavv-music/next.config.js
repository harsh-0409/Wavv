/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.ytimg.com', 'img.youtube.com'], // Add any other image domains you need
  },
  // Enable React strict mode for better development experience
  reactStrictMode: true,
}

module.exports = nextConfig 