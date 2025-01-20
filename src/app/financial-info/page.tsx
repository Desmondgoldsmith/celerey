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
import { SavingsScreen } from "@/Features/onboarding/components/templates/financialInfoTemplates/savingsScreen";
import { EmergencyFundsScreen } from "@/Features/onboarding/components/templates/financialInfoTemplates/emergencyFundsScreen";
import { DebtScreen } from "@/Features/onboarding/components/templates/financialInfoTemplates/debtScreen";
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
      case 1: // Income validation
        return parseFloat(data.monthlyIncome || "0") >= 0;
      case 2: // Annual expenses validation
        return (
          parseFloat(data.monthlyExpenses.home) >= 0 &&
          parseFloat(data.monthlyExpenses.loan) >= 0 &&
          parseFloat(data.monthlyExpenses.otherExpenses) >= 0
        );
      case 3: // Savings validation
      return parseFloat(data.savings || "0") >= 0;
      case 4: // Liabilities validation
         return (
           data.hasEmergencyFunds === "no" ||
           (data.hasEmergencyFunds === "yes" &&
             parseFloat(data.emergencyFund || "0") >= 0)
         );
      case 5: // Liabilities validation
         return (
           data.hasDebt === "no" ||
           (data.hasDebt === "yes" &&
             parseFloat(data.debt || "0") >= 0)
         );
      case 6: // Net worth
        return true;
      default:
        return true;
    }
  }, [currentSection, sections, formData.financial]);

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
            values={{ monthlyIncome: financialData.monthlyIncome }}
            onChange={(field, value) => handleFormUpdate({ [field]: value })}
            onBack={handleBack}
            onContinue={handleContinue}
          />
        );
      case 2:
        return (
          <ExpensesScreen
            values={financialData.monthlyExpenses}
            onChange={(field, value) =>
              handleFormUpdate({
                monthlyExpenses: {
                  ...financialData.monthlyExpenses,
                  [field]: value,
                },
              })
            }
            onBack={handleBack}
            onContinue={handleContinue}
          />
        );
      case 3:
           return (
             <SavingsScreen
               values={{ savings: financialData.savings }}
               onChange={(field, value) => handleFormUpdate({ [field]: value })}
               onBack={handleBack}
               onContinue={handleContinue}
             />
           );
      case 4:
         return (
           <EmergencyFundsScreen
             value={{
               hasEmergencyFunds: financialData.hasEmergencyFunds,
               emergencyFund: financialData.emergencyFund,
             }}
             onChange={(value) => handleFormUpdate(value)}
             onBack={handleBack}
             onContinue={handleContinue}
           />
         );
      case 5:
        return (
           <DebtScreen
             value={{
               hasDebt: financialData.hasDebt,
               debt: financialData.debt,
             }}
             onChange={(value) => handleFormUpdate(value)}
             onBack={handleBack}
             onContinue={handleContinue}
           />
         );
      case 6:
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