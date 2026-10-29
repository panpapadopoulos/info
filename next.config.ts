import type { NextConfig } from "next";

// Set by the GitHub Pages workflow: "" on a custom domain, "/<repo>" otherwise.
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // A fully static site in out/, which GitHub Pages can serve as-is.
  output: "export",
  basePath,
  // No image server on GitHub Pages; the images are already web-sized.
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  // Lets a test build use its own folder, so it can't break a running `npm run dev`.
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
};

export default nextConfig;
