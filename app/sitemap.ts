import { FARMERS } from "@/lib/data";
import type { MetadataRoute } from "next";

const BASE = "https://asli-id.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/farmers",
    "/how",
    "/impact",
    "/spec",
    "/strategy",
    "/onboard",
    "/scan",
    "/dashboard",
    "/faq",
    "/roadmap",
    "/sources",
  ];

  const staticPages = paths.flatMap((p) => [
    {
      url: `${BASE}${p}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: p === "" ? 1.0 : 0.7,
    },
    {
      url: `${BASE}/id${p}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: p === "" ? 0.9 : 0.6,
    },
  ]);

  const farmerPages = FARMERS.flatMap((f) => [
    {
      url: `${BASE}/farmers/${f.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
    {
      url: `${BASE}/id/farmers/${f.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    },
  ]);

  return [...staticPages, ...farmerPages];
}
