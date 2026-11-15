import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { FrontOfficeHeader, NotLaunchedNote, StatusTag } from "@/components/front-office/section-shell";
import { MarketplaceApplyForm } from "@/components/front-office/marketplace-apply-form";
import { FRONT_OFFICE_DEVELOPERS_PATH, FRONT_OFFICE_NAME } from "@/lib/front-office";

// Developer page: how another platform makes itself connectable to a
// business using Front Office, and a form to ask for a Marketplace listing.
//
// Rules for this page:
// - No real endpoint addresses: the product's domain is undecided.
// - A listing request goes to a person for review. Never promise automatic
//   acceptance or a reply time. (Whether listing could ever be automatic is
//   an open decision; review-first is the default used here.)
// - Other companies are named in plain text only: no logos, and never
//   "partner" or "certified".
// - Describe what a platform and a business owner see, not how it is built.

const title = `${FRONT_OFFICE_NAME} for developers | Formatic Systems`;
const description = `How a software platform connects to businesses that use ${FRONT_OFFICE_NAME}: offer a remote MCP server, let the owner add it by address, and ask to be listed in the Marketplace.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: FRONT_OFFICE_DEVELOPERS_PATH },
  openGraph: {
    title,
    description,
    url: `https://formaticsystems.com${FRONT_OFFICE_DEVELOPERS_PATH}`,
    siteName: "Formatic Systems",
    type: "website",
  },
};

const steps = [
  {
    title: "Offer a remote MCP server",
    body: "Publish your tools on a Model Context Protocol server that is reachable over HTTPS. There is nothing to install on our side and no SDK of ours to adopt: if your server works with other MCP clients, it is the right shape.",
  },
  {
    title: "The business owner adds it by address",
    body: "In their dashboard the owner opens Marketplace, chooses \"Add your own MCP server\" and pastes your server's address. No approval from us is needed for this step.",
  },
  {
    title: "The owner signs in, if you ask for it",
    body: "If your server requires OAuth, the owner is sent to your sign-in page and grants access there. Their password for your product is never typed into ours.",
  },
  {
    title: "Every tool arrives switched off",
    body: "Each tool your server offers shows up in the owner's list turned off and treated as a high-risk write, whatever it actually does. Nothing can call it yet.",
  },
  {
    title: "The owner reviews each tool",
    body: "The owner reads the name and description of each tool, turns on the ones they want, and can mark a tool as read-only or low risk. Tools left as high risk still work, but each use waits for the owner's approval.",
  },
];

const goodTools = [
  {
    title: "Names and descriptions a business owner can read",
    body: "The person approving your tool runs a plumbing or cleaning business. \"Look up a customer by phone number\" gets switched on. \"execute_query\" does not.",
  },
  {
    title: "Reading kept apart from writing",
    body: "One tool that looks something up, another that changes it. A tool that does both has to be treated as a write, so the owner can't give it the lighter setting.",
  },
  {
    title: "One job per tool",
    body: "A tool that does a single clear thing is easy to judge. A tool with a mode switch that can do ten things is not.",
  },
  {
    title: "OAuth sign-in",
    body: "Owners are used to \"sign in and allow\". It also means access can be taken away from your side without anyone copying keys around.",
  },
  {
    title: "Say plainly what leaves the building",
    body: "If a tool sends a message to a customer, moves money, or deletes or cancels something, say so in the first sentence of its description. Those uses always wait for the owner's approval, and a clear description is what gets them approved.",
  },
  {
    title: "Keep descriptions steady",
    body: "If a tool's description changes after the owner has reviewed it, the tool switches itself off until the owner reviews it again. Change descriptions when the behaviour changes, not for wording.",
  },
  {
    title: "Return only what was asked for",
    body: "Send back the fields the task needs. Smaller answers are faster on a live phone call and put less of a customer's data in play.",
  },
];

const listed = [
  "Google Calendar and Gmail",
  "QuickBooks Online",
  "GoHighLevel",
];

export default function FrontOfficeDevelopersPage() {
  return (
    <>
      <Nav />
      <main>
        <FrontOfficeHeader
          current={FRONT_OFFICE_DEVELOPERS_PATH}
          title="Make your platform connectable"
          lead={`If service businesses run on your software, their ${FRONT_OFFICE_NAME} agents can use it too. There are two routes: a business adds your MCP server itself, or you ask us to list you in the Marketplace.`}
        />

        <section className="px-6">
          <div className="mx-auto max-w-5xl">
            <NotLaunchedNote />
          </div>
        </section>

        {/* Route 1: a business adds your server */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-3xl font-bold tracking-[-0.035em] text-foreground sm:text-4xl">
                How a business connects your platform
              </h2>
              <StatusTag status="testing" />
            </div>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              This route needs nothing from us. It works for any platform with a remote MCP server.
            </p>
            <ol className="mt-12 max-w-3xl space-y-8">
              {steps.map((step, i) => (
                <li key={step.title} className="flex gap-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-12 max-w-3xl space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                <span className="font-semibold text-foreground">Who your tools act for.</span> Tools
                added this way are used only on behalf of the owner and their team. They are never
                offered to a caller, a texter or a website visitor.
              </p>
              <p className="leading-relaxed">
                <span className="font-semibold text-foreground">Addresses.</span> The product&apos;s
                own domain is not decided, so this page gives no addresses for it. Any exact
                addresses you need will be published here at launch.
              </p>
            </div>
          </div>
        </section>

        {/* What makes a tool easy to approve */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold tracking-[-0.035em] text-foreground sm:text-4xl">
              What makes a tool easy to approve
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              The owner decides tool by tool. These are the things that get a tool switched on.
            </p>
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {goodTools.map((item) => (
                <div key={item.title} className="rounded-xl border border-border bg-card p-6">
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Route 2: the Marketplace */}
        <section className="px-6 py-24">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-3xl font-bold tracking-[-0.035em] text-foreground sm:text-4xl">
                  The Marketplace
                </h2>
                <StatusTag status="coming" />
              </div>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                The Marketplace is the page where a business owner sees what can be connected with
                one click. Today it holds connections we built ourselves:
              </p>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                {listed.map((name) => (
                  <li key={name} className="flex gap-3 leading-relaxed">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {name}
                  </li>
                ))}
              </ul>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Jobber and Housecall Pro are planned. Listings for other platforms are a later
                step: the listing process is not open yet, and we are collecting requests now so we
                know who to talk to when it is.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Every request is read by a person. Sending one does not list your platform, and a
                listing is not needed for a business to connect you by address.
              </p>
              <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                Product names belong to their owners. Naming a product here means a connection to
                it exists or is planned; it does not mean that company endorses or is affiliated
                with Formatic Systems.
              </p>
            </div>

            <div id="apply" className="scroll-mt-24 rounded-xl border border-border bg-card p-8">
              <h2 className="text-2xl font-bold tracking-[-0.035em] text-foreground">
                Ask to be listed
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Tell us about your server. The request goes to Formatic for review.
              </p>
              <div className="mt-8">
                <MarketplaceApplyForm />
              </div>
            </div>
          </div>
        </section>

        <div className="pb-16" />
      </main>
      <Footer />
    </>
  );
}
