/**
 * ABC: event data.
 * This is the ONLY file to edit to change the featured event.
 *
 * - The site shows the nearest event whose endsAt is still in the future.
 * - Dates are ISO 8601 with the Lagos offset (+01:00).
 * - Anything unconfirmed stays null or "To be announced". Do not guess.
 */

export const EVENTS = [
  {
    id: "abc-2026",
    name: "African Brands Congress 2026",
    edition: null, // TODO: edition number to be confirmed by the client
    theme: "The Future of Brands in the Era of Artificial Intelligence",
    tagline: "Learn // Network // Celebrate",

    // TODO: client to confirm the start and end times. These are placeholders.
    startsAt: "2026-10-30T00:00:00+01:00",
    endsAt: "2026-10-30T23:59:59+01:00",

    dateText: "Friday 30 October 2026",
    venue: "Lagos Oriental Hotel",
    city: "Lagos",
    country: "Nigeria",
    countryCode: "NG",

    registerUrl: "/register",
    exhibitUrl: "/exhibition",

    // When a photo is ready, replace null with:
    // { src: "/assets/img/hero-2026.webp", alt: "Describe the photo", width: 1200, height: 800 }
    heroImage: null,

    // Descriptions are null until the client supplies them.
    subThemes: [
      { title: "AI-Powered Consumer Insight", text: null },
      { title: "Generative AI in content and creative work", text: null },
      { title: "Automation, Customer Experience and Digital Trust", text: null },
      { title: "AI, Ethics and Brand Governance", text: null },
      { title: "Building AI-Ready Brand Organisations", text: null },
    ],
  },
];

/** Button labels while an event is upcoming. */
export const LABELS = {
  registerLabel: "Register to attend",
  registerShortLabel: "Register",
};

/** Shown when no event in EVENTS is upcoming. Draft copy: client to approve. */
export const NO_UPCOMING = {
  eyebrow: "African Brands Congress",
  title: "Thank you for being part of African Brands Congress",
  message: "Read the latest news and register your interest for the next edition.",
  ctaTitle: "Be first to hear about the next edition",
  registerLabel: "Register interest for the next edition",
  registerShortLabel: "Register interest",
  registerUrl: "/register",
  newsUrl: "/news-contact",
};