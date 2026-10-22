/* ABC: shared behaviour.
   Header and footer markup lives in each page. This file handles the mobile
   menu, active link, and everything driven by the data files:
   /assets/js/data/events.js (event) and /assets/js/data/site.js (site-wide). */

import { EVENTS, LABELS, NO_UPCOMING } from "/assets/js/data/events.js";
import { SITE, PAST_EDITIONS, SPONSORS } from "/assets/js/data/site.js";

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const ICONS = "/assets/img/icons.svg";
const SVG_NS = "http://www.w3.org/2000/svg";

function icon(name) {
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("class", "icon");
  svg.setAttribute("aria-hidden", "true");
  const use = document.createElementNS(SVG_NS, "use");
  use.setAttribute("href", `${ICONS}#${name}`);
  svg.append(use);
  return svg;
}

function el(tag, cls, text) {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text) node.textContent = text;
  return node;
}

/* Photo placeholder: icon and caption */
function placeholder(caption, extraClass) {
  const box = el("div", `ph${extraClass ? " " + extraClass : ""}`);
  box.setAttribute("role", "img");
  box.setAttribute("aria-label", caption);
  const label = el("span", null, caption);
  label.setAttribute("aria-hidden", "true");
  box.append(icon("image"), label);
  return box;
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

/* 1. Pick the nearest upcoming event (null if none) */
function getNextEvent(now = Date.now()) {
  return (
    EVENTS.map((e) => ({ ...e, start: Date.parse(e.startsAt), end: Date.parse(e.endsAt) }))
      .filter((e) => Number.isFinite(e.start) && Number.isFinite(e.end) && e.end > now)
      .sort((a, b) => a.start - b.start)[0] || null
  );
}

/* 2. Mobile menu */
function initMenu() {
  const btn = $("[data-menu-toggle]");
  const nav = $("#site-nav");
  if (!btn || !nav) return;

  const desktop = window.matchMedia("(min-width: 1100px)");
  const isOpen = () => btn.getAttribute("aria-expanded") === "true";

  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.documentElement.classList.toggle("no-scroll", open);
  }

  btn.addEventListener("click", () => {
    const open = !isOpen();
    setOpen(open);
    if (open) $("a", nav)?.focus();
  });

  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) setOpen(false);
  });

  document.addEventListener("keydown", (e) => {
    if (!isOpen()) return;
    if (e.key === "Escape") {
      setOpen(false);
      btn.focus();
      return;
    }
    if (e.key === "Tab") {
      const items = [...$$("a", nav), btn];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  desktop.addEventListener("change", () => setOpen(false));
}

/* 3. Mark the current page in the menu */
function markActiveLink() {
  const norm = (p) => p.replace(/\/index\.html$/, "").replace(/\/+$/, "") || "/";
  const here = norm(location.pathname);
  $$("#site-nav a").forEach((a) => {
    if (norm(new URL(a.href, location.origin).pathname) === here) {
      a.setAttribute("aria-current", "page");
    }
  });
}

/* 4. Register buttons (header, hero, call to action, footer) */
function applyRegisterCtas(event) {
  const s = event
    ? { label: LABELS.registerLabel, short: LABELS.registerShortLabel, url: event.registerUrl || "/register" }
    : { label: NO_UPCOMING.registerLabel, short: NO_UPCOMING.registerShortLabel, url: NO_UPCOMING.registerUrl };

  const apply = (selector, label) =>
    $$(selector).forEach((a) => {
      a.href = s.url;
      ($("[data-register-label]", a) || a).textContent = label;
    });

  apply("[data-register-cta]", s.label);
  apply("[data-register-cta-short]", s.short);
}

/* 5. Home hero */
function renderHero(event) {
  const hero = $("[data-hero]");
  if (!hero) return;

  const text = (sel, value) => {
    const node = $(sel, hero);
    if (node) node.textContent = value;
  };
  const badge = $("[data-hero-badge]", hero);
  const facts = $("[data-hero-facts]", hero);
  const message = $("[data-hero-message]", hero);
  const countdown = $("[data-countdown]", hero);
  const exhibit = $("[data-exhibit-cta]", hero);
  const news = $("[data-news-cta]", hero);

  if (!event) {
    hero.dataset.state = "past";
    if (badge) badge.hidden = true;
    if (facts) facts.hidden = true;
    if (countdown) countdown.hidden = true;
    if (exhibit) exhibit.hidden = true;
    text("[data-hero-eyebrow]", NO_UPCOMING.eyebrow);
    text("[data-hero-title]", NO_UPCOMING.title);
    if (message) {
      message.textContent = NO_UPCOMING.message;
      message.hidden = false;
    }
    if (news) {
      news.href = NO_UPCOMING.newsUrl;
      news.hidden = false;
    }
    return;
  }

  hero.dataset.state = "upcoming";
  text("[data-hero-eyebrow]", event.name);
  text("[data-hero-title]", event.theme);
  text("[data-hero-date]", event.dateText);
  text("[data-hero-venue]", `${event.venue}, ${event.city}`);
  text("[data-hero-tagline]", event.tagline);
  if (exhibit) exhibit.href = event.exhibitUrl || "/exhibition";

  const slot = $("[data-hero-photo]", hero);
  if (event.heroImage && slot) {
    const img = photo(event.heroImage);
    img.loading = "eager";
    img.fetchPriority = "high";
    slot.replaceChildren(img);
  }

  if (countdown) startCountdown(event, countdown);
}

/* 6. Countdown */
function startCountdown(event, root) {
  const tiles = $("[data-countdown-tiles]", root);
  const live = $("[data-countdown-live]", root);
  const unit = (name) => $(`[data-unit="${name}"]`, root);
  const out = { days: unit("days"), hours: unit("hours"), minutes: unit("minutes"), seconds: unit("seconds") };
  const pad = (n) => String(n).padStart(2, "0");
  let timer;

  function tick() {
    const ms = event.start - Date.now();
    if (ms <= 0) {
      clearInterval(timer);
      if (tiles) tiles.hidden = true;
      if (live) live.hidden = false;
      return;
    }
    const total = Math.floor(ms / 1000);
    out.days.textContent = pad(Math.floor(total / 86400));
    out.hours.textContent = pad(Math.floor((total % 86400) / 3600));
    out.minutes.textContent = pad(Math.floor((total % 3600) / 60));
    out.seconds.textContent = pad(total % 60);
  }

  root.hidden = false;
  tick();
  timer = setInterval(tick, 1000);
}

/* 7. Sub-themes with image thumbnails */
function renderSubThemes(event) {
  const list = $("[data-subthemes]");
  if (!list) return;
  const section = list.closest("section");

  if (!event || !event.subThemes?.length) {
    if (section) section.hidden = true;
    return;
  }

  const words = ["No", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
  const count = event.subThemes.length;
  const heading = $("[data-subthemes-title]");
  if (heading) heading.textContent = `${words[count] ?? count} sub-themes for ${event.startsAt.slice(0, 4)}`;

  list.replaceChildren(
    ...event.subThemes.map((t, i) => {
      const li = el("li", "card media-card subtheme");
      li.dataset.reveal = "";

      const media = t.image
        ? photo(t.image, "media-card__media")
        : placeholder(`Thumbnail to be added: ${t.title}`, "media-card__media");

      const body = el("div", "media-card__body");
      const num = el("span", "subtheme__num", String(i + 1));
      num.setAttribute("aria-hidden", "true");
      body.append(num, el("h3", null, t.title));
      if (t.text) body.append(el("p", null, t.text));

      li.append(media, body);
      return li;
    })
  );
}

/* 8. Past editions carousel */
function renderEditions() {
  const list = $("[data-editions]");
  if (!list) return;
  const section = list.closest("section");

  if (!PAST_EDITIONS.length) {
    if (section) section.hidden = true;
    return;
  }

  list.replaceChildren(
    ...PAST_EDITIONS.map((e) => {
      const li = el("li", "edition");
      const badge = el("span", "edition__badge", `ABC ${e.year}`);
      const media = e.image
        ? photo({ alt: `Photo from ABC ${e.year}`, ...e.image })
        : placeholder(`Photo from ABC ${e.year}`);
      li.append(media, badge);
      return li;
    })
  );
}

/* 9. Sponsors and partners */
function renderSponsors() {
  const list = $("[data-sponsors]");
  if (!list) return;

  if (!SPONSORS.length) {
    // Placeholder count can be set per page with data-placeholders (Home stays at 8)
    const count = Number(list.dataset.placeholders) || 8;
    list.replaceChildren(
      ...Array.from({ length: count }, () => {
        const li = el("li", "logo-box", "Sponsor logo");
        li.setAttribute("aria-hidden", "true");
        return li;
      })
    );
    return;
  }

  list.replaceChildren(
    ...SPONSORS.map((s) => {
      const li = el("li", "logo-box");
      const img = photo({ src: s.logo, alt: s.name });
      if (s.url) {
        const a = el("a");
        a.href = s.url;
        a.rel = "noopener";
        a.append(img);
        li.append(a);
      } else {
        li.append(img);
      }
      return li;
    })
  );
}

/* 10. Call to action and footer event details */
function renderCta(event) {
  const title = $("[data-cta-title]");
  const body = $("[data-cta-text]");
  const footerEvent = $("[data-footer-event]");

  if (!event) {
    if (title) title.textContent = NO_UPCOMING.ctaTitle;
    if (body) {
      body.textContent = NO_UPCOMING.message;
      body.hidden = false;
    }
    if (footerEvent) footerEvent.hidden = true;
    return;
  }

  const dayMonth = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", timeZone: "Africa/Lagos" }).format(event.start);
  if (title) title.textContent = `Be in the room on ${dayMonth}`;
  if (body) {
    body.textContent = `Register to attend ${event.name}: ${event.dateText}, ${event.venue}, ${event.city}.`;
    body.hidden = false;
  }
  if (footerEvent) {
    const date = $("[data-footer-date]", footerEvent);
    const place = $("[data-footer-place]", footerEvent);
    if (date) date.textContent = event.dateText;
    if (place) place.textContent = `${event.venue}, ${event.city}, ${event.country}`;
  }
}

/* 11. Contact, social and privacy details (site.js) */
function applySite() {
  const set = (key, value, href) => {
    if (!value) return;
    $$(`[data-site="${key}"]`).forEach((node) => {
      if (href) {
        const a = el("a", null, value);
        a.href = href;
        node.replaceChildren(a);
      } else {
        node.textContent = value;
      }
    });
  };
  set("email", SITE.email, SITE.email && `mailto:${SITE.email}`);
  set("phone", SITE.phone, SITE.phone && `tel:${SITE.phone.replace(/\s+/g, "")}`);
  set("address", SITE.address);

  // Update every match on the page (form notice, contact card and footer), not just the first
  if (SITE.privacyUrl) {
    $$('[data-site="privacy"]').forEach((node) => {
      const a = el("a", null, "Read the full privacy policy.");
      a.href = SITE.privacyUrl;
      node.replaceChildren(a);
    });
  }

  let anySocial = false;
  Object.entries(SITE.social).forEach(([name, url]) => {
    if (!url) return;
    $$(`[data-social="${name}"]`).forEach((a) => {
      a.href = url;
      a.hidden = false;
    });
    anySocial = true;
  });
  $$("[data-social-group]").forEach((group) => (group.hidden = !anySocial));
}

/* 12. schema.org Event, built from the same data */
function injectEventSchema(event) {
  if (!event || !$("[data-hero]")) return;
  const data = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    description: event.theme,
    startDate: event.startsAt.slice(0, 10),
    endDate: event.endsAt.slice(0, 10),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: event.venue,
      address: { "@type": "PostalAddress", addressLocality: event.city, addressCountry: event.countryCode },
    },
    organizer: { "@type": "Organization", name: "African Brands Congress", url: "https://africanbrandscongress.com" },
    url: "https://africanbrandscongress.com/",
  };
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(data);
  document.head.append(script);
}

/* 13. Footer year */
function setYear() {
  $$("[data-year]").forEach((n) => (n.textContent = String(new Date().getFullYear())));
}

/* 14. Gentle reveal on scroll (below-the-fold items only, off for reduced motion) */
function initReveal() {
  if (!("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px" }
  );

  $$("[data-reveal]")
    .filter((n) => n.getBoundingClientRect().top > window.innerHeight)
    .forEach((n) => {
      n.classList.add("reveal");
      io.observe(n);
    });
}

/* Start */
const nextEvent = getNextEvent();
initMenu();
markActiveLink();
applyRegisterCtas(nextEvent);
renderHero(nextEvent);
renderSubThemes(nextEvent);
renderEditions();
renderSponsors();
renderCta(nextEvent);
applySite();
injectEventSchema(nextEvent);
setYear();
initReveal();