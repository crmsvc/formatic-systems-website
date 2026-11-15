import {
  FRONT_OFFICE_DOCS_NOTICE,
  frontOfficeDocMarkdown,
  getFrontOfficeDocs,
} from "@/lib/front-office-docs";
import { FRONT_OFFICE_NAME, FRONT_OFFICE_SUMMARY } from "@/lib/front-office";

// llms-full.txt for the Front Office site: every help page, in full, in one
// markdown file, in sidebar order. Generated from the markdown files and
// built ahead of time.

export const dynamic = "force-static";

export function GET() {
  const parts = [
    `# ${FRONT_OFFICE_NAME}: help docs, full text`,
    "",
    `> ${FRONT_OFFICE_SUMMARY}`,
    "",
    FRONT_OFFICE_DOCS_NOTICE,
    "",
    ...getFrontOfficeDocs().flatMap((doc) => ["---", "", frontOfficeDocMarkdown(doc)]),
  ];
  return new Response(parts.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
