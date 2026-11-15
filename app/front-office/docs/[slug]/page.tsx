import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { FrontOfficeHeader, StatusTag } from "@/components/front-office/section-shell";
import { frontOfficeDocs, getFrontOfficeDoc, type DocBlock } from "@/content/front-office-docs";
import { FRONT_OFFICE_DOCS_PATH, FRONT_OFFICE_NAME } from "@/lib/front-office";

// One help article. Content comes from content/front-office-docs/<slug>.ts.
// Every article is built ahead of time; an unknown slug is a 404.

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return frontOfficeDocs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const doc = getFrontOfficeDoc(slug);
  if (!doc) return {};
  const title = `${doc.title} | ${FRONT_OFFICE_NAME} help`;
  const path = `${FRONT_OFFICE_DOCS_PATH}/${doc.slug}`;
  return {
    title,
    description: doc.summary,
    alternates: { canonical: path },
    openGraph: {
      title,
      description: doc.summary,
      url: `https://formaticsystems.com${path}`,
      siteName: "Formatic Systems",
      type: "article",
    },
  };
}

function Block({ block }: { block: DocBlock }) {
  switch (block.type) {
    case "p":
      return <p className="leading-relaxed text-muted-foreground">{block.text}</p>;
    case "list":
      return (
        <ul className="space-y-3 text-muted-foreground">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 leading-relaxed">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "steps":
      return (
        <ol className="space-y-3 text-muted-foreground">
          {block.items.map((item, i) => (
            <li key={item} className="flex gap-3 leading-relaxed">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                {i + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      );
    case "note":
      return (
        <p className="rounded-lg border border-border bg-card px-4 py-3 text-sm leading-relaxed text-muted-foreground">
          {block.text}
        </p>
      );
  }
}

export default async function FrontOfficeDocPage({ params }: Params) {
  const { slug } = await params;
  const doc = getFrontOfficeDoc(slug);
  if (!doc) notFound();

  const index = frontOfficeDocs.findIndex((d) => d.slug === doc.slug);
  const prev = frontOfficeDocs[index - 1];
  const next = frontOfficeDocs[index + 1];

  return (
    <>
      <Nav />
      <main>
        <FrontOfficeHeader current={FRONT_OFFICE_DOCS_PATH} title={doc.title} lead={doc.summary}>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <StatusTag status={doc.status} />
            <span>
              Last checked <time dateTime={doc.updated}>{doc.updated}</time>
            </span>
          </div>
        </FrontOfficeHeader>

        <article className="px-6 pb-24">
          <div className="mx-auto max-w-5xl">
            <div className="max-w-2xl space-y-14">
              {doc.sections.map((section) => (
                <section key={section.heading}>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-bold tracking-[-0.035em] text-foreground">
                      {section.heading}
                    </h2>
                    {section.status && section.status !== doc.status && (
                      <StatusTag status={section.status} />
                    )}
                  </div>
                  <div className="mt-5 space-y-5">
                    {section.blocks.map((block, i) => (
                      <Block key={i} block={block} />
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <nav
              aria-label="More help articles"
              className="mt-20 grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
            >
              {prev ? (
                <Link
                  href={`${FRONT_OFFICE_DOCS_PATH}/${prev.slug}`}
                  className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
                >
                  <span className="text-xs font-medium text-muted-foreground">Previous</span>
                  <span className="mt-1 block font-semibold text-foreground">{prev.title}</span>
                </Link>
              ) : (
                <Link
                  href={FRONT_OFFICE_DOCS_PATH}
                  className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
                >
                  <span className="text-xs font-medium text-muted-foreground">Back to</span>
                  <span className="mt-1 block font-semibold text-foreground">All help docs</span>
                </Link>
              )}
              {next ? (
                <Link
                  href={`${FRONT_OFFICE_DOCS_PATH}/${next.slug}`}
                  className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
                >
                  <span className="text-xs font-medium text-muted-foreground">Next</span>
                  <span className="mt-1 block font-semibold text-foreground">{next.title}</span>
                </Link>
              ) : (
                <Link
                  href={FRONT_OFFICE_DOCS_PATH}
                  className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
                >
                  <span className="text-xs font-medium text-muted-foreground">Back to</span>
                  <span className="mt-1 block font-semibold text-foreground">All help docs</span>
                </Link>
              )}
            </nav>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
