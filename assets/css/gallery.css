
/* Gallery page. Builds on base.css tokens and classes. Mobile first. */

.gal-band-lead {
  max-width: 44ch;
  margin-top: var(--s-4);
}

/* =========================================
   GALLERY CARDS
========================================= */

/* Cards: as many columns as fit */
.gal-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: var(--s-6);
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr));
}

.gal-card {
  padding: 0;
  overflow: hidden;
  display: flex;
}

.gal-card__btn {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0;
  font: inherit;
  text-align: left;
  color: inherit;
  background: transparent;
  border: 0;
  cursor: pointer;
}

.gal-card__btn:focus-visible {
  outline: 3px solid var(--ink);
  outline-offset: -3px;
  box-shadow: inset 0 0 0 6px var(--yellow);
}

/* Thumbnail container */
.gal-card__media {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--sand);
  border-bottom: var(--border);
}

/* Make thumbnail fill the entire container */
.gal-card__media img,
.gal-card__media .ph {
  display: block;
  width: 100%;
  height: 100%;
}

.gal-card__media img {
  object-fit: cover;
  object-position: center;
}

/* Edition badge */
.gal-badge {
  position: absolute;
  z-index: 2;
  top: 12px;
  left: 12px;
  padding: 4px 14px;
  font: 700 1rem var(--font-head);
  color: var(--ink);
  background: var(--yellow);
  border: var(--border);
  border-radius: 999px;
}

/* Card information */
.gal-card__body {
  display: grid;
  gap: var(--s-1);
  align-content: start;
  padding: var(--s-4);
}

.gal-label {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--green-deep);
}

.gal-card__theme {
  font: 700 1.125rem/1.3 var(--font-head);
  color: var(--ink);
  overflow-wrap: anywhere;
}

.gal-card__cta {
  display: inline-flex;
  align-items: center;
  gap: var(--s-2);
  margin-top: var(--s-2);
  font-weight: 600;
  color: var(--ink);
}

.gal-card__cta .icon {
  width: 20px;
  height: 20px;
}

/* Card hover effect */
@media (hover: hover) and (prefers-reduced-motion: no-preference) {
  .gal-card {
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }

  .gal-card:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 var(--ink);
  }
}


/* =========================================
   GALLERY DETAILS DIALOG
========================================= */

/* Dialog container */
.gal-dialog {
  width: min(960px, calc(100% - var(--s-4)));
  max-width: none;
  padding: 0;
  color: var(--ink);
  background: transparent;
  border: 0;
  overflow: visible;
}

.gal-dialog::backdrop {
  background: rgba(17, 17, 17, 0.65);
}

/* Dialog panel */
.gal-dialog__panel {
  max-height: calc(100vh - 16px);
  max-height: calc(100dvh - 16px);
  overflow-y: auto;
  background: #fff;
  border: var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

/* Dialog header */
.gal-dialog__bar {
  position: sticky;
  top: 0;
  z-index: 3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--s-4);
  padding: var(--s-3) var(--s-4);
  background: #fff;
  border-bottom: var(--border);
}

.gal-dialog__bar h2 {
  margin: 0;
  font-size: 1.25rem;
}

/* Dialog content */
.gal-dialog__body {
  display: grid;
  gap: var(--s-6);
  padding: var(--s-4);
}

/* =========================================
   FLYER AND EVENT INFORMATION
========================================= */

.gal-dialog__body h3 {
  margin: 0 0 var(--s-3);
}

/* Flyer and information layout */
.gal-dialog__top {
  display: grid;
  gap: 24px;
  grid-template-columns: minmax(0, 1fr);
  align-items: start;
}

/* Flyer */
.gal-flyer {
  width: 100%;
  max-width: 340px;
  margin: 0 auto;
}

.gal-flyer img {
  display: block;
  width: 100%;
  height: auto;
  border: var(--border);
  border-radius: var(--radius);
}

.gal-flyer .ph {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: var(--radius);
}

/* Event information */
.gal-info {
  display: grid;
  gap: var(--s-3);
  align-content: start;
}

.gal-info p {
  margin: 0;
}

.gal-theme {
  font: 700 1.25rem/1.3 var(--font-head);
  overflow-wrap: anywhere;
}

/* Event facts */
.gal-facts {
  display: grid;
  gap: var(--s-3);
  margin: 0;
}

.gal-facts dt {
  font-size: 14px;
  font-weight: 600;
  color: var(--green-deep);
}

.gal-facts dd {
  margin: 0;
}


/* =========================================
   EMPTY STATES
========================================= */

.gal-empty {
  margin: 0;
  padding: var(--s-4);
  font-weight: 600;
  color: var(--slate);
  background: var(--offwhite);
  border: var(--border);
  border-radius: var(--radius);
}


/* =========================================
   EVENT PHOTOS
========================================= */

/* Photos in a consistent 4:3 ratio */
.gal-photos {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: var(--s-4);
  grid-template-columns: minmax(0, 1fr);
}

.gal-photo figure {
  margin: 0;
}

.gal-photo img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border: var(--border);
  border-radius: var(--radius);
}

.gal-photo figcaption {
  margin-top: var(--s-2);
  font-size: 14px;
  color: var(--slate);
}


/* =========================================
   RESPONSIVE BREAKPOINTS
========================================= */

/* Tablets */
@media (min-width: 600px) {
  .gal-photos {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* Desktop */
@media (min-width: 768px) {

  .gal-dialog__bar {
    padding: var(--s-4) var(--s-6);
  }

  .gal-dialog__body {
    padding: var(--s-6);
  }

  /* Smaller flyer with more room for information */
  .gal-dialog__top {
    grid-template-columns: minmax(0, 0.85fr) minmax(0, 1fr);
    gap: 32px;
    align-items: start;
  }

  .gal-flyer {
    max-width: 360px;
  }
}

/* Large screens */
@media (min-width: 1000px) {
  .gal-photos {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

/* Small screens */
@media (max-width: 767px) {

  .gal-dialog__top {
    grid-template-columns: minmax(0, 1fr);
    gap: 24px;
  }

  .gal-flyer {
    max-width: 340px;
  }

}
