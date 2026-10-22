/**
 * ABC: news stories.
 * This is the ONLY file to edit to add or change news.
 *
 * - Newest story first. The page shows them in this order.
 * - To add a story, copy one object below and put it at the top of the list.
 * - Keep every id unique (lowercase words with hyphens).
 * - date: "YYYY-MM-DD", or null. null shows "Date to be announced".
 * - body: a list of paragraphs. An empty list shows the summary
 *   followed by "Full story to be announced".
 * - image: null, or { src, alt, width, height } (16:9, compressed, under 200 KB).
 *
 * The four stories below are draft headlines from the design mockup.
 * Client to confirm them and supply dates and full text.
 */

export const NEWS = [
    {
    id: "abc-2026-theme",
    date: null, // publication date to be confirmed by the client
    title: "ABC 2026 theme: The Future of Brands in the Era of Artificial Intelligence",
    summary: "This year the Congress looks at how AI is changing the way African brands are built, marketed and governed.",
    body: [
      "African Brands Congress 2026 takes place on Friday 30 October 2026 at Lagos Oriental Hotel, Lagos, under the theme The Future of Brands in the Era of Artificial Intelligence. This year the Congress looks at how AI is changing the way African brands are built, marketed and governed.",
      "The one-day programme brings together brand owners, marketers, executives, regulators and investors for plenaries, masterclasses, panels, an exhibition floor, structured networking and the African Brand Leadership Merit Awards.",
      "Five sub-themes shape the day: AI-Powered Consumer Insight; Generative AI in Content and Creative Work; Automation, Customer Experience and Digital Trust; AI, Ethics and Brand Governance; and Building AI-Ready Brand Organisations.",
      "The Congress will also publish a communique on AI adoption, ethics and policy, and aims to open new partnership and investment conversations and to recognise outstanding African brands through the awards.",
      "Register to attend, or enquire about exhibiting or sponsoring, through this website.",
    ],
    image: null, // optional: { src: "/assets/img/news/theme-2026.webp", alt: "Describe the photo", width: 1200, height: 675 }
  },
  {
    id: "venue-confirmed",
    date: null,
    title: "Lagos Oriental Hotel confirmed as the 2026 venue",
    summary: "African Brands Congress 2026 takes place on Friday 30 October 2026 at Lagos Oriental Hotel, Lagos.",
    body: [],
    image: null,
  },
  {
    id: "exhibition-enquiries-open",
    date: null,
    title: "Exhibition and sponsorship enquiries are open",
    summary: "Brands and organisations can now enquire about exhibiting at or sponsoring the Congress.",
    body: [],
    image: null,
  },
  {
    id: "merit-awards-categories",
    date: null,
    title: "Merit awards: category details coming soon",
    summary: "Full details of the African Brand Leadership Merit Awards categories will be published here.",
    body: [],
    image: null,
  },
];