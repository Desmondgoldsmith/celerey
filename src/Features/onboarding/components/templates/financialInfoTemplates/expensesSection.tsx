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
  onBack: () => void;
  onContinue: () => void;
}

const ExpensesSection: React.FC<ExpensesSectionProps> = ({ values, onChange, onBack, onContinue }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    if (/^\d*$/.test(value)) {
      onChange(field, value);
    }
  };

  const isComplete =
    values.home !== "" &&
    values.childcare !== "" &&
    values.education !== "" &&
    values.healthcare !== "" &&
    values.travel !== "" &&
    values.giving !== "";

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Expenses</h3>
        <button onClick={() => setIsModalOpen(true)} className="text-blue-500">
          Fill Details
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Expenses Details"
        description="Please fill in your expenses details below."
      >
        <div className="space-y-4">
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
            <label className="flex-1">Childcare</label>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="flex-1 appearance-none"
              value={values.childcare || ""}
              onChange={(e) => handleInputChange("childcare", e.target.value)}
            />
          </div>
          <div className="flex border-b border-gray-300 pb-4 items-center">
            <label className="flex-1">Education</label>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="flex-1 appearance-none"
              value={values.education || ""}
              onChange={(e) => handleInputChange("education", e.target.value)}
            />
          </div>
          <div className="flex border-b border-gray-300 pb-4 items-center">
            <label className="flex-1">Healthcare</label>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="flex-1 appearance-none"
              value={values.healthcare || ""}
              onChange={(e) => handleInputChange("healthcare", e.target.value)}
            />
          </div>
          <div className="flex border-b border-gray-300 pb-4 items-center">
            <label className="flex-1">Travel</label>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="flex-1 appearance-none"
              value={values.travel || ""}
              onChange={(e) => handleInputChange("travel", e.target.value)}
            />
          </div>
          <div className="flex border-b border-gray-300 pb-4 items-center">
            <label className="flex-1">Giving</label>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="flex-1 appearance-none"
              value={values.giving || ""}
              onChange={(e) => handleInputChange("giving", e.target.value)}
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

export { ExpensesSection };
