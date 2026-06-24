"use client";

import { ThemeToggle } from "./theme-toggle";
import { motion } from "framer-motion";

export function Nav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-primary" />
          <span className="text-base font-bold tracking-tight text-foreground">
            Formatic Systems
          </span>
        </div>
        <div className="flex items-center gap-4">
          {/* Links to the self-contained Formatic Labs preview (static page served
              from /public via a rewrite). Plain <a> so it does a full navigation
              rather than a client-side route transition. */}
          <a
            href="/lab/culture"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Labs
          </a>
          <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  );
}
