import { NextResponse } from "next/server";

async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return false;
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret, response: token }),
  });
  const data = await res.json();
  return data.success === true;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const valid = await verifyTurnstile(body.turnstileToken ?? "");
    if (!valid) {
      return NextResponse.json({ error: "Bot check failed" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "RESEND_API_KEY not configured" }, { status: 500 });
    }

    const emailBody = `
Neue Anfrage über arlocalgrowth.de

Name: ${body.name}
Unternehmen: ${body.company}
E-Mail: ${body.email}
Stadt: ${body.city}
Telefon: ${body.phone || "—"}
Google Business Profil: ${body.gbpUrl || "—"}

Problem / Frage:
${body.problem}
    `.trim();

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: "a.r.localgrowth@gmail.com",
        reply_to: body.email,
        subject: `Neue Anfrage: ${body.company} (${body.city})`,
        text: emailBody,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
      return NextResponse.json({ error: "Email delivery failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Audit route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
