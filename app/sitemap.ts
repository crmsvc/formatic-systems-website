import type { MetadataRoute } from "next";
import { REFERRALPRO_PATH } from "@/lib/referralpro";

// Served at /sitemap.xml. Add a row here whenever a public page is added.
const BASE = "https://formaticsystems.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}${REFERRALPRO_PATH}`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/lab/culture`, changeFrequency: "yearly", priority: 0.5 },
  ];
}
