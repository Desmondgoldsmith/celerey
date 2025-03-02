"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { InvestmentGrowthPreferenceScreen } from "@/Features/onboarding/components/templates/questionnaireTemplates/riskInfo/InvestmentGrowthPreference";
import { LossToleranceScreen } from "@/Features/onboarding/components/templates/questionnaireTemplates/riskInfo/LossTolerance";
import { MarketReactionScreen } from "@/Features/onboarding/components/templates/questionnaireTemplates/riskInfo/MarketReaction";
import { RiskToleranceScreen } from "@/Features/onboarding/components/templates/questionnaireTemplates/riskInfo/RiskTolerance";
import { InvestmentGoalScreen } from "@/Features/onboarding/components/templates/questionnaireTemplates/riskInfo/InvestmentGoal";
import { InvestmentHorizonScreen } from "@/Features/onboarding/components/templates/questionnaireTemplates/riskInfo/InvestmentHorizon";
import { LiquidityPreferenceScreen } from "@/Features/onboarding/components/templates/questionnaireTemplates/riskInfo/LiquidityPreference";
import { RiskAssessmentComplete } from "@/Features/onboarding/components/templates/questionnaireTemplates/riskInfo/RiskAssessmentComplete";
import { RiskInfoSchema } from "@/Features/onboarding/schema";
import { useOnboardingStore } from "@/Features/onboarding/state";
import { OnboardingLayout } from "@/Features/onboarding/components/templates/sharedTemplates/onboardingLayout";

const RiskPage: React.FC = () => {
  const router = useRouter();
  const { formData, updateFormData, completeSection } = useOnboardingStore();

  const [localFormData, setLocalFormData] = useState<RiskInfoSchema>(
    formData.risk
  );

  // Step management
  const steps = [
    "investmentGrowthPreference",
    "lossTolerance",
    "marketReaction",
    "riskTolerance",
    "investmentGoal",
    "investmentHorizon",
    "liquidityPreference",
    "complete",
  ];
  const [currentStep, setCurrentStep] = useState(0);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      router.push("/questionnaire/financial");
    }
  }, [currentStep, router]);

  const handleContinue = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeSection("risk");
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, steps.length, completeSection, router]);

  const handleFormUpdate = (updates: Partial<RiskInfoSchema>) => {
    const updatedFormData = {
      ...localFormData,
      ...updates,
    };
    setLocalFormData(updatedFormData);
    updateFormData("risk", updatedFormData);
  };

  const renderStep = () => {
    switch (steps[currentStep]) {
      case "investmentGrowthPreference":
        return (
          <InvestmentGrowthPreferenceScreen
            value={localFormData.investmentGrowthPreference}
            onChange={(value) =>
              handleFormUpdate({ investmentGrowthPreference: value })
            }
            onBack={handleBack}
            enableBack={false}
            onContinue={handleContinue}
          />
        );
      case "lossTolerance":
        return (
          <LossToleranceScreen
            value={localFormData.lossTolerance}
            onChange={(value) => handleFormUpdate({ lossTolerance: value })}
            onBack={handleBack}
            enableBack={true}
            onContinue={handleContinue}
          />
        );
      case "marketReaction":
        return (
          <MarketReactionScreen
            value={localFormData.marketReaction}
            onChange={(value) => handleFormUpdate({ marketReaction: value })}
            onBack={handleBack}
            enableBack={true}
            onContinue={handleContinue}
          />
        );
      case "riskTolerance":
        return (
          <RiskToleranceScreen
            value={localFormData.riskTolerance}
            onChange={(value) => handleFormUpdate({ riskTolerance: value })}
            onBack={handleBack}
            onContinue={handleContinue}
            enableBack={true}
          />
        );
      case "investmentGoal":
        return (
          <InvestmentGoalScreen
            value={localFormData.investmentGoal}
            onChange={(value) => handleFormUpdate({ investmentGoal: value })}
            onBack={handleBack}
            onContinue={handleContinue}
            enableBack={true}
          />
        );
      case "investmentHorizon":
        return (
          <InvestmentHorizonScreen
            value={localFormData.investmentHorizon}
            onChange={(value) => handleFormUpdate({ investmentHorizon: value })}
            onBack={handleBack}
            onContinue={handleContinue}
            enableBack={true}
          />
        );
      case "liquidityPreference":
        return (
          <LiquidityPreferenceScreen
            value={localFormData.liquidityPreference}
            onChange={(value) =>
              handleFormUpdate({ liquidityPreference: value })
            }
            onBack={handleBack}
            onContinue={handleContinue}
            enableBack={true}
          />
        );
      case "complete":
        return <RiskAssessmentComplete />;
      default:
        return null;
    }
  };

  return (
    <OnboardingLayout>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="font-helvetica max-w-xl mx-auto">
          <div className="flex flex-col items-center space-y-4 max-w-3xl mx-auto">
            {renderStep()}
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default RiskPage;
