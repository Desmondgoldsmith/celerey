import React, { useState, useEffect } from "react";
import { Modal } from "@/Features/onboarding/components/molecules/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type EmergencyFundsDataType = {
  emergencyFund: {
    targetMonths?: string;
  };
};

interface EmergencyFundsSectionProps {
  onChange: (field: string, value: string) => void;
  isComplete?: boolean;
  isNextSectionComplete?: boolean;
  values: any;
}

const EmergencyFundsSection: React.FC<EmergencyFundsSectionProps> = ({
  onChange,
  isNextSectionComplete,
  values,
}) => {
  const currentEmergencyMonths = values.emergencyFundAmount || "0";

  const [inputValue, setInputValue] = useState<EmergencyFundsDataType>({
    emergencyFund: {
      targetMonths: values.targetMonths || "",
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetMonthsValid, setTargetMonthsValid] = useState(true);

  useEffect(() => {
    if (inputValue.emergencyFund?.targetMonths !== undefined) {
      setTargetMonthsValid(/^\d*$/.test(inputValue.emergencyFund.targetMonths));
    }
  }, [inputValue.emergencyFund?.targetMonths]);

  useEffect(() => {
    if (isModalOpen && values.targetMonths) {
      setInputValue({
        emergencyFund: {
          targetMonths: values.targetMonths,
        },
      });
    }
  }, [isModalOpen]);

  const handleTargetMonthsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetMonthsValue = e.target.value;
    if (/^\d*$/.test(targetMonthsValue)) {
      const updatedValue = {
        ...inputValue,
        emergencyFund: {
          targetMonths: targetMonthsValue,
        },
      };
      setInputValue(updatedValue);
      onChange("targetMonths", updatedValue.emergencyFund.targetMonths);
    }
  };

  const isComplete =
    inputValue.emergencyFund?.targetMonths !== "" && targetMonthsValid;

  return (
    <div className="text-center max-w-xl mx-auto px-6 py-6 bg-white shadow-lg rounded-2xl">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-3 mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center justify-center w-8 h-8 text-sm font-semibold rounded-full transition-all
              ${
                isComplete
                  ? "bg-blue-900 text-white"
                  : "bg-white border-blue-900 border text-blue-900"
              }`}
          >
            2
          </div>
          <h3 className="font-medium text-lg text-gray-800">Emergency Funds</h3>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-blue-700 text-sm font-semibold hover:underline"
        >
          {isComplete ? "Edit" : "Fill Details"}
        </button>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Emergency Funds"
        description="How many months of living expenses do you want to save for emergencies?"
        sectionTitle="Emergency Funds"
        nextSectionTitle="Retirement"
        isSectionComplete={isComplete}
        isNextSectionComplete={isNextSectionComplete}
      >
        <div className="space-y-6">
          <p className="text-gray-900">
            Based on your expenses and savings, you currently have approximately
            <span className="text-navyLight font-semibold"> 5 months</span> of
            emergency funds.
          </p>
          <p className="text-sm text-gray-700">
            We recommend saving at least <strong>6 to 12 months</strong> of
            living expenses for emergencies.
          </p>

          {/* Input Field */}
          <div className="flex flex-col gap-2 border-b pb-4">
            <label className="text-gray-700 font-medium">
              Target Duration (Months)
            </label>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="appearance-none px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              value={inputValue.emergencyFund?.targetMonths || ""}
              onChange={handleTargetMonthsChange}
            />
          </div>

        </div>
      </Modal>
    </div>
  );
};

export { EmergencyFundsSection };
