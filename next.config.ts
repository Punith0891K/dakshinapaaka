import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Keep Turbopack scoped to this app. A second lockfile in the user folder
  // otherwise makes Next watch a protected parent directory on Windows.
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
