import type { DocArticle } from "./types";
import { whatItIs } from "./what-it-is";
import { whoItTalksTo } from "./who-it-talks-to";
import { connectingYourTools } from "./connecting-your-tools";
import { settingUpAgents } from "./setting-up-agents";
import { afterHours } from "./after-hours";

// Help docs for Front Office business owners.
//
// TO ADD AN ARTICLE:
//   1. Copy any file in this folder (e.g. after-hours.ts), rename it, and
//      change the slug, title, summary, status, date and sections.
//   2. Import it here and add it to the list below. The order of the list is
//      the order on the docs index page and of the previous/next links.
// The index page, the article page, its metadata and the sitemap all read
// this list; nothing else needs editing.
//
// RULES FOR THE TEXT (public tier): say what the product does for the owner
// in plain words. No prices, dates or results. Nothing about how it is built,
// which vendors are behind it, or how its checks work inside. Mark what is
// not built as coming. Use FRONT_OFFICE_NAME, never the name typed out.

export const frontOfficeDocs: DocArticle[] = [
  whatItIs,
  whoItTalksTo,
  connectingYourTools,
  settingUpAgents,
  afterHours,
];

export function getFrontOfficeDoc(slug: string): DocArticle | undefined {
  return frontOfficeDocs.find((d) => d.slug === slug);
}

export type { DocArticle, DocBlock, DocSection } from "./types";
