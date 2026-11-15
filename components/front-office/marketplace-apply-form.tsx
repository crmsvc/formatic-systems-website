"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, AlertCircle } from "lucide-react";

// "Ask to be listed in the Marketplace" form on the Front Office developer
// page. Posts to /api/front-office/marketplace-apply, which emails the
// request to Formatic for review. Sending a request lists nothing: the copy
// here must not promise acceptance or a reply time.

type Status = "idle" | "loading" | "success" | "invalid" | "unavailable" | "error";

const empty = { company: "", email: "", serverUrl: "", docsUrl: "", tools: "", website: "" };

export function MarketplaceApplyForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState(empty);

  const set = (key: keyof typeof empty) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/front-office/marketplace-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm(empty);
      } else if (res.status === 400) {
        setStatus("invalid");
      } else if (res.status === 503) {
        setStatus("unavailable");
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
        Request sent. A person at Formatic will read it and reply to the email you gave. Sending a
        request does not list your platform.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fo-apply-company">Company</Label>
          <Input
            id="fo-apply-company"
            autoComplete="organization"
            maxLength={120}
            value={form.company}
            onChange={set("company")}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fo-apply-email">Contact email</Label>
          <Input
            id="fo-apply-email"
            type="email"
            autoComplete="email"
            maxLength={200}
            value={form.email}
            onChange={set("email")}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="fo-apply-server">MCP server address</Label>
        <Input
          id="fo-apply-server"
          type="url"
          inputMode="url"
          placeholder="https://"
          pattern="https://.*"
          title="An address that starts with https://"
          maxLength={300}
          value={form.serverUrl}
          onChange={set("serverUrl")}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="fo-apply-docs">Link to your documentation</Label>
        <Input
          id="fo-apply-docs"
          type="url"
          inputMode="url"
          placeholder="https://"
          pattern="https://.*"
          title="An address that starts with https://"
          maxLength={300}
          value={form.docsUrl}
          onChange={set("docsUrl")}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="fo-apply-tools">What your tools do</Label>
        <Textarea
          id="fo-apply-tools"
          rows={5}
          maxLength={3000}
          placeholder="Which tools only look things up, which ones change or send something, and what a service business would use them for."
          value={form.tools}
          onChange={set("tools")}
          required
        />
      </div>

      {/* Hidden from people; scripts that fill every field give themselves away. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="fo-apply-website">Leave this empty</label>
        <input
          id="fo-apply-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={set("website")}
        />
      </div>

      <Button
        type="submit"
        size="lg"
        className="bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Sending…" : "Send request for review"}
      </Button>

      {status === "invalid" && (
        <p role="alert" className="flex items-start gap-2 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          Check the fields: every one is needed, and both addresses must start with https://.
        </p>
      )}
      {(status === "unavailable" || status === "error") && (
        <p role="alert" className="flex items-start gap-2 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          The request was not sent. Email the same details to contact@formaticsystems.com.
        </p>
      )}
    </form>
  );
}
