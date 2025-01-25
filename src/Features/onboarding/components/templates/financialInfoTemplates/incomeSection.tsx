import React, { useState } from "react";
import { Modal } from "@/Features/onboarding/components/molecules/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface IncomeSectionProps {
  values: {
    rentalIncome: string;
    dividends: string;
    interestIncome: string;
    otherIncome: string;
  };
  onChange: (field: string, value: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

const IncomeSection: React.FC<IncomeSectionProps> = ({ values, onChange, onBack, onContinue }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    if (/^\d*$/.test(value)) {
      onChange(field, value);
    }
  };

  const isComplete =
    values.rentalIncome !== "" &&
    values.dividends !== "" &&
    values.interestIncome !== "" &&
    values.otherIncome !== "";

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Income</h3>
        <button onClick={() => setIsModalOpen(true)} className="text-blue-500">
          Fill Details
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Income Details"
        description="Please fill in your income details below."
      >
        <div className="space-y-2">
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Rental Income</label>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="flex-1 appearance-none"
              value={values.rentalIncome || ""}
              onChange={(e) => handleInputChange("rentalIncome", e.target.value)}
            />
          </div>
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Dividends</label>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="flex-1 appearance-none"
              value={values.dividends || ""}
              onChange={(e) => handleInputChange("dividends", e.target.value)}
            />
          </div>
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Interest Income</label>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="flex-1 appearance-none"
              value={values.interestIncome || ""}
              onChange={(e) => handleInputChange("interestIncome", e.target.value)}
            />
          </div>
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Other Income</label>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="flex-1 appearance-none"
              value={values.otherIncome || ""}
              onChange={(e) => handleInputChange("otherIncome", e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-4 mt-4">
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
      </Modal>
    </div>
  );
};

export { IncomeSection };