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
    name: "Standard",
    price: 25,
    interval: "yearly",
    description:
      "Ideal for emerging professionals focused on setting goals and financial literacy.",
    intro: "All of Celerey Lite's features. Omnichannel – mobile app & web app",
    features: [
      "WhatsApp only channel - Seamless WhatsApp Channel",
      "Conversational flow customization - Tailored Conversational Flows",
      "Risk profile categorization",
      "Basic Robo-advisory on financial health (no visualization) - Foundational Financial Health",
      "Robo-Advisory",
      "Basic recommended asset allocation (no visualization) - Foundational Asset Allocation Recommendation",
    ],
  },
  {
    name: "Pro",
    price: 125,
    interval: "yearly",
    description:
      "Ideal for emerging professionals focused on setting goals and financial literacy.",
    intro: "All of Celerey Standard Features Premium Access includes:",
    features: [
      "Advanced AI features such as social benchmarking",
      "45-min professional advisor reviews (virtual) -2x per year",
      "Tax optimization session with tax advisor - 1x per year",
    ],
  },
  {
    name: "Elite",
    price: 420,
    interval: "yearly",
    description:
      "Ideal for emerging professionals focused on setting goals and financial literacy.",
    intro: "All of Celerey Pro's features Exclusive access includes:",
    features: [
      "Advanced interactive asset allocation visualization",
      "Robo-assisted guidance on the portfolio (such as swap in/swap out)",
      "Budgeting tools and other financial tools (nft vs buy, etc)",
      "15-min professional advisor consultation (Virtual) 4x a year inclusive",
      "Educational resources on personal finance",
    ],
  },
];
