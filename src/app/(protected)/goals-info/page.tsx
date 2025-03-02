"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GoalsInfoSchema } from "@/Features/onboarding/schema";
import { useOnboardingStore, SectionId } from "@/Features/onboarding/state";
import { SectionProgressBars } from "@/Features/onboarding/components/molecules/progressBar";
import { OnboardingLayout } from "@/Features/onboarding/components/templates/sharedTemplates/onboardingLayout";
import { WelcomeScreen } from "@/Features/onboarding/components/templates/goalsInfoTemplates/welcomeScreen";
import { FinancialGoalScreen } from "@/Features/onboarding/components/templates/goalsInfoTemplates/financialGoalScreeen";
import { TargetAmountScreen } from "@/Features/onboarding/components/templates/goalsInfoTemplates/targetAmountScreen";
import { SubmitScreen } from "@/Features/onboarding/components/templates/goalsInfoTemplates/submitScreen"; // Import the SubmitScreen
import { useAuthStore } from "@/Features/auth/state";

export default function GoalsInfo() {
  const router = useRouter();
  const {
    sections,
    currentSection,
    formData,
    updateFormData,
    updateSectionProgress,
    completeSection,
    setActiveSection,
    populateGoalInfo,
  } = useOnboardingStore();

  const { isAuthenticated } = useAuthStore();
  const [showSubmitScreen, setShowSubmitScreen] = useState(false); // State to control the SubmitScreen

  useEffect(() => {
    if (isAuthenticated) {
      populateGoalInfo();
    }
  }, [isAuthenticated, populateGoalInfo]);

  useEffect(() => {
    if (currentSection !== "goals") {
      setActiveSection("goals");
    }
  }, [currentSection, setActiveSection]);

  const handleFormUpdate = useCallback(
    (updates: Partial<GoalsInfoSchema>) => {
      updateFormData("goals", updates);
    },
    [updateFormData]
  );

  const validateCurrentStep = useCallback((): boolean => {
    const currentStepIndex = sections[currentSection].currentStep;
    const data = formData.goals;

    switch (currentStepIndex) {
      case 0:
        return true; // WelcomeScreen is always valid
      case 1:
        return !!data.primamryFinancialGoal?.trim(); // Validate primary financial goal
      case 2:
        return parseFloat(data.targetAmount || "0") >= 0; // Validate target amount
      case 3:
        return true; // SubmitScreen is always valid
      default:
        return true;
    }
  }, [currentSection, sections, formData.goals]);

  const handleBack = useCallback(() => {
    const currentStepIndex = sections[currentSection].currentStep;
    if (currentStepIndex > 0) {
      const newStep = currentStepIndex - 1;
      updateSectionProgress(currentSection, newStep);
    } else {
      router.push("/financial-info");
    }
  }, [currentSection, sections, router, updateSectionProgress]);

  const handleContinue = useCallback(() => {
    if (!sections || !currentSection) {
      console.error("Sections or currentSection is undefined");
      return;
    }

    const currentStepIndex = sections[currentSection]?.currentStep;
    const isLastStep =
      currentStepIndex === sections[currentSection]?.totalSteps - 1;

    if (!validateCurrentStep()) {
      console.error("Validation failed on step:", currentStepIndex);
      return;
    }

    if (isLastStep) {
      completeSection("goals");
      router.replace("/freebie"); // Redirect to the dashboard
    } else {
      updateSectionProgress(currentSection, currentStepIndex + 1);
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
    if (!sections || !currentSection) {
      console.error("Sections or currentSection is undefined");
      return null;
    }

    const currentStepIndex = sections[currentSection]?.currentStep || 0;
    const goalsData = formData.goals || {};

    switch (currentStepIndex) {
      case 0:
        return (
          <WelcomeScreen onContinue={handleContinue} onBack={handleBack} />
        );
      case 1:
        return (
          <FinancialGoalScreen
            value={goalsData.primamryFinancialGoal}
            onChange={(value) =>
              handleFormUpdate({ primamryFinancialGoal: value })
            }
            onBack={handleBack}
            onContinue={handleContinue}
          />
        );
      case 2:
        return (
          <TargetAmountScreen
            values={{ targetAmount: goalsData.targetAmount }}
            onChange={(field, value) => handleFormUpdate({ [field]: value })}
            onBack={handleBack}
            onContinue={handleContinue}
          />
        );
      case 3:
        return <SubmitScreen onContinue={handleContinue} onBack={handleBack} />;
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
