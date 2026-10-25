import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    "10.198.173.215:3000",
    "10.198.173.215",
    "10.158.238.215:3000",
    "10.158.238.215",
    "192.168.0.107:3000",
    "192.168.0.104",
    "localhost:3000",
    "localhost",
  ],
  experimental: {
    agentFeedback: true,
  },

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
