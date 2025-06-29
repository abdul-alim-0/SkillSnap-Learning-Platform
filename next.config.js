/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    domains: ['supabase.co'],
    unoptimized: false
  },
};

module.exports = nextConfig;
