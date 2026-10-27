/**
 * ABC: event data.
 * This is the ONLY file to edit to change the featured event.
 *
 * - The site shows the nearest event whose endsAt is still in the future.
 * - Events whose endsAt has passed move to "Past editions" automatically
 *   (set `cover` on them when a photo is ready).
 * - To add the next edition: copy an event object, give it a new id and dates, and add it to EVENTS.
 * - Dates are ISO 8601 with the Lagos offset (+01:00).
 * - Anything unconfirmed stays null, [] or "To be announced". Do not guess.
 */

export const EVENTS = [
  {
    id: "abc-2026",
    name: "African Brands Congress 2026",
    edition: 11,
    theme: "The Future of Brands in the Era of Artificial Intelligence",
    tagline: "Learn // Network // Celebrate",

    // TODO: client to confirm 30 November 2026 (planning documents said 30 October)
    startsAt: "2026-11-30T10:00:00+01:00",
    endsAt: "2026-11-30T17:00:00+01:00",
    dateText: "Monday 30 November 2026",
    timeText: "10:00 AM to 5:00 PM",

    hall: "Ball Room",
    venue: "Lagos Oriental Hotel",
    area: "Victoria Island",
    city: "Lagos",
    country: "Nigeria",
    countryCode: "NG",

    registerUrl: "/register",
    exhibitUrl: "/exhibition",

    heroImage: {
      src: "/assets/img/hero-2026.webp",
      alt: "Official flyer for the 11th African Brands Congress, Monday 30 November 2026, Lagos Oriental Hotel, Victoria Island, Lagos",
      width: 900,
      height: 675,
    },

    // Shown in "Past editions" once this event has ended. Example:
    // { src: "/assets/img/edition-2026.webp", width: 800, height: 450 }
    cover: null,

    about: [
      "The African Brands Congress (ABC) is the continent's premier gathering of Brand Custodians, Marketers, Business Owners, Communications Professionals, Regulators and Innovators, convened annually to interrogate the forces reshaping brand building across Africa. The Congress exists to strengthen the competitiveness of African brands, celebrate home-grown brand excellence, and create a shared platform where ideas, capital, policy and talent can meet. Since its inception, ABC has grown into a trusted meeting point for the continent's brand economy – a place where strategy is sharpened, partnerships are formed, and the standards of African brand leadership are set.",
      "African Brands Congress 2026 arrives at a defining moment. Artificial Intelligence is no longer an emerging curiosity on the margins of marketing – it is actively rewriting how brands are created, positioned, distributed and defended. From predictive consumer insight to generative content, automated customer service and algorithmic media buying, AI is compressing timelines and raising the bar for what a competitive brand must be able to do. For Africa, a continent of young, fast-growing, mobile-first markets, this is not a distant trend to observe – it is a present reality that is already reshaping how consumers discover, evaluate and stay loyal to brands.",
      "This edition of the Congress brings together thought leaders, chief marketing officers, entrepreneurs, technologists, investors, regulators and policymakers from across Africa and the diaspora to chart a confident, African-rooted response to this shift. Taking place on 30th November, 2026 at the Lagos Oriental Hotel, Lagos, Nigeria, African Brands Congress 2026 will combine plenary sessions, masterclasses, panel discussions, an exhibition floor and structured networking – all built around one central question: what does it take for an African brand to lead, not merely adapt, in the age of artificial intelligence?",
    ],

    synopsis: [
      "Artificial intelligence has moved from the back office into the very heart of brand strategy – shaping how consumers discover products, how narratives are personalized at scale, and how brands are built or lost in an instant. For African brands, this shift presents both an extraordinary opportunity and a pressing challenge: the opportunity to leapfrog legacy marketing models and compete globally on the strength of data, creativity and automation; and the challenge of ensuring that AI adoption does not erode the authenticity, cultural depth and human connection that have long been the signature of African brand storytelling.",
      "This theme invites delegates to examine how brands across sectors – from FMCG and finance to fashion, media, agriculture and the public sector – can harness AI-driven tools for insight generation, content creation, customer engagement and operational efficiency, while safeguarding ethics, ownership of data, and the distinctly African identity that gives their brands meaning. It is a conversation about balance: technology in services of culture, automation in service of authenticity, and innovation in service of inclusive growth.",
    ],

    subThemes: [
      {
        title: "AI-Powered Consumer Insight",
        text: "Exploring how predictive analytics, data science and machine learning are transforming the way African brands understand consumer behaviour, anticipate demand, and personalise offerings at scale, while ensuring responsible use of consumer data.",
        image: { src: "/assets/img/01-consumer-insight.webp", alt: "Consumer insight", width: 800, height: 450 },
      },
      {
        // TODO: flyer titles this "Generative AI-Powered Consumer Insight". Client to confirm.
        title: "Generative AI in Content and Creative Work",
        text: "Examining how generative tools are reshaping content creation, advertising and design workflows across the continent, and what this means for creative talent, originality and the protection of African cultural narratives.",
        image: { src: "/assets/img/content.webp", alt: "Describe the image", width: 800, height: 450 },
      },
      {
        title: "Automation, Customer Experience and Digital Trust",
        text: "Looking at how chatbots, virtual assistants and automated service platforms are redefining customer engagement, and how brands can deploy them without losing the human warmth and trust central to African consumer relationships.",
        image: { src: "/assets/img/digital-trust.webp", alt: "Describe the image", width: 800, height: 450 },
      },
      {
        title: "AI, Ethics and Brand Governance",
        text: "Interrogating the ethical, legal and regulatory questions raised by AI-driven marketing – including data privacy, algorithmic bias, misinformation and intellectual property – and what responsible governance looks like for African brands.",
        image: { src: "/assets/img/ethics.webp", alt: "Describe the image", width: 800, height: 450 },
      },
      {
        // TODO: the supplied text is cut off after "effectively". Client to send the full sentence.
        title: "Building AI-Ready Brand Organisations",
        text: "Focusing on the internal shifts brands must make – talent, skills, culture and infrastructure – to adopt AI effectively.",
        image: { src: "/assets/img/brand-organization.webp", alt: "Describe the image", width: 800, height: 450 },
      },
    ],

    categories: [
      { name: "Fast-Moving Consumer Goods (FMCG)", text: "food, beverage, household and personal care brands." },
      { name: "Financial Services", text: "banks, fintechs, insurance and investment brands." },
      { name: "Technology & Telecommunications", text: "telcos, software, AI and digital platform brands." },
      { name: "Fashion, Beauty & Lifestyle", text: "apparel, cosmetics, wellness and luxury brands." },
      { name: "Media, Entertainment & Creative Industries", text: "broadcast, film, music, gaming and content brands." },
      { name: "Agricultural & Agribusiness", text: "agro-processing, agri-tech and export brands." },
      { name: "Retail & E-commerce", text: "traditional retail chains and online marketplaces." },
      { name: "Hospitality, Travel & Tourism", text: "hotels, airlines and destination brands." },
      { name: "Automotive & Mobility", text: "vehicle manufacturers, ride-hailing and logistics brands." },
      { name: "Public Sector & Nation Brands", text: "government agencies, tourism boards and development organisations." },
      { name: "Professional Services & Agencies", text: "advertising, PR, design and brand consultancies." },
      { name: "Education & Non-Profit Organisations", text: "institutional and mission-driven brands." },
    ],

    objectives: [
      "Examine the practical impact of artificial intelligence on brand strategy, consumer insight, content production and customer experience across African markets.",
      "Equip marketing, communications and business leaders with frameworks for responsibly adopting AI tools without losing brand authenticity and cultural relevance.",
      "Provide a platform for African brand owners, agencies and technology providers to showcase innovation, forge partnerships and explore investment opportunities.",
      "Interrogate policy, data governance and ethical questions raised by AI-driven marketing and advertising on the continent.",
      "Celebrate and benchmark African brand excellence against global standards, while highlighting locally-grown success stories.",
      "Strengthen a pan-African community of practice for brand professionals through networking, mentorship and knowledge exchange.",
    ],

    benefits: [
      { title: "Cutting-edge insight", text: "direct exposure to global and African case studies on AI-powered branding, delivered by practitioners and thought leaders shaping the industry." },
      { title: "Actionable strategy", text: "practical frameworks and toolkits that can be applied immediately to brand, marketing and communications functions." },
      { title: "High-value networking", text: "direct access to CMOs, founders, investors, regulators and technology partners from across the continent and beyond." },
      { title: "Visibility and positioning", text: "opportunities for brands and organisations to showcase their innovations to a curated, influential audience." },
      { title: "Partnership and investment leads", text: "curated matchmaking sessions connecting brands, agencies, investors and technology providers." },
      { title: "Talent and capability development", text: "masterclasses and workshops designed to upskill teams in AI-enabled marketing practice." },
      { title: "Recognition", text: "the chance to be celebrated among Africa's leading brands through Congress awards and showcases." },
    ],

    outcomes: [
      "A clear, shared understanding of how artificial intelligence is transforming brand building across African markets, and what this means for strategy and investment.",
      "A published communique capturing key recommendations on AI adoption, ethics and policy for brands operating in Africa.",
      "New partnerships, collaborations and investment conversations initiated between brands, technology providers, investors and policymakers.",
      "A network of peers and mentors to support continued learning and collaboration beyond the Congress.",
      "Recognition of outstanding African brands and innovators through the Congress's awards and showcase platform.",
      "A foundation of insight and relationships carried forward into subsequent editions of the African Brands Congress, reinforcing its role as the continent's leading brand leadership platform.",
    ],

        // logo: replace null with e.g. { src: "/assets/img/featuring/ceos-forum.webp", width: 400, height: 300 }
    // Until a logo is set, the tile shows the name as text.
        featuring: [
      { name: "ABC Brand Showcase & Exhibition", logo: { src: "/assets/img/brand-showcase.webp", width: 400, height: 300 } },
      { name: "Africa Brands CEOs Forum", logo: { src: "/assets/img/ceo+-forum.webp", width: 400, height: 300 } },
      { name: "Africa Sustainable Brands Summit", logo: { src: "/assets/img/brand-summit.webp", width: 400, height: 300 } },
      { name: "African Brand Innovators Forum", logo: { src: "/assets/img/innovation-forum.webp", width: 400, height: 300 } },
      { name: "Africa Most Admired Brands Awards", logo: { src: "/assets/img/brands-award.webp", width: 400, height: 300 } },
      { name: "Africa Brands TV Online (special featuring)", logo: { src: "/assets/img/brand-tv.webp", width: 400, height: 300 } },
    ],

    poweredBy: "The African Brands",
    supportedBy: ["The African Brands Academy"], // TODO: IBMA full name to be confirmed

        // From the flyer: "plenary sessions, masterclasses, panel discussions, an exhibition floor and structured networking"
    formats: ["Plenary sessions", "Masterclasses", "Panel discussions", "Exhibition floor", "Structured networking"],

    // Not yet supplied. While empty, the Programme page shows "To be announced".
    // programme item: { time: "10:00 AM", title: "Opening", type: "Plenary", speakers: ["Name"] }
    programme: [],
    // speaker: { name: "Name", role: "Title", organisation: "Company", photo: { src: "/assets/img/speakers/name.webp", alt: "Name", width: 600, height: 600 } }
    speakers: [],
  },
];

/** Button labels while an event is upcoming. */
export const LABELS = {
  registerLabel: "Register to attend",
  registerShortLabel: "Register",
};

/** Shown when no event in EVENTS is upcoming. Draft copy: client to approve. */
export const NO_UPCOMING = {
  eyebrow: "African Brands Congress",
  title: "Thank you for being part of African Brands Congress",
  message: "Read the latest news and register your interest for the next edition.",
  ctaTitle: "Be first to hear about the next edition",
  registerLabel: "Register interest for the next edition",
  registerShortLabel: "Register interest",
  registerUrl: "/register",
  newsUrl: "/news-contact",
};