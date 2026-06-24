import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "RESEND_API_KEY not configured" }, { status: 500 });
    }

    const emailBody = `
Neues Google Maps Audit angefordert

Name: ${body.name}
Firma: ${body.company}
Telefon: ${body.phone}
E-Mail: ${body.email}
Website: ${body.website || "—"}
Stadt: ${body.city}
Nachricht: ${body.message || "—"}
    `.trim();

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "noreply@ar-localgrowth.de",
        to: "a.r.localgrowth@gmail.com",
        reply_to: body.email,
        subject: `Audit-Anfrage: ${body.company} (${body.city})`,
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
