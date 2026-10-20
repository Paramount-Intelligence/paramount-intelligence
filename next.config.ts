import type { NextConfig } from "next";
import { RENAMED_CASE_STUDY_SLUGS } from "./lib/removed-case-studies";

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
  // Case study slugs renamed when client names came off the site (20 Oct 2026). permanent: true answers 308.
  async redirects() {
    return RENAMED_CASE_STUDY_SLUGS.map(([from, to]) => ({ source: `/case-studies/${from}`, destination: `/case-studies/${to}`, permanent: true }));
  },
};

export default nextConfig;