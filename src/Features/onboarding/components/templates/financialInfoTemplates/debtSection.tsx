import React, { useState } from "react";
import { Modal } from "@/Features/onboarding/components/molecules/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DebtSectionProps {
  values: {
    hasDebt: string;
    debt: string;
  };
  onChange: (field: string, value: string) => void;
}

const DebtSection: React.FC<DebtSectionProps> = ({ values, onChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    if (/^\d*$/.test(value)) {
      onChange(field, value);
    }
  };

  const isComplete =
    values.hasDebt !== "" && (values.hasDebt === "no" || values.debt !== "");

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Debt</h3>
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
        title="Debt Details"
        description="Please fill in your debt details below."
      >
        <div className="space-y-2">
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Do you have debt?</label>
            <div className="flex-1 flex gap-4">
              <button
                className={`px-4 py-2 rounded-md font-medium ${
                  values.hasDebt === "no"
                    ? "bg-navy text-white"
                    : "border border-gray-300"
                }`}
                onClick={() => onChange("hasDebt", "no")}
              >
                No
              </button>
              <button
                className={`px-4 py-2 rounded-md font-medium ${
                  values.hasDebt === "yes"
                    ? "bg-navy text-white"
                    : "border border-gray-300"
                }`}
                onClick={() => onChange("hasDebt", "yes")}
              >
                Yes
              </button>
            </div>
          </div>
          {values.hasDebt === "yes" && (
            <div className="flex border-b border-gray-300 pb-2 items-center">
              <label className="flex-1">Debt Amount</label>
              <Input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                className="flex-1 appearance-none"
                value={values.debt || ""}
                onChange={(e) => handleInputChange("debt", e.target.value)}
              />
            </div>
          )}
        </div>
        <div className="flex gap-4 mt-4">
          <Button
            variant="outline"
            onClick={() => setIsModalOpen(false)}
            className="flex-1"
          >
            Back
          </Button>
          <Button
            onClick={() => setIsModalOpen(false)}
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

export { DebtSection };
