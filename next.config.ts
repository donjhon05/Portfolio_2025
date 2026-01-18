import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // ESLint is now configured via eslint.config.mjs
  // To ignore ESLint during builds, use: next build --no-lint
};

export default nextConfig;