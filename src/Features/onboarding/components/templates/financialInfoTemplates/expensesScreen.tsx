import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

interface ExpensesScreenProps {
  values: {
    home: string;
    loan: string;
    otherExpenses: string;
  };
  onChange: (field: keyof ExpensesScreenProps['values'], value: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

export const ExpensesScreen = ({
  values,
  onChange,
  onBack,
  onContinue,
}: ExpensesScreenProps) => {
  const isComplete =
    values.home !== "" &&
    values.loan !== "" &&
    values.otherExpenses !== "";

  const handleInputChange = (field: keyof ExpensesScreenProps['values'], value: string) => {
    if (/^\d*$/.test(value)) {
      onChange(field, value);
    }
  };

  return (
    <div className="font-helvetica max-w-xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-cirka mb-4">What&apos;s your monthly recurring expenses (e.g rent, utilities, loans)?</h1>
        <p className="text-gray-600">Enter your total monthly recurring expenses</p>
      </div>
      <div className="space-y-4 mb-12">
        <div className="flex border-b border-gray-300 pb-4 items-center">
          <label className="flex-1">Home</label>
          <Input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className="flex-1 appearance-none"
            value={values.home || ""}
            onChange={(e) => handleInputChange("home", e.target.value)}
          />
        </div>
        <div className="flex border-b border-gray-300 pb-4 items-center">
          <label className="flex-1">Loans</label>
          <Input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className="flex-1 appearance-none"
            value={values.loan || ""}
            onChange={(e) => handleInputChange("loan", e.target.value)}
          />
        </div>
        <div className="flex border-b border-gray-300 pb-4 items-center">
          <label className="flex-1">Education</label>
          <Input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className="flex-1 appearance-none"
            value={values.otherExpenses || ""}
            onChange={(e) => handleInputChange("otherExpenses", e.target.value)}
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
