import React, { useState, useEffect } from "react";
import { Modal } from "@/Features/onboarding/components/molecules/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ActiveIncomeSectionProps {
  values: {
    salary: string;
    bonuses: string;
    commissions: string;
    otherIncome: string;
  };
  onChange: (field: string, value: string) => void;
  onContinue: () => void;
  isComplete: boolean;
  isNextSectionComplete: boolean;
}

const ActiveIncomeSection: React.FC<ActiveIncomeSectionProps> = ({
  values,
  onChange,
  isComplete,
  isNextSectionComplete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatCurrency = (value: string) => {
    if (!value) return "";

    // Remove all non-numeric characters except for the decimal point
    let numericValue = value.replace(/[^0-9.]/g, "");

    // Ensure there is at most one decimal point
    const parts = numericValue.split(".");
    if (parts.length > 2) {
      numericValue = parts[0] + "." + parts.slice(1).join("");
    }

    // Format the integer part with commas
    let [integer, decimal] = numericValue.split(".");
    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Ensure two decimal places
    decimal = decimal ? decimal.slice(0, 2) : "";

    return decimal ? `${integer}.${decimal}` : integer;
  };

  const handleInputChange = (field: string, value: string) => {
    console.log(`Field: ${field}, Value: ${value}`);

    // Remove commas before updating state
    const rawValue = value.replace(/,/g, "");

    // Allow only valid numbers
    if (/^\d*\.?\d{0,2}$/.test(rawValue)) {
      onChange(field, rawValue);
    }
  };

  useEffect(() => {
    if (isComplete && isNextSectionComplete) {
    }
  }, [isComplete, isNextSectionComplete]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div
            className={`text-xs mr-2 flex items-center justify-center w-6 h-6 rounded-full ${
              isComplete
                ? "bg-blue-900 text-white"
                : "bg-white border-blue-900 border text-blue-900"
            }`}
          >
            1
          </div>

          <h3 className="font-medium">Active Income</h3>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-blue-900 text-sm font-semibold"
        >
          {isComplete ? "Edit" : "Fill Details"}
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="What is your annual active income?"
        description="Enter your annual active income details below."
        // sectionNumber={1}
        sectionTitle="Active Income"
        nextSectionTitle="Passive Income"
        isSectionComplete={isComplete}
        isNextSectionComplete={isNextSectionComplete}
      >
        <div className="space-y-2">
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Salary</label>
            <Input
              type="text"
              inputMode="decimal"
              className="flex-1 appearance-none"
              value={formatCurrency(values?.salary)}
              onChange={(e) => handleInputChange("salary", e.target.value)}
            />
          </div>
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Bonuses</label>
            <Input
              type="text"
              inputMode="decimal"
              className="flex-1 appearance-none"
              value={formatCurrency(values?.bonuses)}
              onChange={(e) => handleInputChange("bonuses", e.target.value)}
            />
          </div>
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Commissions</label>
            <Input
              type="text"
              inputMode="decimal"
              className="flex-1 appearance-none"
              value={formatCurrency(values?.commissions)}
              onChange={(e) => handleInputChange("commissions", e.target.value)}
            />
          </div>
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Other Income</label>
            <Input
              type="text"
              inputMode="decimal"
              className="flex-1 appearance-none"
              value={formatCurrency(values?.otherIncome)}
              onChange={(e) => handleInputChange("otherIncome", e.target.value)}
            />
          </div>
        </div>
        {/* <div className="flex gap-4 mt-4">
          <Button
            variant="outline"
            onClick={() => setIsModalOpen(false)}
            className="flex-1"
          >
            Back
          </Button>
          <Button
            onClick={() => setIsModalOpen(false)}
            className="flex-1 bg-navy hover:bg-navyLight text-white"
            disabled={!isComplete}
          >
            Continue
          </Button>
        </div> */}
      </Modal>
    </div>
  );
};

export { ActiveIncomeSection };
