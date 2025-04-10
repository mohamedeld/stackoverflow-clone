import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config) {
    config.module.rules.push({
      test: /\.html$/,
      use: 'ignore-loader',
    });
    return config;
  },
  typescript:{
    ignoreBuildErrors:true
  },
  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:'example.com'
      }
    ]
  }
};

export default nextConfig;
