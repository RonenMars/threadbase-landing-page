import { NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 254;
const MAX_NAME_LENGTH = 100;

interface SubscribeBody {
  email?: unknown;
  name?: unknown;
  company?: unknown;
}

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as SubscribeBody;
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const company = typeof body.company === "string" ? body.company.trim() : "";

  // Honeypot: bots fill hidden fields. Pretend success without contacting MailerLite.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  if (!email || email.length > MAX_EMAIL_LENGTH || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.MAILERLITE_API_KEY}`,
    },
    body: JSON.stringify({
      email,
      ...(name && { fields: { name: name.slice(0, MAX_NAME_LENGTH) } }),
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Subscription failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
