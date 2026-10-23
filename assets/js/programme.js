/* ABC: Programmes and Speakers page, rendered from /assets/js/data/events.js.
   Shows the nearest upcoming event, or the most recent one if none is upcoming.
   Empty programme or speakers show "To be announced". Sections marked data-needs-event
   are hidden when there is no event data. */

import { EVENTS } from "/assets/js/data/events.js";

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const SVG_NS = "http://www.w3.org/2000/svg";
const SPRITES = { main: "/assets/img/icons.svg", about: "/assets/img/icons-about.svg" };

/* One icon per format, in order. Extra formats reuse the list. */
const FORMAT_ICONS = [
  ["main", "megaphone"],
  ["main", "book-open"],
  ["main", "users"],
  ["main", "briefcase"],
  ["about", "handshake"],
];

const SPEAKER_PLACEHOLDERS = 4;
const NUMBER_WORDS = ["No", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];

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

function photo({ src, alt, width, height }, cls) {
  const img = new Image();
  img.src = src;
  img.alt = alt || "";
  if (width) img.width = width;
  if (height) img.height = height;
  img.loading = "lazy";
  img.decoding = "async";
  if (cls) img.className = cls;
  return img;
}

function placeholder(caption, cls) {
  const box = el("div", `ph${cls ? " " + cls : ""}`);
  box.setAttribute("aria-hidden", "true");
  box.append(icon("main", "image"), el("span", null, caption));
  return box;
}

const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
const hide = (node) => node && (node.hidden = true);

function pickEvent(now = Date.now()) {
  const list = EVENTS.map((e) => ({ ...e, start: Date.parse(e.startsAt), end: Date.parse(e.endsAt) })).filter(
    (e) => Number.isFinite(e.start) && Number.isFinite(e.end)
  );
  const upcoming = list.filter((e) => e.end > now).sort((a, b) => a.start - b.start)[0];
  return upcoming || list.sort((a, b) => b.end - a.end)[0] || null;
}

function renderBand(event) {
  const lead = $("[data-prog-lead]");
  if (lead) lead.textContent = event.theme;
  const meta = $("[data-prog-meta]");
  if (meta) {
    const when = event.timeText ? `${event.dateText}, ${event.timeText}` : event.dateText;
    const where = [event.hall, event.venue, event.city].filter(Boolean).join(", ");
    meta.textContent = `${when} | ${where}`;
  }
}

function renderSynopsis(event) {
  const box = $("[data-synopsis]");
  if (!box) return;
  if (!event.synopsis?.length) return hide(box.closest("section"));
  box.replaceChildren(...event.synopsis.map((p) => el("p", "prog-body", p)));
}

function renderSubThemes(event) {
  const list = $("[data-subthemes]");
  if (!list) return;
  if (!event.subThemes?.length) return hide(list.closest("section"));

  const count = event.subThemes.length;
  const heading = $("[data-subthemes-title]");
  if (heading) heading.textContent = `${NUMBER_WORDS[count] ?? count} sub-themes for ${event.startsAt.slice(0, 4)}`;

  list.replaceChildren(
    ...event.subThemes.map((t, i) => {
      const li = el("li", "card prog-card");
      const media = t.image
        ? photo(t.image, "prog-card__media")
        : placeholder(`Thumbnail to be added: ${t.title}`, "prog-card__media");
      const body = el("div", "prog-card__body");
      const num = el("span", "prog-num", String(i + 1));
      num.setAttribute("aria-hidden", "true");
      body.append(num, el("h3", null, t.title));
      if (t.text) body.append(el("p", null, t.text));
      li.append(media, body);
      return li;
    })
  );
}

function renderFormats(event) {
  const list = $("[data-formats]");
  if (!list) return;
  if (!event.formats?.length) return hide(list.closest("section"));

  list.replaceChildren(
    ...event.formats.map((name, i) => {
      const [sprite, id] = FORMAT_ICONS[i % FORMAT_ICONS.length];
      const li = el("li", "chip");
      li.append(icon(sprite, id), document.createTextNode(name));
      return li;
    })
  );
}

function renderSchedule(event) {
  const box = $("[data-schedule]");
  if (!box) return;

  if (!event.programme?.length) {
    const card = el("div", "card prog-tba");
    card.append(el("h3", null, "To be announced"));
    const when = event.timeText ? `${event.dateText}, ${event.timeText}` : event.dateText;
    card.append(el("p", null, `The full programme for ${when} will be published here. Check back closer to the event.`));
    box.replaceChildren(card);
    return;
  }

  const ol = el("ol", "prog-timeline");
  ol.setAttribute("aria-label", "Programme schedule");
  event.programme.forEach((item) => {
    const li = el("li");
    li.append(el("span", "prog-time", item.time || "TBA"));
    const body = el("div");
    if (item.type) body.append(el("p", "prog-type", item.type));
    body.append(el("h3", null, item.title || "To be announced"));
    if (item.speakers?.length) body.append(el("p", null, item.speakers.join(", ")));
    li.append(body);
    ol.append(li);
  });
  box.replaceChildren(ol);
}

function renderSpeakers(event) {
  const list = $("[data-speakers]");
  const note = $("[data-speakers-note]");
  if (!list) return;

  if (!event.speakers?.length) {
    if (note) {
      note.textContent = "Speakers will be announced here. Check back closer to the event.";
      note.hidden = false;
    }
    list.replaceChildren(
      ...Array.from({ length: SPEAKER_PLACEHOLDERS }, () => {
        const li = el("li", "card prog-speaker");
        const body = el("div", "prog-speaker__body");
        body.append(el("h3", null, "To be announced"));
        li.append(placeholder("Speaker photo"), body);
        return li;
      })
    );
    return;
  }

  if (note) note.hidden = true;
  list.replaceChildren(
    ...event.speakers.map((s) => {
      const li = el("li", "card prog-speaker");
      const media = s.photo ? photo({ alt: s.name, ...s.photo }, "prog-speaker__photo") : placeholder("Photo to be added");
      const body = el("div", "prog-speaker__body");
      body.append(el("h3", null, s.name));
      if (s.role) body.append(el("p", null, s.role));
      if (s.organisation) body.append(el("p", null, s.organisation));
      li.append(media, body);
      return li;
    })
  );
}

const CAT_COLOURS = ["green", "yellow", "red", "deep"];

function renderCategories(event) {
  const list = $("[data-categories]");
  if (!list) return;
  if (!event.categories?.length) return hide(list.closest("section"));

  list.replaceChildren(
    ...event.categories.map((c, i) => {
      const li = el("li", `prog-cat prog-cat--${CAT_COLOURS[i % CAT_COLOURS.length]}`);
      const num = el("span", "prog-cat__num", String(i + 1).padStart(2, "0"));
      num.setAttribute("aria-hidden", "true");
      const body = el("div", "prog-cat__body");
      body.append(el("h3", null, c.name));
      if (c.text) body.append(el("p", null, cap(c.text)));
      li.append(num, body);
      return li;
    })
  );
}

const event = pickEvent();

if (!event) {
  $$("[data-needs-event]").forEach(hide);
} else {
  renderBand(event);
  renderSynopsis(event);
  renderSubThemes(event);
  renderFormats(event);
  renderSchedule(event);
  renderSpeakers(event);
  renderCategories(event);
}