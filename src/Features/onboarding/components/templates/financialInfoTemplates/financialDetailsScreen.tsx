import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { PassiveIncomeSection } from "./passiveIncomeSection";
import { ActiveIncomeSection } from "./activeIncomeSection";
import { AssetsSection } from "./assetsSection";
import { ExpensesSection } from "./expensesSection";
import { LiabilitiesSection } from "./liabilitiesSection";
import { FinancialInfoSchema } from "@/Features/onboarding/schema";
import { useOnboardingStore } from "@/Features/onboarding/state";

const FinancialDetailsScreen: React.FC<any> = () => {
  const router = useRouter();
  const {
    formData,
    updateFormData,
    sections,
    currentSection,
    updateSectionProgress,
    completeSection,
  } = useOnboardingStore();
  const [localFormData, setLocalFormData] = useState<FinancialInfoSchema>({
    ...formData.financial,
    activeIncome: {
      salary: formData.financial.activeIncome?.salary || "",
      bonuses: formData.financial.activeIncome?.bonuses || "",
      commissions: formData.financial.activeIncome?.commissions || "",
      otherIncome: formData.financial.activeIncome?.otherIncome || "",
    },
    passiveIncome: {
      rentalIncome: formData.financial.passiveIncome?.rentalIncome || "",
      dividends: formData.financial.passiveIncome?.dividends || "",
      interestIncome: formData.financial.passiveIncome?.interestIncome || "",
      otherIncome: formData.financial.passiveIncome?.otherIncome || "",
    },
    assets: {
      equity: formData.financial.assets?.equity || "",
      cashEquivalents: formData.financial.assets?.cashEquivalents || "",
      fixedIncome: formData.financial.assets?.fixedIncome || "",
      altAssets: {
        realEstate: formData.financial.assets?.altAssets?.realEstate || "",
        privateEquity:
          formData.financial.assets?.altAssets?.privateEquity || "",
        hedgeFunds: formData.financial.assets?.altAssets?.hedgeFunds || "",
        commodities: formData.financial.assets?.altAssets?.commodities || "",
        cryptocurrency:
          formData.financial.assets?.altAssets?.cryptocurrency || "",
      },
      assetCountries: formData.financial.assets?.assetCountries || [],
    },
  });

  const [sectionCompletion, setSectionCompletion] = useState({
    activeIncome: false,
    passiveIncome: false,
    annualExpenses: false,
    assets: false,
    liabilities: false,
  });

  useEffect(() => {
    setLocalFormData({
      ...formData.financial,
      activeIncome: {
        salary: formData.financial.activeIncome?.salary || "",
        bonuses: formData.financial.activeIncome?.bonuses || "",
        commissions: formData.financial.activeIncome?.commissions || "",
        otherIncome: formData.financial.activeIncome?.otherIncome || "",
      },
      passiveIncome: {
        rentalIncome: formData.financial.passiveIncome?.rentalIncome || "",
        dividends: formData.financial.passiveIncome?.dividends || "",
        interestIncome: formData.financial.passiveIncome?.interestIncome || "",
        otherIncome: formData.financial.passiveIncome?.otherIncome || "",
      },
      assets: {
        equity: formData.financial.assets?.equity || "",
        cashEquivalents: formData.financial.assets?.cashEquivalents || "",
        fixedIncome: formData.financial.assets?.fixedIncome || "",
        altAssets: {
          realEstate: formData.financial.assets?.altAssets?.realEstate || "",
          privateEquity:
            formData.financial.assets?.altAssets?.privateEquity || "",
          hedgeFunds: formData.financial.assets?.altAssets?.hedgeFunds || "",
          commodities: formData.financial.assets?.altAssets?.commodities || "",
          cryptocurrency:
            formData.financial.assets?.altAssets?.cryptocurrency || "",
        },
        assetCountries: formData.financial.assets?.assetCountries || [],
      },
    });
  }, [formData.financial]);

  useEffect(() => {
    const checkSectionComplete = () => {
      const {
        activeIncome,
        passiveIncome,
        assets,
        annualExpenses,
        liabilities,
      } = localFormData;
      const isActiveIncomeComplete = Object.values(activeIncome || {}).every(
        (value) => value !== ""
      );
      const isPassiveIncomeComplete = Object.values(passiveIncome || {}).every(
        (value) => value !== ""
      );
      const isExpensesComplete = Object.values(annualExpenses || {}).every(
        (value) => value !== ""
      );
      const isAssetsComplete =
        assets?.equity !== "" &&
        assets?.cashEquivalents !== "" &&
        assets?.fixedIncome !== "" &&
        Object.values(assets?.altAssets || {}).every((value) => value !== "") &&
        assets?.assetCountries?.length > 0;
      const isLiabilitiesComplete = Object.values(liabilities || {}).every(
        (value) => value !== ""
      );

      setSectionCompletion({
        activeIncome: isActiveIncomeComplete,
        passiveIncome: isPassiveIncomeComplete,
        annualExpenses: isExpensesComplete,
        assets: isAssetsComplete,
        liabilities: isLiabilitiesComplete,
      });
    };

    checkSectionComplete();
  }, [localFormData]);

  const handleFormUpdate = (
    section: keyof FinancialInfoSchema,
    field: string,
    value: string | string[] | object
  ) => {
    const updatedSection = {
      ...(typeof localFormData[section] === "object"
        ? localFormData[section]
        : {}),
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
    const isLastStep =
      currentStepIndex === sections[currentSection].totalSteps - 1;

    const isAllSectionsComplete = Object.values(sectionCompletion).every(
      (status) => status
    );

    if (!isAllSectionsComplete) {
      alert(
        "Please fill in all the information in the section before continuing."
      );
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
    sectionCompletion,
    completeSection,
    router,
    updateSectionProgress,
  ]);

  return (
    <div className="font-helvetica max-w-xl mx-auto">
      <div className="text-center mb-8 flex flex-col gap-4">
        {" "}
        <h1 className="text-4xl font-cirka">Financial Details</h1>
        <p className="text-gray-600">
          Fill the different forms that appear from the pop-ups
        </p>
      </div>
      <div className="space-y-4 max-w-sm mx-auto">
        <div className="border-b pb-4">
          <ActiveIncomeSection
            values={localFormData.activeIncome}
            onChange={(field, value) =>
              handleFormUpdate("activeIncome", field, value)
            }
            onContinue={handleContinue}
            isComplete={sectionCompletion.activeIncome}
            isNextSectionComplete={sectionCompletion.passiveIncome}
          />
        </div>
        <div className="border-b pb-4">
          <PassiveIncomeSection
            values={localFormData.passiveIncome}
            onChange={(field, value) =>
              handleFormUpdate("passiveIncome", field, value)
            }
            onContinue={handleContinue}
            isComplete={sectionCompletion.passiveIncome}
            isNextSectionComplete={sectionCompletion.annualExpenses}
          />
        </div>
        <div className="border-b pb-4">
          <ExpensesSection
            values={localFormData.annualExpenses}
            onChange={(field, value) =>
              handleFormUpdate("annualExpenses", field, value)
            }
            onContinue={handleContinue}
            isComplete={sectionCompletion.annualExpenses}
            isNextSectionComplete={sectionCompletion.assets}
          />
        </div>
        <div className="border-b pb-4">
          <AssetsSection
            values={localFormData.assets}
            onChange={(field, value: any) =>
              handleFormUpdate("assets", field, value)
            }
            onContinue={handleContinue}
            isComplete={sectionCompletion.assets}
            isNextSectionComplete={sectionCompletion.liabilities}
          />
        </div>

        <div className="border-b pb-4">
          <LiabilitiesSection
            values={localFormData.liabilities}
            onChange={(field, value) =>
              handleFormUpdate("liabilities", field, value)
            }
            onContinue={handleContinue}
            isComplete={sectionCompletion.liabilities}
            isAssetsComplete={sectionCompletion.assets}
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
            !Object.values(sectionCompletion).every((status) => status)
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={!Object.values(sectionCompletion).every((status) => status)}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export { FinancialDetailsScreen };
