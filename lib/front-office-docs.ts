import fs from "node:fs";
import path from "node:path";
import { Marked } from "marked";
import {
  FRONT_OFFICE_DOC_SECTIONS,
  FRONT_OFFICE_NAME,
  FRONT_OFFICE_STATUS_LABEL,
  fo,
  foUrl,
  type FrontOfficeDocSectionKey,
  type FrontOfficeStatus,
} from "@/lib/front-office";

// Loads the Front Office help docs from the markdown files in
// content/front-office-docs/. Server only (reads the disk at build time; every
// page and file that uses this is built ahead of time).
//
// TO ADD AN ARTICLE: add one `.md` file to content/front-office-docs/. Its
// file name is its address (my-article.md → /docs/my-article). Start it with:
//
//   ---
//   title: Short title
//   description: One or two sentences. Shown in lists, search and metadata.
//   section: start | how | setup | developers
//   order: 2                 (position inside the section)
//   status: testing | coming
//   updated: 2026-11-15      (last checked against the product)
//   form: marketplace-apply  (optional: shows the listing request form below)
//   ---
//
// The sidebar, contents list, previous/next links, search, the plain-markdown
// address, llms.txt and the sitemap all pick the file up. Nothing else to edit.
//
// IN THE MARKDOWN: use `##` and `###` for headings (the page title is the
// only `#`); write {{name}} for the product name; link to other pages of the
// section from its root, e.g. [After hours](/docs/after-hours).

const DOCS_DIR = path.join(process.cwd(), "content", "front-office-docs");

export type DocHeading = { depth: 2 | 3; text: string; id: string };

export type FrontOfficeDoc = {
  slug: string;
  title: string;
  description: string;
  section: FrontOfficeDocSectionKey;
  order: number;
  status: FrontOfficeStatus;
  updated: string;
  form?: "marketplace-apply";
  /** Markdown body with {{name}} filled in; links still relative to the section root. */
  body: string;
  headings: DocHeading[];
};

/** Heading text → the id used for its anchor link. */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/** Reads the `key: value` lines between the two `---` lines at the top of a file. */
function parseFile(raw: string): { meta: Record<string, string>; body: string } {
  const text = raw.replace(/\r\n/g, "\n");
  const match = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(text);
  if (!match) return { meta: {}, body: text };
  const meta: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { meta, body: match[2].trim() };
}

let cache: FrontOfficeDoc[] | null = null;

/** Every article, in sidebar order (section order, then `order`). */
export function getFrontOfficeDocs(): FrontOfficeDoc[] {
  if (cache) return cache;
  const sectionKeys = FRONT_OFFICE_DOC_SECTIONS.map((s) => s.key) as string[];
  const lexer = new Marked();

  const docs = fs
    .readdirSync(DOCS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file): FrontOfficeDoc => {
      const slug = file.replace(/\.md$/, "");
      const { meta, body: rawBody } = parseFile(fs.readFileSync(path.join(DOCS_DIR, file), "utf8"));
      // Fail the build, loudly, on a file that is missing what the pages need.
      for (const key of ["title", "description", "section", "status", "updated"]) {
        if (!meta[key]) throw new Error(`Help doc ${file}: missing "${key}" at the top of the file`);
      }
      if (!sectionKeys.includes(meta.section)) {
        throw new Error(`Help doc ${file}: unknown section "${meta.section}"`);
      }
      if (meta.status !== "testing" && meta.status !== "coming") {
        throw new Error(`Help doc ${file}: status must be "testing" or "coming"`);
      }
      const body = rawBody.replaceAll("{{name}}", FRONT_OFFICE_NAME);
      const headings: DocHeading[] = [];
      for (const token of lexer.lexer(body)) {
        if (token.type === "heading" && (token.depth === 2 || token.depth === 3)) {
          headings.push({ depth: token.depth, text: token.text, id: slugify(token.text) });
        }
      }
      return {
        slug,
        title: meta.title.replaceAll("{{name}}", FRONT_OFFICE_NAME),
        description: meta.description.replaceAll("{{name}}", FRONT_OFFICE_NAME),
        section: meta.section as FrontOfficeDocSectionKey,
        order: Number(meta.order ?? 99),
        status: meta.status,
        updated: meta.updated,
        form: meta.form === "marketplace-apply" ? "marketplace-apply" : undefined,
        body,
        headings,
      };
    })
    .sort(
      (a, b) =>
        sectionKeys.indexOf(a.section) - sectionKeys.indexOf(b.section) ||
        a.order - b.order ||
        a.title.localeCompare(b.title)
    );

  cache = docs;
  return docs;
}

export function getFrontOfficeDoc(slug: string): FrontOfficeDoc | undefined {
  return getFrontOfficeDocs().find((d) => d.slug === slug);
}

/** Articles grouped under their section titles, for the sidebar and lists. */
export function getFrontOfficeDocSections() {
  const docs = getFrontOfficeDocs();
  return FRONT_OFFICE_DOC_SECTIONS.map((s) => ({
    ...s,
    docs: docs.filter((d) => d.section === s.key),
  })).filter((s) => s.docs.length > 0);
}

/** Points root-relative markdown links at the section: `](/docs/x)` → `](<prefix>/docs/x)`. */
function withLinkPrefix(markdown: string, prefix: string): string {
  return markdown.replace(/\]\(\/(?!\/)/g, `](${prefix}/`);
}

/** The article body as HTML for the page. Headings get ids for the contents list. */
export function renderFrontOfficeDocHtml(doc: FrontOfficeDoc): string {
  const marked = new Marked({
    renderer: {
      heading({ tokens, depth }) {
        const html = this.parser.parseInline(tokens);
        const text = tokens.map((t) => ("text" in t ? t.text : t.raw)).join("");
        return depth === 2 || depth === 3
          ? `<h${depth} id="${slugify(text)}">${html}</h${depth}>\n`
          : `<h${depth}>${html}</h${depth}>\n`;
      },
    },
  });
  return marked.parse(withLinkPrefix(doc.body, fo("/") === "/" ? "" : fo("/")), {
    async: false,
  });
}

/**
 * The article as one plain markdown document: title, description, status,
 * then the body with full addresses in its links. Served at /docs/<slug>.md,
 * copied by the "Copy as markdown" button, and joined into llms-full.txt.
 */
export function frontOfficeDocMarkdown(doc: FrontOfficeDoc): string {
  return [
    `# ${doc.title}`,
    "",
    `> ${doc.description}`,
    "",
    `Status: ${FRONT_OFFICE_STATUS_LABEL[doc.status]}. Last checked: ${doc.updated}. Source: ${foUrl(`/docs/${doc.slug}`)}`,
    "",
    withLinkPrefix(doc.body, foUrl("/")),
    "",
    // A form can't live in a text file: say where it is.
    ...(doc.form
      ? [`The request form is on the web page: ${foUrl(`/docs/${doc.slug}`)}#apply`, ""]
      : []),
  ].join("\n");
}

/** Plain text of an article, for search. */
export function frontOfficeDocSearchText(doc: FrontOfficeDoc): string {
  return doc.body
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#>*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** The sentence every plain-text file opens with, so a reader knows the product is not live. */
export const FRONT_OFFICE_DOCS_NOTICE = `${FRONT_OFFICE_NAME} is in development and not yet available. "${FRONT_OFFICE_STATUS_LABEL.testing}" means a feature exists and is being tested on sample data; no business uses it with real customers. "${FRONT_OFFICE_STATUS_LABEL.coming}" means it is designed and not built. The name is a working name and may change.`;
