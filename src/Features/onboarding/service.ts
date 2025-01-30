import { ApiResponse } from "@/types/common";
import apiClient from "../../lib/axios"; // Reuse Axios instance
import {
  //   FinancialInfoSchema,
  //   GoalsInfoSchema,
  //   KnowledgeInfoSchema,
  PersonalInfoSchema,
  //   RiskInfoSchema,
} from "./schema";

export const savePersonalInfoApi = async (
  data: PersonalInfoSchema,
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
  formData.append("resident_country", data.residentCountry);
  formData.append("decisions_on_wealth", JSON.stringify(data.options));

  const response = await apiClient.post("/create/personal-info", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  await updateOnboardingProgressApi("financial");
  return response.data;
};

export const getUserPersonalInfoApi = async (): Promise<ApiResponse> => {
  const response = await apiClient.get("/user/personal-info");
  return response.data;
};

// export const saveFinancialInfoApi = async (
//   data: FinancialInfoSchema,
//   userId: string
// ): Promise<ApiResponse> => {
//   const financialInfoToBeSaved = {
//     currency: data.currency,
//     annual_passive_income: JSON.stringify(data.passiveIncome),
//     annual_expense: JSON.stringify(data.annualExpenses),
//     assets: JSON.stringify(data.assets),
//     liabilities: JSON.stringify(data.liabilities),
//     user_id: userId,
//   };

//   const response = await apiClient.post(
//     "/create/financial-details",
//     financialInfoToBeSaved
//   );
//   await updateOnboardingProgressApi("goals");

//   return response.data;
// };

// export const saveGoalsInfoApi = async (
//   data: GoalsInfoSchema,
//   userId: string
// ): Promise<ApiResponse> => {
//   const goalsInfoToBeSaved = {
//     currency: data.goalsCurrency,
//     retirement_age: data.retirementAge,
//     retirement_income: data.retirementIncome,
//     user_id: userId,
//   };

//   const response = await apiClient.post("/create/goals", goalsInfoToBeSaved);
//   await updateOnboardingProgressApi("risk");
//   return response.data;
// };

// export const saveRiskInfoApi = async (
//   data: RiskInfoSchema,
//   userId: string
// ): Promise<ApiResponse> => {
//   const riskInfoToBeSaved = {
//     user_id: userId,
//     risk_attitude: data.riskAttitude || {},
//     risk_tolerance: data.riskTolerance || {},
//     risk_tolerance_percentage: data.riskTolerancePercentage || {},
//     risk_reaction: data.riskReaction || {},
//     risk_approach: data.riskApproach || {},
//     investment_objective: data.investmentObjective || {},
//     investment_horizon: data.investmentHorizon || {},
//     illiquid_investment_percentage: data.illiquidInvestmentPercentage || {},
//   };

//   const response = await apiClient.post("/create/risk", riskInfoToBeSaved);
//   await updateOnboardingProgressApi("knowledge");
//   return response.data;
// };

// export const saveKnowledgeInfoApi = async (
//   data: KnowledgeInfoSchema,
//   userId: string
// ): Promise<ApiResponse> => {
//   const knowledgeInfoToBeSaved = {
//     user_id: userId,
//     cash_knowledge: data.cashKnowledge || "",
//     investing_experience: data.investingExperience || "",
//     public_shares_knowledge: data.publicSharesKnowledge || "",
//     public_shares_experience: data.publicSharesExperience || "",
//     investment_grade_bonds_knowledge: data.investmentGradeBondsKnowledge || "",
//     investment_grade_bonds_experience:
//       data.investmentGradeBondsExperience || "",
//     non_investment_grade_bonds_knowledge:
//       data.nonInvestmentGradeBondsKnowledge || "",
//     non_investment_grade_bonds_experience:
//       data.nonInvestmentGradeBondsExperience || "",
//     collective_investments_instruments_knowledge:
//       data.collectiveInvestmentsInstrumentsKnowledge || "",
//     collective_investments_instruments_experience:
//       data.collectiveInvestmentsInstrumentsExperience || "",
//     derivatives_knowledge: data.derivativesKnowledge || "",
//     derivatives_experience: data.derivativesExperience || "",
//     forex_knowledge: data.forexKnowledge || "",
//     commodities_knowledge: data.commoditiesKnowledge || "",
//     commodities_experience: data.commoditiesExperience || "",
//     hybrid_investments_knowledge: data.hybridInvestmentsKnowledge || "",
//     private_market_instruments_knowledge:
//       data.privateMarketInstrumentsKnowledge || "",
//     private_market_instruments_experience:
//       data.privateMarketInstrumentsExperience || "",
//     real_estate_knowledge: data.realEstateKnowledge || "",
//     real_estate_experience: data.realEstateExperience || "",
//     alt_assets_knowledge: data.altAssetsKnowledge || "",
//     leveraged_instruments_knowledge: data.leveragedInstumentsKnowledge || "",
//     leveraged_instruments_experience: data.leveragedInstumentsExperience || "",
//     private_credit_knowledge: data.privateCreditKnowledge || "",
//   };

//   const response = await apiClient.post(
//     "/create/knowledge",
//     knowledgeInfoToBeSaved
//   );
//   await updateOnboardingProgressApi("completed");
//   return response.data;
// };

// export const getOnboardingProgressApi = async (): Promise<ApiResponse> => {
//   const response = await apiClient.get("/onboarding-progress");
//   return response.data;
// };

export const updateOnboardingProgressApi = async (
  current_section: string
): Promise<ApiResponse> => {
  const response = await apiClient.post("/onboarding-progress", {
    current_section,
  });
  return response.data;
};
