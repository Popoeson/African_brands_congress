import { createHandler } from "./_lib/handler.js";

export default createHandler({
  form: "contact",
  title: "New contact message",
  sheetTab: "Contact", // the PRD says email only; kept in the Sheet while email is not set up
  subject: (v) => `Contact: ${v.subject}`,
  fields: [
    { key: "name", label: "Full name", type: "text", required: true },
    { key: "email", label: "Email address", type: "email", required: true },
    { key: "subject", label: "Subject", type: "text", required: true, max: 150 },
    { key: "message", label: "Message", type: "textarea", required: true },
  ],
});