import React, { useState } from "react";
import { Modal } from "@/Features/onboarding/components/molecules/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface EmergencyFundsSectionProps {
  values: {
    hasEmergencyFunds: string;
    emergencyFund: string;
  };
  onChange: (field: string, value: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

const EmergencyFundsSection: React.FC<EmergencyFundsSectionProps> = ({
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

  const isComplete = values.hasEmergencyFunds !== "" && (values.hasEmergencyFunds === "no" || values.emergencyFund !== "");

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Emergency Funds</h3>
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
        title="Emergency Funds Details"
        description="Please fill in your emergency funds details below."
      >
        <div className="space-y-2">
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Do you have emergency funds?</label>
            <div className="flex-1">
              <button
                className={`px-4 py-2 rounded-md font-medium ${
                  values.hasEmergencyFunds === "no"
                    ? "bg-navy text-white"
                    : "border border-gray-300"
                }`}
                onClick={() => onChange("hasEmergencyFunds", "no")}
              >
                No
              </button>
              <button
                className={`px-4 py-2 rounded-md font-medium ml-2 ${
                  values.hasEmergencyFunds === "yes"
                    ? "bg-navy text-white"
                    : "border border-gray-300"
                }`}
                onClick={() => onChange("hasEmergencyFunds", "yes")}
              >
                Yes
              </button>
            </div>
          </div>
          {values.hasEmergencyFunds === "yes" && (
            <div className="flex border-b border-gray-300 pb-2 items-center">
              <label className="flex-1">Emergency Fund Amount</label>
              <Input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                className="flex-1 appearance-none"
                value={values.emergencyFund || ""}
                onChange={(e) => handleInputChange("emergencyFund", e.target.value)}
              />
            </div>
          )}
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

export { EmergencyFundsSection };
