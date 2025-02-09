import { Advisor } from "./types";
import { SubscriptionTier } from "./types";

export const DUMMY_ADVISORS: Advisor[] = [
  {
    id: "mark-speer",
    name: "Mark Speer",
    title: "Investment Advisor",
    bio: "Mark Speer is a seasoned investment advisor known for his astute financial acumen and commitment to delivering tailored investment solutions...",
    imageUrl: "/assets/mark-speer.svg",
    specialties: [
      "Investment Planning",
      "Retirement Planning",
      "Tax Planning",
      "Estate Planning",
      "Risk Management and Insurance",
    ],
    strengths: [
      "Personalized financial strategies",
      "Comprehensive financial plans",
      "Economics background",
      "Client-centric approach",
    ],
    googleCalendarUrl:
      "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2E115m22eq7KUe2jqI0kHzqhmMH0anRW5DBjOAnz6xQ7CRQr7VoAKYFr4bDZ-X4E-G5wxCba1U?gv=true",
  },
  {
    id: "rory-walker",
    name: "Rory Walker",
    title: "Financial Planner",
    bio: "Rory Walker is an experienced financial planner with over a decade of helping clients achieve their financial goals...",
    imageUrl: "/assets/Rory.jpg.png",
    specialties: [
      "Investment Planning",
      "Retirement Planning",
      "Tax Planning",
      "Estate Planning",
    ],
    strengths: [
      "Long-term planning expertise",
      "Risk assessment",
      "Retirement strategies",
      "Wealth preservation",
    ],
    googleCalendarUrl:
      "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2E115m22eq7KUe2jqI0kHzqhmMH0anRW5DBjOAnz6xQ7CRQr7VoAKYFr4bDZ-X4E-G5wxCba1U?gv=true",
  },
  {
    id: "angela-appiah",
    name: "Angela Appiah",
    title: "International Real Estate Broker",
    bio: "Angela Appiah is a seasoned international real estate broker with extensive knowledge of global property markets...",
    imageUrl: "/assets/Angela-Appiah.png",
    specialties: [
      "International Real Estate",
      "Property Investment",
      "Market Analysis",
      "Global Portfolio Management",
    ],
    strengths: [
      "Global market expertise",
      "Investment property analysis",
      "Cross-border transactions",
      "Market trend analysis",
    ],
    googleCalendarUrl:
      "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2E115m22eq7KUe2jqI0kHzqhmMH0anRW5DBjOAnz6xQ7CRQr7VoAKYFr4bDZ-X4E-G5wxCba1U?gv=true",
  },
  {
    id: "graham-goff",
    name: "Graham Goff",
    title: "Retirement Planner",
    bio: "Graham Goff is a retirement planner with a passion for helping clients achieve a secure and fulfilling retirement future...",
    imageUrl: "/assets/graham.png",
    specialties: [
      "Retirement Planning",
      "Pension Optimization",
      "Social Security Planning",
      "Legacy Planning",
    ],
    strengths: [
      "Retirement strategy",
      "Income planning",
      "Risk management",
      "Estate planning",
    ],
    googleCalendarUrl:
      "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2E115m22eq7KUe2jqI0kHzqhmMH0anRW5DBjOAnz6xQ7CRQr7VoAKYFr4bDZ-X4E-G5wxCba1U?gv=true",
  },
  {
    id: "sarah-patel",
    name: "Sarah Patel",
    title: "Wealth Manager",
    bio: "Sarah Patel is an experienced wealth manager specializing in comprehensive financial planning and investment strategies...",
    imageUrl: "/assets/mina.png",
    specialties: [
      "Wealth Management",
      "Asset Allocation",
      "Tax Strategy",
      "Estate Planning",
    ],
    strengths: [
      "Portfolio optimization",
      "Tax-efficient investing",
      "Wealth preservation",
      "Family office services",
    ],
    googleCalendarUrl:
      "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2E115m22eq7KUe2jqI0kHzqhmMH0anRW5DBjOAnz6xQ7CRQr7VoAKYFr4bDZ-X4E-G5wxCba1U?gv=true",
  },
  {
    id: "charles-amoah",
    name: "Charles Amoah",
    title: "Mortgage Broker",
    bio: "Charles Amoah is a dedicated mortgage broker with a strong background in finance and real estate financing solutions...",
    imageUrl: "/assets/charles.png",
    specialties: [
      "Mortgage Planning",
      "Real Estate Financing",
      "Refinancing Strategy",
      "First-time Homebuyers",
    ],
    strengths: [
      "Loan structuring",
      "Rate optimization",
      "Credit analysis",
      "Property valuation",
    ],
    googleCalendarUrl:
      "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2E115m22eq7KUe2jqI0kHzqhmMH0anRW5DBjOAnz6xQ7CRQr7VoAKYFr4bDZ-X4E-G5wxCba1U?gv=true",
  },
];

export const riskCategories = {
  high: [
    "Public Shares Of listed Companies",
    "Private Equity (Growth Stage Businesses)",
    "Venture Capital (Early Stage Business)",
    "Alternative Assets Such As Crypto",
    "Hedge Funds",
  ],
  medium: [
    "Publicly Listed Large Companies",
    "Mutual Funds (Equity Or Bonds)",
    "Listed Collective Investment Schemes",
    "Low Volatility Commodities",
    "Structured Products",
  ],
  low: [
    "US Government Securities",
    "Other US Government Securities",
    "Investment Grade Corporate Bonds",
    "Listed Notes Such As S&P 500",
    "Developed Prime Real Estate",
    "Cash Equivalents",
  ],
};

export const subscriptionTiers: SubscriptionTier[] = [
  {
    id: "standard",
    name: "Standard",
    price: 299,
    pricePerMonth: Math.round(299 / 12),
    interval: "yearly",
    description:
      "Expert guidance and smart financial management for individuals starting their wealth journey.",
    idealCustomer:
      "Ideal for individuals who want expert guidance and smart, data-driven financial management with occasional expert check-ins.",
    intro: "Standard plan includes:",
    features: [
      "Celerey financial dashboard with personalized financial insights and goal tracking",
      "Two (2) private sessions per year with a Celerey wealth advisor",
      "Expert financial content on personal finance, market reports, research and other educational resources",
      "Discounted access to Celerey's community events, curated services and key offerings",
    ],
    buttonText: "Upgrade to Standard",
    isCurrentPlan: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: 1499,
    pricePerMonth: Math.round(1499 / 12),
    interval: "yearly",
    description:
      "Advanced features and personalized guidance for active wealth builders.",
    idealCustomer:
      "Designed for wealth developers who are actively growing and refining their wealth strategy. Celerey Pro provides deeper expert engagement, proactive strategy sessions and goal execution support.",
    intro: "All Celerey Standard features plus:",
    features: [
      "Celerey financial dashboard with advanced investment analyses and insights tailored to specific financial profile",
      "Four (4) private advisory sessions per year with fully loaded flexibility",
      "Priority access to Celerey's community events, curated financial workshops, webinars and other services",
      "Complimentary admittance to Celerey's high-net-worth networking events",
      "Access to emerging investment opportunities across markets",
    ],
    buttonText: "Upgrade to Pro",
    isPopular: true,
  },
  {
    id: "elite",
    name: "Elite",
    price: 4999,
    pricePerMonth: Math.round(4999 / 12),
    interval: "yearly",
    description:
      "Premium service with exclusive benefits for high-net-worth individuals.",
    idealCustomer:
      "Perfect for high-net-worth individuals who require elite advisory, premium networking, and hands-on financial strategy services.",
    intro: "All Celerey Pro features plus:",
    features: [
      "Five (5) private fully loaded advisory sessions per year with top-tier financial experts with in-person optionality",
      "Exclusive invitations to Celerey's high-net-worth networking events with discounted matching services",
      "VIP insights into emerging investment opportunities and private markets",
      "Dedicated concierge financial advisory support",
    ],
    buttonText: "Upgrade to Elite",
  },
];
