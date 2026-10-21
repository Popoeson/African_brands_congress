/* ABC: shared behaviour.
   Header and footer markup lives in each page. This file handles the mobile
   menu, active link, and everything driven by /assets/js/data/events.js. */

import { EVENTS, LABELS, NO_UPCOMING } from "/assets/js/data/events.js";

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

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

  const label = $("[data-menu-label]", btn);
  const desktop = window.matchMedia("(min-width: 1100px)");
  const isOpen = () => btn.getAttribute("aria-expanded") === "true";

  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", String(open));
    if (label) label.textContent = open ? "Close" : "Menu";
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

/* 4. Register buttons (header, hero, final call, footer) */
function applyRegisterCtas(event) {
  const s = event
    ? { label: LABELS.registerLabel, short: LABELS.registerShortLabel, url: event.registerUrl || "/register" }
    : { label: NO_UPCOMING.registerLabel, short: NO_UPCOMING.registerShortLabel, url: NO_UPCOMING.registerUrl };

  $$("[data-register-cta]").forEach((a) => {
    a.textContent = s.label;
    a.href = s.url;
  });
  $$("[data-register-cta-short]").forEach((a) => {
    a.textContent = s.short;
    a.href = s.url;
  });
}

/* 5. Home hero */
function renderHero(event) {
  const hero = $("[data-hero]");
  if (!hero) return;

  const setText = (key, text) => {
    const el = $(`[data-hero-${key}]`, hero);
    if (el) el.textContent = text;
  };
  const exhibit = $("[data-exhibit-cta]", hero);
  const news = $("[data-news-cta]", hero);
  const countdown = $("[data-countdown]", hero);
  const ctaTitle = $("[data-cta-title]");

  if (!event) {
    hero.dataset.state = "past";
    setText("eyebrow", NO_UPCOMING.eyebrow);
    setText("title", NO_UPCOMING.title);
    setText("meta", NO_UPCOMING.message);
    if (countdown) countdown.hidden = true;
    if (exhibit) exhibit.hidden = true;
    if (news) {
      news.hidden = false;
      news.href = NO_UPCOMING.newsUrl;
    }
    if (ctaTitle) ctaTitle.textContent = NO_UPCOMING.ctaTitle;
    return;
  }

  hero.dataset.state = "upcoming";
  setText("eyebrow", event.name);
  setText("title", event.theme);
  setText("meta", `${event.dateText} | ${event.venue}, ${event.city}, ${event.country}`);
  if (exhibit) exhibit.href = event.exhibitUrl || "/exhibition";
  if (ctaTitle) ctaTitle.textContent = `Join us at ${event.name}`;

  const media = $("[data-hero-media]", hero);
  if (event.heroImage && media) {
    const { src, alt, width, height } = event.heroImage;
    const img = new Image();
    img.src = src;
    img.alt = alt || "";
    img.width = width;
    img.height = height;
    img.decoding = "async";
    img.fetchPriority = "high";
    img.className = "hero__img";
    media.replaceChildren(img);
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

/* 7. Sub-themes (from the event data) */
function renderSubThemes(event) {
  const list = $("[data-subthemes]");
  if (!list) return;
  const section = list.closest("section");

  if (!event || !event.subThemes?.length) {
    if (section) section.hidden = true;
    return;
  }

  list.replaceChildren(
    ...event.subThemes.map((t, i) => {
      const li = document.createElement("li");
      li.className = "card subtheme";

      const num = document.createElement("span");
      num.className = "subtheme__num";
      num.setAttribute("aria-hidden", "true");
      num.textContent = String(i + 1);

      const h3 = document.createElement("h3");
      h3.textContent = t.title;

      li.append(num, h3);
      if (t.text) {
        const p = document.createElement("p");
        p.textContent = t.text;
        li.append(p);
      }
      return li;
    })
  );
}

/* 8. schema.org Event, built from the same data */
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

/* 9. Footer year */
function setYear() {
  $$("[data-year]").forEach((el) => (el.textContent = String(new Date().getFullYear())));
}

/* 10. Gentle reveal on scroll (below-the-fold items only, off for reduced motion) */
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
    .filter((el) => el.getBoundingClientRect().top > window.innerHeight)
    .forEach((el) => {
      el.classList.add("reveal");
      io.observe(el);
    });
}

/* Start */
const nextEvent = getNextEvent();
initMenu();
markActiveLink();
applyRegisterCtas(nextEvent);
renderHero(nextEvent);
renderSubThemes(nextEvent);
injectEventSchema(nextEvent);
setYear();
initReveal();