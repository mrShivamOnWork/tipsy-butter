import type { MetadataRoute } from "next";

const BASE = "https://tipsybutter.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/menu", "/our-cafe", "/gallery", "/visit", "/contact"];
  return routes.map((route) => ({
    url: `${BASE}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
