import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  reactStrictMode: true,
  assetPrefix: "/chess",
  basePath: "/chess",
  images: {
    unoptimized: true,
  }
};

export default nextConfig;
