import { FRONT_OFFICE_NAME } from "@/lib/front-office";
import type { DocArticle } from "./types";

export const whoItTalksTo: DocArticle = {
  slug: "who-it-talks-to",
  title: "Who it talks to, and what it won't do without your approval",
  summary:
    "It treats a stranger, a customer and you differently. Here is what each can get, and which actions always wait for your yes.",
  status: "testing",
  updated: "2026-11-15",
  sections: [
    {
      heading: "Three kinds of people",
      blocks: [
        {
          type: "p",
          text: `Every conversation starts with ${FRONT_OFFICE_NAME} working out who is on the other end. What it will say and do depends on the answer.`,
        },
        {
          type: "list",
          items: [
            "Anyone: a new caller, a website visitor, an unknown number. They hear only what you have made public. They can leave a message, ask for a visit, and become a lead.",
            "A customer: someone whose number matches a customer of yours. After a quick check that it's really them, they can ask about their own appointment. For money questions, such as what they still owe, it checks again more strictly first. You choose whether customers can do this at all.",
            "You and your team: after it confirms it's you, you can ask about the schedule, customers and leads, and tell it to make changes.",
          ],
        },
        {
          type: "p",
          text: "A customer only ever hears about their own account. A stranger never hears anything about any customer, and never hears your internal notes.",
        },
      ],
    },
    {
      heading: "It doesn't trust a phone number alone",
      blocks: [
        {
          type: "p",
          text: "Caller ID can be faked, so a matching number is not enough. Before it shares anything about an account, or takes an instruction from you, it asks for something only the right person would know. Too many wrong answers and it stops trying and tells you.",
        },
      ],
    },
    {
      heading: "What always waits for your yes",
      blocks: [
        {
          type: "p",
          text: "Some actions are treated as risky no matter who asks or how:",
        },
        {
          type: "list",
          items: [
            "Sending a message to a customer.",
            "Anything about money, such as an invoice reminder.",
            "Cancelling or deleting something.",
            "Anything done through a tool you added yourself and haven't yet marked as safe.",
          ],
        },
        {
          type: "p",
          text: "For these it tells you exactly what it is about to do and waits. By text, you reply to confirm. On a call, you press a key. In the dashboard, there are Approve and Reject buttons. It carries out exactly what it showed you, once.",
        },
      ],
    },
    {
      heading: "What it can do without asking each time",
      blocks: [
        {
          type: "p",
          text: "Smaller changes, such as adding or moving a visit on your calendar, updating a contact or creating a task, it can make once it has confirmed it's you. It then tells you what it did.",
        },
        {
          type: "p",
          text: "Customers and strangers can only do three things on their own: leave a message, ask for a visit, and become a lead. A customer who has passed the stricter check can also ask to move or cancel their own visit request.",
        },
      ],
    },
    {
      heading: "Everything is written down",
      blocks: [
        {
          type: "p",
          text: "Each action is recorded with who asked for it and when, so you can look back at what was done and why.",
        },
        {
          type: "p",
          text: "It can notice things worth remembering, such as a customer who prefers afternoon visits, and suggest them to you. Nothing it notices changes how it behaves until you approve it.",
        },
      ],
    },
    {
      heading: "Approvals for agents that work on their own",
      status: "coming",
      blocks: [
        {
          type: "p",
          text: "When you can set up more agents (see \"Setting up agents\"), each one will have a setting: ask me first, or act on its own. Either way, the risky actions above will still wait in an approvals list for you.",
        },
      ],
    },
  ],
};
