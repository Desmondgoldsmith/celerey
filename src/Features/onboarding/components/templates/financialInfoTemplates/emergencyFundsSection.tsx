import React, { useState, useEffect } from "react";
import { Modal } from "@/Features/onboarding/components/molecules/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface EmergencyFundsSectionProps {
  value: {
    emergencyFund: {
      hasEmergencyFunds?: string;
      emergencyFundAmount?: string;
      targetMonths?: string;
    };
  };
  onChange: (value: EmergencyFundsSectionProps["value"]) => void;
}

const EmergencyFundsSection: React.FC<EmergencyFundsSectionProps> = ({
  onChange,
}) => {
  const [inputValue, setInputValue] = useState
  <EmergencyFundsSectionProps["value"]>
  ({
    emergencyFund: {
      hasEmergencyFunds: "",
      emergencyFundAmount: "",
      targetMonths: "",
    },
  });
  const [buttonState, setButtonState] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emergencyFundAmountValid, setEmergencyFundAmountValid] =
    useState(true);
  const [targetMonthsValid, setTargetMonthsValid] = useState(true);

  useEffect(() => {
    if (inputValue.emergencyFund?.emergencyFundAmount !== undefined) {
      setEmergencyFundAmountValid(
        /^\d*$/.test(inputValue.emergencyFund.emergencyFundAmount)
      );
    }
    if (inputValue.emergencyFund?.targetMonths !== undefined) {
      setTargetMonthsValid(/^\d*$/.test(inputValue.emergencyFund.targetMonths));
    }
  }, [
    inputValue.emergencyFund?.emergencyFundAmount,
    inputValue.emergencyFund?.targetMonths,
  ]);

  const handleEmergencyFundAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const emergencyFundAmountValue = e.target.value;
    if (/^\d*$/.test(emergencyFundAmountValue)) {
      handleChanges({
        ...inputValue,
        emergencyFund: {
          ...inputValue.emergencyFund,
          emergencyFundAmount: emergencyFundAmountValue,
        },
      });
    }
  };

  const handleTargetMonthsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetMonthsValue = e.target.value;
    if (/^\d*$/.test(targetMonthsValue)) {
      handleChanges({
        ...inputValue,
        emergencyFund: {
          ...inputValue.emergencyFund,
          targetMonths: targetMonthsValue,
        },
      });
    }
  };

  const handleChanges = (value: any) => {
    setInputValue(value);
    onChange(value);
  };

  const isComplete =
    inputValue.emergencyFund?.hasEmergencyFunds !== undefined &&
    (inputValue.emergencyFund?.hasEmergencyFunds === "no" ||
      (inputValue.emergencyFund?.hasEmergencyFunds === "yes" &&
        inputValue.emergencyFund?.emergencyFundAmount !== "" &&
        inputValue.emergencyFund?.targetMonths !== "" &&
        emergencyFundAmountValid &&
        targetMonthsValid));

  return (
    <div className="text-center max-w-xl mx-auto">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div
            className={`mr-2 flex items-center justify-center w-6 h-6 rounded-full ${
              isComplete
                ? "bg-blue-900 text-white"
                : "bg-white border-blue-900 border text-blue-900"
            }`}
          >
            2
          </div>
          <h3 className="font-medium">Emergency Funds</h3>
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
        title="What are your emergency fund details?"
        description="Enter your emergency fund details below."
      >
        <div className="space-y-4">
          <div className="flex flex-col border-gray-300 pb-4 items-center">
            <label className="flex-1 text-center pb-3">
              Have you saved up to cover some living expenses for a duration?
            </label>
            <div className="flex-1 w-2/3 flex gap-4">
              <Button
                variant={"outline"}
                className={`flex-1 px-4 py-2 rounded-md font-medium ${
                  buttonState === "no"
                    ? "bg-navy text-white"
                    : "border border-gray-300"
                }`}
                onClick={() => {
                  setButtonState("no");
                  handleChanges({
                    ...inputValue,
                    emergencyFund: {
                      hasEmergencyFunds: "no",
                      emergencyFundAmount: "",
                      targetMonths: "",
                    },
                  });
                }}
              >
                No
              </Button>
              <Button
                variant={"outline"}
                className={`flex-1 px-4 py-2 rounded-md font-medium ${
                  buttonState === "yes"
                    ? "bg-navy text-white"
                    : "border border-gray-300"
                }`}
                onClick={() => {
                  setButtonState("yes");
                  handleChanges({
                    ...inputValue,
                    emergencyFund: {
                      ...inputValue.emergencyFund,
                      hasEmergencyFunds: "yes",
                      emergencyFundAmount:
                        inputValue.emergencyFund?.emergencyFundAmount || "",
                      targetMonths:
                        inputValue.emergencyFund?.targetMonths || "",
                    },
                  });
                }}
              >
                Yes
              </Button>
            </div>
          </div>

          {/* Emergency Fund Amount */}
          {buttonState === "yes" && (
            <div className="flex border-b border-gray-300 pb-4 items-center">
              <label className="flex-1">Emergency Fund Amount</label>
              <Input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                className="flex-1 appearance-none"
                value={(() => {
                  console.log(
                    "Emergency Input Value: ",
                    inputValue.emergencyFund?.emergencyFundAmount
                  );
                  return inputValue.emergencyFund?.emergencyFundAmount || "";
                })()}
                onChange={handleEmergencyFundAmountChange}
              />
            </div>
          )}

          {/* Target Months */}
          {buttonState === "yes" && (
            <div className="flex border-b border-gray-300 pb-4 items-center">
              <label className="flex-1">Target Duration (Months)</label>
              <Input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                className="flex-1 appearance-none"
                value={inputValue.emergencyFund?.targetMonths || ""}
                onChange={handleTargetMonthsChange}
              />
            </div>
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
