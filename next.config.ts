import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["image.tmdb.org"], // Autoriser les images depuis TMDb
  },
};

export default nextConfig;
