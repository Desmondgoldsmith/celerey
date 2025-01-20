export interface PersonalInfoSchema {
  firstName: string;
  lastName: string;
  dob:{
    day: string;
    month: string;
    year: string;
  }
  citizenship: string;
  dualCitizenship: string;
  dependents: {
    hasDependents: string;
    numberOfDependents: string;
    agesOfDependents: string;
  };
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
  identification: {
    type: string;
    file: File | null;
    fileName: string;
    uploadStatus: "idle" | "uploading" | "completed" | "error";
  };
  options: string[];
}

export interface FinancialInfoSchema {
  currency: string;
  monthlyIncome: string;
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

export interface GoalsInfoSchema {
  retirementAge: string;
  retirementIncome: string;
  goalsCurrency: string;
}

export interface RiskInfoSchema {
  riskAttitude: string;
  riskTolerance: string;
  riskTolerancePercentage: string;
  riskReaction: string;
  riskApproach: string;
  investmentObjective: string;
  investmentHorizon: string;
  illiquidInvestmentPercentage: string;
}

export interface KnowledgeInfoSchema {
  cashKnowledge?: string;
  investingExperience?: string;
  publicSharesKnowledge?: string;
  publicSharesExperience?: string;
  investmentGradeBondsKnowledge?: string;
  investmentGradeBondsExperience?: string;
  nonInvestmentGradeBondsKnowledge?: string;
  nonInvestmentGradeBondsExperience?: string;
  collectiveInvestmentsInstrumentsKnowledge?: string;
  collectiveInvestmentsInstrumentsExperience?: string;
  derivativesKnowledge?: string;
  derivativesExperience?: string;
  forexKnowledge?: string;
  commoditiesKnowledge?: string;
  commoditiesExperience?: string;
  hybridInvestmentsKnowledge?: string;
  privateMarketInstrumentsKnowledge?: string;
  privateMarketInstrumentsExperience?: string;
  realEstateKnowledge?: string;
  realEstateExperience?: string;
  altAssetsKnowledge?: string;
  leveragedInstrumentsKnowledge?: string;
  leveragedInstrumentsExperience?: string;
  privateCreditKnowledge?: string;

  [key: string]: string | undefined;
}

export interface OnboardingFormData {
  personal: PersonalInfoSchema;
  financial: FinancialInfoSchema;
  goals: GoalsInfoSchema;
  risk: RiskInfoSchema;
  knowledge: KnowledgeInfoSchema;
}
