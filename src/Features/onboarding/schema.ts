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
  currency: string;
  monthlyIncome: string;
  monthlyExpenses: {
    home: string;
    loan: string;
    otherExpenses: string;
  };
  savings: string;
  hasEmergencyFunds: string;
  emergencyFund: string;
  hasDebt: string;
  debt: string;
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
