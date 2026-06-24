"use client";

import { motion } from "framer-motion";

export function Philosophy() {
  return (
    <section className="px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative rounded-2xl border border-border bg-card p-10 sm:p-16"
        >
          {/* Decorative accent */}
          <div className="absolute -top-px left-12 right-12 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Formatic Labs
          </p>
          <p className="mt-4 text-2xl font-semibold italic leading-snug tracking-[-0.02em] text-foreground sm:text-3xl md:text-4xl">
            Curiosity, with the safety off.
          </p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Labs is where we follow curiosity instead of a roadmap — a place to
            prototype creative ideas and solutions with nothing to prove and no
            one to please. No clients. No deadlines. Just whatever&apos;s worth
            building to find out if it works. Some experiments grow into
            products. Most just get to be interesting. Either way, this is where
            Formatic thinks out loud.
          </p>
          {/* Plain <a> (not next/link): the Culture page is a static file served
              from /public via a rewrite, so it needs a full navigation. */}
          <a
            href="/lab/culture"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            See what&apos;s growing
            <span aria-hidden="true">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
