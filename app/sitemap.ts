import type { MetadataRoute } from "next";
import { REFERRALPRO_PATH } from "@/lib/referralpro";
import {
  FRONT_OFFICE_DEVELOPERS_PATH,
  FRONT_OFFICE_DOCS_PATH,
  FRONT_OFFICE_PATH,
} from "@/lib/front-office";
import { frontOfficeDocs } from "@/content/front-office-docs";

// Served at /sitemap.xml. Add a row here whenever a public page is added.
const BASE = "https://formaticsystems.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}${REFERRALPRO_PATH}`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}${FRONT_OFFICE_PATH}`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}${FRONT_OFFICE_DOCS_PATH}`, changeFrequency: "monthly", priority: 0.6 },
    // One row per help article, read from the docs list.
    ...frontOfficeDocs.map((doc) => ({
      url: `${BASE}${FRONT_OFFICE_DOCS_PATH}/${doc.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    { url: `${BASE}${FRONT_OFFICE_DEVELOPERS_PATH}`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/lab/culture`, changeFrequency: "yearly", priority: 0.5 },
  ];
}
