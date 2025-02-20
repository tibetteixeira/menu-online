import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "u9a6wmr3as.ufs.sh" },
      { hostname: "encrypted-tbn0.gstatic.com" },
      { hostname: "scontent.ffor11-2.fna.fbcdn.net" },
    ],
  },
};

export default nextConfig;
