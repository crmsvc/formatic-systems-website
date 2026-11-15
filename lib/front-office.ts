// Front Office — single source for the product's name and links on this site.
//
// "Front Office" is a CODENAME. The public name and domain are undecided
// (as of 2026-11-15). To rename, change FRONT_OFFICE_NAME here: the home card,
// the product page, the help docs, the developer page, the two forms' emails
// and all page metadata read from this file. Also update the Front Office
// lines in public/llms.txt (plain text, not generated).
//
// The route folder is `app/front-office/`. If the route itself should change,
// rename that folder, change FRONT_OFFICE_PATH, and add a redirect from the
// old path in next.config.ts.
//
// Status: NOT LAUNCHED. Copy anywhere on the site must not state prices,
// launch dates, customer counts or results, must not offer a way to buy it,
// and must mark anything not built yet as "Coming".

export const FRONT_OFFICE_NAME = "Front Office";

/** Route of the product page on formaticsystems.com. */
export const FRONT_OFFICE_PATH = "/front-office";
export const FRONT_OFFICE_DOCS_PATH = `${FRONT_OFFICE_PATH}/docs`;
export const FRONT_OFFICE_DEVELOPERS_PATH = `${FRONT_OFFICE_PATH}/developers`;

/** One-line description, shared by the home card and page metadata. */
export const FRONT_OFFICE_SUMMARY =
  "A team of AI agents that works as the front office of a small service business. It answers calls, texts and website chat, takes leads and visit requests, and works with the tools you already use. In development, not yet available.";

/** Shown in the status pill on every Front Office page. */
export const FRONT_OFFICE_STATUS = "In development";

/**
 * Feature status labels. "testing" = built and being tested on sample data,
 * no real business uses it yet. "coming" = designed, not built.
 */
export type FrontOfficeStatus = "testing" | "coming";

export const FRONT_OFFICE_STATUS_LABEL: Record<FrontOfficeStatus, string> = {
  testing: "Built, in testing",
  coming: "Coming",
};

/** Section links, used by the sub-navigation on each Front Office page. */
export const FRONT_OFFICE_SECTIONS = [
  { label: "Overview", href: FRONT_OFFICE_PATH },
  { label: "Help docs", href: FRONT_OFFICE_DOCS_PATH },
  { label: "For developers", href: FRONT_OFFICE_DEVELOPERS_PATH },
] as const;
