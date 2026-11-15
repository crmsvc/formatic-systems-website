import { FRONT_OFFICE_NAME } from "@/lib/front-office";
import type { DocArticle } from "./types";

export const whatItIs: DocArticle = {
  slug: "what-it-is",
  title: "What it is, and how it answers calls, texts and web chat",
  summary:
    "The short version of what the product does, and what a customer hears or sees on each of the three ways they can reach you.",
  status: "testing",
  updated: "2026-11-15",
  sections: [
    {
      heading: "What it is",
      blocks: [
        {
          type: "p",
          text: `${FRONT_OFFICE_NAME} gives a small service business a team of AI agents that works as its front office. You start with two: a receptionist that deals with customers, and an office manager that works for you and your team.`,
        },
        {
          type: "p",
          text: "The receptionist answers your phone, your texts and the chat box on your website. The office manager is the one you text or talk to when you want to know what's on tomorrow or need something changed.",
        },
        {
          type: "p",
          text: "All of them work from the same information and follow the same rules, so a customer gets the same answer by phone as by text.",
        },
      ],
    },
    {
      heading: "On a phone call",
      blocks: [
        {
          type: "steps",
          items: [
            "It picks up and says it is an AI assistant and that the call is recorded.",
            "It answers questions using what you have published about your business: your services, your area, your hours.",
            "If the caller needs work done, it asks for their name, what they need, the address, a call-back number and how urgent it is. It reads the number back to make sure it's right, and asks how they found you.",
            "It saves the call as a lead with a visit request.",
            "When the call ends you get one text with the name, the need, the address, the number and whether it's urgent.",
          ],
        },
        {
          type: "p",
          text: "The caller can talk over it and it will stop and listen, the way a person would. The full transcript and the recording are kept in your dashboard.",
        },
      ],
    },
    {
      heading: "By text",
      blocks: [
        {
          type: "p",
          text: "A customer who texts your business number gets a short answer back, from the same published information. If they ask for work, it takes the same details as on a call.",
        },
        {
          type: "p",
          text: "If someone texts STOP or another opt-out word, it stops texting them.",
        },
      ],
    },
    {
      heading: "On your website",
      blocks: [
        {
          type: "p",
          text: "You add a chat box to your site by pasting in one line of code. Visitors type a question and get an answer. If they want work done, the chat takes their details and creates a lead.",
        },
        {
          type: "p",
          text: "If a visitor types a phone number and asks for a call back, that becomes a task for you. It does not call or text the number on its own, because anyone can type anyone's number into a chat box.",
        },
      ],
    },
    {
      heading: "What it does not do yet",
      status: "coming",
      blocks: [
        {
          type: "list",
          items: [
            "Calls and texts that it starts itself, such as replying fast to a new lead, appointment reminders and follow-ups.",
            "Different behaviour inside and outside your business hours.",
            "Passing a live call to you or a team member.",
            "Languages other than English.",
          ],
        },
        {
          type: "note",
          text: `${FRONT_OFFICE_NAME} is still being tested on sample data and is not open to businesses. This page describes how it works in testing and may change before launch.`,
        },
      ],
    },
  ],
};
