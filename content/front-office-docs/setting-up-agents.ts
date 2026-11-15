import { FRONT_OFFICE_NAME } from "@/lib/front-office";
import type { DocArticle } from "./types";

export const settingUpAgents: DocArticle = {
  slug: "setting-up-agents",
  title: "Setting up agents",
  summary:
    "The two agents every business starts with, and how you will be able to add more for jobs like invoice follow-up and appointment reminders.",
  status: "coming",
  updated: "2026-11-15",
  sections: [
    {
      heading: "The two you start with",
      status: "testing",
      blocks: [
        {
          type: "list",
          items: [
            "Receptionist: answers customers by phone, text and website chat. You can give it your own name.",
            "Office manager: works for you and your team. It is the one you text or talk to, and it can pass a job to another agent and bring back the result.",
          ],
        },
        {
          type: "p",
          text: "These two exist today in testing. The page where you add and edit agents yourself is not built yet.",
        },
      ],
    },
    {
      heading: "Adding an agent",
      blocks: [
        {
          type: "p",
          text: `In ${FRONT_OFFICE_NAME}, an agent is a job you describe, filled in on a form. There is no flowchart to draw. For each agent you will set:`,
        },
        {
          type: "list",
          items: [
            "What it's for, in your own words. A button can write the instructions for you from a one-line description.",
            "When it runs: on a schedule, such as weekdays at 9, or when something happens, such as a new lead.",
            "Which tools it may use.",
            "What it may know: public information only, customer details, or your internal notes.",
            "Whether it asks you first or acts on its own.",
            "A monthly spending limit.",
          ],
        },
        {
          type: "p",
          text: "You will be able to pause or delete an agent at any time, and see every time it ran: each step it took, each tool it used and what it cost.",
        },
      ],
    },
    {
      heading: "Ready-made jobs",
      blocks: [
        {
          type: "p",
          text: "You won't have to start from a blank form. These are planned as templates:",
        },
        {
          type: "list",
          items: [
            "Fast reply to a new lead.",
            "Text back after a missed call.",
            "Invoice follow-up: finds overdue invoices and drafts a text for each customer.",
            "Appointment reminder the day before a visit.",
            "Review request after a job. It asks; it never offers a reward for a review.",
            "Morning brief: one text with today's visits, new leads, overdue invoices, what's waiting for you, and callers worth a call back.",
            "After-hours emergency sorting (see \"What happens after hours\").",
            "Lead-quality check: flags paid leads that look like junk and drafts the dispute for you to send.",
            "A maintenance line for property managers, where tenants call or text about repairs.",
          ],
        },
      ],
    },
    {
      heading: "An example",
      blocks: [
        {
          type: "steps",
          items: [
            "You pick the invoice follow-up template and set it to weekdays at 9.",
            "You leave it on \"ask me before sending\".",
            "Next morning it finds the overdue invoices and writes one text per customer.",
            "The texts wait in your approvals list. Nothing goes out until you approve.",
          ],
        },
        {
          type: "p",
          text: "Even approved messages still go through the contact rules: no texts to someone who opted out, and none during quiet hours.",
        },
        {
          type: "note",
          text: "Not available yet. This article describes the design and may change before it is built.",
        },
      ],
    },
  ],
};
