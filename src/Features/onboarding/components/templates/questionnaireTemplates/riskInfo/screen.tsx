import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { InvestmentGrowthPreferenceScreen } from "./InvestmentGrowthPreference";
import { LossToleranceScreen } from "./LossTolerance";
import { MarketReactionScreen } from "./MarketReaction";
import { RiskToleranceScreen } from "./RiskTolerance";
import { InvestmentGoalScreen } from "./InvestmentGoal";
import { InvestmentHorizonScreen } from "./InvestmentHorizon";
import { LiquidityPreferenceScreen } from "./LiquidityPreference";
import { RiskInfoSchema } from "@/Features/onboarding/schema";
import { useOnboardingStore } from "@/Features/onboarding/state";

const RiskInfoScreen: React.FC = () => {
  const router = useRouter();
  const {
    formData,
    updateFormData,
    sections,
    currentSection,
    updateSectionProgress,
    completeSection,
  } = useOnboardingStore();
  const [localFormData, setLocalFormData] = useState<RiskInfoSchema>(
    formData.risk
  );
  const [isSectionComplete, setIsSectionComplete] = useState(false);

  useEffect(() => {
    setLocalFormData(formData.risk);
  }, [formData.risk]);

  useEffect(() => {
    const checkSectionComplete = () => {
      const isComplete = Object.values(localFormData).every(
        (value) => value !== ""
      );
      setIsSectionComplete(isComplete);
    };

    checkSectionComplete();
  }, [localFormData]);

  const handleFormUpdate = (updates: Partial<RiskInfoSchema>) => {
    const updatedFormData = {
      ...localFormData,
      ...updates,
    };

    setLocalFormData(updatedFormData);
    updateFormData("risk", updatedFormData);
  };

  const handleBack = useCallback(() => {
    const currentStepIndex = sections[currentSection].currentStep;
    if (currentStepIndex > 0) {
      const newStep = currentStepIndex - 1;
      updateSectionProgress(currentSection, newStep);
    } else {
      router.push("/previous-page");
    }
  }, [currentSection, sections, router, updateSectionProgress]);

  const handleContinue = useCallback(() => {
    const currentStepIndex = sections[currentSection].currentStep;
    const isLastStep =
      currentStepIndex === sections[currentSection].totalSteps - 1;

    if (!isSectionComplete) {
      alert(
        "Please fill in all the information in the section before continuing."
      );
      return;
    }

    if (isLastStep) {
      completeSection("risk");
      router.push("/next-page");
    } else {
      const newStep = currentStepIndex + 1;
      updateSectionProgress(currentSection, newStep);
    }
  }, [
    currentSection,
    sections,
    isSectionComplete,
    completeSection,
    router,
    updateSectionProgress,
  ]);

  return (
    <div className="font-helvetica max-w-xl mx-auto">
      <div className="text-center mb-8 flex flex-col gap-4">
        <h1 className="text-4xl font-cirka">
          Please provide your risk preferences
        </h1>
        <p className="text-gray-600">
          Fill the different forms that appear from the pop-ups
        </p>
      </div>
      <div className="flex flex-col items-center space-y-4 max-w-sm mx-auto">
        <div className="border-b pb-4 w-full">
          <InvestmentGrowthPreferenceScreen
            value={localFormData.investmentGrowthPreference}
            onChange={(value) =>
              handleFormUpdate({ investmentGrowthPreference: value })
            }
            onBack={handleBack}
            onContinue={handleContinue}
            enableBack={false}
          />
        </div>
        <div className="border-b pb-4 w-full">
          <LossToleranceScreen
            value={localFormData.lossTolerance}
            onChange={(value) => handleFormUpdate({ lossTolerance: value })}
            onBack={handleBack}
            onContinue={handleContinue}
            enableBack={true}
          />
        </div>
        <div className="border-b pb-4 w-full">
          <MarketReactionScreen
            value={localFormData.marketReaction}
            onChange={(value) => handleFormUpdate({ marketReaction: value })}
            onBack={handleBack}
            onContinue={handleContinue}
            enableBack={true}
          />
        </div>
        <div className="border-b pb-4 w-full">
          <RiskToleranceScreen
            value={localFormData.riskTolerance}
            onChange={(value) => handleFormUpdate({ riskTolerance: value })}
            onBack={handleBack}
            onContinue={handleContinue}
            enableBack={true}
          />
        </div>
        <div className="border-b pb-4 w-full">
          <InvestmentGoalScreen
            value={localFormData.investmentGoal}
            onChange={(value) => handleFormUpdate({ investmentGoal: value })}
            onBack={handleBack}
            onContinue={handleContinue}
            enableBack={true}
          />
        </div>
        <div className="border-b pb-4 w-full">
          <InvestmentHorizonScreen
            value={localFormData.investmentHorizon}
            onChange={(value) => handleFormUpdate({ investmentHorizon: value })}
            onBack={handleBack}
            onContinue={handleContinue}
            enableBack={true}
          />
        </div>
        <div className="border-b pb-4 w-full">
          <LiquidityPreferenceScreen
            value={localFormData.liquidityPreference}
            onChange={(value) =>
              handleFormUpdate({ liquidityPreference: value })
            }
            onBack={handleBack}
            onContinue={handleContinue}
            enableBack={true}
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

export { RiskInfoScreen };
