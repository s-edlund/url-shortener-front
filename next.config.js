/** @type {import('next').NextConfig} */
const nextConfig = {
   output: 'export',
   images: { unoptimized: true },
   experimental: {
      missingSuspenseWithCSRBailout: false,
    }
};

module.exports = nextConfig;
