const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s().-]{7,20}$/;
// Control characters except tab, newline and carriage return
const CTRL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

export function cleanText(value, max = 200, multiline = false) {
  if (typeof value !== "string") return "";
  let v = value.replace(CTRL, "");
  v = multiline ? v.replace(/\r\n?/g, "\n") : v.replace(/\s+/g, " ");
  return v.trim().slice(0, max);
}

/**
 * fields: [{ key, label, type: "text"|"email"|"phone"|"textarea", required, max, choices }]
 * Returns { values, errors }. errors is empty when everything is valid.
 */
export function validate(fields, body) {
  const values = {};
  const errors = {};

  for (const f of fields) {
    const max = f.max ?? (f.type === "email" ? 254 : f.type === "textarea" ? 2000 : 200);
    const v = cleanText(body?.[f.key], max, f.type === "textarea");
    values[f.key] = v;

    if (!v) {
      if (f.required) errors[f.key] = `${f.label} is required.`;
      continue;
    }
    if (f.type === "email" && !EMAIL_RE.test(v)) {
      errors[f.key] = "Enter a valid email address.";
    } else if (f.type === "phone" && !PHONE_RE.test(v)) {
      errors[f.key] = "Enter a valid phone number, including your country code.";
    } else if (f.choices && !f.choices.includes(v)) {
      errors[f.key] = "Please choose one of the options.";
    }
  }

  return { values, errors };
}