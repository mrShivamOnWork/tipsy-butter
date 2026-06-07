import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1440, 1920],
    imageSizes: [28, 64, 96, 128, 256, 384],
    qualities: [75, 85, 90],
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
