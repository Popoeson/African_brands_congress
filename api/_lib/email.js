const TIMEOUT_MS = 10000;

export function notifyList() {
  return (process.env.NOTIFY_TO || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/** True only when a provider is fully set up. Without it the site runs on the Google Sheet alone. */
export function emailConfigured() {
  const provider = (process.env.EMAIL_PROVIDER || "resend").toLowerCase();
  if (!process.env.EMAIL_FROM) return false;
  if (provider === "brevo") return Boolean(process.env.BREVO_API_KEY);
  return Boolean(process.env.RESEND_API_KEY);
}

/** "Name <a@b.com>" -> { name, email } (for Brevo) */
function parseFrom(from) {
  const m = from.match(/^(.*)<([^>]+)>\s*$/);
  return m ? { name: m[1].trim().replace(/^"|"$/g, ""), email: m[2].trim() } : { email: from.trim() };
}

export async function sendEmail({ to, subject, html, text, replyTo }) {
  const provider = (process.env.EMAIL_PROVIDER || "resend").toLowerCase();
  const from = process.env.EMAIL_FROM;
  const recipients = Array.isArray(to) ? to : [to];

  if (!from) throw new Error("EMAIL_FROM is not set");
  if (!recipients.length || !recipients[0]) throw new Error("No email recipient");

  if (provider === "brevo") {
    const key = process.env.BREVO_API_KEY;
    if (!key) throw new Error("BREVO_API_KEY is not set");
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "api-key": key, "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        sender: parseFrom(from),
        to: recipients.map((email) => ({ email })),
        subject,
        htmlContent: html,
        textContent: text,
        ...(replyTo ? { replyTo: { email: replyTo } } : {}),
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) throw new Error(`Brevo responded ${res.status}`);
    return;
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: recipients,
      subject,
      html,
      text,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}`);
}