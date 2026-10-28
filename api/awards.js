import { createHandler } from "./_lib/handler.js";

export default createHandler({
  form: "awards",
  title: "New awards enquiry",
  sheetTab: "Award enquiries",
  subject: (v) => `New awards enquiry: ${v.name}`,
  fields: [
    { key: "name", label: "Full name", type: "text", required: true },
    { key: "email", label: "Email address", type: "email", required: true },
    { key: "phone", label: "Phone number", type: "phone", required: false },
    { key: "company", label: "Company", type: "text", required: true },
    { key: "category", label: "Category of interest", type: "text", required: true },
    { key: "message", label: "Message", type: "text", required: false },
  ],
});