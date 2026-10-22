import { SECTORS, PAST_WINNERS } from "/assets/js/data/awards.js";

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

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

/* Enquiry form: fill the "Category of interest" select from awards.js data */
function renderCategorySelect() {
  const select = $("[data-aw-select]");
  if (!select) return;

  let n = 0;
  SECTORS.forEach((sector, si) => {
    const sectorName = sector.name || `Sector ${si + 1}: name to be announced`;
    const group = document.createElement("optgroup");
    group.label = sectorName;

    sector.categories.forEach((cat) => {
      n += 1;
      const label = cat.name || `Category ${n}: name to be announced`;
      const opt = document.createElement("option");
      opt.value = `${sectorName} / ${label}`;
      opt.textContent = label;
      group.append(opt);
    });

    select.append(group);
  });
}

/* Accordion */
function setOpen(btn, open) {
  btn.setAttribute("aria-expanded", String(open));
  const panel = document.getElementById(btn.getAttribute("aria-controls"));
  if (panel) panel.hidden = !open;
}

function renderCategories() {
  const root = $("[data-aw-groups]");
  if (!root) return;

  let n = 0;
  const groups = SECTORS.map((sector, si) => {
    const section = el("section", "aw-group");
    const headId = `aw-sector-${si + 1}`;
    section.setAttribute("aria-labelledby", headId);

    const total = sector.categories.length;
    const head = el("div", "aw-group__head");
    const h3 = el("h3", null, sector.name || `Sector ${si + 1}: name to be announced`);
    h3.id = headId;
    head.append(h3, el("span", "aw-group__count", `${total} ${total === 1 ? "category" : "categories"}`));

    const list = el("ul", "aw-list");
    sector.categories.forEach((cat) => {
      n += 1;
      const btnId = `aw-cat-${n}`;
      const panelId = `aw-cat-${n}-panel`;

      const li = el("li", "aw-item");
      const h4 = el("h4", "aw-item__title");
      const btn = el("button", "aw-trigger");
      btn.type = "button";
      btn.id = btnId;
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-controls", panelId);
      btn.append(el("span", null, cat.name || `Category ${n}: name to be announced`), el("span", "aw-icon"));
      btn.lastChild.setAttribute("aria-hidden", "true");
      h4.append(btn);

      const panel = el("div", "aw-panel-body");
      panel.id = panelId;
      panel.setAttribute("role", "region");
      panel.setAttribute("aria-labelledby", btnId);
      panel.hidden = true;
      panel.append(el("p", null, cat.criteria || "Criteria to be announced."));

      li.append(h4, panel);
      list.append(li);
    });

    section.append(head, list);
    return section;
  });

  root.replaceChildren(...groups);

  // Summary numbers come from the data
  const total = $("[data-aw-total]");
  const sectors = $("[data-aw-sectors]");
  if (total) total.textContent = String(n);
  if (sectors) sectors.textContent = String(SECTORS.length);

  // One open at a time (UI/UX doc). The first starts open, as in the design.
  root.addEventListener("click", (e) => {
    const btn = e.target.closest(".aw-trigger");
    if (!btn) return;
    const open = btn.getAttribute("aria-expanded") !== "true";
    if (open) $$(".aw-trigger[aria-expanded='true']", root).forEach((b) => setOpen(b, false));
    setOpen(btn, open);
  });

  const first = $(".aw-trigger", root);
  if (first) setOpen(first, true);
}

/* Past winners */
function renderWinners() {
  const list = $("[data-aw-winners]");
  if (!list) return;

  const items = PAST_WINNERS.length ? PAST_WINNERS : Array.from({ length: 4 }, () => null);

  list.replaceChildren(
    ...items.map((w) => {
      const li = el("li", "aw-winner");
      const media = el("div", "aw-winner__media");
      media.append(w && w.image ? photo({ alt: w.name || "", ...w.image }) : placeholder("Winner photo"));

      const name = el("p", "aw-winner__name", (w && w.name) || "Winner name to be announced");
      const meta = [w && w.category, w && w.year].filter(Boolean).join(" · ");
      li.append(media, name, el("p", "aw-winner__meta", meta || "Category and year to be announced"));
      return li;
    })
  );
}

renderCategorySelect(); // runs first so the form never depends on the sections below
renderCategories();
renderWinners();