/**
 * ABC: awards data.
 * This is the ONLY file to edit to change award categories and past winners.
 *
 * - Every category below is a placeholder. Replace its name and criteria
 *   with the client's approved wording, one line at a time.
 * - The sector names come from the design mockup, which labels them "sample".
 *   Client to confirm them. Sector 6 was not visible in the mockup.
 * - There must be 35 categories in total (5 per sector across 7 sectors).
 * - Keep each category name unique: the enquiry form's dropdown sends it to the client.
 */

const TBA = "Criteria to be announced.";

export const SECTORS = [
  {
    name: "Financial Services",
    categories: [
      { name: "Category 1: name to be announced", criteria: TBA },
      { name: "Category 2: name to be announced", criteria: TBA },
      { name: "Category 3: name to be announced", criteria: TBA },
      { name: "Category 4: name to be announced", criteria: TBA },
      { name: "Category 5: name to be announced", criteria: TBA },
    ],
  },
  {
    name: "Fast-Moving Consumer Goods",
    categories: [
      { name: "Category 6: name to be announced", criteria: TBA },
      { name: "Category 7: name to be announced", criteria: TBA },
      { name: "Category 8: name to be announced", criteria: TBA },
      { name: "Category 9: name to be announced", criteria: TBA },
      { name: "Category 10: name to be announced", criteria: TBA },
    ],
  },
  {
    name: "Telecommunications and Technology",
    categories: [
      { name: "Category 11: name to be announced", criteria: TBA },
      { name: "Category 12: name to be announced", criteria: TBA },
      { name: "Category 13: name to be announced", criteria: TBA },
      { name: "Category 14: name to be announced", criteria: TBA },
      { name: "Category 15: name to be announced", criteria: TBA },
    ],
  },
  {
    name: "Media, Marketing and Creative",
    categories: [
      { name: "Category 16: name to be announced", criteria: TBA },
      { name: "Category 17: name to be announced", criteria: TBA },
      { name: "Category 18: name to be announced", criteria: TBA },
      { name: "Category 19: name to be announced", criteria: TBA },
      { name: "Category 20: name to be announced", criteria: TBA },
    ],
  },
  {
    name: "Manufacturing and Industry",
    categories: [
      { name: "Category 21: name to be announced", criteria: TBA },
      { name: "Category 22: name to be announced", criteria: TBA },
      { name: "Category 23: name to be announced", criteria: TBA },
      { name: "Category 24: name to be announced", criteria: TBA },
      { name: "Category 25: name to be announced", criteria: TBA },
    ],
  },
  {
    name: "Sector 6: name to be announced", // TODO: client to confirm
    categories: [
      { name: "Category 26: name to be announced", criteria: TBA },
      { name: "Category 27: name to be announced", criteria: TBA },
      { name: "Category 28: name to be announced", criteria: TBA },
      { name: "Category 29: name to be announced", criteria: TBA },
      { name: "Category 30: name to be announced", criteria: TBA },
    ],
  },
  {
    name: "Public Sector, Health and Social Impact",
    categories: [
      { name: "Category 31: name to be announced", criteria: TBA },
      { name: "Category 32: name to be announced", criteria: TBA },
      { name: "Category 33: name to be announced", criteria: TBA },
      { name: "Category 34: name to be announced", criteria: TBA },
      { name: "Category 35: name to be announced", criteria: TBA },
    ],
  },
];

/**
 * Past winners. While empty, the page shows four "Winner photo" placeholders.
 * Do not add identifiable winners without client confirmation.
 * { name: "Brand", category: "Category", year: 2022,
 *   image: { src: "/assets/img/winners/brand.webp", alt: "Describe the photo", width: 800, height: 600 } }
 * image may be null (4:3, compressed, under 200 KB).
 */
export const PAST_WINNERS = [];