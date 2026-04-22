import type { MetadataRoute } from "next";
import { practiceAreas } from "@/data/practice-areas";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://meridianexperts.com";
  const now = new Date();

  const staticRoutes = [
    "",
    "/practice-areas",
    "/approach",
    "/process",
    "/credentials",
    "/contact",
  ].map((route) => ({
    url: `${base}${route}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const practiceRoutes = practiceAreas.map((area) => ({
    url: `${base}/practice-areas/${area.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...practiceRoutes];
}
