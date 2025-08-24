/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Exclude markdown files from triggering reloads in development
      config.watchOptions = {
        ...config.watchOptions,
        ignored: /\.md$/,
      };
    }
    return config;
  },
};

export default nextConfig;
