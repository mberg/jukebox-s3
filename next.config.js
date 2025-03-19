/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export', // for static site generation for GitHub Pages
}

module.exports = nextConfig