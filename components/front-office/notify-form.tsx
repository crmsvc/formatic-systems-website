"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, AlertCircle } from "lucide-react";
import { FRONT_OFFICE_NAME } from "@/lib/front-office";

// "Tell me when it's ready" form on the Front Office product page.
// It reuses the site's existing contact endpoint (/api/contact, Resend), so
// there is no new email route or env value: the note arrives in the same
// inbox as the home-page contact form, with a subject line that names the
// product. It is an interest note only; nothing is sold or signed up for.

type Status = "idle" | "loading" | "success" | "error";

export function NotifyForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", business: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: `${FRONT_OFFICE_NAME}: please tell me when it is ready.\nBusiness / trade: ${
            form.business || "(not given)"
          }\nSent from the ${FRONT_OFFICE_NAME} page on formaticsystems.com.`,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", business: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <p role="status" className="flex items-start gap-2 text-sm text-emerald-500">
        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
        Got it. We&apos;ll email you when {FRONT_OFFICE_NAME} is ready for more businesses.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fo-notify-name">Your name</Label>
          <Input
            id="fo-notify-name"
            autoComplete="name"
            maxLength={120}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fo-notify-email">Email</Label>
          <Input
            id="fo-notify-email"
            type="email"
            autoComplete="email"
            maxLength={200}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="fo-notify-business">Your business or trade (optional)</Label>
        <Input
          id="fo-notify-business"
          placeholder="Plumbing, remodeling, cleaning…"
          maxLength={200}
          value={form.business}
          onChange={(e) => setForm({ ...form, business: e.target.value })}
        />
      </div>
      <Button
        type="submit"
        size="lg"
        className="bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Sending…" : "Tell me when it's ready"}
      </Button>
      {status === "error" && (
        <p role="alert" className="flex items-start gap-2 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          That didn&apos;t send. Email contact@formaticsystems.com and we&apos;ll add you by hand.
        </p>
      )}
    </form>
  );
}
