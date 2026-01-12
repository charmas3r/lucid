import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow Sanity Studio to load properly
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  
  // Suppress hydration warnings for Sanity Studio
  reactStrictMode: true,
  
  // Allow Studio route to work without layout conflicts
  experimental: {
    // Needed for Sanity Studio
  },
};

export default nextConfig;
