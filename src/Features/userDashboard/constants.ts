import { DashboardData } from "./types";

export const DUMMY_DASHBOARD_DATA: DashboardData = {
  netWorth: { value: 23765970, currency: "USD" },
  balance: { value: 3875524, currency: "USD" },
  income: { value: 4736559, currency: "USD" },
  expenses: { value: 925629, currency: "USD" },
  savings: { value: 16780273, currency: "USD" },
  financialPlans: [
    {
      id: "1",
      name: "Savings Plan",
      progress: 72,
      currentAmount: 21234.35,
      targetAmount: 30000,
      durationStart: "2024-04-01",
      durationEnd: "2025-04-01",
      goalDuration: 12,
      durationLeft: 3,
    },
    {
      id: "2",
      name: "Emergency Fund",
      progress: 40,
      currentAmount: 6000,
      targetAmount: 15000,
      durationStart: "2024-05-01",
      durationEnd: "2025-05-01",
      goalDuration: 14,
      durationLeft: 4,
    },
    {
      id: "3",
      name: "Retirement Fund",
      progress: 18,
      currentAmount: 405253,
      targetAmount: 2435453,
      durationStart: "2024-07-01",
      durationEnd: "2025-03-01",
      goalDuration: 18,
      durationLeft: 13,
    },
  ],
  assetAllocation: [
    { category: "Real Estate", amount: 25363.94, percentage: 31.75 },
    { category: "Public Securities", amount: 23532.75, percentage: 29.45 },
    { category: "Private Securities", amount: 21556.32, percentage: 27 },
    { category: "Cash", amount: 9426.35, percentage: 11.8 },
  ],
  geographicalSpread: [
    {
      country: "United States",
      amount: 45000,
      coordinates: [-95.7129, 37.0902],
    },
    { country: "China", amount: 34963, coordinates: [104.1954, 35.8617] },
  ],
  riskProfile: {
    riskAttitude: "Somewhat Aggressive",
    investmentExperience: "Advanced",
    financialKnowledge: "Intermediate",
    description:
      "You are a somewhat aggressive risk taker with an advanced investment experience. Your financial knowledge is intermediate. This means you have a solid grasp of finance.",
  },
};
