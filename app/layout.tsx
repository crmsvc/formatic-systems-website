import type { Metadata } from "next";
import { Syne } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Formatic Systems | AI Products & Services",
  description:
    "We build AI tools that help businesses run smarter.",
  openGraph: {
    title: "Formatic Systems | AI Products & Services",
    description:
      "We build AI tools that help businesses run smarter.",
    url: "https://formaticsystems.com",
    siteName: "Formatic Systems",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={syne.variable} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
