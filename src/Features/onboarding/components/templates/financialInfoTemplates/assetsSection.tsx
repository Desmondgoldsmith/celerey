import React, { useState } from "react";
import { Modal } from "@/Features/onboarding/components/molecules/modal";
import { Input } from "@/components/ui/input";

interface AssetsSectionProps {
  values: {
    realEstate: string;
    cash: string;
    publicSecurities: string;
    privateSecurities: string;
  };
  onChange: (field: string, value: string) => void;
}

const AssetsSection: React.FC<AssetsSectionProps> = ({ values, onChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    if (/^\d*$/.test(value)) {
      onChange(field, value);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Assets</h3>
        <button onClick={() => setIsModalOpen(true)} className="text-blue-500">
          Fill Details
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Assets Details"
      >
        <div className="space-y-4">
          <div className="flex border-b border-gray-300 pb-4 items-center">
            <label className="flex-1">Real Estate</label>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="flex-1 appearance-none"
              value={values.realEstate || ""}
              onChange={(e) => handleInputChange("realEstate", e.target.value)}
            />
          </div>
          <div className="flex border-b border-gray-300 pb-4 items-center">
            <label className="flex-1">Cash</label>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="flex-1 appearance-none"
              value={values.cash || ""}
              onChange={(e) => handleInputChange("cash", e.target.value)}
            />
          </div>
          <div className="flex border-b border-gray-300 pb-4 items-center">
            <label className="flex-1">Public Securities</label>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="flex-1 appearance-none"
              value={values.publicSecurities || ""}
              onChange={(e) =>
                handleInputChange("publicSecurities", e.target.value)
              }
            />
          </div>
          <div className="flex border-b border-gray-300 pb-4 items-center">
            <label className="flex-1">Private Securities</label>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="flex-1 appearance-none"
              value={values.privateSecurities || ""}
              onChange={(e) =>
                handleInputChange("privateSecurities", e.target.value)
              }
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export { AssetsSection };
