import React, { useState, useEffect } from "react";
import { Modal } from "@/Features/onboarding/components/molecules/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DebtSectionProps {
  values: {
    debt?: {
      hasDebt?: string;
      debtAmount?: string;
    };
  };
  onChange: (value: DebtSectionProps["values"]) => void;
}

const DebtSection: React.FC<DebtSectionProps> = ({ values, onChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amountValid, setAmountValid] = useState(true);
  const [hasDebt, setHasDebt] = useState("");

  useEffect(() => {
    if (values?.debt?.debtAmount !== undefined) {
      setAmountValid(/^\d*$/.test(values.debt.debtAmount));
    }
  }, [values.debt?.debtAmount]);

  const handleDebtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const debtValue = e.target.value;

    if (/^\d*\.?\d*$/.test(debtValue)) {
      onChange({ ...values, debt: { ...values.debt, debtAmount: debtValue } });
    }
  };

  const isComplete =
    values.debt?.hasDebt !== undefined &&
    (values.debt.hasDebt === "no" ||
      (values.debt.hasDebt === "yes" &&
        values.debt.debtAmount !== "" &&
        amountValid));

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
            3
          </div>
          <h3 className="font-medium">Debt</h3>
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
        title="Debt Details"
        description="Please fill in your debt details below."
      >
        <div className="space-y-4">
          <div className="flex border-b border-gray-300 pb-4 items-center">
            <label className="flex-1">Do you have debt?</label>
            <div className="flex-1 flex gap-4">
              <button
                className={`px-4 py-2 rounded-md font-medium ${
                  hasDebt === "no"
                    ? "bg-navy text-white"
                    : "border border-gray-300"
                }`}
                onClick={() => {
                  onChange({
                    ...values,
                    debt: { hasDebt: "no", debtAmount: "" },
                  });
                  setHasDebt("no");
                }}
              >
                No
              </button>
              <button
                className={`px-4 py-2 rounded-md font-medium ${
                  hasDebt === "yes"
                    ? "bg-navy text-white"
                    : "border border-gray-300"
                }`}
                onClick={() => {
                  onChange({
                    ...values,
                    debt: {
                      hasDebt: "yes",
                      debtAmount: values.debt?.debtAmount || "",
                    },
                  });
                  setHasDebt("yes");
                }}
              >
                Yes
              </button>
            </div>
          </div>

          {hasDebt && hasDebt === "yes" && (
            <div className="flex border-b border-gray-300 pb-4 items-center">
              <label className="flex-1">Debt Amount</label>
              <Input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                className="flex-1 appearance-none"
                onChange={handleDebtChange}
              />
            </div>
          )}
        </div>

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

export { DebtSection };
