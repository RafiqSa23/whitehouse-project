import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cvohgudyhgtpwcaduupb.supabase.co", "supabase.co"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  serverExternalPackages: ["@supabase/supabase-js"],
};

export default nextConfig;
