import type { MetadataRoute } from "next";
import { REFERRALPRO_PATH } from "@/lib/referralpro";
import { foUrl } from "@/lib/front-office";
import { getFrontOfficeDocs } from "@/lib/front-office-docs";

// Served at /sitemap.xml. Add a row here whenever a public page is added.
const BASE = "https://formaticsystems.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}${REFERRALPRO_PATH}`, changeFrequency: "monthly", priority: 0.8 },
    // The Front Office site (lives under one path here until it has a domain).
    { url: foUrl("/"), changeFrequency: "monthly", priority: 0.8 },
    { url: foUrl("/docs"), changeFrequency: "monthly", priority: 0.6 },
    // One row per help page, read from the markdown files.
    ...getFrontOfficeDocs().map((doc) => ({
      url: foUrl(`/docs/${doc.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    { url: `${BASE}/lab/culture`, changeFrequency: "yearly", priority: 0.5 },
  ];
}
