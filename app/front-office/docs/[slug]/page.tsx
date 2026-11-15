import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StatusTag } from "@/components/front-office/section-shell";
import { CopyMarkdownButton } from "@/components/front-office/copy-markdown";
import { MarketplaceApplyForm } from "@/components/front-office/marketplace-apply-form";
import {
  frontOfficeDocMarkdown,
  getFrontOfficeDoc,
  getFrontOfficeDocs,
  renderFrontOfficeDocHtml,
} from "@/lib/front-office-docs";
import { FRONT_OFFICE_DOC_SECTIONS, fo, foUrl } from "@/lib/front-office";

// One help article, from content/front-office-docs/<slug>.md. Layout: the
// article, a contents list of its headings on the right (wide screens), and
// previous/next links at the bottom. The sidebar comes from the docs layout.
// Every article is built ahead of time; an unknown address is a 404.

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getFrontOfficeDocs().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const doc = getFrontOfficeDoc(slug);
  if (!doc) return {};
  const url = foUrl(`/docs/${doc.slug}`);
  return {
    title: doc.title,
    description: doc.description,
    alternates: {
      canonical: url,
      // Tells assistants and crawlers where the plain-markdown copy is.
      types: { "text/markdown": `${url}.md` },
    },
    openGraph: { title: doc.title, description: doc.description, url, type: "article" },
  };
}

export default async function FrontOfficeDocPage({ params }: Params) {
  const { slug } = await params;
  const doc = getFrontOfficeDoc(slug);
  if (!doc) notFound();

  const docs = getFrontOfficeDocs();
  const index = docs.findIndex((d) => d.slug === doc.slug);
  const prev = docs[index - 1];
  const next = docs[index + 1];
  const sectionTitle = FRONT_OFFICE_DOC_SECTIONS.find((s) => s.key === doc.section)?.title;
  // Contents list: the `##` headings. `###` headings stay in the article only.
  const contents = doc.headings.filter((h) => h.depth === 2);

  return (
    <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_13rem] xl:gap-12">
      <article className="min-w-0 max-w-2xl">
        <p className="text-sm font-medium text-muted-foreground">{sectionTitle}</p>
        <h1 className="mt-2 text-4xl font-bold leading-[1.1] tracking-[-0.035em] text-foreground">
          {doc.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{doc.description}</p>

        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted-foreground">
          <StatusTag status={doc.status} />
          <span>
            Last checked <time dateTime={doc.updated}>{doc.updated}</time>
          </span>
          <CopyMarkdownButton markdown={frontOfficeDocMarkdown(doc)} />
          {/* A plain file, not a page: needs a full load, so <a>. */}
          <a
            href={`${fo(`/docs/${doc.slug}`)}.md`}
            className="font-medium underline underline-offset-4 transition-colors hover:text-primary"
          >
            View as markdown
          </a>
        </div>

        {/* The markdown is our own file from the repo, turned into HTML at build time. */}
        <div
          className="fo-prose mt-10"
          dangerouslySetInnerHTML={{ __html: renderFrontOfficeDocHtml(doc) }}
        />

        {/* The answer cards from the top of the markdown file: the short
            answers the product's own agents will use, shown to readers too. */}
        <section aria-labelledby="quick-answers" className="mt-12">
          <h2
            id="quick-answers"
            className="scroll-mt-24 text-2xl font-bold tracking-[-0.03em] text-foreground"
          >
            Quick answers
          </h2>
          <dl className="mt-5 space-y-4">
            {doc.answerCards.map((card) => (
              <div key={card.question} className="rounded-xl border border-border bg-card p-5">
                <dt className="font-semibold text-foreground">{card.question}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        {doc.form === "marketplace-apply" && (
          <div id="apply" className="mt-6 scroll-mt-24 rounded-xl border border-border bg-card p-6 sm:p-8">
            <p className="text-sm leading-relaxed text-muted-foreground">
              The request goes to Formatic for review. Sending it does not list your platform.
            </p>
            <div className="mt-6">
              <MarketplaceApplyForm />
            </div>
          </div>
        )}

        <nav
          aria-label="Previous and next page"
          className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
        >
          {prev ? (
            <Link
              href={fo(`/docs/${prev.slug}`)}
              className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
            >
              <span className="text-xs font-medium text-muted-foreground">Previous</span>
              <span className="mt-1 block font-semibold text-foreground">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={fo(`/docs/${next.slug}`)}
              className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30 sm:text-right"
            >
              <span className="text-xs font-medium text-muted-foreground">Next</span>
              <span className="mt-1 block font-semibold text-foreground">{next.title}</span>
            </Link>
          )}
        </nav>
      </article>

      {contents.length > 1 && (
        <aside className="hidden xl:block">
          <nav aria-label="On this page" className="sticky top-24">
            <h2 className="text-sm font-semibold text-foreground">On this page</h2>
            <ul className="mt-3 space-y-2 border-l border-border text-sm">
              {contents.map((h) => (
                <li key={h.id}>
                  <a
                    href={`#${h.id}`}
                    className="-ml-px block border-l border-transparent pl-4 leading-snug text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                  >
                    {h.text}
                  </a>
                </li>
              ))}
              {doc.form === "marketplace-apply" && (
                <li>
                  <a
                    href="#apply"
                    className="-ml-px block border-l border-transparent pl-4 leading-snug text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                  >
                    The request form
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </aside>
      )}
    </div>
  );
}
