import { createHandler } from "./_lib/handler.js";
import { registrationConfirmation } from "./_lib/templates.js";

export default createHandler({
  form: "register",
  title: "New attendee registration",
  sheetTab: "Registrations",
  subject: (v) => `New registration: ${v.name}`,
  fields: [
    { key: "name", label: "Full name", type: "text", required: true },
    { key: "email", label: "Email address", type: "email", required: true },
    { key: "phone", label: "Phone number", type: "phone", required: true },
    { key: "organisation", label: "Organisation", type: "text", required: true },
    { key: "jobTitle", label: "Job title", type: "text", required: true },
    { key: "country", label: "Country", type: "text", required: true },
    { key: "sector", label: "Sector", type: "text", required: true },
    { key: "heardAbout", label: "How they heard about ABC", type: "text", required: false },
  ],
  confirm: (v) => registrationConfirmation({ name: v.name }),
});