import { validate, cleanText } from "./validate.js";
import { sendEmail, notifyList, emailConfigured } from "./email.js";
import { appendRow } from "./sheets.js";
import { notification } from "./templates.js";

/* Best-effort rate limit, held in memory per serverless instance */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;
const hits = new Map();

function limited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 500) {
    for (const [key, times] of hits) if (!times.some((t) => now - t < WINDOW_MS)) hits.delete(key);
  }
  return recent.length > MAX_HITS;
}

const send = (res, status, body) => res.status(status).json(body);

function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  try {
    return JSON.parse(req.body || "{}");
  } catch {
    return {};
  }
}

const lagosTime = () =>
  new Intl.DateTimeFormat("en-GB", { dateStyle: "short", timeStyle: "medium", timeZone: "Africa/Lagos" }).format(new Date());

/**
 * config:
 *  form      name used in logs
 *  fields    field list for validate()
 *  title     heading of the client email
 *  subject   (values) => email subject
 *  sheetTab  Google Sheet tab name, or null for email only
 *  confirm   optional (values) => { subject, html, text } sent to the visitor
 */
export function createHandler({ form, fields, title, subject, sheetTab = null, confirm = null }) {
  return async function handler(req, res) {
    res.setHeader("Cache-Control", "no-store");

    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return send(res, 405, { ok: false, message: "Method not allowed." });
    }

    const body = readBody(req);

    // Honeypot: pretend success so bots learn nothing
    if (cleanText(body.website, 100)) return send(res, 200, { ok: true });

    const ip = String(req.headers["x-forwarded-for"] || "unknown").split(",")[0].trim();
    if (limited(ip)) {
      return send(res, 429, { ok: false, message: "Too many submissions. Please wait a few minutes and try again." });
    }

    const { values, errors } = validate(fields, body);
    if (Object.keys(errors).length) {
      return send(res, 400, { ok: false, message: "Please check the highlighted fields.", errors });
    }

    const when = lagosTime();
    const { text, html } = notification({ title, fields, values, when });

    const jobs = [];
    const labels = [];
    if (emailConfigured() && notifyList().length) {
      jobs.push(sendEmail({ to: notifyList(), subject: subject(values), html, text, replyTo: values.email }));
      labels.push("email");
    }
    if (sheetTab) {
      jobs.push(appendRow(sheetTab, [when, ...fields.map((f) => values[f.key])]));
      labels.push("sheet");
    }

    const results = await Promise.allSettled(jobs);
    results.forEach((r, i) => {
      if (r.status === "rejected") {
        // Never log submitted details
        console.error(`[${form}] ${labels[i]} failed:`, r.reason?.message || r.reason);
      }
    });

    if (!results.some((r) => r.status === "fulfilled")) {
      return send(res, 500, {
        ok: false,
        message: "We could not send your submission. Please try again, or contact the team.",
      });
    }

    if (confirm && emailConfigured()) {
      try {
        const mail = confirm(values);
        await sendEmail({
          to: values.email,
          subject: mail.subject,
          html: mail.html,
          text: mail.text,
          replyTo: notifyList()[0],
        });
      } catch (err) {
        console.error(`[${form}] confirmation email failed:`, err?.message || err);
      }
    }

    return send(res, 200, { ok: true });
  };
}