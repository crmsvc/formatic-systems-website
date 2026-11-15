import Link from "next/link";
import {
  FRONT_OFFICE_NAME,
  FRONT_OFFICE_SECTIONS,
  FRONT_OFFICE_STATUS,
  FRONT_OFFICE_STATUS_LABEL,
  type FrontOfficeStatus,
} from "@/lib/front-office";

// Shared pieces for the Front Office pages (product page, help docs,
// developer page): the page header with its section links, and the small
// status tag that marks a feature as built-in-testing or coming.

type HeaderProps = {
  /** Path of the current section, to mark its link as the current page. */
  current: string;
  title: string;
  lead: string;
  children?: React.ReactNode;
};

/** Page header: status pill, section links, title and lead paragraph. */
export function FrontOfficeHeader({ current, title, lead, children }: HeaderProps) {
  return (
    <section className="relative overflow-hidden px-6 pt-32 pb-16">
      <div className="pointer-events-none absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
      <div className="relative mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {FRONT_OFFICE_NAME}: {FRONT_OFFICE_STATUS.toLowerCase()}
          </span>
          <nav aria-label={`${FRONT_OFFICE_NAME} sections`}>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {FRONT_OFFICE_SECTIONS.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    aria-current={s.href === current ? "page" : undefined}
                    className={
                      s.href === current
                        ? "font-semibold text-foreground underline decoration-primary decoration-2 underline-offset-8"
                        : "font-medium text-muted-foreground transition-colors hover:text-primary"
                    }
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <h1 className="mt-8 max-w-3xl text-4xl font-bold leading-[1.1] tracking-[-0.035em] text-foreground sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{lead}</p>
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}

/** Marks one feature or article as built-in-testing or coming. */
export function StatusTag({ status }: { status: FrontOfficeStatus }) {
  return (
    <span
      className={
        status === "testing"
          ? "inline-flex shrink-0 items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
          : "inline-flex shrink-0 items-center rounded-full border border-dashed border-border px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
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
