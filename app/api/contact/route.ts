import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Payload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
};

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const name = str(body.name);
  const email = str(body.email);
  const message = str(body.message);

  // Server-side validation mirrors the client so the API is safe on its own.
  const fieldErrors: Record<string, string> = {};
  if (!name) fieldErrors.name = "Name is required.";
  if (!email) fieldErrors.email = "Email is required.";
  else if (!EMAIL_RE.test(email)) fieldErrors.email = "Email is invalid.";
  if (!message) fieldErrors.message = "Message is required.";
  if (message.length > 5000) fieldErrors.message = "Message is too long.";

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json({ error: "Validation failed", fieldErrors }, {
      status: 422,
    });
  }

  // TODO: wire real email delivery. Recommended: Resend.
  //   1. Add RESEND_API_KEY and a verified sender in Vercel project env vars.
  //   2. Uncomment and install `resend`:
  //
  //   import { Resend } from "resend";
  //   const resend = new Resend(process.env.RESEND_API_KEY);
  //   await resend.emails.send({
  //     from: "Speaking site <noreply@your-domain.com>",
  //     to: "you@your-domain.com",
  //     replyTo: email,
  //     subject: `Speaking inquiry from ${name}`,
  //     text: message,
  //   });
  //
  // Until then we log server-side and return success so the form flow works.
  console.info("[contact] inquiry received", { name, email });

  return NextResponse.json({ ok: true }, { status: 200 });
}
