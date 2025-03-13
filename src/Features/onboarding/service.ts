import { ApiResponse } from "@/types/common";
import apiClient from "../../lib/axios"; // Reuse Axios instance
import {
  FinancialInfoSchema,
  GoalsInfoSchema,
  KnowledgeInfoSchema,
  PersonalInfoSchema,
  RiskInfoSchema,
} from "./schema";
import camelToSnake from "@/utils/convertCamelCaseToSnakeCase";
import { object } from "zod";

export const savePersonalInfoApi = async (
  data: PersonalInfoSchema
): Promise<ApiResponse> => {
  const formData = new FormData();

  formData.append("prefix", data.prefix);
  formData.append("first_name", data.firstName);
  formData.append("last_name", data.lastName);
  formData.append(
    "birthdate",
    new Date(
      Number(data.dob.year),
      Number(data.dob.month),
      Number(data.dob.day)
    ).toISOString()
  );
  formData.append("citizenship", data.citizenship);
  formData.append("dual_citizenship", data.dualCitizenship);
  formData.append("residing_country", data.residentCountry);
  formData.append("decisions_on_wealth", JSON.stringify(data.options));

  const response = await apiClient.post("/create/personal-info", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  await updateOnboardingProgressApi("financial");
  return response.data;
};

// Function to clean and replace values properly
const cleanValues = (obj: any) => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]: any) => [
      key,
      parseInt(String(value)?.replace(/[^0-9]/g, ""), 10) || 0, // Remove non-numeric characters and convert to number
    ])
  );
};

export const saveFinancialInfoApi = async (
  data: Partial<FinancialInfoSchema>
): Promise<ApiResponse> => {
  const financialInfoToBeSaved = {
    currency: data.currency,
    active_income: data.activeIncome,
    passive_income: data.passiveIncome,
    expense: data.annualExpenses,
    assets: {
      ...data.assets,
      altAssets: cleanValues(data?.assets?.altAssets || {}),
    },
    liabilities: data.liabilities,
    savings: data.savings,
    emergency_fund: {
      hasEmergencyFund: data.emergencyFund?.hasEmergencyFunds,
      currentMonths: data.emergencyFund?.emergencyFundAmount,
      targetMonths: data.emergencyFund?.targetMonths,
    },
    retirement: data.retirement,
  };

  const response = await apiClient.post(
    "/create/financial-info",
    financialInfoToBeSaved
  );
  await updateOnboardingProgressApi("goals");

  return response.data;
};

export const updateFinancialInfoApi = async (
  data: any
): Promise<any> => {
  try {
    const payload: any = {};

    console.log("data", data);

    if (Object.keys(data).includes("assets")) {
      payload.assets = {
        ...data.assets,
        altAssets: cleanValues(data?.assets?.altAssets || {}),
      };
    }

    if (Object.keys(data).includes("emergencyFund")) {
      payload.emergency_fund = {
        hasEmergencyFund: data.emergencyFund?.hasEmergencyFunds,
        currentMonths: data.emergencyFund?.emergencyFundAmount,
        targetMonths: data.emergencyFund?.targetMonths,
      };
    }

    if (Object.keys(data).includes("retirement")) {
      payload.retirement = data.retirement;
    }

    if (Object.keys(data).includes("currency")) {
      payload.currency = data.currency;
    }

    if (Object.keys(data).includes("income")) {
      payload.active_income = data.income;
    }

    if (Object.keys(data).includes("passiveIncome")) {
      payload.passive_income = data.passiveIncome;
    }

    if (Object.keys(data).includes("annualExpenses")) {
      payload.expense = data.annualExpenses;
    }

    if (Object.keys(data).includes("liabilities")) {
      payload.liabilities = data.liabilities;
    }

    if (Object.keys(data).includes("savings")) {
      payload.savings = data.savings;
    }

    if (Object.keys(data).includes("expense")) {
      payload.expense = data.expense;
    }

    console.log(payload);

    const response = await apiClient.post("/create/financial-info", payload);

    return response.data;
  } catch (error) {
    console.log("error", error);
    return null
  }
};

export const saveGoalsInfoApi = async (
  data: GoalsInfoSchema
): Promise<ApiResponse> => {
  const goalsInfoToBeSaved = {
    has_investment: data.hasInvestments,
    investment_type: data.investmentType,
    financial_goal: data.primamryFinancialGoal,
    target_amount: data.targetAmount,
  };

  const response = await apiClient.post("/create/goals", goalsInfoToBeSaved);
  await updateOnboardingProgressApi("completed");
  return response.data;
};

export const saveRiskInfoApi = async (
  data: RiskInfoSchema
): Promise<ApiResponse> => {
  const riskInfoToBeSaved = {
    risk_reaction: data.marketReaction,
    risk_approach: data.investmentGrowthPreference,
    investment_objective: data.investmentGoal,
    investment_horizon: data.investmentHorizon,
    illiquid_investment_percentage: data.liquidityPreference,
    risk_attitude: data.marketReaction,
    risk_tolerance: data.riskTolerance,
  };
  const response = await apiClient.post(
    "/create/risk-profile",
    riskInfoToBeSaved
  );
  await updateOnboardingProgressApi("knowledge");
  return response.data;
};

export const saveKnowledgeInfoApi = async (
  data: KnowledgeInfoSchema
): Promise<ApiResponse> => {
  let knowledgeInfoToBeSaved: any = {};
  if (data.knowledgeLevel) {
    knowledgeInfoToBeSaved = {
      user_financial_knowledge: data.knowledgeLevel || "",
    };
  } else {
    Object.keys(data).map((key) => {
      if (key !== "knowledgeLevel") {
        knowledgeInfoToBeSaved[camelToSnake(key)] = data[key];
      }
    });
  }

  const response = await apiClient.post(
    "/create/financial-knowledge",
    knowledgeInfoToBeSaved
  );
  await updateOnboardingProgressApi("completed");
  return response.data;
};

export const getPersonalInfoApi = async (): Promise<ApiResponse> => {
  const response = await apiClient.get("/user/personal-info");
  return response.data;
};

export const getFinancialInfoApi = async (): Promise<ApiResponse> => {
  const response = await apiClient.get("/user/financial-info");
  return response.data;
};

export const getGoalsApi = async (): Promise<ApiResponse> => {
  const response = await apiClient.get("/user/goals");
  return response.data;
};

export const getRiskProfileApi = async (): Promise<ApiResponse> => {
  const response = await apiClient.get("/user/risk-profile");
  return response.data;
};

export const getFinancialKnowledgeApi = async (): Promise<ApiResponse> => {
  const response = await apiClient.get("/user/financial-knowledge");
  return response.data;
};

export const getOnboardingProgressApi = async (): Promise<ApiResponse> => {
  const response = await apiClient.get("/onboarding-progress");
  return response.data;
};

export const updateOnboardingProgressApi = async (
  current_section: string
): Promise<ApiResponse> => {
  const response = await apiClient.post("/onboarding-progress", {
    current_section,
  });
  return response.data;
};
