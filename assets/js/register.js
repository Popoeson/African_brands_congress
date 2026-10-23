import { EVENTS, NO_UPCOMING } from "/assets/js/data/events.js";
import { SECTOR_OPTIONS, HEARD_OPTIONS } from "/assets/js/data/register.js";

const $ = (sel, root = document) => root.querySelector(sel);

/* Dropdowns */
function fill(select, options) {
  if (!select) return;
  select.append(
    ...options.map((text) => {
      const opt = document.createElement("option");
      opt.value = text;
      opt.textContent = text;
      return opt;
    })
  );
}

fill($("[data-reg-sector]"), SECTOR_OPTIONS);
fill($("[data-reg-heard]"), HEARD_OPTIONS);

/* Title band: same rule as Home (nearest event whose endsAt is still in the future) */
const now = Date.now();
const event =
  EVENTS.filter((e) => Date.parse(e.endsAt) > now).sort(
    (a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt)
  )[0] || null;

const title = $("[data-reg-title]");
const facts = $("[data-reg-facts]");
const message = $("[data-reg-message]");
const submit = $("[data-reg-submit]");

if (event) {
  const date = $("[data-reg-date]");
  const venue = $("[data-reg-venue]");
  if (date) date.textContent = event.dateText;
  if (venue) venue.textContent = `${event.venue}, ${event.city}, ${event.country}`;
} else {
  if (title) title.textContent = NO_UPCOMING.registerLabel;
  if (facts) facts.hidden = true;
  if (message) {
    message.textContent = NO_UPCOMING.message;
    message.hidden = false;
  }
  if (submit) submit.textContent = NO_UPCOMING.registerShortLabel;
}