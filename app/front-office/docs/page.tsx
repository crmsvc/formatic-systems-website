import type { Metadata } from "next";
import Link from "next/link";
import { NotLaunchedNote, StatusTag } from "@/components/front-office/section-shell";
import { getFrontOfficeDocSections } from "@/lib/front-office-docs";
import { FRONT_OFFICE_NAME, fo, foUrl } from "@/lib/front-office";

// Help docs home: every section and its pages. The list comes from the
// markdown files in content/front-office-docs/ (see lib/front-office-docs.ts
// for how to add one). Sidebar and search come from the docs layout.

const description = `Help for ${FRONT_OFFICE_NAME}: how it answers, who it talks to, what needs your approval, how your tools connect, and how other platforms connect to it.`;

export const metadata: Metadata = {
  title: "Help docs",
  description,
  alternates: { canonical: foUrl("/docs") },
  openGraph: { title: `${FRONT_OFFICE_NAME} help docs`, description, url: foUrl("/docs") },
};

export default function FrontOfficeDocsPage() {
  const sections = getFrontOfficeDocSections();
  return (
    <>
      <h1 className="text-4xl font-bold tracking-[-0.035em] text-foreground">Help docs</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        Short pages in plain words. Each one says what works today and what doesn&apos;t yet.
      </p>
      <NotLaunchedNote className="mt-8 max-w-2xl" />

      <div className="mt-12 space-y-12">
        {sections.map((section) => (
          <section key={section.key}>
            <h2 className="text-xl font-bold tracking-tight text-foreground">{section.title}</h2>
            <ul className="mt-4 divide-y divide-border border-y border-border">
              {section.docs.map((doc) => (
                <li key={doc.slug}>
                  <Link
                    href={fo(`/docs/${doc.slug}`)}
                    className="group flex flex-col gap-2 py-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8"
                  >
                    <div className="max-w-xl">
                      <h3 className="font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                        {doc.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {doc.description}
                      </p>
                    </div>
                    <StatusTag status={doc.status} />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section className="mt-16 max-w-2xl rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Reading these with an AI assistant
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Every page is also available as plain markdown: add <code>.md</code> to its address, or
          use &ldquo;Copy as markdown&rdquo; on the page. There is an index of all pages at{" "}
          <a href={fo("/llms.txt")} className="font-medium text-foreground underline underline-offset-4 hover:text-primary">
            llms.txt
          </a>{" "}
          and the full text in one file at{" "}
          <a href={fo("/llms-full.txt")} className="font-medium text-foreground underline underline-offset-4 hover:text-primary">
            llms-full.txt
          </a>
          .
        </p>
      </section>

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
    </>
  );
}
