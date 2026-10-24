/* ABC: Register page. Title band and benefits come from /assets/js/data/events.js;
   dropdown options come from /assets/js/data/register.js. */

import { EVENTS, NO_UPCOMING } from "/assets/js/data/events.js";
import { SECTOR_OPTIONS, HEARD_OPTIONS } from "/assets/js/data/register.js";

const $ = (sel, root = document) => root.querySelector(sel);
const SVG_NS = "http://www.w3.org/2000/svg";

function el(tag, cls, text) {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text) node.textContent = text;
  return node;
}

function checkIcon() {
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("class", "icon");
  const use = document.createElementNS(SVG_NS, "use");
  use.setAttribute("href", "/assets/img/icons-about.svg#check");
  svg.append(use);
  return svg;
}

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
const info = $("[data-reg-info]");

if (event) {
  const date = $("[data-reg-date]");
  const venue = $("[data-reg-venue]");
  if (date) date.textContent = event.timeText ? `${event.dateText}, ${event.timeText}` : event.dateText;
  if (venue) venue.textContent = [event.hall, event.venue, event.area, event.city].filter(Boolean).join(", ");
  if (message) {
    message.textContent = event.theme;
    message.hidden = false;
  }

  /* What attendees get: the event's benefits */
  const list = $("[data-reg-benefits]");
  if (list && event.benefits?.length) {
    list.replaceChildren(
      ...event.benefits.map((b) => {
        const li = el("li");
        const check = el("span", "reg-check");
        check.setAttribute("aria-hidden", "true");
        check.append(checkIcon());
        const text = el("span");
        text.append(el("strong", null, b.title), document.createTextNode(` – ${b.text}`));
        li.append(check, text);
        return li;
      })
    );
  } else if (info) {
    info.hidden = true;
  }
} else {
  if (title) title.textContent = NO_UPCOMING.registerLabel;
  if (facts) facts.hidden = true;
  if (info) info.hidden = true;
  if (message) {
    message.textContent = NO_UPCOMING.message;
    message.hidden = false;
  }
  if (submit) submit.textContent = NO_UPCOMING.registerShortLabel;
}