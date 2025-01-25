import React, { useState, useEffect } from "react";
import { Modal } from "@/Features/onboarding/components/molecules/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface EmergencyFundsSectionProps {
  value: {
    hasEmergencyFunds?: string;
    emergencyFund?: string;
  };
  onChange: (value: EmergencyFundsSectionProps["value"]) => void;
}

const EmergencyFundsSection: React.FC<EmergencyFundsSectionProps> = ({
  value = { hasEmergencyFunds: undefined, emergencyFund: "" },
  onChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amountValid, setAmountValid] = useState(true);
const [emergencyFund, setEmergencyFund] = useState('');
  useEffect(() => {
    if (value.emergencyFund !== undefined) {
      setAmountValid(/^\d*$/.test(value.emergencyFund));
    }
  }, [value.emergencyFund]);

 const handleEmergencyFundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   const emergencyFundValue = e.target.value;

   if (/^\d*\.?\d*$/.test(emergencyFundValue)) {
     onChange({ ...value, emergencyFund: emergencyFundValue });
   }
 };

  const isComplete =
    emergencyFund !== undefined &&
    (emergencyFund === "no" ||
      (emergencyFund === "yes" &&
        value.emergencyFund !== "" &&
        amountValid));

  return (
    <div className="text-center max-w-xl mx-auto">
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
          <div className="flex border-b border-gray-300 pb-4 items-center">
            <label className="flex-1">Do you have emergency funds?</label>
            <div className="flex-1 flex gap-4">
              <button
                className={`px-4 py-2 rounded-md font-medium ${
                  emergencyFund === "no"
                    ? "bg-navy text-white"
                    : "border border-gray-300"
                }`}
                onClick={() =>{
                  console.log("Test")
                  onChange({
                    ...value,
                    hasEmergencyFunds: "no",
                    emergencyFund: "",
                  });
                  setEmergencyFund("no")
                }}
              >
                No
              </button>
              <button
                className={`px-4 py-2 rounded-md font-medium ${
                  emergencyFund === "yes"
                    ? "bg-navy text-white"
                    : "border border-gray-300"
                }`}
                onClick={() =>
                  {
                  console.log("Test")
                  onChange({ ...value, hasEmergencyFunds: "yes" });
                  setEmergencyFund("yes")
                }}
              >
                Yes
              </button>
            </div>
          </div>

          {/* Emergency Fund Amount */}
          {emergencyFund && emergencyFund === "yes" && (
            <div className="flex border-b border-gray-300 pb-4 items-center">
              <label className="flex-1">Months of living expenses saved</label>
              <Input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                className="flex-1 appearance-none"
                // value={value.emergencyFund || ""}
                onChange={handleEmergencyFundChange}
              />
            </div>
          )}

          {value.hasEmergencyFunds === "yes" &&
            value.emergencyFund &&
            !amountValid && (
              <p className="text-sm text-red-500 mt-1">
                Please enter a valid amount (e.g., 1234.56)
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
