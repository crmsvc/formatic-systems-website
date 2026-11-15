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
//   title: "Short title"
//   description: "One sentence. Shown in lists, search and metadata."
//   tier: public             (always public; the build fails on anything else)
//   section: start | how | setup | developers
//   order: 2                 (position inside the section)
//   status: testing | coming
//   updated: 2026-11-15      (last checked against the product)
//   form: marketplace-apply  (optional: shows the listing request form below)
//   answer_cards:            (one or two)
//     - question: "A question a customer would actually ask"
//       answer: "40 to 120 words, written to be spoken aloud: plain sentences, no lists, no links."
//   ---
//
// The sidebar, contents list, previous/next links, search, the plain-markdown
// address, llms.txt and the sitemap all pick the file up. Nothing else to edit.
//
// ONE SOURCE OF TRUTH (Johnny, 2026-11-15): these files are the single source
// for the help docs, and the same files will later be loaded into the
// product's public knowledge store so its agents answer from them. That
// import is not built here; the files are kept ready for it:
//   - Public information only. `tier: public` on every file.
//   - The article opens with a short direct answer (a paragraph before the
//     first heading), then the detail.
//   - Each `##` / `###` section stands on its own (no "see above", nothing
//     that needs a picture) and stays under MAX_SECTION_WORDS.
//   - Answer cards are the fast path: short spoken answers an agent can use
//     without reading the article.
// The build fails if a file breaks one of the rules it can check.
//
// IN THE MARKDOWN: use `##` and `###` for headings (the page title is the
// only `#`); write {{name}} for the product name; link to other pages of the
// section from its root, e.g. [After hours](/docs/after-hours).

const DOCS_DIR = path.join(process.cwd(), "content", "front-office-docs");

export type DocHeading = { depth: 2 | 3; text: string; id: string };

/** A short question and a spoken-style answer, for an agent's fast path. */
export type AnswerCard = { question: string; answer: string };

/** About 400 tokens. A section longer than this fails the build. */
const MAX_SECTION_WORDS = 300;
const ANSWER_WORDS = { min: 40, max: 120 };

export type FrontOfficeDoc = {
  slug: string;
  title: string;
  description: string;
  /** Always "public": only public-tier information may be in these files. */
  tier: "public";
  answerCards: AnswerCard[];
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

/** Removes one pair of surrounding quotes from a value. */
function unquote(value: string): string {
  const v = value.trim();
  return v.length >= 2 && v.startsWith('"') && v.endsWith('"') ? v.slice(1, -1) : v;
}

/**
 * Reads the lines between the two `---` lines at the top of a file: plain
 * `key: value` lines, plus the `answer_cards:` list of question/answer pairs.
 * The files are also valid YAML, so another program can read them with a
 * standard YAML reader.
 */
function parseFile(raw: string): {
  meta: Record<string, string>;
  cards: AnswerCard[];
  body: string;
} {
  const text = raw.replace(/\r\n/g, "\n");
  const match = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(text);
  if (!match) return { meta: {}, cards: [], body: text };
  const meta: Record<string, string> = {};
  const cards: AnswerCard[] = [];
  let inCards = false;
  for (const line of match[1].split("\n")) {
    if (/^answer_cards:\s*$/.test(line)) {
      inCards = true;
      continue;
    }
    if (inCards && /^\s/.test(line)) {
      const q = /^\s+-\s+question:\s*(.*)$/.exec(line);
      const a = /^\s+answer:\s*(.*)$/.exec(line);
      if (q) cards.push({ question: unquote(q[1]), answer: "" });
      else if (a && cards.length > 0) cards[cards.length - 1].answer = unquote(a[1]);
      continue;
    }
    inCards = false;
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = unquote(line.slice(i + 1));
  }
  return { meta, cards, body: match[2].trim() };
}

const words = (text: string) => text.split(/\s+/).filter(Boolean).length;

/** Stops the build when a file breaks a rule the knowledge import relies on. */
function checkDoc(file: string, meta: Record<string, string>, cards: AnswerCard[], body: string) {
  const fail = (message: string): never => {
    throw new Error(`Help doc ${file}: ${message}`);
  };
  for (const key of ["title", "description", "tier", "section", "status", "updated"]) {
    if (!meta[key]) fail(`missing "${key}" at the top of the file`);
  }
  if (meta.tier !== "public") fail(`tier must be "public" (found "${meta.tier}")`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(meta.updated)) fail("updated must be a date, YYYY-MM-DD");
  if (meta.status !== "testing" && meta.status !== "coming") {
    fail('status must be "testing" or "coming"');
  }
  if (cards.length < 1 || cards.length > 2) fail("needs one or two answer_cards");
  for (const card of cards) {
    if (!card.question || !card.answer) fail("an answer card needs a question and an answer");
    const n = words(card.answer);
    if (n < ANSWER_WORDS.min || n > ANSWER_WORDS.max) {
      fail(`answer to "${card.question}" is ${n} words; keep it ${ANSWER_WORDS.min} to ${ANSWER_WORDS.max}`);
    }
    // Answers are spoken aloud: no links, no list markers, no "click here".
    if (/https?:\/\/|\]\(|\n|^\s*[-*]\s|click here/i.test(card.answer)) {
      fail(`answer to "${card.question}" must be plain sentences: no links or lists`);
    }
  }
  // The article opens with a direct answer, before any heading.
  if (/^#/.test(body)) fail("start with a short direct answer before the first heading");
  // Every section stands on its own and stays short.
  const sections = body.split(/^#{2,3}\s+/m);
  sections.forEach((section, i) => {
    const heading = i === 0 ? "the opening" : section.split("\n")[0];
    const n = words(section);
    if (n > MAX_SECTION_WORDS) {
      fail(`section "${heading}" is ${n} words; split it (limit ${MAX_SECTION_WORDS})`);
    }
    if (/\b(see|as|described|mentioned|listed) (above|below)\b|\bscreenshot\b|!\[/i.test(section)) {
      fail(`section "${heading}" points outside itself ("see above", a picture); make it stand alone`);
    }
  });
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
      const parsed = parseFile(fs.readFileSync(path.join(DOCS_DIR, file), "utf8"));
      const { meta, body: rawBody } = parsed;
      // Fail the build, loudly, on a file that breaks the rules above.
      checkDoc(file, meta, parsed.cards, rawBody);
      if (!sectionKeys.includes(meta.section)) {
        throw new Error(`Help doc ${file}: unknown section "${meta.section}"`);
      }
      const named = (text: string) => text.replaceAll("{{name}}", FRONT_OFFICE_NAME);
      const body = named(rawBody);
      const headings: DocHeading[] = [];
      for (const token of lexer.lexer(body)) {
        if (token.type === "heading" && (token.depth === 2 || token.depth === 3)) {
          headings.push({ depth: token.depth, text: token.text, id: slugify(token.text) });
        }
      }
      return {
        slug,
        title: named(meta.title),
        description: named(meta.description),
        tier: "public",
        answerCards: parsed.cards.map((c) => ({
          question: named(c.question),
          answer: named(c.answer),
        })),
        section: meta.section as FrontOfficeDocSectionKey,
        order: Number(meta.order ?? 99),
        status: meta.status as FrontOfficeStatus,
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
 * The article as one plain markdown document. Served at /docs/<slug>.md
 * (with `frontmatter: true`), copied by the "Copy as markdown" button, and
 * joined into llms-full.txt.
 *
 * With `frontmatter: true` the document starts with the fields a program
 * needs (title, description, tier, updated, answer_cards, plus section,
 * status and the page address), as YAML between two `---` lines. Without it
 * the same facts are written as text, and the answer cards become a
 * "Quick answers" section, so nothing is lost when a person pastes it.
 * Either way the product name is filled in and links are full addresses.
 */
export function frontOfficeDocMarkdown(
  doc: FrontOfficeDoc,
  options: { frontmatter?: boolean } = {}
): string {
  const url = foUrl(`/docs/${doc.slug}`);
  // JSON strings are valid YAML double-quoted strings.
  const q = (value: string) => JSON.stringify(value);
  const head = options.frontmatter
    ? [
        "---",
        `title: ${q(doc.title)}`,
        `description: ${q(doc.description)}`,
        `tier: ${doc.tier}`,
        `updated: ${doc.updated}`,
        `section: ${doc.section}`,
        `status: ${doc.status}`,
        `url: ${q(url)}`,
        "answer_cards:",
        ...doc.answerCards.flatMap((c) => [
          `  - question: ${q(c.question)}`,
          `    answer: ${q(c.answer)}`,
        ]),
        "---",
        "",
        `# ${doc.title}`,
        "",
      ]
    : [
        `# ${doc.title}`,
        "",
        `> ${doc.description}`,
        "",
        `Status: ${FRONT_OFFICE_STATUS_LABEL[doc.status]}. Last checked: ${doc.updated}. Source: ${url}`,
        "",
      ];
  return [
    ...head,
    withLinkPrefix(doc.body, foUrl("/")),
    "",
    // A form can't live in a text file: say where it is.
    ...(doc.form ? [`The request form is on the web page: ${url}#apply`, ""] : []),
    ...(options.frontmatter
      ? []
      : [
          "## Quick answers",
          "",
          ...doc.answerCards.flatMap((c) => [`**${c.question}**`, "", c.answer, ""]),
        ]),
  ].join("\n");
}

/** Plain text of an article, for search. */
export function frontOfficeDocSearchText(doc: FrontOfficeDoc): string {
  return [doc.body, ...doc.answerCards.flatMap((c) => [c.question, c.answer])]
    .join(" ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#>*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** The sentence every plain-text file opens with, so a reader knows the product is not live. */
export const FRONT_OFFICE_DOCS_NOTICE = `${FRONT_OFFICE_NAME} is in development and not yet available. "${FRONT_OFFICE_STATUS_LABEL.testing}" means a feature exists and is being tested on sample data; no business uses it with real customers. "${FRONT_OFFICE_STATUS_LABEL.coming}" means it is designed and not built. The name is a working name and may change.`;
