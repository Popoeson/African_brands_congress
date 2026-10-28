/**
 * ABC: awards data.
 * This is the ONLY file to edit to change award categories and past winners.
 *
 * Source: ABC.docx (35 categories). Names and criteria are proofread: spelling fixed ("Ethnical" to "Ethical").
 * The sector headings are a draft grouping (the docx lists the 35 categories without sectors).
 * Client to confirm the headings and the items marked CLIENT TO CONFIRM.
 * Keep each category name unique: the enquiry form's dropdown sends it to the client.
 */

// Shared criteria (the docx gives identical criteria for these pairs)
const FINANCE_CRITERIA = [
  "Efficiency in service delivery",
  "Growth in size in the last one year",
  "Brand network",
  "Balance sheets",
  "Low level of bad debts",
  "Growth in staff strength",
  "Use of technology",
  "Time-based brand experience",
  "Ethical standard and policies",
  "Credible corporate governance",
];

const FINTECH_CRITERIA = [
  "Innovation and invention",
  "Operational system excellence",
  "Level of customer patronage",
  "Ethical standard and policies",
  "Use of technology",
];

export const SECTORS = [
  {
    name: "Consumer goods and lifestyle",
    categories: [
      {
        name: "Fast-Moving Consumer Goods (FMCG) Brand of the Year",
        criteria: [
          "Quality and resilience",
          "Brand market share",
          "Brand acceptance, reliability, value and durability",
          "Brand extension programme and creation of new categories",
          "Optimum customer satisfaction",
        ],
      },
      {
        name: "Household Electronic and Electrical Brand of the Year",
        criteria: [
          "Quality and reliance", // CLIENT TO CONFIRM: reliability?
          "Brand acceptance",
          "Market share dominance",
          "Durability and value",
          "Innovation and invention",
        ],
      },
      {
        name: "Eatery and Fast Foods Brand of the Year",
        criteria: [
          "Quality of foods, hygiene and standard",
          "Level of customer patronage",
          "Efficiency in service delivery",
          "Growth in the last one year",
          "Optimum consumer satisfaction",
        ],
      },
      {
        name: "Dry Cleaning and Laundry Services Brand of the Year",
        criteria: [
          "Operational excellence",
          "Quality service delivery",
          "Ethical standard and policies",
          "Market share dominance",
          "Optimum customer satisfaction",
          "Growth in the last one year",
        ],
      },
      {
        name: "Beauty, Cosmetic, Toiletries, Hair, Skincare, Fashion and Lifestyle Brand of the Year",
        criteria: [
          "Quality and reliance", // CLIENT TO CONFIRM: reliability?
          "Market share dominance",
          "Brand acceptance, reliability and value",
          "Optimum customer satisfaction",
          "Level of customer loyalty",
        ],
      },
      {
        name: "Furniture/Interior Decoration Brand of the Year",
        criteria: [
          "Quality and resilience", // CLIENT TO CONFIRM: the docx says "Quality residence"
          "Innovation and invention",
          "Optimum customer satisfaction",
          "Market share dominance", // CLIENT TO CONFIRM: the docx says "Market share romance"
          "Level of customer patronage",
        ],
      },
    ],
  },
  {
    name: "Agriculture, food and health",
    categories: [
      {
        name: "Food and Agricultural Product Brand of the Year",
        criteria: [
          "Quality and reliability",
          "Brand acceptance",
          "Level of customer patronage",
          "Market share dominance",
          "Durability and value-chain drive",
        ],
      },
      {
        name: "Agricultural Investment/Technology Platform Brand of the Year",
        criteria: [
          "Innovation and invention",
          "Operational excellence",
          "Quality and reliability",
          "Use of technology",
          "Customer satisfaction",
        ],
      },
      {
        name: "Pharmaceutical and Drug Brand of the Year",
        criteria: ["Consumer acceptance", "Quality and reliability", "Market dominance"],
      },
      {
        name: "HMO, Healthcare, Health Insurance, Hospital Equipment and Hospital Brand of the Year",
        criteria: [
          "Quality service delivery",
          "Use of technology",
          "Operational excellence",
          "Ethical standard and best practice",
          "New innovation and invention",
        ],
      },
    ],
  },
  {
    name: "Financial services",
    categories: [
      {
        name: "Financial Services Brand of the Year (Bank, PSB, Insurance, Insurtech, PFA, Mortgage)",
        criteria: FINANCE_CRITERIA,
      },
      {
        name: "Investment/Digital Banking and Commercial Bank Brand of the Year",
        criteria: FINANCE_CRITERIA,
      },
      {
        name: "Financial Technology Brand of the Year",
        criteria: FINTECH_CRITERIA,
      },
      {
        name: "Pension Fund Administrator and Pension Custodian Brand of the Year",
        criteria: FINTECH_CRITERIA,
      },
    ],
  },
  {
    name: "Media, technology and communications",
    categories: [
      {
        name: "Print and Electronic Media Brand of the Year",
        criteria: [
          "Efficiency in service delivery",
          "Use of digital technology",
          "Ethical standard and policy",
          "Media coverage",
          "Operational excellence",
        ],
      },
      {
        name: "Information, Communication and Technology (ICT) Brand of the Year",
        criteria: [
          "Operational excellence",
          "Vision/Mission",
          "Self empowerment",
          "Ethical standard and policy",
          "New innovation and invention",
        ],
      },
      {
        name: "Papers and Stationeries, Printing and Publishing Brand of the Year",
        criteria: [
          "Durability and value",
          "Quality assurance",
          "Brand acceptance",
          "Market share dominance",
          "Customer brand loyalty",
        ],
      },
      {
        name: "Sports, Arts and Entertainment Brand of the Year",
        criteria: [
          "Quality and reliability",
          "Optimum customer satisfaction",
          "Durability and services",
          "Customer brand loyalty",
          "Internal brand culture",
        ],
      },
      {
        name: "Telecommunication (GSM, Mobile Handset and CDMA) Brand of the Year",
        criteria: [
          "Network coverage",
          "Effectiveness of the network",
          "Quality service delivery",
          "Customer relationship and service",
          "Staff training and attitude",
          "Relationship with stakeholders",
        ],
      },
    ],
  },
  {
    name: "Energy, industry and construction",
    categories: [
      {
        name: "Oilfield and Oil Services, Oil Exploration and Production, and Oil and Gas Brand of the Year",
        criteria: [
          "Brand acceptance and patronage",
          "Reliability and durability of the brand",
          "Quality assurance",
          "Customer brand loyalty",
        ],
      },
      {
        name: "Power/Electricity/Alternative Energy Brand of the Year",
        criteria: [
          "Innovation and invention",
          "Operational excellence",
          "Quality and reliability",
          "Use of technology",
          "Customer satisfaction",
        ],
      },
      {
        name: "Industrial Equipment and Machine Brand of the Year",
        criteria: [
          "Operational excellence",
          "Quality service delivery",
          "Staff empowerment",
          "Ethical standard and policies",
        ],
      },
      {
        name: "Cements, Paint, Furniture, Aluminium Products, Tiles/Marble and Building Materials Brand of the Year",
        criteria: [
          "Quality and resilience",
          "Brand acceptance and reliability",
          "Durability and value",
          "Market share dominance",
          "Optimum customer satisfaction",
        ],
      },
      {
        name: "Engineering and Construction (Building and Road) Brand of the Year",
        criteria: [
          "New innovation and invention", // CLIENT TO CONFIRM: the docx says "New innovation and innovative"
          "Professional competence/performance",
          "Quality service delivery",
          "Level of industry acceptance",
          "Use of ICT in operation",
        ],
      },
      {
        name: "Real Estate Investment/Development/Management Brand of the Year",
        criteria: [
          "Efficiency in service delivery",
          "Operational system excellence",
          "Level of customer patronage",
          "Ethical standard and policies",
          "Use of technology",
        ],
      },
    ],
  },
  {
    name: "Transport, logistics and travel",
    categories: [
      {
        name: "Fleets, Automobile and Spare Parts Brand of the Year",
        criteria: [
          "Convenience and value",
          "Quality and reliance", // CLIENT TO CONFIRM: reliability?
          "Functionality and value",
          "Innovation and standard",
          "Durability and service",
        ],
      },
      {
        name: "Airlines and Aviation Brand of the Year",
        criteria: [
          "Fixed schedule delivery",
          "Time-based brand experience",
          "Service delivery schedule",
          "Operational excellence",
          "Ethical standard and policies",
        ],
      },
      {
        name: "Transportation, Logistics, Shipping and Haulage Services Brand of the Year",
        criteria: [
          "Effectiveness and efficiency in service delivery",
          "Operational excellence",
          "Growth in the last one year",
          "Time-based brand experience",
          "Ethical standard and policies",
        ],
      },
      {
        name: "Maritime/Shipping Brand of the Year",
        criteria: [
          "Operational excellence",
          "Effective service delivery",
          "New innovation and invention",
          "Ethical standard and policy",
          "Optimum customer satisfaction",
        ],
      },
      {
        name: "Courier and Packaging Brand of the Year",
        criteria: [
          "Efficiency and effective service delivery",
          "Service delivery schedule",
          "Operational excellence",
          "Growth in the last one year",
        ],
      },
      {
        name: "Hospitality, Hotel Management, Travel and Tour Services Brand of the Year",
        criteria: [
          "Relationship with shareholders", // CLIENT TO CONFIRM: stakeholders?
          "Customer satisfaction",
          "New innovation and standard",
          "Growth in the last one year",
          "Ethical standard/policy",
          "Use of technology",
        ],
      },
    ],
  },
  {
    name: "Professional, education and security services",
    categories: [
      {
        name: "Professional Services (Law, Accountancy, Advertising, Management Consulting, Public Relations) Brand of the Year",
        criteria: [
          "Personality of the CEO",
          "Ethical standard",
          "Operational excellence",
          "Staff empowerment",
          "Visual representation",
        ],
      },
      {
        name: "Education/Learning/Academic Brand of the Year",
        criteria: [
          "Intellectual disposition",
          "Quality education orientation",
          "Stakeholders endorsement",
          "Personality of the leaders",
        ],
      },
      {
        name: "Security (Private) Management/Security Product/Security Consultancy Brand of the Year",
        criteria: [
          "Innovation and security awareness system",
          "Security management skills",
          "Personality of CEO",
          "Operational effectiveness",
          "Use of technology in security system",
          "Quality service delivery/reliability",
          "Recognition by industry stakeholders",
        ],
      },
      {
        name: "Human Resource/Knowledge Management Brand of the Year",
        criteria: [
          "Operational excellence",
          "Quality in service delivery",
          "Ethical standard/reliability",
          "Self-motivation/empowerment",
          "Personality of CEO",
        ],
      },
    ],
  },
];

/**
 * Past winners. Not supplied yet, so the section is hidden on the page.
 * Do not add identifiable winners without client confirmation.
 * { name: "Brand", category: "Category", year: 2022,
 *   image: { src: "/assets/img/winners/brand.webp", alt: "Describe the photo", width: 800, height: 600 } }
 * image may be null (4:3, compressed, under 200 KB).
 */
export const PAST_WINNERS = [];