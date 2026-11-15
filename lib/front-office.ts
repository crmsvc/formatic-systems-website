// Front Office — single source for the product's name, address and links.
//
// The Front Office section is built as the product's OWN SITE that, for now,
// lives under one path of formaticsystems.com (Johnny, 2026-11-15). Everything
// for it sits in one route folder, `app/front-office/`, with its own layout,
// navigation and footer.
//
// NAME: "Front Office" is a working name and may stay. To change it, edit
// FRONT_OFFICE_NAME. Pages, help docs (the {{name}} placeholder in the
// markdown files), emails, metadata and the generated llms.txt all read it.
// The Front Office lines in public/llms.txt are plain text: edit them too.
//
// MOVING TO ITS OWN DOMAIN: every link inside the section is written with
// fo("/..."), never as a typed-out "/front-office/..." path. To move:
//   1. Copy `app/front-office/` to the root `app/` of the new project, with
//      `components/front-office/`, `content/front-office-docs/`,
//      `lib/front-office.ts`, `lib/front-office-docs.ts` and the two entries
//      in next.config.ts.
//   2. Set FRONT_OFFICE_ORIGIN to the new domain and FRONT_OFFICE_BASE to "".
//   3. On formaticsystems.com, redirect /front-office/* to the new domain.
//
// STATUS: NOT LAUNCHED. Copy must not state prices, launch dates, customer
// counts or results, must not offer a way to buy it, and must mark anything
// not built yet as "Coming".

export const FRONT_OFFICE_NAME = "Front Office";

/** Site the section is served from. Changes when it gets its own domain. */
export const FRONT_OFFICE_ORIGIN = "https://formaticsystems.com";

/** Path the section lives under. "" once it has its own domain. */
export const FRONT_OFFICE_BASE = "/front-office";

/** A link inside the section: fo("/docs") → "/front-office/docs". */
export function fo(path: string = "/"): string {
  const p = path === "/" ? "" : path;
  return `${FRONT_OFFICE_BASE}${p}` || "/";
}

/** The same link as a full address, for metadata, sitemaps and plain-text files. */
export function foUrl(path: string = "/"): string {
  return `${FRONT_OFFICE_ORIGIN}${fo(path) === "/" ? "" : fo(path)}`;
}

/** Kept for the home-page card and sitemap on formaticsystems.com. */
export const FRONT_OFFICE_PATH = fo("/");

/** One-line description, shared by the home card and page metadata. */
export const FRONT_OFFICE_SUMMARY =
  "A team of AI agents that works as the front office of a small service business. It answers calls, texts and website chat, takes leads and visit requests, and works with the tools you already use. In development, not yet available.";

/** Shown in the status pill. */
export const FRONT_OFFICE_STATUS = "In development";

/**
 * Feature and article status. "testing" = built and being tested on sample
 * data, no real business uses it yet. "coming" = designed, not built.
 */
export type FrontOfficeStatus = "testing" | "coming";

export const FRONT_OFFICE_STATUS_LABEL: Record<FrontOfficeStatus, string> = {
  testing: "Built, in testing",
  coming: "Coming",
};

/** Sections of the help docs, in sidebar order. A markdown file names its section by `key`. */
export const FRONT_OFFICE_DOC_SECTIONS = [
  { key: "start", title: "Start here" },
  { key: "how", title: "How it works" },
  { key: "setup", title: "Setting up" },
  { key: "developers", title: "For developers" },
] as const;

export type FrontOfficeDocSectionKey = (typeof FRONT_OFFICE_DOC_SECTIONS)[number]["key"];

/** First page of the developer section of the docs. */
export const FRONT_OFFICE_DEVELOPERS_DOC = "/docs/connect-your-platform";
/** Docs page that carries the Marketplace listing request form. */
export const FRONT_OFFICE_LISTING_DOC = "/docs/marketplace-listing";

/** Links in the section's own top navigation. */
export const FRONT_OFFICE_NAV = [
  { label: "Features", path: "/#features" },
  { label: "Docs", path: "/docs" },
  { label: "Developers", path: FRONT_OFFICE_DEVELOPERS_DOC },
] as const;
