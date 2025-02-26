import React, { useState } from "react";
import { Modal } from "@/Features/onboarding/components/molecules/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface LiabilitiesSectionProps {
  values: {
    mortgages: string;
    loans: string;
    creditCards: string;
    assetFinance: string;
    otherLiabilities: string;
  };
  onChange: (field: string, value: string) => void;
  onContinue: () => void;
  isComplete: boolean;
  isAssetsComplete: boolean;
}

const LiabilitiesSection: React.FC<LiabilitiesSectionProps> = ({
  values,
  onChange,
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
    values?.mortgages !== "" &&
    values?.loans !== "" &&
    values?.creditCards !== "" &&
    values?.assetFinance !== "" &&
    values?.otherLiabilities !== "";

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
            5
          </div>
          <h3 className="font-medium">Liabilities</h3>
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
        title="What are your liabilities?"
        description="Enter your liabilities"
        sectionTitle="Liabilities"
        isSectionComplete={isComplete}
      >
        <div className="space-y-2">
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Mortgages</label>
            <Input
              type="text"
              inputMode="decimal"
              className="flex-1 appearance-none"
              value={formatCurrency(values?.mortgages)}
              onChange={(e) => handleInputChange("mortgages", e.target.value)}
            />
          </div>
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Loans</label>
            <Input
              type="text"
              inputMode="decimal"
              className="flex-1 appearance-none"
              value={formatCurrency(values?.loans)}
              onChange={(e) => handleInputChange("loans", e.target.value)}
            />
          </div>
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Credit Cards</label>
            <Input
              type="text"
              inputMode="decimal"
              className="flex-1 appearance-none"
              value={formatCurrency(values?.creditCards)}
              onChange={(e) => handleInputChange("creditCards", e.target.value)}
            />
          </div>
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Asset Finance</label>
            <Input
              type="text"
              inputMode="decimal"
              className="flex-1 appearance-none"
              value={formatCurrency(values?.assetFinance)}
              onChange={(e) =>
                handleInputChange("assetFinance", e.target.value)
              }
            />
          </div>
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Other Liabilities</label>
            <Input
              type="text"
              inputMode="decimal"
              className="flex-1 appearance-none"
              value={formatCurrency(values?.otherLiabilities)}
              onChange={(e) =>
                handleInputChange("otherLiabilities", e.target.value)
              }
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export { LiabilitiesSection };
