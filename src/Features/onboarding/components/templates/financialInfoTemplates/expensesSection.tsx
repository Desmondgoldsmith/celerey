import React, { useState } from "react";
import { Modal } from "@/Features/onboarding/components/molecules/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ExpensesSectionProps {
  values: {
    home: string;
    childcare: string;
    education: string;
    healthcare: string;
    travel: string;
    giving: string;
  };
  onChange: (field: string, value: string) => void;
  onContinue: () => void;
  isComplete: boolean;
  isNextSectionComplete: boolean;
}

const ExpensesSection: React.FC<ExpensesSectionProps> = ({
  values,
  onChange,
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

  const isComplete =
    values &&
    values?.home !== "" &&
    values?.childcare !== "" &&
    values?.education !== "" &&
    values?.healthcare !== "" &&
    values?.travel !== "" &&
    values?.giving !== "";

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
            3
          </div>
          <h3 className="font-medium">Expenses</h3>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-blue-800 text-sm font-semibold"
        >
          {isComplete ? "Edit" : "Fill Details"}
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Whats your annual expenses?"
        description="Enter your annual expenses below."
        sectionTitle="Expenses"
        nextSectionTitle="Assets"
        isSectionComplete={isComplete}
        isNextSectionComplete={isNextSectionComplete}
      >
        <div className="space-y-2">
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Home</label>
            <Input
              type="text"
              inputMode="decimal"
              className="flex-1 appearance-none"
              value={formatCurrency(values?.home)}
              onChange={(e) => handleInputChange("home", e.target.value)}
            />
          </div>
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Childcare</label>
            <Input
              type="text"
              inputMode="decimal"
              className="flex-1 appearance-none"
              value={formatCurrency(values?.childcare)}
              onChange={(e) => handleInputChange("childcare", e.target.value)}
            />
          </div>
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Education</label>
            <Input
              type="text"
              inputMode="decimal"
              className="flex-1 appearance-none"
              value={formatCurrency(values?.education)}
              onChange={(e) => handleInputChange("education", e.target.value)}
            />
          </div>
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Healthcare</label>
            <Input
              type="text"
              inputMode="decimal"
              className="flex-1 appearance-none"
              value={formatCurrency(values?.healthcare)}
              onChange={(e) => handleInputChange("healthcare", e.target.value)}
            />
          </div>
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Travel</label>
            <Input
              type="text"
              inputMode="decimal"
              className="flex-1 appearance-none"
              value={formatCurrency(values?.travel)}
              onChange={(e) => handleInputChange("travel", e.target.value)}
            />
          </div>
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Giving</label>
            <Input
              type="text"
              inputMode="decimal"
              className="flex-1 appearance-none"
              value={formatCurrency(values?.giving)}
              onChange={(e) => handleInputChange("giving", e.target.value)}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export { ExpensesSection };
