import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

interface EmergencyFundsScreenProps {
  value: {
    hasEmergencyFunds?: string;
    emergencyFund?: string;
  };
  onChange: (value: EmergencyFundsScreenProps["value"]) => void;
  onBack: () => void;
  onContinue: () => void;
}

export const EmergencyFundsScreen: React.FC<EmergencyFundsScreenProps> = ({
  value,
  onChange,
  onBack,
  onContinue,
}) => {
  const [amountValid, setAmountValid] = useState(true);

  useEffect(() => {
    if (value.emergencyFund !== undefined) {
      setAmountValid(/^\d*$/.test(value.emergencyFund));
    }
  }, [value.emergencyFund]);

  return (
    <div className="text-center max-w-xl mx-auto">
      <h1 className="text-4xl font-cirka mb-12">
        Do you have an emergency fund?
      </h1>
      <p className="text-gray-600">
        Have you saved up to cover some living expenses for a duration?
      </p>

      <div className="w-full max-w-md mx-auto">
        <div className="flex justify-center items-center gap-6 my-6">
          <button
            className={`px-6 py-2 rounded-md font-medium ${
              value.hasEmergencyFunds === "no"
                ? "bg-navy text-white"
                : "border border-gray-300"
            }`}
            onClick={() =>
              onChange({
                ...value,
                hasEmergencyFunds: "no",
                emergencyFund: "",
              })
            }
          >
            No
          </button>
          <button
            className={`px-6 py-2 rounded-md font-medium ${
              value.hasEmergencyFunds === "yes"
                ? "bg-navy text-white"
                : "border border-gray-300"
            }`}
            onClick={() => onChange({ ...value, hasEmergencyFunds: "yes" })}
          >
            Yes
          </button>
        </div>

        {value.hasEmergencyFunds === "yes" && (
          <div className="flex border-y border-gray-300 py-4 items-center">
            <label className="flex-1">Months of living expenses saved</label>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="flex-1 appearance-none"
              value={value.emergencyFund || ""}
              onChange={(e) =>
                onChange({ ...value, emergencyFund: e.target.value })
              }
            />
          </div>
        )}

        {value.hasEmergencyFunds === "yes" &&
          value.emergencyFund &&
          !amountValid && (
            <p className="text-sm text-red-500 mt-1">
              Please enter a valid amount (e.g., 1234.56)
            </p>
          )}

        <div className="flex gap-4 mt-8 w-full max-w-md mx-auto">
          <Button variant="outline" onClick={onBack} className="flex-1">
            Back
          </Button>
          <Button
            onClick={onContinue}
            className="flex-1 bg-navy hover:bg-navyLight text-white"
            disabled={
              !value.hasEmergencyFunds ||
              (value.hasEmergencyFunds === "yes" &&
                (!value.emergencyFund || !amountValid))
            }
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};
