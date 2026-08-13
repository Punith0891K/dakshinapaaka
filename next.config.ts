import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Allow the preview host to request Next.js dev resources (RSC payload,
  // HMR). Without this Next 16 blocks the cross-origin request and the
  // client-side React bundle never receives the flight payload, so the
  // whole app stays un-hydrated (event handlers never attach).
  allowedDevOrigins: [
    "*.preview.emergentagent.com",
    "*.preview.emergentcf.cloud",
    "*.cluster-3.preview.emergentcf.cloud",
  ],
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
