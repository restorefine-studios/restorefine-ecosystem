/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      { source: "/services/restobranding", destination: "/services/branding", permanent: true },
      { source: "/services/restoweb", destination: "/services/website", permanent: true },
      { source: "/services/restosocial", destination: "/services/social-media-management", permanent: true },
      { source: "/services/restoprint", destination: "/services/menu-print", permanent: true },
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
