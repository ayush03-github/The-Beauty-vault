import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://the-beauty-vault.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/account", "/wishlist"], // Do not index account setup or wishlist pages
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
