/**
 * ABC: news stories.
 * This is the ONLY file to edit to add or change news.
 *
 * - Newest story first. The page shows them in this order.
 * - To add a story, copy the object below and put it at the top of the list.
 * - Keep every id unique (lowercase words with hyphens).
 * - date: "YYYY-MM-DD", or null. null shows "Date to be announced".
 * - body: a list of paragraphs. An empty list shows the summary
 *   followed by "Full story to be announced".
 * - image: null, or { src, alt, width, height } (16:9, compressed, under 200 KB).
 *
 * The story below is written from the 2026 event flyer.
 * Client to confirm the publication date and approve the wording.
 */

export const NEWS = [
  {
    id: "abc-2026-theme",
    date: null, // publication date to be confirmed by the client
    title: "ABC 2026 theme: The Future of Brands in the Era of Artificial Intelligence",
    summary: "The 11th African Brands Congress looks at how AI is changing the way African brands are built, marketed and governed.",
    body: [
      "The 11th African Brands Congress takes place on Monday 30 November 2026, from 10:00 AM to 5:00 PM, in the Ball Room of the Lagos Oriental Hotel, Victoria Island, Lagos, under the theme The Future of Brands in the Era of Artificial Intelligence.",
      "The Congress brings together thought leaders, chief marketing officers, entrepreneurs, technologists, investors, regulators and policymakers from across Africa and the diaspora. The day combines plenary sessions, masterclasses, panel discussions, an exhibition floor and structured networking, built around one question: what does it take for an African brand to lead, not merely adapt, in the age of artificial intelligence?",
      "The Congress will also publish a communique on AI adoption, ethics and policy, and aims to start new partnership and investment conversations.",
      "Register to attend, or enquire about exhibiting or sponsoring, through this website.",
    ],
    // TODO: hero-2026.webp is 1200 x 900 in events.js but 1200 x 675 here. Use the file's real size in both, and write a real alt text.
    image: { src: "/assets/img/hero-2026.webp", alt: "Describe the photo", width: 1200, height: 675 },
  },
];