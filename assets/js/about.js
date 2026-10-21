import { EVENTS } from "/assets/js/data/events.js";
import { TIMELINE } from "/assets/js/data/site.js";

const list = document.querySelector("[data-timeline]");

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function entry(yearText, { next = false, label = "", title, line }) {
  const li = el("li");
  li.appendChild(el("span", "about-year" + (next ? " about-year--next" : ""), yearText));
  const body = el("div");
  if (label) body.appendChild(el("p", "about-next-label", label));
  body.appendChild(el("h3", "", title));
  body.appendChild(el("p", "", line));
  li.appendChild(body);
  return li;
}

/** Same rule as Home: the nearest event whose endsAt is still in the future. */
function nextEvent() {
  const now = Date.now();
  return EVENTS
    .filter((e) => new Date(e.endsAt).getTime() > now)
    .sort((a, b) => new Date(a.startsAt) - new Date(b.startsAt))[0] || null;
}

if (list) {
  TIMELINE.forEach((item) => {
    list.appendChild(
      entry(String(item.year), {
        title: item.theme || "Edition theme to be added",
        line: item.venue || "Venue to be added",
      })
    );
  });

  const upcoming = nextEvent();
  if (upcoming) {
    const place = [upcoming.venue, upcoming.city].filter(Boolean).join(", ");
    list.appendChild(
      entry(upcoming.startsAt.slice(0, 4), {
        next: true,
        label: "Next edition",
        title: upcoming.theme,
        line: place || "Venue to be announced",
      })
    );
  }
}