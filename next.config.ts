import type { NextConfig } from "next";
import { fo } from "./lib/front-office";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Serve the self-contained Formatic Labs "Culture" preview (a static HTML
      // file in /public) at the clean route /lab/culture. Query strings are
      // preserved, so the page's "Copy Share Link" feature works as-is.
      { source: "/lab/culture", destination: "/lab/culture.html" },
      // Front Office help docs as plain markdown: <docs address>.md is served
      // by app/front-office/docs-md/[file]/route.ts.
      { source: `${fo("/docs")}/:file(.+\\.md)`, destination: `${fo("/docs-md")}/:file` },
    ];
  },
  async redirects() {
    return [
      // The developer pages live inside the help docs. Keep the short address.
      {
        source: fo("/developers"),
        destination: fo("/docs/connect-your-platform"),
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
