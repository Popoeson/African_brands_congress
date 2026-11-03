/**
 * ABC: gallery data (past editions).
 * This is the ONLY file to edit to change the Gallery page.
 *
 * - The page sorts by year, newest first.
 * - Anything unconfirmed stays null or 0. The page shows "To be announced" or "to be added". Do not guess.
 * - Images live in /assets/img/gallery/<year>/ . Compress first: WebP, 800x600, ideally under 100 KB.
 *
 * Photos are numbered files: /assets/img/gallery/<year>/gal1.webp ... galN.webp (lowercase, no gaps).
 * Set the exact count in photos(year, count). A count of 0 shows "Photos to be added."
 * Optional per-photo text, for example: photos(2024, 30, { 3: { alt: "Describe the photo", caption: "Opening session" } })
 *
 * flyer:   { src: "/assets/img/gallery/2024/flyer.webp", alt: "Describe the flyer", width: 900, height: 675 } or null
 * edition: number (for example 9) or null
 * dateText / venue / summary: text or null
 * Do not publish identifiable guests or winners without client confirmation.
 */

function photos(year, count, overrides = {}) {
  return Array.from({ length: count }, (_, i) => {
    const n = i + 1;
    return {
      src: `/assets/img/gallery/${year}/gal${n}.webp`,
      alt: `Photo ${n} of ${count} from ABC ${year}`,
      width: 800,
      height: 600,
      ...overrides[n],
    };
  });
}

export const GALLERY = [
  { id: "abc-2024", year: 2024, name: "ABC 2024", edition: null, theme: null, dateText: null, venue: null, summary: null, flyer: null, photos: photos(2024, 10) },
  { id: "abc-2023", year: 2023, name: "ABC 2023", edition: null, theme: null, dateText: null, venue: null, summary: null, flyer: null, photos: photos(2023, 30) },
  { id: "abc-2022", year: 2022, name: "ABC 2022", edition: null, theme: null, dateText: null, venue: null, summary: null, flyer: null, photos: photos(2022, 0) },
  { id: "abc-2021", year: 2021, name: "ABC 2021", edition: null, theme: null, dateText: null, venue: null, summary: null, flyer: null, photos: photos(2021, 30) },
];
