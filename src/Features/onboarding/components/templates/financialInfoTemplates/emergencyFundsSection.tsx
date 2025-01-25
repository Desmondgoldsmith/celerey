import React, { useState, useEffect } from "react";
import { Modal } from "@/Features/onboarding/components/molecules/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface EmergencyFundsSectionProps {
  values: {
    hasEmergencyFunds?: string;
    emergencyFund?: string;
  };
  onChange: (field: string, value: string) => void;
}

const EmergencyFundsSection: React.FC<EmergencyFundsSectionProps> = ({
  values,
  onChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amountValid, setAmountValid] = useState(true);

  useEffect(() => {
    if (values.emergencyFund !== undefined) {
      setAmountValid(/^\d*$/.test(values.emergencyFund));
    }
  }, [values.emergencyFund]);

  const handleInputChange = (field: string, value: string) => {
    if (field === "emergencyFund" && !/^\d*$/.test(value)) {
      setAmountValid(false);
      return;
    }
    onChange(field, value);
  };

  const isComplete =
    values.hasEmergencyFunds !== undefined &&
    (values.hasEmergencyFunds === "no" ||
      (values.hasEmergencyFunds === "yes" &&
        values.emergencyFund !== "" &&
        amountValid));

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
        <div className="space-y-4">
          {/* Emergency Fund Question */}
          <div className="flex border-b border-gray-300 pb-4 items-center">
            <label className="flex-1">Do you have emergency funds?</label>
            <div className="flex-1 flex gap-4">
              <button
                className={`px-4 py-2 rounded-md font-medium ${
                  values.hasEmergencyFunds === "no"
                    ? "bg-navy text-white"
                    : "border border-gray-300"
                }`}
                onClick={() => handleInputChange("hasEmergencyFunds", "no")}
              >
                No
              </button>
              <button
                className={`px-4 py-2 rounded-md font-medium ${
                  values.hasEmergencyFunds === "yes"
                    ? "bg-navy text-white"
                    : "border border-gray-300"
                }`}
                onClick={() => handleInputChange("hasEmergencyFunds", "yes")}
              >
                Yes
              </button>
            </div>
          </div>

          {/* Emergency Fund Amount */}
          {values.hasEmergencyFunds === "yes" && (
            <div className="flex border-b border-gray-300 pb-4 items-center">
              <label className="flex-1">Emergency Fund Amount</label>
              <Input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                className="flex-1 appearance-none"
                value={values.emergencyFund || ""}
                onChange={(e) =>
                  handleInputChange("emergencyFund", e.target.value)
                }
              />
            </div>
          )}

          {/* Error Message */}
          {values.hasEmergencyFunds === "yes" &&
            values.emergencyFund &&
            !amountValid && (
              <p className="text-sm text-red-500">
                Please enter a valid amount (numbers only).
              </p>
            )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-4">
          <Button
            variant="outline"
            onClick={() => {
              setIsModalOpen(false);
            }}
            className="flex-1"
          >
            Back
          </Button>
          <Button
            onClick={() => {
              setIsModalOpen(false);
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
