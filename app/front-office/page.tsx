import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Phone,
  MessageSquare,
  MessagesSquare,
  UserCheck,
  ShieldCheck,
  Plug,
  ClipboardList,
  Bot,
  PhoneOutgoing,
  Moon,
  Smartphone,
  Sunrise,
} from "lucide-react";
import { FrontOfficeHeader, NotLaunchedNote, StatusTag } from "@/components/front-office/section-shell";
import { NotifyForm } from "@/components/front-office/notify-form";
import {
  FRONT_OFFICE_DEVELOPERS_PATH,
  FRONT_OFFICE_DOCS_PATH,
  FRONT_OFFICE_NAME,
  FRONT_OFFICE_PATH,
  FRONT_OFFICE_SUMMARY,
  type FrontOfficeStatus,
} from "@/lib/front-office";

// Product page for Front Office (codename; name comes from lib/front-office.ts).
// NOT LAUNCHED: no prices, dates, customer counts or results, and no way to
// buy. Every feature carries a status: built and in testing, or coming.
// Public-tier facts only: nothing about how it is built or which vendors
// are behind it.

const title = `${FRONT_OFFICE_NAME} | Formatic Systems`;

export const metadata: Metadata = {
  title,
  description: FRONT_OFFICE_SUMMARY,
  alternates: { canonical: FRONT_OFFICE_PATH },
  openGraph: {
    title,
    description: FRONT_OFFICE_SUMMARY,
    url: `https://formaticsystems.com${FRONT_OFFICE_PATH}`,
    siteName: "Formatic Systems",
    type: "website",
  },
};

type Feature = {
  icon: typeof Phone;
  title: string;
  description: string;
  status: FrontOfficeStatus;
};

const features: Feature[] = [
  {
    icon: Phone,
    title: "Answers the phone",
    description:
      "Every call gets picked up. It says up front that it's an AI and that the call is recorded, answers questions from what you've published about your business, and takes the caller's name, what they need, the address, a call-back number and how urgent it is. You get a text summary when the call ends.",
    status: "testing",
  },
  {
    icon: MessageSquare,
    title: "Answers texts",
    description:
      "Customers can text your business number and get an answer. You can text it too: ask what's on tomorrow, or tell it to move a visit.",
    status: "testing",
  },
  {
    icon: MessagesSquare,
    title: "Chats on your website",
    description:
      "A chat box you add to your site answers visitors and turns them into leads. If a visitor types a phone number and asks for a call back, that becomes a task for you. It doesn't call a number just because someone typed it.",
    status: "testing",
  },
  {
    icon: UserCheck,
    title: "Knows who it's talking to",
    description:
      "A stranger hears only what you've made public. A customer can ask about their own appointment or balance after a quick check that it's really them. You and your team get more, after it confirms it's you.",
    status: "testing",
  },
  {
    icon: ShieldCheck,
    title: "Asks before anything risky",
    description:
      "Sending a customer a message, anything about money, cancelling or deleting something: it shows you exactly what it's about to do and waits for your yes. Small changes, like moving a calendar visit, it can make once it knows it's you.",
    status: "testing",
  },
  {
    icon: Plug,
    title: "Works with the tools you already use",
    description:
      "Connect Google Calendar and Gmail, QuickBooks Online or GoHighLevel by signing in. It reads first: anything that changes or sends something stays off until you switch it on. Jobber and Housecall Pro are planned.",
    status: "testing",
  },
  {
    icon: ClipboardList,
    title: "One place to see it all",
    description:
      "A dashboard with today's leads, calls with transcripts, the things waiting for your approval, tasks, and what your business has told it to say.",
    status: "testing",
  },
  {
    icon: Bot,
    title: "A team, not one bot",
    description:
      "Set up more agents from ready-made jobs: follow up on overdue invoices, remind customers of tomorrow's visit, ask for a review, text back a missed call. You choose what each one may use and whether it asks you first.",
    status: "coming",
  },
  {
    icon: PhoneOutgoing,
    title: "Fast reply to new leads",
    description:
      "When a lead comes in from your website form, it texts back right away and calls if there's no answer, only where the person agreed to be contacted and never during quiet hours.",
    status: "coming",
  },
  {
    icon: Sunrise,
    title: "A morning brief",
    description:
      "One text each morning: today's visits, new leads, overdue invoices, what's waiting for your OK, and the callers from yesterday worth a call back.",
    status: "coming",
  },
  {
    icon: Moon,
    title: "After-hours rules",
    description:
      "Set your hours and what happens outside them: answer as usual, take messages only, or sort out real emergencies and reach the person on call.",
    status: "coming",
  },
  {
    icon: Smartphone,
    title: "An app for your phone",
    description:
      "Approve, answer and check in from a job site. Today the dashboard works in a phone browser; a phone app is planned.",
    status: "coming",
  },
];

const notThis = [
  "It doesn't replace the software you run jobs and invoices from. It works alongside it.",
  "It doesn't change how it behaves based on what it hears unless you approve the change.",
  "It doesn't take payments.",
  "It speaks English only for now.",
];

export default function FrontOfficePage() {
  return (
    <>
      <Nav />
      <main>
        <FrontOfficeHeader
          current={FRONT_OFFICE_PATH}
          title="The office you can't afford to hire yet"
          lead="When you're on a job, nobody is answering the phone. This is a team of AI agents that does: it picks up calls, texts and website chat, takes down the lead, books the visit request, and tells you what happened. You stay in charge of anything that matters."
        >
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
            <Button
              asChild
              size="lg"
              className="bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
            >
              <a href="#notify">Tell me when it&apos;s ready</a>
            </Button>
            <Link
              href={FRONT_OFFICE_DOCS_PATH}
              className="text-sm font-medium text-muted-foreground underline underline-offset-4 transition-colors hover:text-primary"
            >
              Read how it works
            </Link>
          </div>
        </FrontOfficeHeader>

        {/* Where it stands */}
        <section className="px-6">
          <div className="mx-auto max-w-5xl">
            <NotLaunchedNote />
          </div>
        </section>

        {/* What it does */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold tracking-[-0.035em] text-foreground sm:text-4xl">
              What it does
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Each item says where it stands today.
            </p>
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {features.map((f) => (
                <div key={f.title} className="rounded-xl border border-border bg-card p-6">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <f.icon className="h-5 w-5 text-primary" />
                    </div>
                    <StatusTag status={f.status} />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who it's for + what it isn't */}
        <section className="px-6 py-24">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold tracking-[-0.035em] text-foreground sm:text-3xl">
                Who it&apos;s for
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Small service businesses, from one person up, in any trade. If you lose work
                because you can&apos;t pick up while your hands are full, and you spend evenings
                returning calls and looking things up, this is built for you.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-[-0.035em] text-foreground sm:text-3xl">
                What it isn&apos;t
              </h2>
              <ul className="mt-4 space-y-3 text-muted-foreground">
                {notThis.map((line) => (
                  <li key={line} className="flex gap-3 leading-relaxed">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Where to go next */}
        <section className="px-6 py-8">
          <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2">
            <Link
              href={FRONT_OFFICE_DOCS_PATH}
              className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/30"
            >
              <h3 className="text-lg font-semibold tracking-tight text-foreground">Help docs</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                For business owners: how it answers, who it talks to, what needs your approval,
                and how your tools connect.
              </p>
            </Link>
            <Link
              href={FRONT_OFFICE_DEVELOPERS_PATH}
              className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/30"
            >
              <h3 className="text-lg font-semibold tracking-tight text-foreground">For developers</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Run a platform that service businesses use? See how they can connect it, and ask
                to be listed.
              </p>
            </Link>
          </div>
        </section>

        {/* Get notified */}
        <section id="notify" className="scroll-mt-24 px-6 pt-16 pb-32">
          <div className="mx-auto max-w-5xl rounded-xl border border-border bg-card p-8 sm:p-12">
            <h2 className="text-2xl font-bold tracking-[-0.035em] text-foreground sm:text-3xl">
              Want to hear when it&apos;s ready?
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Leave your email and we&apos;ll write when {FRONT_OFFICE_NAME} opens to more
              businesses. This isn&apos;t a sign-up and there is nothing to pay.
            </p>
            <div className="mt-8 max-w-xl">
              <NotifyForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
