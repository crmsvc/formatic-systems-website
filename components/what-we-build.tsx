"use client";

import { motion } from "framer-motion";
import { Mic, Brain, Search, Wrench } from "lucide-react";

const products = [
  {
    icon: Mic,
    title: "Voice AI",
    description:
      "Phone agents that actually know your business. Not scraped websites and FAQ lists — real knowledge from your actual documents.",
  },
  {
    icon: Brain,
    title: "Knowledge Engine",
    description:
      "RAG-powered document intelligence. One knowledge base, multiple interfaces, consistent answers everywhere.",
  },
  {
    icon: Search,
    title: "Internal Tools",
    description:
      "Employee-facing search and knowledge retrieval. Your team gets the right answer instantly, every time.",
  },
  {
    icon: Wrench,
    title: "Open Resources",
    description:
      "Tools we use in-house, made available to you. RAG Digestor, file optimizers, and more coming soon.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function WhatWeBuild() {
  return (
    <section id="what-we-build" className="px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-[-0.035em] text-foreground sm:text-4xl">
            What We Build
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            AI products and services designed for how businesses actually operate.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-16 grid gap-4 sm:grid-cols-2"
        >
          {products.map((product) => (
            <motion.div
              key={product.title}
              variants={itemVariants}
              className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/30 hover:bg-card/80"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <product.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                {product.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
