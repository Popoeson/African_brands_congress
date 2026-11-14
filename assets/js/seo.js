// Injects schema.org Event data for the nearest upcoming event in events.js.
// If no event is upcoming, nothing is added. Edit events.js only.
import { EVENTS } from "/assets/js/data/events.js";

const ORIGIN = "https://africanbrandscongress.org";
const abs = (p) => (p ? (p.startsWith("http") ? p : ORIGIN + p) : undefined);

function nextEvent() {
  const now = Date.now();
  return EVENTS
    .filter((e) => new Date(e.endsAt).getTime() > now)
    .sort((a, b) => new Date(a.startsAt) - new Date(b.startsAt))[0];
}

function buildEventSchema(e) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.name,
    description: `${e.name}: ${e.theme}.`,
    startDate: e.startsAt,
    endDate: e.endsAt,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    inLanguage: "en",
    url: ORIGIN + (e.registerUrl || "/"),
    image: e.heroImage ? [abs(e.heroImage.src)] : undefined,
    location: {
      "@type": "Place",
      name: [e.hall, e.venue].filter(Boolean).join(", "),
      address: {
        "@type": "PostalAddress",
        addressLocality: e.city,
        addressCountry: e.countryCode,
      },
    },
    organizer: { "@id": ORIGIN + "/#organization" },
  };
}

const event = nextEvent();
if (event) {
  const s = document.createElement("script");
  s.type = "application/ld+json";
  s.textContent = JSON.stringify(buildEventSchema(event));
  document.head.appendChild(s);
}