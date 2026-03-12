import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        // Allow all paths under this hostname
        pathname: '/**', 
      },
    ],
  },
};

export default nextConfig;