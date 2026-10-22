import { NEWS } from "/assets/js/data/news.js";
import { EVENTS } from "/assets/js/data/events.js";

const $ = (sel, root = document) => root.querySelector(sel);

const PAGE_SIZE = 6; // cards shown first, and added each time "Show more news" is pressed
const ICONS = "/assets/img/icons.svg";
const SVG_NS = "http://www.w3.org/2000/svg";

function el(tag, cls, text) {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text) node.textContent = text;
  return node;
}

function icon(name) {
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("class", "icon");
  svg.setAttribute("aria-hidden", "true");
  const use = document.createElementNS(SVG_NS, "use");
  use.setAttribute("href", `${ICONS}#${name}`);
  svg.append(use);
  return svg;
}

function placeholder(caption) {
  const box = el("div", "ph");
  box.setAttribute("role", "img");
  box.setAttribute("aria-label", caption);
  const label = el("span", null, caption);
  label.setAttribute("aria-hidden", "true");
  box.append(icon("image"), label);
  return box;
}

function photo({ src, alt, width, height }) {
  const img = new Image();
  img.src = src;
  img.alt = alt || "";
  if (width) img.width = width;
  if (height) img.height = height;
  img.loading = "lazy";
  img.decoding = "async";
  return img;
}

function formatDate(iso) {
  const t = iso ? Date.parse(iso) : NaN;
  if (!Number.isFinite(t)) return "Date to be announced";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Africa/Lagos",
  }).format(t);
}

/* News cards and popup */
const list = $("[data-news-list]");
const dialog = $("[data-news-dialog]");
const more = $("[data-news-more]");

function card(story) {
  const li = el("li", "card news-card");

  const media = el("div", "news-card__media");
  media.append(story.image ? photo({ alt: story.title, ...story.image }) : placeholder("News image"));

  const btn = el("button", "btn btn--tertiary btn--sm");
  btn.type = "button";
  btn.dataset.newsOpen = story.id;
  btn.setAttribute("aria-label", `Read more: ${story.title}`);
  btn.append(el("span", null, "Read more"), icon("arrow-right"));

  const body = el("div", "news-card__body");
  body.append(
    el("p", "news-card__date", formatDate(story.date)),
    el("h3", null, story.title),
    el("p", "news-card__summary", story.summary || ""),
    btn
  );

  li.append(media, body);
  return li;
}

function openStory(story) {
  $("[data-news-dialog-date]").textContent = formatDate(story.date);
  $("[data-news-dialog-title]").textContent = story.title;

  $("[data-news-dialog-media]").replaceChildren(
    ...(story.image ? [photo({ alt: story.title, ...story.image })] : [])
  );

  const paragraphs = story.body && story.body.length ? story.body : [story.summary, "Full story to be announced."];
  $("[data-news-dialog-body]").replaceChildren(...paragraphs.filter(Boolean).map((t) => el("p", null, t)));

  document.documentElement.classList.add("no-scroll");
  dialog.showModal();
  dialog.scrollTop = 0;
}

if (list && dialog) {
  let shown = 0;

  function showNext() {
    const next = NEWS.slice(shown, shown + PAGE_SIZE);
    const firstNew = shown;
    list.append(...next.map(card));
    shown += next.length;
    if (more) more.hidden = shown >= NEWS.length;
    return firstNew;
  }

  if (!NEWS.length) {
    const empty = $("[data-news-empty]");
    if (empty) empty.hidden = false;
  } else {
    showNext();
  }

  if (more) {
    more.addEventListener("click", () => {
      const firstNew = showNext();
      // Keep keyboard users in place: focus the first new card's button
      list.children[firstNew]?.querySelector("button")?.focus();
    });
  }

  list.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-news-open]");
    if (!btn) return;
    const story = NEWS.find((s) => s.id === btn.dataset.newsOpen);
    if (story) openStory(story);
  });

  // Close: button, or a click on the dimmed backdrop (Escape is built in)
  $("[data-news-close]").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => document.documentElement.classList.remove("no-scroll"));
}

/* Venue block: same rule as Home (nearest event whose endsAt is still in the future) */
const venue = $("[data-venue]");
if (venue) {
  const now = Date.now();
  const event =
    EVENTS.filter((e) => Date.parse(e.endsAt) > now).sort(
      (a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt)
    )[0] || null;

  if (!event) {
    venue.hidden = true;
  } else {
    const place = [event.venue, event.city, event.country].filter(Boolean).join(", ");
    $("[data-venue-name]").textContent = event.venue;
    $("[data-venue-caption]").textContent = `${place}. Street address to be announced.`;
    $("[data-venue-link]").href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`;
  }
}