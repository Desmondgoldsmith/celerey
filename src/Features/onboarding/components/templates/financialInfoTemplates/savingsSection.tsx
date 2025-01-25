import React, { useState } from "react";
import { Modal } from "@/Features/onboarding/components/molecules/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SavingsSectionProps {
  values: {
    currentSavings: string;
    targetSavings: string;
  };
  onChange: (field: string, value: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

const SavingsSection: React.FC<SavingsSectionProps> = ({ values, onChange, onBack, onContinue }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    if (/^\d*$/.test(value)) {
      onChange(field, value);
    }
  };

  const isComplete =
    values.currentSavings !== "" &&
    values.targetSavings !== "";

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Savings</h3>
        <button onClick={() => setIsModalOpen(true)} className="text-blue-800 text-sm font-semibold">
          {isComplete ? "Edit" : "Fill Details"}
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Savings Details"
        description="Please fill in your savings details below."
      >
        <div className="space-y-2">
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Current Savings</label>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="flex-1 appearance-none"
              value={values.currentSavings || ""}
              onChange={(e) => handleInputChange("currentSavings", e.target.value)}
            />
          </div>
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Target Savings</label>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="flex-1 appearance-none"
              value={values.targetSavings || ""}
              onChange={(e) => handleInputChange("targetSavings", e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <Button variant="outline" onClick={onBack} className="flex-1">
            Back
          </Button>
          <Button
            onClick={() => { setIsModalOpen(false); onContinue(); }}
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

export { SavingsSection };