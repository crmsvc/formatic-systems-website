import { DocsSidebar, type SidebarSection } from "@/components/front-office/docs-sidebar";
import { frontOfficeDocSearchText, getFrontOfficeDocSections } from "@/lib/front-office-docs";
import { fo } from "@/lib/front-office";

// Layout for the help docs: a left sidebar (search + sections and pages) and
// the page beside it. The sidebar list is built here from the markdown files,
// so a new file shows up without editing this.

export default function FrontOfficeDocsLayout({ children }: { children: React.ReactNode }) {
  const sections: SidebarSection[] = getFrontOfficeDocSections().map((section) => ({
    title: section.title,
    docs: section.docs.map((doc) => ({
      href: fo(`/docs/${doc.slug}`),
      title: doc.title,
      description: doc.description,
      sectionTitle: section.title,
      coming: doc.status === "coming",
      headings: doc.headings.map((h) => h.text),
      text: frontOfficeDocSearchText(doc),
    })),
  }));

  return (
    <div className="mx-auto max-w-6xl px-6 pt-24 pb-24 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12">
      <aside className="mb-10 lg:mb-0">
        <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-2 lg:pb-4">
          <DocsSidebar sections={sections} />
        </div>
      </aside>
      <main className="min-w-0">{children}</main>
    </div>
  );
}
