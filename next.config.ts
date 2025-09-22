import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true, 
  compiler: {
    styledComponents: true, 
  },
  images: {
    unoptimized: true, 
  },
};

export default nextConfig;
