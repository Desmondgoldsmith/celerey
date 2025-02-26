import React, { useState, useEffect } from "react";
import { Modal } from "@/Features/onboarding/components/molecules/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PassiveIncomeSectionProps {
  values: {
    rentalIncome: string;
    dividends: string;
    interestIncome: string;
    otherIncome: string;
  };
  onChange: (field: string, value: string) => void;
  onContinue: () => void;
  isComplete: boolean;
  isNextSectionComplete: boolean;
}

const PassiveIncomeSection: React.FC<PassiveIncomeSectionProps> = ({
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
            2
          </div>

          <h3 className="font-medium">Passive Income</h3>
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
        title="What is your annual passive income?"
        description="Enter your annual passive income details below."
        sectionTitle="Passive Income"
        nextSectionTitle="Annual Expenses"
        isSectionComplete={isComplete}
        isNextSectionComplete={isNextSectionComplete}
      >
        <div className="space-y-2">
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Rental Income</label>
            <Input
              type="text"
              inputMode="decimal"
              className="flex-1 appearance-none"
              value={formatCurrency(values?.rentalIncome)}
              onChange={(e) =>
                handleInputChange("rentalIncome", e.target.value)
              }
            />
          </div>
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Dividends</label>
            <Input
              type="text"
              inputMode="decimal"
              className="flex-1 appearance-none"
              value={formatCurrency(values?.dividends)}
              onChange={(e) => handleInputChange("dividends", e.target.value)}
            />
          </div>
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Interest Income</label>
            <Input
              type="text"
              inputMode="decimal"
              className="flex-1 appearance-none"
              value={formatCurrency(values?.interestIncome)}
              onChange={(e) =>
                handleInputChange("interestIncome", e.target.value)
              }
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
      </Modal>
    </div>
  );
};

export { PassiveIncomeSection };
