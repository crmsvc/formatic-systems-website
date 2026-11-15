import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { FrontOfficeHeader, NotLaunchedNote, StatusTag } from "@/components/front-office/section-shell";
import { frontOfficeDocs } from "@/content/front-office-docs";
import { FRONT_OFFICE_DOCS_PATH, FRONT_OFFICE_NAME } from "@/lib/front-office";

// Help docs index. The list comes from content/front-office-docs/index.ts;
// see the comment there for how to add an article.

const title = `${FRONT_OFFICE_NAME} help docs | Formatic Systems`;
const description = `Plain-language help for business owners: how ${FRONT_OFFICE_NAME} answers, who it talks to, what needs your approval, and how your tools connect.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: FRONT_OFFICE_DOCS_PATH },
  openGraph: {
    title,
    description,
    url: `https://formaticsystems.com${FRONT_OFFICE_DOCS_PATH}`,
    siteName: "Formatic Systems",
    type: "website",
  },
};

export default function FrontOfficeDocsPage() {
  return (
    <>
      <Nav />
      <main>
        <FrontOfficeHeader
          current={FRONT_OFFICE_DOCS_PATH}
          title="Help docs"
          lead="Written for the person who owns the business, not the person who builds software. Each article is short and says what works today and what doesn't yet."
        />

        <section className="px-6 pb-32">
          <div className="mx-auto max-w-5xl">
            <NotLaunchedNote />
            <ol className="mt-10 divide-y divide-border border-y border-border">
              {frontOfficeDocs.map((doc) => (
                <li key={doc.slug}>
                  <Link
                    href={`${FRONT_OFFICE_DOCS_PATH}/${doc.slug}`}
                    className="group flex flex-col gap-3 py-6 sm:flex-row sm:items-start sm:justify-between sm:gap-8"
                  >
                    <div className="max-w-2xl">
                      <h2 className="text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                        {doc.title}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {doc.summary}
                      </p>
                    </div>
                    <StatusTag status={doc.status} />
                  </Link>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-sm text-muted-foreground">
              Can&apos;t find an answer? Email{" "}
              <a
                href="mailto:contact@formaticsystems.com"
                className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
              >
                contact@formaticsystems.com
              </a>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
