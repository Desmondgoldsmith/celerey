import { create } from "zustand";
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
    totalSteps: 11,
    currentStep: 0,
    isCompleted: false,
    isActive: true,
  },
  financial: {
    id: "financial",
    title: "Financial Information",
    totalSteps: 6,
    currentStep: 0,
    isCompleted: false,
    isActive: false,
  },
  goals: {
    id: "goals",
    title: "Goals & Aspirations",
    totalSteps: 2,
    currentStep: 0,
    isCompleted: false,
    isActive: false,
  },
  risk: {
    id: "risk",
    title: "Risk Profile",
    totalSteps: 10,
    currentStep: 0,
    isCompleted: false,
    isActive: false,
  },
  knowledge: {
    id: "knowledge",
    title: "Financial Knowledge",
    totalSteps: 6,
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
    firstName: "",
    lastName: "",
    birthDate: "",
    citizenship: "",
    dualCitizenship: "",
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
    options: [],
  },
  financial: {
    currency: "",
    passiveIncome: {
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
    },
    liabilities: {
      mortgages: "",
      loans: "",
      creditCards: "",
      assetFinance: "",
      otherLiabilities: "",
    },
  },
  goals: {
    retirementAge: "",
    retirementIncome: "",
    goalsCurrency: "",
  },
  risk: {
    riskAttitude: "",
    riskTolerance: "",
    riskTolerancePercentage: "",
    riskReaction: "",
    riskApproach: "",
    investmentObjective: "",
    investmentHorizon: "",
    illiquidInvestmentPercentage: "",
  },
  knowledge: {
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
    (set) => ({
      currentSection: "personal",
      sections: DEFAULT_SECTIONS,
      formData: DEFAULT_FORM_DATA,

      updateFormData: (section, updates) =>
        set((state) => ({
          formData: {
            ...state.formData,
            [section]: {
              ...state.formData[section],
              ...updates,
            },
          },
        })),

      updateSectionProgress: (sectionId, step) =>
        set((state) => ({
          sections: {
            ...state.sections,
            [sectionId]: {
              ...state.sections[sectionId],
              currentStep: step,
            },
          },
        })),

      completeSection: (sectionId) =>
        set((state) => ({
          sections: {
            ...state.sections,
            [sectionId]: {
              ...state.sections[sectionId],
              isCompleted: true,
              isActive: false,
            },
          },
        })),

      setActiveSection: (sectionId) =>
        set((state) => {
          const updatedSections = Object.entries(state.sections).reduce<
            Record<SectionId, Section>
          >(
            (acc, [key, section]) => ({
              ...acc,
              [key]: {
                ...section,
                isActive: key === sectionId,
              },
            }),
            {} as Record<SectionId, Section>
          );

          return {
            currentSection: sectionId,
            sections: updatedSections,
          };
        }),

      resetOnboarding: () =>
        set(() => ({
          currentSection: "personal",
          sections: DEFAULT_SECTIONS,
          formData: DEFAULT_FORM_DATA,
        })),
    }),
    {
      name: "onboarding-storage",
    }
  )
);
