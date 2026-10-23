import { createHandler } from "./_lib/handler.js";

export default createHandler({
  form: "exhibit",
  title: "New exhibition or sponsorship enquiry",
  sheetTab: "Exhibitors",
  subject: (v) => `Exhibit/sponsor enquiry (${v.interest}): ${v.company}`,
  fields: [
    { key: "name", label: "Full name", type: "text", required: true },
    { key: "email", label: "Email address", type: "email", required: true },
    { key: "phone", label: "Phone number", type: "phone", required: true },
    { key: "company", label: "Company", type: "text", required: true },
    { key: "role", label: "Role", type: "text", required: false },
    { key: "interest", label: "Interested in", type: "text", required: true, choices: ["exhibit", "sponsor"] },
    { key: "message", label: "Message", type: "textarea", required: false },
  ],
});