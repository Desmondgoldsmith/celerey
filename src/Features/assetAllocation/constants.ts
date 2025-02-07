import { SubscriptionTier } from "./types";

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
