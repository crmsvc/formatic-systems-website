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

          <p className="text-2xl font-semibold leading-snug tracking-[-0.02em] text-foreground sm:text-3xl md:text-4xl">
            We don&apos;t scrape your website and call it trained.
          </p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            The AI industry has conditioned businesses to accept fast and shallow
            as the standard. Five-minute setups. Website scraping. Ten FAQ
            answers. We believe if it&apos;s worth doing, it&apos;s worth doing
            right — with real documents, real knowledge, and real answers.
          </p>
          <div className="mt-8 h-px w-16 bg-primary/40" />
        </motion.div>
      </div>
    </section>
  );
}
