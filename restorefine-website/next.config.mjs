/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      { source: "/services/restobranding", destination: "/services/brand", permanent: true },
      { source: "/services/restoweb", destination: "/services/performance", permanent: true },
      { source: "/services/restosocial", destination: "/services/content", permanent: true },
      { source: "/services/restoprint", destination: "/services/brand", permanent: true },
      { source: "/services/branding", destination: "/services/brand", permanent: true },
      { source: "/services/menu-print", destination: "/services/brand", permanent: true },
      { source: "/services/social-media-management", destination: "/services/content", permanent: true },
      { source: "/services/website", destination: "/services/performance", permanent: true },
      { source: "/services/seo", destination: "/services/performance", permanent: true },
    ];
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        hostname: "images.ctfassets.net",
      },
      {
        protocol: "https",
        hostname: "logo.clearbit.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "kqonhpbqnaubqbxbqkig.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
