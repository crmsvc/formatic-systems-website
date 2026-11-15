import { FRONT_OFFICE_NAME } from "@/lib/front-office";
import type { DocArticle } from "./types";

export const afterHours: DocArticle = {
  slug: "after-hours",
  title: "What happens after hours",
  summary:
    "How calls are handled at night and on weekends today, and the hours and on-call rules that are planned.",
  status: "coming",
  updated: "2026-11-15",
  sections: [
    {
      heading: "Today, in testing",
      status: "testing",
      blocks: [
        {
          type: "p",
          text: `${FRONT_OFFICE_NAME} answers the same way at any hour. A call at 9 at night is picked up, the caller's details are taken, and you get the text summary. It does not yet know your business hours, and it does not treat an emergency differently from any other call.`,
        },
      ],
    },
    {
      heading: "Your hours and what happens outside them",
      blocks: [
        {
          type: "p",
          text: "You will set your business hours for each day of the week, and your holidays. Then you choose what the receptionist does outside those hours:",
        },
        {
          type: "list",
          items: [
            "Answer as usual.",
            "Take messages only.",
            "Sort emergencies from everything else, and act on the emergencies.",
          ],
        },
        {
          type: "p",
          text: "You will also choose the words that mark a call as urgent for your trade, and whether a live call may be passed to a person, and to whom.",
        },
      ],
    },
    {
      heading: "Reaching the person on call",
      blocks: [
        {
          type: "p",
          text: "For an urgent call outside your hours, it will work down a list you set up: who to try first, how many times, and how long to wait before moving on.",
        },
        {
          type: "steps",
          items: [
            "It texts the first person on the list.",
            "Then it calls them and says who called, what they need and the address.",
            "That person presses a key or replies to take the job, and it stops there.",
            "If nobody takes it, it moves to the next person. At the end of the list it texts everyone on it and records that no one was reached.",
          ],
        },
        {
          type: "p",
          text: "If you turn the option on, the caller gets a text that help is on the way once someone has taken the job. For a one-person business, the list is just you.",
        },
      ],
    },
    {
      heading: "Everything else waits for morning",
      blocks: [
        {
          type: "p",
          text: "Calls and messages that aren't urgent are saved, and show up in your morning brief along with the day's visits and new leads.",
        },
        {
          type: "p",
          text: "Anything it sends on its own, such as a reply to a new lead, will respect quiet hours: a lead that comes in late at night gets its text the next morning, and no call.",
        },
        {
          type: "note",
          text: "Not available yet. Hours, urgent-call handling and the on-call list are designed and not built. Until they are, do not plan on this product as your emergency line.",
        },
      ],
    },
  ],
};
