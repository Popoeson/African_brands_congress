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
    // { src: "/assets/img/hero-2026.webp", alt: "Describe the photo", width: 1200, height: 900 }
        heroImage: {
      src: "/assets/img/hero-2026.webp",
      alt: "Describe the photo", // TODO: replace with a real description of the photo
      width: 1200,
      height: 900,
    },

    // Thumbnails: 16:9, compressed, under 200 KB. When ready, replace null with:
    // { src: "/assets/img/01-consumer-insight.webp", alt: "Consumer insight", width: 800, height: 450 }
    subThemes: [
      {
        title: "AI-Powered Consumer Insight",
        text: "How brands use AI to read demand, behaviour and sentiment across African markets, and turn those signals into decisions.",
        image: { src: "/assets/img/subthemes/01-consumer-insight.webp", alt: "Consumer insight", width: 800, height: 450 },
      },
      {
        title: "Generative AI in Content and Creative Work",
        text: "What changes when content can be generated at scale, and how creative teams keep brands distinctive.",
        image: { src: "/assets/img/content.webp", alt: "Describe the image", width: 800, height: 450 },
      },
      {
        title: "Automation, Customer Experience and Digital Trust",
        text: "Using automation to serve customers faster without losing the human trust that brands depend on.",
        image: { src: "/assets/img/digital-trust.webp", alt: "Describe the image", width: 800, height: 450 },
      },
      {
        title: "AI, Ethics and Brand Governance",
        text: "The policies, safeguards and accountability brands need as AI shapes what they say and do.",
        image: { src: "/assets/img/ethics.webp", alt: "Describe the image", width: 800, height: 450 },
      },
      {
        title: "Building AI-Ready Brand Organisations",
        text: "The skills, structures and leadership it takes to adopt AI across marketing and brand teams.",
        image: { src: "/assets/img/brand-organization.webp", alt: "Describe the image", width: 800, height: 450 },
      },
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