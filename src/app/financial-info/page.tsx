"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/Features/onboarding/state";
import { SectionProgressBars } from "@/Features/onboarding/components/molecules/progressBar";
import { FinancialInfoSchema } from "@/Features/onboarding/schema";
import { OnboardingLayout } from "@/Features/onboarding/components/templates/sharedTemplates/onboardingLayout";
import { CurrencyScreen } from "@/Features/onboarding/components/templates/financialInfoTemplates/currencyScreen";
import { IncomeScreen } from "@/Features/onboarding/components/templates/financialInfoTemplates/incomeScreen";
import { ExpensesScreen } from "@/Features/onboarding/components/templates/financialInfoTemplates/expensesScreen";
import { AssetsScreen } from "@/Features/onboarding/components/templates/financialInfoTemplates/assetsScreen";
import { LiabilitiesScreen } from "@/Features/onboarding/components/templates/financialInfoTemplates/liabilitiesScreen";
import { NetWorthScreen } from "@/Features/onboarding/components/templates/financialInfoTemplates/networthScreen";

export default function FinancialInfo() {
  const router = useRouter();
  const {
    sections,
    currentSection,
    formData,
    updateFormData,
    updateSectionProgress,
    completeSection,
    setActiveSection,
  } = useOnboardingStore();

  useEffect(() => {
    if (!sections.personal.isCompleted) {
      router.push("/personal-info");
      return;
    }

    if (currentSection !== "financial") {
      setActiveSection("financial");
    }
  }, [sections.personal.isCompleted, currentSection, router, setActiveSection]);


    const handleFormUpdate = useCallback(
      (updates: Partial<FinancialInfoSchema>) => {
        updateFormData("financial", updates);
      },
      [updateFormData]
    );


  const validateCurrentStep = useCallback((): boolean => {
    const currentStepIndex = sections[currentSection].currentStep;
    const data = formData.financial;

    switch (currentStepIndex) {
      case 0: // Currency selection
        return !!data.currency;
      case 1: // Passive income validation
        return (
        parseFloat(data.passiveIncome.rentalIncome) >= 0 &&
  parseFloat(data.passiveIncome.dividends) >= 0 &&
  parseFloat(data.passiveIncome.interestIncome) >= 0 &&
  parseFloat(data.passiveIncome.otherIncome) >= 0
        );
      case 2: // Annual expenses validation
        return (
          parseFloat(data.annualExpenses.home) >= 0 &&
          parseFloat(data.annualExpenses.childcare) >= 0 &&
          parseFloat(data.annualExpenses.education) >= 0 &&
          parseFloat(data.annualExpenses.healthcare) >= 0 &&
          parseFloat(data.annualExpenses.travel) >= 0 &&
          parseFloat(data.annualExpenses.giving) >= 0
        );
      case 3: // Assets validation
        return (
          parseFloat(data.assets.realEstate) >= 0 &&
          parseFloat(data.assets.cash) >= 0 &&
          parseFloat(data.assets.publicSecurities) >= 0 &&
          parseFloat(data.assets.privateSecurities) >= 0
        );
      case 4: // Liabilities validation
        return (
          parseFloat(data.liabilities.mortgages) >= 0 &&
          parseFloat(data.liabilities.loans) >= 0 &&
          parseFloat(data.liabilities.creditCards) >= 0 &&
          parseFloat(data.liabilities.assetFinance) >= 0 &&
          parseFloat(data.liabilities.otherLiabilities) >= 0
        );
        case 5: // Net worth
        return true;
      default:
        return true;
    }
  }, [currentSection, sections, formData.financial]);


  
const handleBack = useCallback(() => {
  const currentStepIndex = sections[currentSection].currentStep;
  console.log("Current Step Index:", currentStepIndex); 
  if (currentStepIndex > 0) {
    const newStep = currentStepIndex - 1;
    console.log("New Step:", newStep); 
    updateSectionProgress(currentSection, newStep);
  } else {
    router.push("/personal-info");
  }
}, [currentSection, sections, router, updateSectionProgress]);

  const handleContinue = useCallback(() => {
    const currentStepIndex = sections[currentSection].currentStep;
    const isLastStep =
      currentStepIndex === sections[currentSection].totalSteps - 1;

    if (!validateCurrentStep()) {
      return;
    }

    if (isLastStep) {
      completeSection("financial");
      router.push("/goals-info");
    } else {
      const newStep = currentStepIndex + 1;
      updateSectionProgress(currentSection, newStep);
    }
  }, [
    currentSection,
    sections,
    validateCurrentStep,
    completeSection,
    router,
    updateSectionProgress,
  ]);

  const renderStep = () => {
    const currentStepIndex = sections[currentSection].currentStep;
    const financialData = formData.financial;

    switch (currentStepIndex) {
      case 0:
        return (
          <CurrencyScreen
            value={financialData.currency}
            onChange={(value) => handleFormUpdate({ currency: value })}
            onBack={handleBack}
            onContinue={handleContinue}
          />
        );
      case 1:
        return (
          <IncomeScreen
            values={financialData.monthlyIncome}
            onChange={(field, value) =>
              handleFormUpdate({
                passiveIncome: {
                  ...financialData.monthlyIncome,
                  [field]: value,
                },
              })
            }
            onBack={handleBack}
            onContinue={handleContinue}
          />
        );
      case 2:
        return (
          <ExpensesScreen
            values={financialData.annualExpenses}
            onChange={(field, value) => handleFormUpdate({ annualExpenses:{...financialData.annualExpenses,[field]:value,} })}
            onBack={handleBack}
            onContinue={handleContinue}
          />
        );
      case 3:
        return (
          <AssetsScreen
           values={financialData.assets}
            onChange={(field, value) => handleFormUpdate({ assets:{...financialData.assets,[field]:value,} })}
            onBack={handleBack}
            onContinue={handleContinue}
          />
        );
      case 4:
        return (
          <LiabilitiesScreen
           values={financialData.liabilities}
            onChange={(field, value) => handleFormUpdate({ liabilities:{...financialData.liabilities,[field]:value,} })}
            onBack={handleBack}
            onContinue={handleContinue}
          />
        );
        case 5:
          return (
            <NetWorthScreen onBack={handleBack} onContinue={handleContinue} />
          );
        
      default:
        return null;
    }
  };

  return (
    <OnboardingLayout>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <SectionProgressBars
          sections={sections}
          currentSection={currentSection}
        />
        <div className="mt-12">{renderStep()}</div>
      </div>
    </OnboardingLayout>
  );
}