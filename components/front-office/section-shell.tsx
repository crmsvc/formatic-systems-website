import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  FRONT_OFFICE_DEVELOPERS_DOC,
  FRONT_OFFICE_LISTING_DOC,
  FRONT_OFFICE_NAME,
  FRONT_OFFICE_NAV,
  FRONT_OFFICE_STATUS,
  FRONT_OFFICE_STATUS_LABEL,
  fo,
  type FrontOfficeStatus,
} from "@/lib/front-office";

// The Front Office site's own chrome: top navigation, footer, and the small
// status pieces shared by its pages. Used by app/front-office/layout.tsx.
// Every link goes through fo(), so the section can move to its own domain
// by changing one constant (see lib/front-office.ts).

/** Top navigation of the Front Office site. */
export function FrontOfficeNav() {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <Link href={fo("/")} className="flex shrink-0 items-center gap-2">
          <span className="h-7 w-7 rounded-md bg-primary" />
          <span className="text-base font-bold tracking-tight text-foreground">
            {FRONT_OFFICE_NAME}
          </span>
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          <nav aria-label="Main">
            <ul className="flex items-center gap-4 text-sm sm:gap-6">
              {FRONT_OFFICE_NAV.map((item) => (
                <li key={item.path} className={item.path.includes("#") ? "hidden sm:block" : ""}>
                  <Link
                    href={fo(item.path)}
                    className="font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Overview", path: "/" },
      { label: "Features", path: "/#features" },
      { label: "Tell me when it's ready", path: "/#notify" },
    ],
  },
  {
    title: "Help docs",
    links: [
      { label: "All docs", path: "/docs" },
      { label: "What it is", path: "/docs/what-it-is" },
      { label: "Who it talks to", path: "/docs/who-it-talks-to" },
      { label: "Connecting your tools", path: "/docs/connecting-your-tools" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Connect your platform", path: FRONT_OFFICE_DEVELOPERS_DOC },
      { label: "Tools that are easy to approve", path: "/docs/tool-guidelines" },
      { label: "Ask to be listed", path: FRONT_OFFICE_LISTING_DOC },
      { label: "llms.txt", path: "/llms.txt" },
    ],
  },
];

/** Footer of the Front Office site. */
export function FrontOfficeFooter() {
  return (
    <footer className="border-t border-border px-6 py-14">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-5 w-5 rounded bg-primary" />
            <span className="text-sm font-semibold tracking-tight text-foreground">
              {FRONT_OFFICE_NAME}
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {FRONT_OFFICE_STATUS}. Not yet available. The name is a working name.
          </p>
        </div>
        {footerColumns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="text-sm font-semibold text-foreground">{col.title}</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {col.links.map((link) => (
                <li key={link.path}>
                  {/* llms.txt is a plain file, so it gets a full page load. */}
                  {link.path.endsWith(".txt") ? (
                    <a
                      href={fo(link.path)}
                      className="text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={fo(link.path)}
                      className="text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} Formatic Systems. {FRONT_OFFICE_NAME} is made by{" "}
          {/* The one link that leaves the section: the parent company's site. */}
          <a href="https://formaticsystems.com" className="underline underline-offset-4 hover:text-primary">
            Formatic Systems
          </a>
          .
        </p>
        <a href="mailto:contact@formaticsystems.com" className="hover:text-primary">
          contact@formaticsystems.com
        </a>
      </div>
    </footer>
  );
}

/** Marks one feature or article as built-in-testing or coming. */
export function StatusTag({ status }: { status: FrontOfficeStatus }) {
  return (
    <span
      className={
        status === "testing"
          ? "inline-flex shrink-0 items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium whitespace-nowrap text-primary"
          : "inline-flex shrink-0 items-center rounded-full border border-dashed border-border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap text-muted-foreground"
      }
    >
      {FRONT_OFFICE_STATUS_LABEL[status]}
    </span>
  );
}

/** The plain statement of where the product stands, reused across pages. */
export function NotLaunchedNote({ className = "" }: { className?: string }) {
  return (
    <p
      className={`rounded-lg border border-border bg-card px-4 py-3 text-sm leading-relaxed text-muted-foreground ${className}`}
    >
      {FRONT_OFFICE_NAME} is not available yet. &ldquo;{FRONT_OFFICE_STATUS_LABEL.testing}&rdquo;{" "}
      means the feature exists and is being tested on sample data; no business is using it with
      real customers. &ldquo;{FRONT_OFFICE_STATUS_LABEL.coming}&rdquo; means it is designed and not
      built. The name is a working name and may change.
    </p>
  );
}
