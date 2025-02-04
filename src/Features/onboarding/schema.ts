export interface PersonalInfoSchema {
  prefix : string;
  firstName: string;
  lastName: string;
  dob:{
    day: string;
    month: string;
    year: string;
  }
  citizenship: string;
  dualCitizenship: string;
  residentCountry: string;
  options: string[];
}

export interface FinancialInfoSchema {
  netWorth?: string;
  currency: string;
  income: {
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
    assetCountries: string[];
  };
  liabilities: {
    mortgages: string;
    loans: string;
    creditCards: string;
    assetFinance: string;
    otherLiabilities: string;
  };

  savings: {
    currentSavings: string;
    targetSavings: string;
  };
  emergencyFund: {
    hasEmergencyFunds: string;
    emergencyFundAmount: string;
    targetMonths: string;
  };
  debt: {
  hasDebt: string;
  debtAmount: string;
  };
  retirement: {
    retirementAge: string;
    targetRetirementIncome: string;
    pensionFund: string;
  };
}

export interface GoalsInfoSchema {
  primamryFinancialGoal: string;
  targetAmount: string;
  hasInvestments: string;
  investmentType: string;
}

export interface RiskInfoSchema {
  riskTolerance: string;
}

export interface KnowledgeInfoSchema {
  knowledgeLevel: string;
}

export interface OnboardingFormData {
  personal: PersonalInfoSchema;
  financial: FinancialInfoSchema;
  goals: GoalsInfoSchema;
  risk: RiskInfoSchema;
  knowledge: KnowledgeInfoSchema;
}
