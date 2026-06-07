/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  experimental: {
    forceSwcTransforms: false,
  },
};

// Disable SWC entirely on ARM64
process.env.NEXT_DISABLE_SWC = "1";

module.exports = nextConfig;
