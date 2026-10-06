/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static site: `next build` writes plain HTML/CSS/JS to ./out
  output: 'export',
  // /en/ -> out/en/index.html, served by Cloudflare Pages without redirects
  trailingSlash: true,
  // The image optimizer needs a server; covers are SVG and screenshots are pre-sized
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
