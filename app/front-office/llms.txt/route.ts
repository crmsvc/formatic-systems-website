import { FRONT_OFFICE_DOCS_NOTICE, getFrontOfficeDocSections } from "@/lib/front-office-docs";
import { FRONT_OFFICE_NAME, FRONT_OFFICE_SUMMARY, foUrl } from "@/lib/front-office";

// llms.txt for the Front Office site: a short index, in markdown, of every
// help page with a link to its plain-markdown copy. Generated from the
// markdown files, so it never goes out of date. Built ahead of time.

export const dynamic = "force-static";

export function GET() {
  const lines = [
    `# ${FRONT_OFFICE_NAME}`,
    "",
    `> ${FRONT_OFFICE_SUMMARY}`,
    "",
    FRONT_OFFICE_DOCS_NOTICE,
    "",
    `- [Product overview](${foUrl("/")}): what it does, with each feature marked as built or coming`,
    `- [Full text of every help page](${foUrl("/llms-full.txt")})`,
    "",
  ];
  for (const section of getFrontOfficeDocSections()) {
    lines.push(`## ${section.title}`, "");
    for (const doc of section.docs) {
      lines.push(`- [${doc.title}](${foUrl(`/docs/${doc.slug}`)}.md): ${doc.description}`);
    }
    lines.push("");
  }
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
