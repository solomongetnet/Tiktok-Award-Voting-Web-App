/** @type {import('next').NextConfig} */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { domains: ["pagedone.io", "www.tiktokcreativeawards.com"] },
};

export default nextConfig;
