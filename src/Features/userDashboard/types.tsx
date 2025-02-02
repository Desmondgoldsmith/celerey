// Financial metrics types
export interface FinancialMetric {
  value: number;
  currency: string;
}

export interface FinancialPlan {
  id?: string;
  name: string;
  progress: number;
  currentAmount: number;
  targetAmount: number;
  durationStart: string;
  durationEnd: string;
  goalDuration: number;
  durationLeft: number;
}

export interface AssetAllocation {
  category: string;
  amount: number;
  percentage: number;
}

export interface GeographicalData {
  country: string;
  amount: number;
  coordinates: [number, number];
}

export interface RiskProfile {
  riskAttitude: string;
  investmentExperience: string;
  financialKnowledge: string;
  description: string;
}

export interface DashboardData {
  netWorth: FinancialMetric;
  balance: FinancialMetric;
  income: FinancialMetric;
  expenses: FinancialMetric;
  savings: FinancialMetric;
  financialPlans: FinancialPlan[];
  assetAllocation: AssetAllocation[];
  geographicalSpread: GeographicalData[];
  riskProfile: RiskProfile;
}

// types/financialGoals.ts

export interface FinancialPlan {
  name: string;
  currentAmount: number;
  targetAmount: number;
  progress: number;
  durationStart: string;
  durationEnd: string;
  goalDuration: number;
  durationLeft: number;
}

export enum ProgressStatus {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export interface FinancialGoalsCardProps {
  plans: FinancialPlan[];
  onAddGoalClick: () => void;
  onModifyGoal: (plan: FinancialPlan) => void;
}

export interface AddFinancialGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddGoal: (goal: FinancialPlan) => void;
  initialData?: FinancialPlan;
  isModifying?: boolean;
}

export interface GoalFormData {
  name: string;
  targetAmount: string;
  currentAmount: string;
  goalDuration: string;
}

export interface PortfolioRecommendation {
  title: string;
  description: string;
  percentage: number;
}

export interface PortfolioRecommendationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}
