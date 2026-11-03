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

  // TEMPLATE (a comment, so it stays hidden). To use it: copy the line, remove the "//", change id, year and name, and replace every REPLACE value.
  // { id: "abc-2025", year: 2025, name: "ABC 2025", edition: 99, theme: "REPLACE: exact theme wording", dateText: "REPLACE: weekday, day month year", venue: "REPLACE: venue, city", summary: "REPLACE: one or two sentences about this edition, or set to null", flyer: { src: "/assets/img/gallery/2025/flyer.webp", alt: "REPLACE: one-line description of the flyer", width: 900, height: 675 }, photos: photos(2025, 30, { 1: { alt: "REPLACE: describe photo 1", caption: "REPLACE: optional caption" } }) },

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

  { id: "abc-2024", year: 2024, name: "ABC 2024", edition: "9", theme: "3R: Rejuvenate, Revitalization, Reinvention", dateText: "Dec 2024", venue: "Oriental Hotel" , summary: null, flyer: { src: "/assets/img/gallery/2024/flyer.webp", alt: "Flyer for the 9th Edition", width: 900, height: 675 }, photos: photos(2024, 10) },

  { id: "abc-2023", year: 2023, name: "ABC 2023", edition: 8, theme: null, "Sept 2023" : null, venue: "The Civic Center" , summary: null, flyer: { src: "/assets/img/gallery/2023/flyer.webp", alt: "Flyer for the 6th edition", width: 900, height: 675 }, photos: photos(2023, 30) },

  { id: "abc-2022", year: 2022, name: "ABC 2022", edition: "7", theme: null, dateText: "Sept 2024", venue: "Oriental Hotel", summary: null, flyer: { src: "/assets/img/gallery/2022/flyer.webp", alt: "Flyer for the 7th edition", width: 900, height: 675 }, photos: photos(2022, 0) },

  { id: "abc-2021", year: 2021, name: "ABC 2021", edition: "6", theme: "Digital Technology, AI And IoT" , dateText: "Sept 2021" , venue: "Oriental Hotel", summary: null, flyer: { src: "/assets/img/gallery/2021/flyer.webp", alt: "Flyer for 6th edition", width: 900, height: 675 }, photos: photos(2021, 30) },

];