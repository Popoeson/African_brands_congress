/**
 * ABC: awards data.
 * This is the ONLY file to edit to change award categories and past winners.
 *
 * - Anything unconfirmed stays null. The page then shows "to be announced".
 * - The sector names below come from the design mockup, which labels them "sample".
 *   Client to confirm them. Sector 6 was not visible in the mockup: name is null.
 * - There must be 35 categories in total (5 per sector across 7 sectors).
 *
 * To fill a category, replace its { name: null, criteria: null } with:
 *   { name: "Category name", criteria: "Who is eligible, what evidence is needed, how judges score." }
 */

const slots = (n) => Array.from({ length: n }, () => ({ name: null, criteria: null }));

export const SECTORS = [
  { name: "Financial Services", categories: slots(5) },
  { name: "Fast-Moving Consumer Goods", categories: slots(5) },
  { name: "Telecommunications and Technology", categories: slots(5) },
  { name: "Media, Marketing and Creative", categories: slots(5) },
  { name: "Manufacturing and Industry", categories: slots(5) },
  { name: null, categories: slots(5) }, // TODO: sector 6 name to be confirmed by the client
  { name: "Public Sector, Health and Social Impact", categories: slots(5) },
];

/**
 * Past winners. While empty, the page shows four "Winner photo" placeholders.
 * Do not add identifiable winners without client confirmation.
 * { name: "Brand", category: "Category", year: 2022,
 *   image: { src: "/assets/img/winners/brand.webp", alt: "Describe the photo", width: 800, height: 600 } }
 * image may be null (4:3, compressed, under 200 KB).
 */
export const PAST_WINNERS = [];