import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Gift, QrCode, Route, SlidersHorizontal, Users, FlaskConical, ArrowRight } from "lucide-react";
import {
  REFERRALPRO_NAME,
  REFERRALPRO_PATH,
  REFERRALPRO_SIGN_IN_URL,
  REFERRALPRO_SUMMARY,
  REFERRALPRO_WAITLIST_URL,
} from "@/lib/referralpro";

// Temporary home for ReferralPro until it has its own domain (handoff
// 2026-11-08). Private beta: waitlist only, no pricing, no customer names,
// industry-neutral copy ("service businesses", "customers", "projects").

const title = `${REFERRALPRO_NAME} | Formatic Systems`;

export const metadata: Metadata = {
  title,
  description: REFERRALPRO_SUMMARY,
  alternates: { canonical: REFERRALPRO_PATH },
  openGraph: {
    title,
    description: REFERRALPRO_SUMMARY,
    url: `https://formaticsystems.com${REFERRALPRO_PATH}`,
    siteName: "Formatic Systems",
    type: "website",
  },
};

const features = [
  {
    icon: QrCode,
    title: "A link and a QR code",
    description:
      "Every customer gets their own share link and QR code. They text it, post it, or hand it over in person.",
  },
  {
    icon: Route,
    title: "Every referral, tracked",
    description:
      "Follow each referral from the first click to the finished job, so you always know who sent the work.",
  },
  {
    icon: SlidersHorizontal,
    title: "Rewards on your rules",
    description:
      "You decide when a referral earns a reward and how much. Nothing goes out until your rules say it should.",
  },
  {
    icon: Gift,
    title: "Gift card or job credit",
    description:
      "Thank customers with a gift card, or a credit toward their next project with you.",
  },
];

/** Primary CTA + the small sign-in link, used in the hero and at the bottom. */
function WaitlistActions() {
  return (
    <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
      <Button
        asChild
        size="lg"
        className="bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
      >
        <a href={REFERRALPRO_WAITLIST_URL}>
          Join the waitlist
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </Button>
      <a
        href={REFERRALPRO_SIGN_IN_URL}
        className="text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        Already invited? <span className="font-medium underline underline-offset-4">Sign in</span>
      </a>
    </div>
  );
}

export default function ReferralProPage() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden px-6 pt-40 pb-24">
          <div className="pointer-events-none absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
          <div className="relative mx-auto max-w-5xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Private beta
            </span>
            <h1 className="mt-6 text-5xl font-bold leading-[1.1] tracking-[-0.035em] text-foreground sm:text-6xl">
              {REFERRALPRO_NAME}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Turn happy customers into your best source of new work. A simple
              referral program for service businesses, from the first share to
              the thank-you.
            </p>
            <div className="mt-10">
              <WaitlistActions />
            </div>
          </div>
        </section>

        {/* What it does */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold tracking-[-0.035em] text-foreground sm:text-4xl">
              What it does
            </h2>
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {features.map((f) => (
                <div key={f.title} className="rounded-xl border border-border bg-card p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <f.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who it's for + private test */}
        <section className="px-6 py-24">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold tracking-[-0.035em] text-foreground sm:text-3xl">
                Who it&apos;s for
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Service businesses whose customers come back and tell their
                friends. If word of mouth already brings you work, {REFERRALPRO_NAME}{" "}
                helps you see it, reward it, and get more of it.
              </p>
            </div>
            <div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <FlaskConical className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold tracking-[-0.035em] text-foreground sm:text-3xl">
                In a private test
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {REFERRALPRO_NAME} is being tested with a small group of
                businesses. Join the waitlist and we&apos;ll be in touch when
                there&apos;s room for more.
              </p>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="px-6 pt-8 pb-32">
          <div className="mx-auto max-w-5xl rounded-xl border border-border bg-card p-8 sm:p-12">
            <h2 className="text-2xl font-bold tracking-[-0.035em] text-foreground sm:text-3xl">
              Want in early?
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Add your business to the waitlist. It takes a minute.
            </p>
            <div className="mt-8">
              <WaitlistActions />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
