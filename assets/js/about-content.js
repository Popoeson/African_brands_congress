/* ABC: About page content, rendered from /assets/js/data/events.js.
   Shows the nearest upcoming event, or the most recent one if none is upcoming.
   Sections marked data-needs-event are hidden when there is no event data. */

import { EVENTS } from "/assets/js/data/events.js";

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const SVG_NS = "http://www.w3.org/2000/svg";

const SPRITES = { about: "/assets/img/icons-about.svg", main: "/assets/img/icons.svg" };

/* One icon per benefit, in order. Extra benefits reuse the list. */
const BENEFIT_ICONS = [
  ["about", "lightbulb"],
  ["main", "briefcase"],
  ["main", "users"],
  ["main", "megaphone"],
  ["about", "handshake"],
  ["main", "trending-up"],
  ["about", "award"],
];

const EVENT_COLOURS = ["green", "yellow", "red", "deep"];

function el(tag, cls, text) {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text) node.textContent = text;
  return node;
}

function icon(sprite, name) {
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("class", "icon");
  svg.setAttribute("aria-hidden", "true");
  const use = document.createElementNS(SVG_NS, "use");
  use.setAttribute("href", `${SPRITES[sprite]}#${name}`);
  svg.append(use);
  return svg;
}

const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

/* Logo-triangle mark used on the featuring cards */
function mark() {
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("class", "about-mark");
  svg.setAttribute("viewBox", "0 0 56 32");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  const tri = document.createElementNS(SVG_NS, "path");
  tri.setAttribute("d", "M3 29 20 4l17 25Z");
  const dot = document.createElementNS(SVG_NS, "circle");
  dot.setAttribute("cx", "43");
  dot.setAttribute("cy", "23");
  dot.setAttribute("r", "6");
  svg.append(tri, dot);
  return svg;
}

function pickEvent(now = Date.now()) {
  const list = EVENTS.map((e) => ({ ...e, start: Date.parse(e.startsAt), end: Date.parse(e.endsAt) })).filter(
    (e) => Number.isFinite(e.start) && Number.isFinite(e.end)
  );
  const upcoming = list.filter((e) => e.end > now).sort((a, b) => a.start - b.start)[0];
  return upcoming || list.sort((a, b) => b.end - a.end)[0] || null;
}

function hide(node) {
  if (node) node.hidden = true;
}

function renderAbout(event) {
  const box = $("[data-about-text]");
  if (!box) return;
  if (!event.about?.length) return hide(box.closest("section"));

  box.replaceChildren(...event.about.map((p) => el("p", "about-body", p)));

  const powered = $("[data-about-powered]");
  if (powered && event.poweredBy) {
    powered.textContent = `Powered by ${event.poweredBy}.`;
    powered.hidden = false;
  }
}

function renderObjectives(event) {
  const list = $("[data-objectives]");
  if (!list) return;
  if (!event.objectives?.length) return hide(list.parentElement);

  list.replaceChildren(
    ...event.objectives.map((text) => {
      const li = el("li");
      const check = el("span", "about-check");
      check.setAttribute("aria-hidden", "true");
      check.append(icon("about", "check"));
      li.append(check, el("span", null, text));
      return li;
    })
  );
}

function renderBenefits(event) {
  const list = $("[data-benefits]");
  if (!list) return;
  if (!event.benefits?.length) return hide(list.closest("section"));

  list.replaceChildren(
    ...event.benefits.map((b, i) => {
      const [sprite, name] = BENEFIT_ICONS[i % BENEFIT_ICONS.length];
      const li = el("li", "card");
      const tile = el("div", "icon-tile");
      tile.append(icon(sprite, name));
      li.append(tile, el("h3", null, b.title), el("p", null, cap(b.text)));
      return li;
    })
  );
}

function renderOutcomes(event) {
  const list = $("[data-outcomes]");
  const feature = $("[data-outcome-feature]");
  if (!list) return;
  if (!event.outcomes?.length) return hide(list.closest("section"));

  // The communique outcome gets the large card; everything else is a list item.
  const idx = event.outcomes.findIndex((t) => /communique/i.test(t));
  const rest = event.outcomes.filter((_, i) => i !== idx);

  if (idx >= 0 && feature) {
    $("[data-outcome-feature-text]", feature).textContent = event.outcomes[idx];
    feature.hidden = false;
  }
  list.replaceChildren(...(idx >= 0 ? rest : event.outcomes).map((t) => el("li", null, t)));
}

function renderFeaturing(event) {
  const list = $("[data-featuring]");
  if (!list) return;
  if (!event.featuring?.length) return hide(list.closest("section"));

    list.replaceChildren(
    ...event.featuring.map((item) => {
      const li = el("li", "card about-feat");
      const media = el("div", "about-feat__media");
      if (item.logo?.src) {
        const img = new Image();
        img.src = item.logo.src;
        img.alt = ""; // the name below describes it
        if (item.logo.width) img.width = item.logo.width;
        if (item.logo.height) img.height = item.logo.height;
        img.loading = "lazy";
        img.decoding = "async";
        media.append(img);
      } else {
        media.classList.add("about-feat__media--empty");
        media.setAttribute("aria-hidden", "true");
        media.append(el("span", null, "Logo to be added"));
      }
      li.append(media, el("h3", null, item.name));
      return li;
    })
  );
}

const event = pickEvent();

if (!event) {
  $$("[data-needs-event]").forEach(hide);
} else {
  renderAbout(event);
  renderObjectives(event);
  renderBenefits(event);
  renderOutcomes(event);
  renderFeaturing(event);
}