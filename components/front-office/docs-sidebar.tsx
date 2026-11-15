"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ChevronDown } from "lucide-react";

// Left sidebar of the help docs: a search box over every article, then the
// sections and their pages. On a phone the page list folds into a "Menu"
// control so the article comes first.
//
// Everything it needs (links, titles, the text to search) is passed in from
// the docs layout, which builds it from the markdown files at build time.
// Search runs in the browser over that list; nothing is sent anywhere.

export type SidebarDoc = {
  href: string;
  title: string;
  description: string;
  sectionTitle: string;
  coming: boolean;
  /** Headings of the article, searched ahead of its body text. */
  headings: string[];
  /** Plain text of the article. */
  text: string;
};

export type SidebarSection = { title: string; docs: SidebarDoc[] };

type Hit = { doc: SidebarDoc; score: number; excerpt: string };

/** Scores each article for the typed words: title first, then headings, then text. */
function search(docs: SidebarDoc[], query: string): Hit[] {
  const words = query.toLowerCase().split(/\s+/).filter((w) => w.length > 1);
  if (words.length === 0) return [];
  const hits: Hit[] = [];
  for (const doc of docs) {
    const title = doc.title.toLowerCase();
    const headings = doc.headings.join(" ").toLowerCase();
    const description = doc.description.toLowerCase();
    const text = doc.text.toLowerCase();
    let score = 0;
    let matchedAll = true;
    for (const w of words) {
      const s =
        (title.includes(w) ? 8 : 0) +
        (headings.includes(w) ? 4 : 0) +
        (description.includes(w) ? 2 : 0) +
        (text.includes(w) ? 1 : 0);
      if (s === 0) matchedAll = false;
      score += s;
    }
    if (!matchedAll) continue;
    // Show the words around the first match in the text, or the description.
    const at = text.indexOf(words[0]);
    const excerpt =
      at >= 0
        ? `${at > 40 ? "…" : ""}${doc.text.slice(Math.max(0, at - 40), at + 90).trim()}…`
        : doc.description;
    hits.push({ doc, score, excerpt });
  }
  return hits.sort((a, b) => b.score - a.score).slice(0, 6);
}

export function DocsSidebar({ sections }: { sections: SidebarSection[] }) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const allDocs = useMemo(() => sections.flatMap((s) => s.docs), [sections]);
  const hits = useMemo(() => search(allDocs, query), [allDocs, query]);
  const searching = query.trim().length > 1;

  return (
    <div className="space-y-6">
      {/* Search */}
      <div role="search">
        <label htmlFor="fo-docs-search" className="sr-only">
          Search the help docs
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            id="fo-docs-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the docs"
            autoComplete="off"
            className="h-10 w-full rounded-md border border-input bg-transparent pr-3 pl-9 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 dark:bg-input/30"
          />
        </div>
        {searching && (
          <div aria-live="polite" className="mt-3">
            {hits.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Nothing matches &ldquo;{query.trim()}&rdquo;. Try one plain word, like
                &ldquo;calendar&rdquo; or &ldquo;approve&rdquo;.
              </p>
            ) : (
              <ul className="space-y-1">
                {hits.map(({ doc, excerpt }) => (
                  <li key={doc.href}>
                    <Link
                      href={doc.href}
                      onClick={() => setQuery("")}
                      className="block rounded-md border border-border bg-card px-3 py-2 transition-colors hover:border-primary/40"
                    >
                      <span className="block text-sm font-semibold text-foreground">
                        {doc.title}
                      </span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {doc.sectionTitle}
                      </span>
                      <span className="mt-1 line-clamp-2 block text-xs leading-relaxed text-muted-foreground">
                        {excerpt}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Page list. On a phone it sits behind the Menu control. */}
      <button
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        aria-expanded={menuOpen}
        aria-controls="fo-docs-pages"
        className="flex h-10 w-full items-center justify-between rounded-md border border-border bg-card px-3 text-sm font-medium text-foreground lg:hidden"
      >
        All pages
        <ChevronDown className={`h-4 w-4 transition-transform ${menuOpen ? "rotate-180" : ""}`} />
      </button>
      <nav
        id="fo-docs-pages"
        aria-label="Help docs pages"
        className={`${menuOpen ? "block" : "hidden"} space-y-6 lg:block`}
      >
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="text-sm font-semibold text-foreground">{section.title}</h2>
            <ul className="mt-2 space-y-0.5 border-l border-border">
              {section.docs.map((doc) => {
                const current = pathname === doc.href;
                return (
                  <li key={doc.href}>
                    <Link
                      href={doc.href}
                      aria-current={current ? "page" : undefined}
                      onClick={() => setMenuOpen(false)}
                      className={`-ml-px flex items-baseline justify-between gap-2 border-l py-1.5 pl-4 text-sm leading-snug transition-colors ${
                        current
                          ? "border-primary font-semibold text-foreground"
                          : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                      }`}
                    >
                      <span>{doc.title}</span>
                      {doc.coming && (
                        <span className="shrink-0 text-[11px] font-normal text-muted-foreground">
                          Coming
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
}
