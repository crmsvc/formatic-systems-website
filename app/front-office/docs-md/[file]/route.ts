import { frontOfficeDocMarkdown, getFrontOfficeDoc, getFrontOfficeDocs } from "@/lib/front-office-docs";

// Serves each help article as plain markdown at <docs address>.md, for
// example /front-office/docs/what-it-is.md. A rewrite in next.config.ts sends
// those addresses here (a page folder cannot end in ".md" itself).
// Each file starts with its fields (title, description, tier, updated,
// answer_cards, ...) as YAML, which is what the knowledge import will read.
// Built ahead of time, one file per article; anything else is a 404.

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getFrontOfficeDocs().map((d) => ({ file: `${d.slug}.md` }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const doc = getFrontOfficeDoc(file.replace(/\.md$/, ""));
  if (!doc) return new Response("Not found", { status: 404 });
  return new Response(frontOfficeDocMarkdown(doc, { frontmatter: true }), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
