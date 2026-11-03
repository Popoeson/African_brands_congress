/* ABC: Gallery page. Cards and the shared dialog are rendered from /assets/js/data/gallery.js. */

import { GALLERY } from "/assets/js/data/gallery.js";

const $ = (sel, root = document) => root.querySelector(sel);

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

/* Span-based so it is valid inside a button */
function placeholder(caption) {
  const box = el("span", "ph");
  box.setAttribute("aria-hidden", "true");
  box.append(icon("image"), el("span", null, caption));
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

function ordinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

const editions = [...GALLERY].sort((a, b) => b.year - a.year);
const flyerImage = (ev) => (ev.flyer ? photo({ ...ev.flyer, alt: ev.flyer.alt || `Flyer for ${ev.name}` }) : placeholder("Flyer to be added"));

/* Cards */
function buildCard(ev) {
  const li = el("li", "card gal-card");
  const btn = el("button", "gal-card__btn");
  btn.type = "button";
  btn.dataset.id = ev.id;
  btn.setAttribute("aria-haspopup", "dialog");

  const media = el("span", "gal-card__media");
  media.append(flyerImage(ev), el("span", "gal-badge", ev.name));

  const cta = el("span", "gal-card__cta");
  cta.append(document.createTextNode("View details and photos"), icon("arrow-right"));

  const body = el("span", "gal-card__body");
  body.append(el("span", "gal-label", "Theme"), el("span", "gal-card__theme", ev.theme || "Theme to be announced"), cta);

  btn.append(media, body);
  li.append(btn);
  return li;
}

/* Dialog */
const dialog = $("[data-gal-dialog]");
let opener = null;

function openEdition(ev, trigger) {
  if (!dialog) return;
  opener = trigger || null;

  $("[data-gal-title]", dialog).textContent = ev.name;
  $("[data-gal-theme]", dialog).textContent = ev.theme || "Theme to be announced";
  $("[data-gal-flyer]", dialog).replaceChildren(flyerImage(ev));

  const facts = [];
  if (ev.edition) facts.push(["Edition", `${ordinal(ev.edition)} African Brands Congress`]);
  if (ev.dateText) facts.push(["Date", ev.dateText]);
  if (ev.venue) facts.push(["Venue", ev.venue]);
  $("[data-gal-facts]", dialog).replaceChildren(...facts.flatMap(([k, v]) => [el("dt", null, k), el("dd", null, v)]));

  const summary = $("[data-gal-summary]", dialog);
  summary.textContent = ev.summary || "";
  summary.hidden = !ev.summary;
  $("[data-gal-note]", dialog).hidden = Boolean(facts.length || ev.summary);

  const photos = ev.photos || [];
  $("[data-gal-photos]", dialog).replaceChildren(
    ...photos.map((p, i) => {
      const li = el("li", "gal-photo");
      const fig = el("figure");
      fig.append(photo({ ...p, alt: p.alt || `Photo ${i + 1} from ${ev.name}` }));
      if (p.caption) fig.append(el("figcaption", null, p.caption));
      li.append(fig);
      return li;
    })
  );
  $("[data-gal-nophotos]", dialog).hidden = photos.length > 0;

  document.documentElement.classList.add("no-scroll");
  if (typeof dialog.showModal === "function") {
    if (!dialog.open) dialog.showModal();
  } else {
    dialog.setAttribute("open", "");
  }
  $(".gal-dialog__panel", dialog).scrollTop = 0;
  history.replaceState(null, "", `#${ev.id}`);
}

function init() {
  const list = $("[data-gallery]");
  if (!list) return;

  if (!editions.length) {
    list.replaceChildren(el("li", "gal-empty", "Past editions to be announced."));
    return;
  }

  list.replaceChildren(...editions.map(buildCard));
  list.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-id]");
    if (!btn) return;
    const ev = editions.find((x) => x.id === btn.dataset.id);
    if (ev) openEdition(ev, btn);
  });

  if (!dialog) return;

  // Click on the backdrop closes. The panel fills the dialog, so only the backdrop is the target.
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });
  $("[data-gal-close]", dialog).addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => {
    document.documentElement.classList.remove("no-scroll");
    history.replaceState(null, "", location.pathname + location.search);
    if (opener) opener.focus();
    opener = null;
  });

  // A link such as /gallery#abc-2024 opens that edition
  const fromHash = editions.find((x) => x.id === decodeURIComponent(location.hash.slice(1)));
  if (fromHash) openEdition(fromHash, null);
}

init();