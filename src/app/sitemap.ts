import { MetadataRoute } from "next";
import { PRODUCTS } from "@/data/products";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Use Vercel default domain if NEXT_PUBLIC_SITE_URL is not set
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://the-beauty-vault.vercel.app";

  const staticPages = [
    "",
    "/shop",
    "/about",
    "/contact",
    "/faq",
    "/journal",
    "/shipping",
    "/stores",
    "/careers",
    "/privacy",
  ];

  const staticRoutes = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const productRoutes = PRODUCTS.map((product) => ({
    url: `${baseUrl}/shop/${product.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes];
}
