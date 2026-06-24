import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Serve the self-contained Formatic Labs "Culture" preview (a static HTML
      // file in /public) at the clean route /lab/culture. Query strings are
      // preserved, so the page's "Copy Share Link" feature works as-is.
      { source: "/lab/culture", destination: "/lab/culture.html" },
    ];
  },
};

export default nextConfig;
