"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SectionId, useOnboardingStore } from "@/Features/onboarding/state";
import { RiskInfoSchema } from "@/Features/onboarding/schema";
import { WelcomeScreen } from "@/Features/onboarding/components/templates/riskInfoTemplates/welcomeScreen";
// import { RiskAttitudeScreen } from "@/Features/onboarding/components/templates/riskInfoTemplates/riskAttitudeScreen";
import { RiskToleranceScreen } from "@/Features/onboarding/components/templates/riskInfoTemplates/riskToleranceScreen";
// import { TolerancePercentageScreen } from "@/Features/onboarding/components/templates/riskInfoTemplates/tolerancePercentageScreen";
// import { RiskReactionScreen } from "@/Features/onboarding/components/templates/riskInfoTemplates/riskReactionScreen";
// import { RiskApproachScreen } from "@/Features/onboarding/components/templates/riskInfoTemplates/riskApproachScreen";
// import { InvestmentObjectiveScreen } from "@/Features/onboarding/components/templates/riskInfoTemplates/investmentObjectiveScreen";
// import { InvestmentHorizonScreen } from "@/Features/onboarding/components/templates/riskInfoTemplates/investmentHorizonScreen";
// import { IlliquidInvestmentScreen } from "@/Features/onboarding/components/templates/riskInfoTemplates/illiquidInvestmentScreen";
import { SubmitScreen } from "@/Features/onboarding/components/templates/riskInfoTemplates/submitScreen";
import { OnboardingLayout } from "@/Features/onboarding/components/templates/sharedTemplates/onboardingLayout";
import { SectionProgressBars } from "@/Features/onboarding/components/molecules/progressBar";

export default function RiskInfo() {
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
    if (!sections.goals.isCompleted) {
      router.push("/goals-info");
      return;
    }

    if (currentSection !== "risk") {
      setActiveSection("risk");
    }
  }, [sections.goals.isCompleted, currentSection, router, setActiveSection]);

  const handleFormUpdate = useCallback(
    (updates: Partial<RiskInfoSchema>) => {
      updateFormData("risk", updates);
    },
    [updateFormData]
  );

  const validateCurrentStep = useCallback((): boolean => {
    const currentStepIndex = sections[currentSection].currentStep;
    const data = formData.risk;

    switch (currentStepIndex) {
      case 1:
        return !!data.riskTolerance.trim();
      default:
        return true;
    }
  }, [currentSection, sections, formData.risk]);

   const handleBack = useCallback(() => {
     const currentStepIndex = sections[currentSection].currentStep;
     if (currentStepIndex > 0) {
       const newStep = currentStepIndex - 1;
       updateSectionProgress(currentSection, newStep);
     } else {
       router.push("/goals-info");
     }
   }, [currentSection, sections, router, updateSectionProgress]);

  const getNextSection = useCallback(
    (currentSectionId: SectionId): SectionId | null => {
      const sectionOrder: SectionId[] = [
        "personal",
        "financial",
        "goals",
        "risk",
        "knowledge",
      ];
      const currentIndex = sectionOrder.indexOf(currentSectionId);
      return currentIndex < sectionOrder.length - 1
        ? sectionOrder[currentIndex + 1]
        : null;
    },
    []
  );

  const handleContinue = useCallback(() => {
    const currentStepIndex = sections[currentSection].currentStep;
    const isLastStep =
      currentStepIndex === sections[currentSection].totalSteps - 1;

    if (!validateCurrentStep()) {
      return;
    }

    if (isLastStep) {
      completeSection(currentSection);
      const nextSection = getNextSection(currentSection);
      if (nextSection) {
        setActiveSection(nextSection);
        router.push(`/${nextSection}-info`);
      }
    } else {
      const newStep = currentStepIndex + 1;
      updateSectionProgress(currentSection, newStep);
    }
  }, [
    currentSection,
    sections,
    validateCurrentStep,
    completeSection,
    getNextSection,
    setActiveSection,
    router,
    updateSectionProgress,
  ]);

  const renderStep = () => {
    const currentStepIndex = sections[currentSection].currentStep;
    const riskData = formData.risk;

    switch (currentStepIndex) {
      case 0:
        return <WelcomeScreen onContinue={handleContinue} onBack={handleBack} />;
      case 1:
        return (
          <RiskToleranceScreen
          value={riskData.riskTolerance}
          onChange={(value: string) => handleFormUpdate({ riskTolerance: value })}
          onBack={handleBack}
          onContinue={handleContinue}
          />
        );
        case 2:
          return <SubmitScreen onContinue={handleContinue} onBack={handleBack} />;
          
          default:
            return null;
      // case 3:
      //   return (
      //     <TolerancePercentageScreen
      //       value={riskData.riskTolerancePercentage}
      //       onChange={(value: string) => handleFormUpdate({ riskTolerancePercentage: value })}
      //       onBack={handleBack}
      //       onContinue={handleContinue}
      //     />
      //   );
      // case 4:
      //   return (
      //     <RiskReactionScreen
      //       value={riskData.riskReaction}
      //       onChange={(value: string) => handleFormUpdate({ riskReaction: value })}
      //       onBack={handleBack}
      //       onContinue={handleContinue}
      //     />
      //   );
      // case 5:
      //   return (
      //     <RiskApproachScreen
      //       value={riskData.riskApproach}
      //       onChange={(value: string) => handleFormUpdate({ riskApproach: value })}
      //       onBack={handleBack}
      //       onContinue={handleContinue}
      //     />
      //   );
      // case 6:
      //   return (
      //     <InvestmentObjectiveScreen
      //       value={riskData.investmentObjective}
      //       onChange={(value: string) => handleFormUpdate({ investmentObjective: value })}
      //       onBack={handleBack}
      //       onContinue={handleContinue}
      //     />
      //   );
      // case 7:
      //   return (
      //     <InvestmentHorizonScreen
      //       value={riskData.investmentHorizon}
      //       onChange={(value: string) => handleFormUpdate({ investmentHorizon: value })}
      //       onBack={handleBack}
      //       onContinue={handleContinue}
      //     />
      //   );
      // case 8:
      //   return (
      //     <IlliquidInvestmentScreen
      //       value={riskData.illiquidInvestmentPercentage}
      //       onChange={(value: string) => handleFormUpdate({ illiquidInvestmentPercentage: value })}
      //       onBack={handleBack}
      //       onContinue={handleContinue}
      //     />
      //   );
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
