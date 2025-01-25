import React, { useState, useEffect } from "react";
import { IncomeSection } from "./incomeSection";
import { AssetsSection } from "./assetsSection";
import { ExpensesSection } from "./expensesSection";
import { LiabilitiesSection } from "./liabilitiesSection";
import { FinancialInfoSchema } from "@/Features/onboarding/schema";
import { useOnboardingStore } from "@/Features/onboarding/state";

const FinancialDetailsScreen: React.FC = () => {
  const { formData, updateFormData } = useOnboardingStore();
  const [localFormData, setLocalFormData] = useState<FinancialInfoSchema>(formData.financial);

  useEffect(() => {
    setLocalFormData(formData.financial);
  }, [formData.financial]);

  const handleFormUpdate = (section: keyof FinancialInfoSchema, field: string, value: string) => {
    const updatedSection = {
      ...(typeof localFormData[section] === 'object' ? localFormData[section] : {}),
      [field]: value,
    };

    const updatedFormData = {
      ...localFormData,
      [section]: updatedSection,
    };

    setLocalFormData(updatedFormData);
    updateFormData("financial", updatedFormData);
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
          values={localFormData.income}
          onChange={(field, value) => handleFormUpdate("income", field, value)}
          onBack={handleBack}
          onContinue={handleContinue}
        />
        <AssetsSection
          values={localFormData.assets}
          onChange={(field, value) => handleFormUpdate("assets", field, value)}
          onBack={handleBack}
          onContinue={handleContinue}
        />
        <ExpensesSection
          values={localFormData.annualExpenses}
          onChange={(field, value) => handleFormUpdate("annualExpenses", field, value)}
          onBack={handleBack}
          onContinue={handleContinue}
        />
        <LiabilitiesSection
          values={localFormData.liabilities}
          onChange={(field, value) => handleFormUpdate("liabilities", field, value)}
          onBack={handleBack}
          onContinue={handleContinue}
        />
      </div>
    </div>
  );
};

export { FinancialDetailsScreen };
