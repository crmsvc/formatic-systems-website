import { FRONT_OFFICE_NAME } from "@/lib/front-office";
import type { DocArticle } from "./types";

export const connectingYourTools: DocArticle = {
  slug: "connecting-your-tools",
  title: "Connecting your tools",
  summary:
    "How your calendar, email, books and other software connect, what is switched on when they do, and how to add a tool that isn't on the list.",
  status: "testing",
  updated: "2026-11-15",
  sections: [
    {
      heading: "Why connect anything",
      blocks: [
        {
          type: "p",
          text: `On its own, ${FRONT_OFFICE_NAME} can answer questions and take leads. Connected to your tools, it can also tell you what's on tomorrow, book a visit on your calendar, or tell a customer what they owe.`,
        },
        {
          type: "p",
          text: "It reads your customers' account details from your own software at the moment they are needed. It does not keep its own copy of balances or invoices.",
        },
      ],
    },
    {
      heading: "What you can connect",
      blocks: [
        {
          type: "p",
          text: "The Marketplace page in your dashboard lists what can be connected:",
        },
        {
          type: "list",
          items: [
            "Google Calendar and Gmail: see and book visits, find and read email, write drafts.",
            "QuickBooks Online: look up customers, invoices, estimates and overdue balances.",
            "GoHighLevel: look up contacts, opportunities and appointments, and add or update them.",
          ],
        },
        {
          type: "note",
          text: "These three are built and being tested on sample accounts. They are not yet connected to any real business.",
        },
      ],
    },
    {
      heading: "How connecting works",
      blocks: [
        {
          type: "steps",
          items: [
            "Open Marketplace and choose Connect on the tool.",
            "Sign in to that tool on its own sign-in page and allow access. Your password is never typed into the dashboard.",
            "The tool's abilities appear as a list, each with its own switch.",
          ],
        },
        {
          type: "p",
          text: "When a tool is first connected, the abilities that only look things up are on. The ones that change or send something are off until you switch them on. Only the owner of the account can connect a tool.",
        },
        {
          type: "p",
          text: "Connected tools are used on behalf of you and your team. A customer only ever gets their own details, and only after the checks described in \"Who it talks to\".",
        },
      ],
    },
    {
      heading: "Adding a tool that isn't on the list",
      blocks: [
        {
          type: "p",
          text: "Many software companies now offer a way for AI assistants to use their product, called an MCP server. If a tool you use offers one, you can add it yourself: choose \"Add your own MCP server\" in Marketplace and paste in the address the company gives you. If it asks you to sign in, you sign in on its page.",
        },
        {
          type: "p",
          text: "Everything that arrives this way starts switched off and is treated as risky. You go through the list, switch on what you want, and mark an ability as look-up only or low risk if that's what it is. If the company later changes what an ability does, it switches itself off until you look at it again.",
        },
        {
          type: "p",
          text: "Tools added this way are only ever used for you and your team, never for a caller or customer.",
        },
      ],
    },
    {
      heading: "Using your tools from your own AI assistant",
      blocks: [
        {
          type: "p",
          text: `If you already use an AI assistant yourself, you can let it use the same tools through ${FRONT_OFFICE_NAME}. The same rules apply: risky actions wait in your approvals list.`,
        },
      ],
    },
    {
      heading: "Planned",
      status: "coming",
      blocks: [
        {
          type: "list",
          items: [
            "Jobber and Housecall Pro, so visits and customers come from the software you already schedule from. These are planned and depend on those companies.",
            "Listings in the Marketplace from other software companies.",
          ],
        },
      ],
    },
  ],
};
