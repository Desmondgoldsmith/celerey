import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import { SavingsSection } from "./savingsSection";
import { EmergencyFundsSection } from "./emergencyFundsSection";
import { RetirementSection } from "./retirementSection"; // Import the new section
import { FinancialInfoSchema } from "@/Features/onboarding/schema";
import { useOnboardingStore } from "@/Features/onboarding/state";
import Spinner from "@/components/ui/spinner";

interface SavingsDetailsScreenProps {
  values: FinancialInfoSchema;
  onChange: (
    section: keyof FinancialInfoSchema,
    field: string,
    value: string
  ) => void;
  onBack: () => void;
  onContinue: () => void;
}

const SavingsDetailsScreen: React.FC<SavingsDetailsScreenProps> = ({
  values,
  onChange,
  onBack,
  onContinue,
}) => {
  const [localFormData, setLocalFormData] =
    useState<FinancialInfoSchema>(values);
  const [isSectionComplete, setIsSectionComplete] = useState(false);
  const { saveFinancialInfo, loading } = useOnboardingStore();

  useEffect(() => {
    setLocalFormData(values);
  }, [values]);

  useEffect(() => {
    const checkSectionComplete = () => {
      const { savings, retirement, emergencyFund } = localFormData;
      const isComplete =
        Object.values(savings || {}).every((value) => value !== "") &&
        emergencyFund?.hasEmergencyFunds !== undefined &&
        (!emergencyFund?.hasEmergencyFunds ||
          (emergencyFund?.hasEmergencyFunds &&
            emergencyFund?.emergencyFundAmount !== "" &&
            emergencyFund?.targetMonths !== "")) &&
        retirement?.retirementAge !== "" &&
        retirement?.targetRetirementIncome !== "";
      setIsSectionComplete(!!isComplete);
    };

    checkSectionComplete();
    console.log("Local Form Data:", localFormData);
  }, [localFormData]);

  const handleFormUpdate = (
    section: keyof FinancialInfoSchema,
    field: string,
    value: string
  ) => {
    if (typeof localFormData[section] === "object") {
      // Update sections like savings
      setLocalFormData((prev) => ({
        ...prev,
        [section]: {
          ...(prev[section] as Record<string, string>),
          [field]: value,
        },
      }));
    } else {
      setLocalFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }

    onChange(section, field, value);
  };

  const handleContinue = async () => {
    await saveFinancialInfo();
    onContinue();
  };

  return (
    <div className="font-helvetica max-w-xl mx-auto">
      <div className="text-center mb-8 flex flex-col gap-4">
        <h1 className="text-4xl font-cirka">
          Help us with these key Financial details
        </h1>
        <p className="text-gray-600">
          Fill the different forms that appear from the pop-ups
        </p>
      </div>
      <div className="space-y-4 max-w-sm mx-auto">
        {/* Savings Section */}
        <div className="border-b pb-4">
          <SavingsSection
            values={localFormData.savings}
            onChange={(field, value) =>
              handleFormUpdate("savings", field, value)
            }
          />
        </div>
        {/* Emergency Funds Section */}
        <div className="border-b pb-4">
          <EmergencyFundsSection
            onChange={(updatedValue) => {
              console.log("Updated Value:", updatedValue);
              setLocalFormData((prev) => ({
                ...prev,
                emergencyFund: {
                  hasEmergencyFunds:
                    updatedValue.emergencyFund.hasEmergencyFunds ? "yes" : "no",
                  emergencyFundAmount:updatedValue.emergencyFund.emergencyFundAmount || "",
                  targetMonths: updatedValue.emergencyFund.targetMonths || "",
                },
              }));

              // Notify parent of changes
              if ("hasEmergencyFunds" in updatedValue.emergencyFund) {
                onChange(
                  "emergencyFund",
                  "hasEmergencyFunds",
                  updatedValue.emergencyFund.hasEmergencyFunds ? "yes" : "no"
                );
              }
              if ("emergencyFundAmount" in updatedValue.emergencyFund) {
                onChange(
                  "emergencyFund",
                  "emergencyFundAmount",
                  updatedValue.emergencyFund.emergencyFundAmount || ""
                );
              }
              if ("targetMonths" in updatedValue.emergencyFund) {
                onChange(
                  "emergencyFund",
                  "targetMonths",
                  updatedValue.emergencyFund.targetMonths || ""
                );
              }
            }}
          />
        </div>

        {/* Retirement Section */}
        <div className="border-b pb-4">
          <RetirementSection
            values={localFormData.retirement}
            onChange={(field, value) =>
              handleFormUpdate("retirement", field, value)
            }
          />
        </div>
      </div>
      <div className="flex gap-4 mt-8 w-full max-w-md mx-auto">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          onClick={handleContinue}
          className={`flex-1 bg-navy hover:bg-navyLight text-white ${
            !isSectionComplete ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!isSectionComplete}
        >
          {loading && <Spinner className="text-white" />} Continue
        </Button>
      </div>
    </div>
  );
};

export { SavingsDetailsScreen };
