import type { Metadata } from "next";
import { FrontOfficeFooter, FrontOfficeNav } from "@/components/front-office/section-shell";
import {
  FRONT_OFFICE_NAME,
  FRONT_OFFICE_ORIGIN,
  FRONT_OFFICE_SUMMARY,
  foUrl,
} from "@/lib/front-office";

// Layout for the whole Front Office site. Everything under this folder gets
// the product's own navigation and footer instead of the Formatic Systems
// ones: the section is built as a self-contained site that can move to its
// own domain later (see lib/front-office.ts for the steps).

export const metadata: Metadata = {
  metadataBase: new URL(FRONT_OFFICE_ORIGIN),
  // Pages set a short title; this adds the product name after it.
  title: { default: FRONT_OFFICE_NAME, template: `%s | ${FRONT_OFFICE_NAME}` },
  description: FRONT_OFFICE_SUMMARY,
  openGraph: {
    title: FRONT_OFFICE_NAME,
    description: FRONT_OFFICE_SUMMARY,
    url: foUrl("/"),
    siteName: FRONT_OFFICE_NAME,
    type: "website",
  },
};

export default function FrontOfficeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FrontOfficeNav />
      {children}
      <FrontOfficeFooter />
    </>
  );
}
