import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import {
  PersonalInfoSchema,
  FinancialInfoSchema,
  GoalsInfoSchema,
  RiskInfoSchema,
  KnowledgeInfoSchema,
} from "./schema";
import { Section } from "./types";
import {
  getFinancialInfoApi,
  getFinancialKnowledgeApi,
  getGoalsApi,
  getOnboardingProgressApi,
  getPersonalInfoApi,
  getRiskProfileApi,
  saveFinancialInfoApi,
  saveGoalsInfoApi,
  saveKnowledgeInfoApi,
  savePersonalInfoApi,
  saveRiskInfoApi,
} from "./service";
import { AxiosError } from "axios";
import { DEFAULT_AUTH_ERROR_MESSAGE } from "../auth/constants";

export type SectionId =
  | "personal"
  | "financial"
  | "goals"
  | "risk"
  | "knowledge";

// the various section structures
const DEFAULT_SECTIONS: Record<SectionId, Section> = {
  personal: {
    id: "personal",
    title: "Personal Information",
    totalSteps: 3,
    currentStep: 0,
    isCompleted: false,
    isActive: true,
  },
  financial: {
    id: "financial",
    title: "Financial Information",
    totalSteps: 4,
    currentStep: 0,
    isCompleted: false,
    isActive: false,
  },
  goals: {
    id: "goals",
    title: "Goals & Aspirations",
    totalSteps: 3,
    currentStep: 0,
    isCompleted: false,
    isActive: false,
  },
  risk: {
    id: "risk",
    title: "Risk Profile",
    totalSteps: 3,
    currentStep: 0,
    isCompleted: false,
    isActive: false,
  },
  knowledge: {
    id: "knowledge",
    title: "Financial Knowledge",
    totalSteps: 2,
    currentStep: 0,
    isCompleted: false,
    isActive: false,
  },
};

interface OnboardingFormData {
  personal: PersonalInfoSchema;
  financial: FinancialInfoSchema;
  goals: GoalsInfoSchema;
  risk: RiskInfoSchema;
  knowledge: KnowledgeInfoSchema;
}

// setting the shape of the onboarding data
const DEFAULT_FORM_DATA: OnboardingFormData = {
  personal: {
    prefix: "",
    firstName: "",
    lastName: "",
    dob: {
      day: "",
      month: "",
      year: "",
    },
    citizenship: "",
    dualCitizenship: "",
    residentCountry: "",

    options: [],
  },
  financial: {
    netWorth: "0",
    currency: "",
    income: {
      rentalIncome: "",
      dividends: "",
      interestIncome: "",
      otherIncome: "",
    },
    annualExpenses: {
      home: "",
      childcare: "",
      education: "",
      healthcare: "",
      travel: "",
      giving: "",
    },
    assets: {
      realEstate: "",
      cash: "",
      publicSecurities: "",
      privateSecurities: "",
      assetCountries: [],
    },
    liabilities: {
      mortgages: "",
      loans: "",
      creditCards: "",
      assetFinance: "",
      otherLiabilities: "",
    },
    savings: {
      currentSavings: "",
      targetSavings: "",
    },
    emergencyFund: {
    hasEmergencyFunds: "",
    emergencyFundAmount: "",
    targetMonths: "",
    },
  debt: {
  hasDebt: "",
  debtAmount: "",
  },
  retirement: {
    retirementAge: "",
    targetRetirementIncome: "",
    pensionFund: "",
  },
  },
  goals: {
    primamryFinancialGoal: "",
    targetAmount: "",
    hasInvestments: "",
    investmentType: "",
  },
  risk: {
    riskTolerance: "",
  },
  knowledge: {
    knowledgeLevel: "",
  },
};

interface OnboardingState {
  currentSection: SectionId;
  sections: Record<SectionId, Section>;
  formData: OnboardingFormData;
  error: string;
  loading: boolean;
  hasCheckedProgress: boolean;
}

// the various actions we can perform
interface OnboardingStore extends OnboardingState {
  updateFormData: <T extends keyof OnboardingFormData>(
    section: T,
    updates: Partial<OnboardingFormData[T]>
  ) => void;
  updateSectionProgress: (sectionId: SectionId, step: number) => void;
  completeSection: (sectionId: SectionId) => void;
  setActiveSection: (sectionId: SectionId) => void;
  resetOnboarding: () => void;
  saveProfileInfo: (personalInfo: PersonalInfoSchema) => void;
  saveFinancialInfo: () => void;
  saveGoalsInfo: () => void;
  saveRiskInfo: () => void;
  saveKnowledgeInfo: () => void;
  setSectionProgress: () => Promise<void | string>;
  getSectionProgress: () => Promise<string>;
  setHasCheckedProgress: (checked: boolean) => void;
  populatePersonalInfo: () => Promise<void>;
  populateFinancialInfo: () => Promise<void>;
  populateGoalInfo: () => Promise<void>;
  populateRiskInfo: () => Promise<void>;
  populateKnowledgeInfo: () => Promise<void>;
}

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    immer((set, get) => ({
      currentSection: "personal",
      sections: DEFAULT_SECTIONS,
      formData: DEFAULT_FORM_DATA,
      loading: false,
      error: "",
      hasCheckedProgress: false,

      saveProfileInfo: async (personalInfo: PersonalInfoSchema) => {
        set((state) => {
          state.loading = true;
        });
        try {
          await savePersonalInfoApi(personalInfo);
          set((state) => {
            state.loading = false;
          });
        } catch (error) {
          if (error instanceof AxiosError) {
            set((state) => {
              state.loading = false;
              state.error =
                error.response?.data.message || DEFAULT_AUTH_ERROR_MESSAGE;
            });
          }
        }
      },

      populatePersonalInfo: async () => {
        const response = await getPersonalInfoApi();
        const birthDate = new Date(response.data.birthdate);
        if (response.data) {
          set((state) => {
            state.formData.personal.dob = {
              day: birthDate.getDate().toString(),
              month: birthDate.getMonth().toString(),
              year: birthDate.getFullYear().toString(),
            };
            state.formData.personal.firstName = response.data.first_name;
            state.formData.personal.lastName = response.data.last_name;
            state.formData.personal.prefix = response.data.prefix;
            state.formData.personal.residentCountry =
              response.data.residing_country;
            state.formData.personal.options = response.data.decisions_on_wealth;
            state.formData.personal.dualCitizenship =
              response.data.dual_citizenship;
            state.formData.personal.citizenship = response.data.citizenship;
          });
        }
      },

      populateFinancialInfo: async () => {
        const response = await getFinancialInfoApi();
        if (response.data) {
          set((state) => {
            state.formData.financial.annualExpenses = response.data.expense ;
            state.formData.financial.assets = response.data.assets;
            state.formData.financial.liabilities = response.data.liabilities;
            state.formData.financial.currency = response.data.currency;
            state.formData.financial.debt = response.data.debt;
            state.formData.financial.emergencyFund =
              response.data.emergency_funds;
            state.formData.financial.hasDebt =
              response.data.has_debt === 1 ? "yes" : "no";
            state.formData.financial.hasEmergencyFunds =
              response.data.has_emergency_funds === 1 ? "yes" : "no";
            state.formData.financial.savings = response.data.savings;
            state.formData.financial.netWorth = response.data.net_worth;
            state.formData.financial.retirement = response.data.retirement;
            state.formData.financial.income = response.data.income;
          });
        }
      },

      populateGoalInfo: async () => {
        const response = await getGoalsApi();
        if (response.data) {
          set((state) => {
            state.formData.goals.targetAmount = response.data.target_amount;
            state.formData.goals.primamryFinancialGoal =
              response.data.financial_goal;
          });
        }
      },

      populateRiskInfo: async () => {
        const response = await getRiskProfileApi();
        if (response.data) {
          set((state) => {
            state.formData.risk.riskTolerance = response.data.risk_tolerance;
          });
        }
      },

      populateKnowledgeInfo: async () => {
        const response = await getFinancialKnowledgeApi();
        if (response.data) {
          set((state) => {
            state.formData.knowledge.knowledgeLevel =
              response.data.user_financial_knowledge;
          });
        }
      },

      saveFinancialInfo: async () => {
        const financialData = get().formData.financial;
        set((state) => {
          state.loading = true;
        });
        try {
          const response = await saveFinancialInfoApi(financialData);
          set((state) => {
            state.loading = false;
            state.formData.financial.netWorth = response.data.net_worth;
          });
        } catch (error) {
          if (error instanceof AxiosError) {
            set((state) => {
              state.loading = false;
              state.error =
                error.response?.data.message || DEFAULT_AUTH_ERROR_MESSAGE;
            });
            throw error;
          }
      
        }
      },

      saveGoalsInfo: async () => {
        set((state) => {
          state.loading = true;
        });
        try {
          await saveGoalsInfoApi(get().formData.goals);
          set((state) => {
            state.loading = false;
          });
        } catch (error) {
          if (error instanceof AxiosError) {
            set((state) => {
              state.loading = false;
              state.error =
                error.response?.data.message || DEFAULT_AUTH_ERROR_MESSAGE;
            });
            throw error;
          }
        }
      },

      saveRiskInfo: async () => {
        set((state) => {
          state.loading = true;
        });
        try {
          await saveRiskInfoApi(get().formData.risk);
          set((state) => {
            state.loading = false;
          });
        } catch (error) {
          if (error instanceof AxiosError) {
            set((state) => {
              state.loading = false;
              state.error =
                error.response?.data.message || DEFAULT_AUTH_ERROR_MESSAGE;
            });
            throw error;
          }
        }
      },

      saveKnowledgeInfo: async () => {
        set((state) => {
          state.loading = true;
        });
        try {
          await saveKnowledgeInfoApi(get().formData.knowledge);
          set((state) => {
            state.loading = false;
          });
        } catch (error) {
          if (error instanceof AxiosError) {
            set((state) => {
              state.loading = false;
              state.error =
                error.response?.data.message || DEFAULT_AUTH_ERROR_MESSAGE;
            });

            throw error;
          }
        }
      },

      setSectionProgress: async () => {
        try {
          const response = await getOnboardingProgressApi();
          if (response.data.active_section !== "completed") {
            set((state) => {
              state.currentSection = response.data.active_section;
              state.sections[
                response.data.active_section as SectionId
              ].currentStep = 0;
            });
          } else {
            return response.data.active_section;
          }
        } catch (error) {
          if (error instanceof AxiosError) {
            set((state) => {
              state.error =
                error.response?.data.message || DEFAULT_AUTH_ERROR_MESSAGE;
            });
            throw error
          }
        }
      },

      getSectionProgress: async () => {
        try {
          const response = await getOnboardingProgressApi();
          return response.data.active_section;
        } catch (error) {
          if (error instanceof AxiosError) {
            set((state) => {
              state.error =
                error.response?.data.message || DEFAULT_AUTH_ERROR_MESSAGE;
            });
          }
        }
      },

      setHasCheckedProgress: (checked: boolean) => {
        set((state) => {
          state.hasCheckedProgress = checked;
        });
      },

      updateFormData: (section, updates) =>
        set((state) => {
          state.formData[section] = { ...state.formData[section], ...updates };
        }),

      updateSectionProgress: (sectionId, step) =>
        set((state) => {
          state.sections[sectionId].currentStep = step;
        }),

      completeSection: (sectionId) =>
        set((state) => {
          state.sections[sectionId].isCompleted = true;
        }),

      setActiveSection: (sectionId) =>
        set((state) => {
          Object.keys(state.sections).forEach((key) => {
            state.sections[key as SectionId].isActive = key === sectionId;
          });
          state.currentSection = sectionId;
        }),

      resetOnboarding: () =>
        set(() => ({
          currentSection: "personal",
          sections: DEFAULT_SECTIONS,
          formData: DEFAULT_FORM_DATA,
        })),
    })),
    {
      name: "onboarding-storage",
      partialize: (state) => ({
      
      }),
    }
  )
);
