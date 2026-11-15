import type { FrontOfficeStatus } from "@/lib/front-office";

// Shape of one help article. Articles are plain data (no markup), so every
// article renders the same way through app/front-office/docs/[slug]/page.tsx.

export type DocBlock =
  /** A paragraph. */
  | { type: "p"; text: string }
  /** A bulleted list. */
  | { type: "list"; items: string[] }
  /** A numbered list, for steps that happen in order. */
  | { type: "steps"; items: string[] }
  /** A boxed note, used for "not available yet" and similar. */
  | { type: "note"; text: string };

export type DocSection = {
  heading: string;
  /** Set when this one section differs from the article's overall status. */
  status?: FrontOfficeStatus;
  blocks: DocBlock[];
};

export type DocArticle = {
  /** URL segment: /front-office/docs/<slug>. Lower case, hyphens. */
  slug: string;
  title: string;
  /** One or two sentences, shown on the docs index and as the page description. */
  summary: string;
  /** Where the subject of the article stands today. */
  status: FrontOfficeStatus;
  /** Date the article was last checked against the product, YYYY-MM-DD. */
  updated: string;
  sections: DocSection[];
};
