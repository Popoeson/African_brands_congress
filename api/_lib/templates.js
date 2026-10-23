const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const multiline = (s) => esc(s).replace(/\n/g, "<br>");

/** Email sent to the client for every submission. */
export function notification({ title, fields, values, when }) {
  const rows = fields.map((f) => [f.label, values[f.key] || "-"]);

  const text = [title, "", ...rows.map(([l, v]) => `${l}: ${v}`), "", `Received: ${when} (Lagos time)`].join("\n");

  const html = `
<div style="font-family:Arial,sans-serif;color:#111;max-width:600px">
  <h2 style="margin:0 0 16px">${esc(title)}</h2>
  <table style="border-collapse:collapse;width:100%">
    ${rows
      .map(
        ([l, v]) =>
          `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;vertical-align:top;width:35%">${esc(l)}</td><td style="padding:8px;border:1px solid #ddd">${multiline(v)}</td></tr>`
      )
      .join("")}
  </table>
  <p style="color:#4A4A4A;font-size:13px">Received ${esc(when)} (Lagos time).</p>
</div>`;

  return { text, html };
}

/** Confirmation sent to the registrant. Event details come from environment variables. */
export function registrationConfirmation({ name }) {
  const event = process.env.EVENT_NAME || "African Brands Congress 2026";
  const date = process.env.EVENT_DATE_TEXT || "Friday 30 October 2026";
  const venue = process.env.EVENT_VENUE || "Lagos Oriental Hotel, Lagos, Nigeria";

  const text = [
    `Hello ${name},`,
    "",
    `Thank you for registering for ${event}.`,
    "",
    `Date: ${date}`,
    `Venue: ${venue}`,
    "",
    "If you have any questions, reply to this email.",
    "",
    "Learn // Network // Celebrate",
  ].join("\n");

  const html = `
<div style="font-family:Arial,sans-serif;color:#111;max-width:600px">
  <h2 style="margin:0 0 16px">You are registered</h2>
  <p>Hello ${esc(name)},</p>
  <p>Thank you for registering for <strong>${esc(event)}</strong>.</p>
  <p><strong>Date:</strong> ${esc(date)}<br><strong>Venue:</strong> ${esc(venue)}</p>
  <p>If you have any questions, reply to this email.</p>
  <p style="font-weight:bold">Learn // Network // Celebrate</p>
</div>`;

  return { subject: `Your registration: ${event}`, text, html };
}