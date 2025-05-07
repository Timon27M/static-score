import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
 // swcMinify: true,
  experimental: {
//     appDir: true,
  },
  env: {
    NEXT_PUBLIC_AUTHAPI_URL: 'http://localhost:4000/',  
  }
};

export default nextConfig;
