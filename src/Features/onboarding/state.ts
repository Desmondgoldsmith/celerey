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

    dependents: {
      hasDependents: "",
      numberOfDependents: "",
      agesOfDependents: "",
    },
    maritalStatus: "",
    occupation: "",
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
    identification: {
      type: "",
      file: null,
      fileName: "",
      uploadStatus: "idle",
    },
  },
  financial: {
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
    hasEmergencyFunds: "",
    emergencyFund: "",
    hasDebt: "",
    debt: "",
    retirement: {
      retirementAge: "",
      targetRetirementIncome: "",
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

    riskAttitude: "",
    riskTolerancePercentage: "",
    riskReaction: "",
    riskApproach: "",
    investmentObjective: "",
    investmentHorizon: "",
    illiquidInvestmentPercentage: "",
  },
  knowledge: {
    knowledgeLevel: "",

    cashKnowledge: "",
    investingExperience: "",
    publicSharesKnowledge: "",
    publicSharesExperience: "",
    investmentGradeBondsKnowledge: "",
    investmentGradeBondsExperience: "",
    nonInvestmentGradeBondsKnowledge: "",
    nonInvestmentGradeBondsExperience: "",
    collectiveInvestmentsInstumentsKnowledge: "",
    collectiveInvestmentsInstumentsExperience: "",
    derivativesKnowledge: "",
    derivativesExperience: "",
    forexKnowledge: "",
    commoditiesKnowledge: "",
    commoditiesExperience: "",
    hybridInvestmentsKnowledge: "",
    privateMarketInstrumentsKnowledge: "",
    privateMarketInstrumentsExperience: "",
    realEstateKnowledge: "",
    realEstateExperience: "",
    altAssetsKnowledge: "",
    leveragedInstumentsKnowledge: "",
    leveragedInstumentsExperience: "",
    privateCreditKnowledge: "",
  },
};

interface OnboardingState {
  currentSection: SectionId;
  sections: Record<SectionId, Section>;
  formData: OnboardingFormData;
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
}

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    immer((set) => ({
      currentSection: "personal",
      sections: DEFAULT_SECTIONS,
      formData: DEFAULT_FORM_DATA,

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
        currentSection: state.currentSection,
        sections: state.sections,
        formData: state.formData,
      }),
    }
  )
);
