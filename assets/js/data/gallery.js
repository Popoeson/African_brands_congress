/**
 * ABC: gallery data (past editions).
 * This is the ONLY file to edit to change the Gallery page.
 *
 * - Newest first is not required: the page sorts by year.
 * - Anything unconfirmed stays null or []. The page shows "To be announced" or "to be added". Do not guess.
 * - Images live in /assets/img/gallery/<year>/ . Compress first: WebP, under 200 KB each.
 *
 * flyer:   { src: "/assets/img/gallery/2024/flyer.webp", alt: "Describe the flyer", width: 900, height: 675 } or null
 * photos:  [{ src: "/assets/img/gallery/2024/photo-01.webp", alt: "Describe the photo", width: 1200, height: 900, caption: "Optional" }]
 *          Photos are shown at 4:3. Do not publish identifiable guests or winners without client confirmation.
 * edition: number (for example 9) or null
 * dateText / venue / summary: text or null
 */

export const GALLERY = [
  { id: "abc-2024", year: 2024, name: "ABC 2024", edition: null, theme: null, dateText: null, venue: null, summary: null, flyer: null, photos: [] },
  { id: "abc-2023", year: 2023, name: "ABC 2023", edition: null, theme: null, dateText: null, venue: null, summary: null, flyer: null, photos: [] },
  { id: "abc-2022", year: 2022, name: "ABC 2022", edition: null, theme: null, dateText: null, venue: null, summary: null, flyer: null, photos: [] },
  { id: "abc-2021", year: 2021, name: "ABC 2021", edition: null, theme: null, dateText: null, venue: null, summary: null, flyer: null, photos: [] },
];