import React, { useState } from "react";
import { IncomeSection } from "./incomeSection";
import { AssetsSection } from "./assetsSection";
import { ExpensesSection } from "./expensesSection";
import { LiabilitiesSection } from "./liabilitiesSection";
import { FinancialInfoSchema } from "@/Features/onboarding/schema";


const FinancialDetailsScreen: React.FC = () => {
  const [formData, setFormData] = useState<FinancialInfoSchema>({
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
  });

  
  const handleFormUpdate = (section: keyof FinancialInfoSchema, field: string, value: string) => {
    console.log("handleForm update called",section, field, value);

    
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));

    console.log(formData);
  };

  const handleBack = () => {
    // Implement back navigation logic
  };

  const handleContinue = () => {
    // Implement continue navigation logic
  };

  return (
    <div className="font-helvetica max-w-xl mx-auto">
      <h1 className="text-4xl font-cirka mb-8">Help us with these key financial details</h1>
      <p className="text-gray-600">Fill the different forms that appear from the pop-ups</p>
      <div className="space-y-4">
        <IncomeSection
          values={formData.income}
          onChange={(field, value) => handleFormUpdate("income", field, value)}
          onBack={handleBack}
          onContinue={handleContinue}
        />
        <AssetsSection
          values={formData.assets}
          onChange={(field, value) => handleFormUpdate("assets", field, value)}
          onBack={handleBack}
          onContinue={handleContinue}
        />
        <ExpensesSection
          values={formData.annualExpenses}
          onChange={(field, value) => handleFormUpdate("annualExpenses", field, value)}
          onBack={handleBack}
          onContinue={handleContinue}
        />
        <LiabilitiesSection
          values={formData.liabilities}
          onChange={(field, value) => handleFormUpdate("liabilities", field, value)}
          onBack={handleBack}
          onContinue={handleContinue}
        />
      </div>
    </div>
  );
};

export { FinancialDetailsScreen };
