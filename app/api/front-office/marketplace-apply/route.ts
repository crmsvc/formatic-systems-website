import { NextResponse } from "next/server";
import { FRONT_OFFICE_NAME } from "@/lib/front-office";

// Receives the "ask to be listed in the Marketplace" form on the Front Office
// developer page and emails it to Formatic for review. Same Resend pattern as
// app/api/contact/route.ts, and the same two env values:
//   RESEND_API_KEY  (required; without it this returns 503 and sends nothing)
//   CONTACT_EMAIL   (optional; defaults to contact@formaticsystems.com)
//
// A request is only ever a request: nothing is listed, stored or accepted
// here. A person at Formatic reads the email and decides.

const MAX = { company: 120, email: 200, url: 300, tools: 3000 };

/** Trimmed string within a length limit, or null. */
function text(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const v = value.trim();
  return v.length > 0 && v.length <= max ? v : null;
}

/** An https address, or null. Only the format is checked; nothing is fetched. */
function httpsUrl(value: unknown): string | null {
  const v = text(value, MAX.url);
  if (!v) return null;
  try {
    const u = new URL(v);
    return u.protocol === "https:" ? u.toString() : null;
  } catch {
    return null;
  }
}

/** Keeps a value on one line, so it cannot add lines to the email subject. */
const oneLine = (v: string) => v.replace(/[\r\n]+/g, " ");

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Hidden field real people never see. If it is filled in, a script sent
    // this: answer as if it worked and send nothing.
    if (typeof body.website === "string" && body.website.trim() !== "") {
      return NextResponse.json({ success: true });
    }

    const company = text(body.company, MAX.company);
    const emailRaw = text(body.email, MAX.email);
    const email = emailRaw && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailRaw) ? emailRaw : null;
    const serverUrl = httpsUrl(body.serverUrl);
    const docsUrl = httpsUrl(body.docsUrl);
    const tools = text(body.tools, MAX.tools);

    const problems: string[] = [];
    if (!company) problems.push("company");
    if (!email) problems.push("email");
    if (!serverUrl) problems.push("serverUrl");
    if (!docsUrl) problems.push("docsUrl");
    if (!tools) problems.push("tools");
    if (problems.length > 0 || !company || !email || !serverUrl || !docsUrl || !tools) {
      return NextResponse.json(
        { error: "Some fields are missing or not valid", fields: problems },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY not configured");
      return NextResponse.json({ error: "Email service not configured" }, { status: 503 });
    }

    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const { data, error: sendError } = await resend.emails.send({
      from: "Formatic Systems <noreply@crmsvc.com>",
      to: process.env.CONTACT_EMAIL || "contact@formaticsystems.com",
      replyTo: email,
      subject: `${FRONT_OFFICE_NAME} Marketplace request: ${oneLine(company)}`,
      text: [
        `A platform asked to be listed in the ${FRONT_OFFICE_NAME} Marketplace.`,
        "This is a request for review. Nothing has been listed or accepted.",
        "",
        `Company: ${oneLine(company)}`,
        `Contact email: ${email}`,
        `MCP server address: ${serverUrl}`,
        `Documentation: ${docsUrl}`,
        "",
        "What the tools do:",
        tools,
        "",
        "The addresses above were typed by the sender and have not been opened or checked.",
      ].join("\n"),
    });

    if (sendError) {
      console.error("Resend error:", JSON.stringify(sendError));
      return NextResponse.json({ error: "Failed to send request" }, { status: 500 });
    }

    console.log("Marketplace request sent:", data?.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Marketplace request error:", error);
    return NextResponse.json({ error: "Failed to send request" }, { status: 500 });
  }
}
