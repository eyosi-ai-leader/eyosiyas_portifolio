import nodemailer from "nodemailer";
export const maxDuration = 30;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map();

function isLimited(ip) {
  const now = Date.now();
  if (hits.size > 5000) hits.clear();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_MAX;
}

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const INTERESTS = [
  "Freelance Project",
  "Corporate Partnership",
  "Project Collaboration",
  "Startup Collaboration",
  "Technical Consultancy",
  "Other",
];

export async function POST(request) {
  const user = process.env.GMAIL_USER;
  const pass = (process.env.GMAIL_APP_PASSWORD || "").replace(/\s/g, "");
  const to = process.env.CONTACT_TO_EMAIL || user;

  if (!user || !pass) {
    console.error("Contact: GMAIL_USER or GMAIL_APP_PASSWORD is missing");
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isLimited(ip)) {
    return Response.json({ error: "rate_limited" }, { status: 429 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  // hidden trap field: real people leave it empty, bots fill it
  

  const clean = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  const name = clean(body?.name, 100);
  const email = clean(body?.email, 150);
  const phone = clean(body?.phone, 40);
  const interest = clean(body?.interest, 60);
  const subject = clean(body?.subject, 150);
  const message = clean(body?.message, 3000);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!name || !emailOk || !subject || !message || !INTERESTS.includes(interest)) {
    console.warn("Contact: rejected, invalid fields");
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "-"}`,
    `Interested in: ${interest}`,
    `Subject: ${subject}`,
    "",
    message,
  ].join("\n");

  const html = `
    <h3>New message from your portfolio</h3>
    <p><b>Name:</b> ${escapeHtml(name)}<br/>
    <b>Email:</b> ${escapeHtml(email)}<br/>
    <b>Phone:</b> ${escapeHtml(phone || "-")}<br/>
    <b>Interested in:</b> ${escapeHtml(interest)}<br/>
    <b>Subject:</b> ${escapeHtml(subject)}</p>
    <p style="white-space:pre-wrap">${escapeHtml(message)}</p>`;

  try {
    await transporter.verify(); // checks the Gmail login first
    const info = await transporter.sendMail({
      from: `"Portfolio" <${user}>`,
      to,
      replyTo: `${name} <${email}>`,
      subject: `[Portfolio] ${interest}: ${subject}`,
      text,
      html,
    });
    console.log(
      "Contact: sent from", user,
      "to", info.accepted,
      "rejected:", info.rejected
    );
    return Response.json({ ok: true });
  } 
  
  
  catch (err) {
    console.error("Contact email error:", err?.code, err?.message || err);
    return Response.json(
      {
        error: "send_failed",
        // the reason is shown only on your computer, never on the live site
        detail:
          process.env.NODE_ENV !== "production"
            ? `${err?.code || ""} ${err?.message || ""}`.trim()
            : undefined,
      },
      { status: 502 }
    );
  }
}