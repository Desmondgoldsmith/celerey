export interface AssetAllocationProps {
  userName: string;
  riskAttitude: string;
  netWorth: number;
  investmentExperience: string;
  riskAllocation: {
    low: number;
    medium: number;
    high: number;
  };
}

export type SubscriptionInterval = "yearly" | "biennial";

export type SubscriptionTier = {
  name: string;
  price: number;
  interval: SubscriptionInterval;
  description: string;
  features: string[];
  intro: string;
  buttonText?: string;
};
