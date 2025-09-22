/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/my-portfolio",
  assetPrefix: "/my-portfolio/",
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
