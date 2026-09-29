/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async rewrites() {
    // Vercel serves the API functions directly; localhost is only for local hosting.
    if (process.env.VERCEL === '1') return [];
    return [{ source: '/api/:path*', destination: `${process.env.API_INTERNAL_URL || 'http://localhost:4000'}/api/:path*` }];
  },
};

export default nextConfig;
