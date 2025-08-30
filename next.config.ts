import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Allow accessing the dev server from your LAN IP shown by Next.js
  experimental: {
    allowedDevOrigins: ["http://10.152.96.199:3000"],
  },
};

export default nextConfig;
