import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Keep Turbopack scoped to this app. A second lockfile in the user folder
  // otherwise makes Next watch a protected parent directory on Windows.
  turbopack: {
    root: process.cwd(),
  },
  images: {
    // Next.js 16 requires explicit whitelist of quality values used via the
    // `quality` prop. We use 20 (preload thumbs), 60 (small thumbnails),
    // 78 (main menu images) and keep 75 (default).
    qualities: [20, 60, 75, 78],
  },
};

export default nextConfig;
