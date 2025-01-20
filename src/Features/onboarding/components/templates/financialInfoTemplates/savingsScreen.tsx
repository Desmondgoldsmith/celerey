import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SavingsScreenProps {
  values: {
    savings: string;
  };
  onBack: () => void;
  onContinue: () => void;
  onChange: (field: string, value: string) => void;
}

export const SavingsScreen: React.FC<SavingsScreenProps> = ({
  values,
  onChange,
  onContinue,
  onBack,
}) => {
  const isComplete = values.savings !== "";

  const handleInputChange = (field: "savings", value: string) => {
    if (/^\d*$/.test(value)) {
      onChange(field, value);
    }
  };

  return (
    <div className="font-helvetica max-w-xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-cirka mb-4">
          How much do you have currently saved in your savings account?
        </h1>
        <p className="text-gray-600">How much have you saved up?</p>
      </div>
      <div className="space-y-4 mb-12">
        <div className="flex border-b border-gray-300 pb-4 items-center">
          <label className="flex-1">Savings</label>
          <Input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className="flex-1 appearance-none"
            value={values.savings || ""}
            onChange={(e) => {
              handleInputChange("savings", e.target.value);
            }}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          onClick={onContinue}
          className="flex-1 bg-navy hover:bg-navyLight text-white"
          disabled={!isComplete}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
