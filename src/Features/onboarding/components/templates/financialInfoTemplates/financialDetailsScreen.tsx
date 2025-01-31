import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { IncomeSection } from "./incomeSection";
import { AssetsSection } from "./assetsSection";
import { ExpensesSection } from "./expensesSection";
import { LiabilitiesSection } from "./liabilitiesSection";
import { FinancialInfoSchema } from "@/Features/onboarding/schema";
import { useOnboardingStore } from "@/Features/onboarding/state";

const FinancialDetailsScreen: React.FC = () => {
  const router = useRouter();
  const { formData, updateFormData, sections, currentSection, updateSectionProgress, completeSection } = useOnboardingStore();
  const [localFormData, setLocalFormData] = useState<FinancialInfoSchema>(formData.financial);
  const [isSectionComplete, setIsSectionComplete] = useState(false);

  useEffect(() => {
    setLocalFormData(formData.financial);
  }, [formData.financial]);

  useEffect(() => {
    const checkSectionComplete = () => {
      const { income, assets, annualExpenses, liabilities } = localFormData;
      const isComplete = 
        Object.values(income).every(value => value !== "") &&
        Object.values(assets).every(value => value !== "") &&
        Object.values(annualExpenses).every(value => value !== "") &&
        Object.values(liabilities).every(value => value !== "");
      setIsSectionComplete(isComplete);
    };

    checkSectionComplete();
  }, [localFormData]);

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

  const handleBack = useCallback(() => {
    const currentStepIndex = sections[currentSection].currentStep;
    if (currentStepIndex > 0) {
      const newStep = currentStepIndex - 1;
      updateSectionProgress(currentSection, newStep);
    } else {
      router.push("/personal-info");
    }
  }, [currentSection, sections, router, updateSectionProgress]);

  const handleContinue = useCallback(() => {
    const currentStepIndex = sections[currentSection].currentStep;
    const isLastStep = currentStepIndex === sections[currentSection].totalSteps - 1;

    if (!isSectionComplete) {
      alert("Please fill in all the information in the section before continuing.");
      return;
    }

    if (isLastStep) {
      completeSection("financial");
      router.push("/goals-info");
    } else {
      const newStep = currentStepIndex + 1;
      updateSectionProgress(currentSection, newStep);
    }
  }, [currentSection, sections, isSectionComplete, completeSection, router, updateSectionProgress]);

  return (
    <div className="font-helvetica max-w-xl mx-auto">
      <div className="text-center mb-8 flex flex-col gap-4">
        {" "}
        <h1 className="text-4xl font-cirka">
          Help us with these key financial details
        </h1>
        <p className="text-gray-600">
          Fill the different forms that appear from the pop-ups
        </p>
      </div>
      <div className="space-y-4 max-w-sm mx-auto">
        <div className="border-b pb-4">
          <IncomeSection
            values={localFormData.income}
            onChange={(field, value) =>
              handleFormUpdate("income", field, value)
            }
            onContinue={handleContinue}
          />
        </div>
        <div className="border-b pb-4">
          <ExpensesSection
            values={localFormData.annualExpenses}
            onChange={(field, value) =>
              handleFormUpdate("annualExpenses", field, value)
            }
            onContinue={handleContinue}
          />
        </div>
        <div className="border-b pb-4">
          <AssetsSection
            values={localFormData.assets}
            onChange={(field, value) =>
              handleFormUpdate("assets", field, value)
            }
            onContinue={handleContinue}
          />
        </div>

        <div className="border-b pb-4">
          <LiabilitiesSection
            values={localFormData.liabilities}
            onChange={(field, value) =>
              handleFormUpdate("liabilities", field, value)
            }
            onContinue={handleContinue}
          />
        </div>
      </div>
      <div className="flex gap-4 mt-8 w-full max-w-md mx-auto">
        <Button variant="outline" onClick={handleBack} className="flex-1">
          Back
        </Button>
        <Button
          onClick={handleContinue}
          className={`flex-1 bg-navy hover:bg-navyLight text-white ${
            !isSectionComplete ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!isSectionComplete}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export { FinancialDetailsScreen };
