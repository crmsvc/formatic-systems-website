"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

// "Copy as markdown" control on each help article: puts the whole article,
// as plain markdown, on the clipboard so it can be pasted into an AI
// assistant or a document. The text is the same as the page's .md address.

export function CopyMarkdownButton({ markdown }: { markdown: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setState("copied");
    } catch {
      // Clipboard blocked (old browser, or the page isn't allowed): say so
      // and leave the "View as markdown" link beside this button as the way out.
      setState("failed");
    }
    setTimeout(() => setState("idle"), 2500);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-card px-3 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
    >
      {state === "copied" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      <span aria-live="polite">
        {state === "copied"
          ? "Copied"
          : state === "failed"
            ? "Couldn't copy. Use View as markdown"
            : "Copy as markdown"}
      </span>
    </button>
  );
}
