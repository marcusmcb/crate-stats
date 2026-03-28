import type { NextConfig } from 'next';
import path from 'node:path';

const nextConfig: NextConfig = {
  // Avoid Next.js mis-inferring the workspace root on Windows when multiple
  // lockfiles exist in ancestor directories.
  outputFileTracingRoot: path.resolve(__dirname, '..', '..'),
};

export default nextConfig;
