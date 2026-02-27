import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/Personal-CV',
  images: { unoptimized: true },
};

export default nextConfig;
