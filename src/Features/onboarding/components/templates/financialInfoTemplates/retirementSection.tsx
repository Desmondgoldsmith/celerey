import React, { useState } from "react";
import { Modal } from "@/Features/onboarding/components/molecules/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface RetirementSectionProps {
  values: {
    retirementAge: string;
    targetRetirementIncome: string;
  };
  onChange: (field: string, value: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

const RetirementSection: React.FC<RetirementSectionProps> = ({
  values,
  onChange,
  onBack,
  onContinue,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    if (/^\d*$/.test(value)) {
      onChange(field, value);
    }
  };

  const isComplete =
    values.retirementAge !== "" && values.targetRetirementIncome !== "";

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Retirement</h3>
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
        title="Retirement Details"
        description="Please fill in your retirement details below."
      >
        <div className="space-y-2">
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Retirement Age</label>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="flex-1 appearance-none"
              value={values.retirementAge || ""}
              onChange={(e) => handleInputChange("retirementAge", e.target.value)}
            />
          </div>
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Target Retirement Income</label>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="flex-1 appearance-none"
              value={values.targetRetirementIncome || ""}
              onChange={(e) => handleInputChange("targetRetirementIncome", e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <Button variant="outline" onClick={onBack} className="flex-1">
            Back
          </Button>
          <Button
            onClick={() => {
              setIsModalOpen(false);
              onContinue();
            }}
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

export { RetirementSection };