export interface BaseScreenProps {
  onBack: () => void;
    onContinue: () => void;
  }

export interface FileUploadProps {
  label: string;
  value: {
    file: File | null;
    fileName: string;
    uploadStatus: "idle" | "uploading" | "completed" | "error";
  };
  onChange: (value: {
    file: File | null;
    fileName: string;
    uploadStatus: "idle" | "uploading" | "completed" | "error";
  }) => void;
}

export interface FormInputProps {
  //   label: string;
  id?: string;
  name?: string;
  placeholder: string;
  value: string;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: string;
}

export interface NavigationButtonsProps {
  onBack?: () => void;
  onContinue: () => void;
  showBack?: boolean;
}

export interface OptionCardProps {
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

export interface SurveyOptionProps {
  question: string;
  selected: boolean;
  onClick?: () => void;
}

export interface SurveyOptionCardProps {
  id: string;
  question: string;
  options: {
    id: string; 
    value: string;
    selected: boolean;
  }[];
  onClick: () => void;
}

export interface SectionProgressBarProps {
  sections: Record<Section["id"], Section>;
  currentSection: Section["id"];
}

export interface CitizenshipStatusScreenProps {
  value: string;
  dualCitizenship: string;
  onChange: (value: string, dualValue?: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

export interface DateOfBirthScreenProps {
  value: string;
  onChange: (value: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

export interface BioDataScreenProps {
  value: {
    firstName: string;
    lastName: string;
    dob: {
      day: string;
      month: string;
      year: string;
    };
  };
  onChange: (value: {
    firstName: string;
    lastName: string;
    dob: {
      day: string;
      month: string;
      year: string;
    };
  }) => void;
  // onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  onBack: () => void;
  onContinue: () => void;
}

export interface LastNameScreenProps {
  firstName: string;
  value: string;
  onChange: (value: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

export interface Option {
  id: string;
  title: string;
  description: string;
}

// RadioGroup types
export interface RadioOption {
  value: string;
  label: string;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  name: string;
}

// Screen-specific types
export interface DependentsData {
  hasDependents: string;
  numberOfDependents: string;
  agesOfDependents: string;
}

export interface DependentsScreenProps extends BaseScreenProps {
  value: DependentsData;
  onChange: (value: DependentsData) => void;
}

export interface MaritalStatusScreenProps extends BaseScreenProps {
  value: string;
  onChange: (value: string) => void;
}

export interface OccupationScreenProps extends BaseScreenProps {
  value: string;
  onChange: (value: string) => void;
}

export interface IdentificationDocument {
  type: string;
  file: File | null;
  fileName: string;
  uploadStatus: "idle" | "uploading" | "completed" | "error";
}

export interface IdentificationScreenProps extends BaseScreenProps {
  value: IdentificationDocument;
  onChange: (value: IdentificationDocument) => void;
}

export interface OptionsScreenProps extends BaseScreenProps {
  value: string[];
  onChange: (value: string[]) => void;
}
export interface RiskOptionsScreenProps extends BaseScreenProps {
  value: string;
  onChange: (value: string) => void;
}


// FinancialInfo Screen Props
export interface CurrencyScreenProps {
  value: string;
  onChange: (value: string) => void;
  onBack: () => void;
  onContinue: () => void;
}
export interface GoalsScreenProps {
  retirementAge: string;
  retirementIncome: string;
  goalsCurrency: string;
  onChange: (field: string, value: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

export interface Section {
  id: "personal" | "financial" | "goals" | "risk" | "knowledge" ; // Financial Knowledge section to be added here
  title: string;
  totalSteps: number;
  currentStep: number;
  isCompleted: boolean;
  isActive: boolean;
}

export interface OnboardingState {
  currentSection: Section["id"];
  sections: Record<Section["id"], Section>;
}

// PersonalInfo form data type
export interface PersonalInfoFormData {
  firstName: string;
  lastName: string;
  birthDate: string;
  citizenship: string;
  dualCitizenship: string;
  dependents: DependentsData;
  maritalStatus: string;
  occupation: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  identification: IdentificationDocument;
  options: string[];
}

export interface FinancialInfoFormData {
  currency: string;
  passiveIncome: {
    rentalIncome: string;
    dividends: string;
    interestIncome: string;
    otherIncome: string;
  };
  annualExpenses: {
    home: string;
    childcare: string;
    education: string;
    healthcare: string;
    travel: string;
    giving: string;
  };
  assets: {
    realEstate: string;
    cash: string;
    publicSecurities: string;
    privateSecurities: string;
  };
  liabilities: {
    mortgages: string;
    loans: string;
    creditCards: string;
    assetFinance: string;
    otherLiabilities: string;
  };
}
export interface GoalsInfoFormData {
    retirementAge: string;
    retirementIncome: string;
    goalsCurrency: string;
}
export interface RiskInfoFormData {
  riskAttitude: string;
  riskTolerance: string;
  riskTolerancePercentage: string;
  riskReaction: string;
  riskApproach: string;
  investmentObjective: string;
  investmentHorizon: string;
  illiquidInvestmentPercentage: string;
}

export interface KnowledgeInfoFormData {
  cashKnowledge: string;
  investingExperience: string;
  publicSharesKnowledge: string;
  publicSharesExperience: string;
  investmentGradeBondsKnowledge: string;
  investmentGradeBondsExperience: string;
  nonInvestmentGradeBondsKnowledge: string;
  nonInvestmentGradeBondsExperience: string;
  collectiveInvestmentsInstumentsKnowledge: string;
  collectiveInvestmentsInstumentsExperience: string;
  derivativesKnowledge: string;
  derivativesExperience: string;
  forexKnowledge: string;
  commoditiesKnowledge: string;
  commoditiesExperience: string;
  hybridInvestmentsKnowledge: string;
  privateMarketInstrumentsKnowledge: string;
  privateMarketInstrumentsExperience: string;
  realEstateKnowledge: string;
  realEstateExperience: string;
  altAssetsKnowledge: string;
  leveragedInstumentsKnowledge: string;
  leveragedInstumentsExperience: string;
  privateCreditKnowledge: string;

}

