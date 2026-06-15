import { MetadataRoute } from "next";

export const runtime = "edge";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/static/chunks/",
          "/_next/static/media/",
          "/_next/image",
          "/public/",
        ],
      },
    ],
    sitemap: "https://www.restorefine.co.uk/sitemap.xml",
    host: "https://www.restorefine.co.uk",
  };
}
