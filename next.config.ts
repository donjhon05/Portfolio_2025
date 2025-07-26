import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  eslint: {
    // Ignore ESLint errors during builds (optional - removes the img warnings)
    ignoreDuringBuilds: true,
  },
  // Alternative: If you only want to ignore specific rules
  // You can also create a .eslintrc.json file instead with:
  // {
  //   "extends": "next/core-web-vitals",
  //   "rules": {
  //     "@next/next/no-img-element": "off"
  //   }
  // }
};

export default nextConfig;