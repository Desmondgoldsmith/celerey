import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { LiabilityItem } from "../../types";

interface EditLiabilitiesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (liabilities: LiabilityItem[]) => void;
  initialLiabilities?: LiabilityItem[];
}

const defaultLiabilityTypes: LiabilityItem[] = [
  {
    category: "Mortgages",
    amount: 33472.81,
    percentage: 31,
    color: "#8BA78D",
  },
  {
    category: "Loans",
    amount: 25353.94,
    percentage: 23,
    color: "#383396",
  },
  {
    category: "Credit Cards",
    amount: 23253.43,
    percentage: 20,
    color: "#E15B2D",
  },
  {
    category: "Asset Finance",
    amount: 19343.65,
    percentage: 16,
    color: "#1B1856",
  },
  {
    category: "Other Liabilities",
    amount: 14353.89,
    percentage: 10,
    color: "#6B7280",
  },
];

const EditLiabilitiesModal: React.FC<EditLiabilitiesModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialLiabilities = defaultLiabilityTypes,
}) => {
  const [liabilityItems, setLiabilityItems] = useState(initialLiabilities);
  const [showAdditionalField, setShowAdditionalField] = useState(false);
  const [newLiabilityName, setNewLiabilityName] = useState("");

  // Handle amount changes for existing liability items
  const handleAmountChange = (category: string, value: string) => {
    const newLiabilities = liabilityItems.map((item) =>
      item.category === category
        ? { ...item, amount: parseFloat(value) || 0 }
        : item
    );
    setLiabilityItems(newLiabilities);
  };

  // Handle adding a new liability source
  const handleAddLiability = () => {
    if (newLiabilityName.trim()) {
      const newLiability: LiabilityItem = {
        category: newLiabilityName.trim(),
        amount: 0,
        percentage: 0, // Will be calculated on save
        color: "#" + Math.floor(Math.random() * 16777215).toString(16), // Generate random color
      };
      setLiabilityItems([...liabilityItems, newLiability]);
      setNewLiabilityName("");
      setShowAdditionalField(false);
    }
  };

  // Calculate percentages and handle save
  const handleSave = () => {
    const totalLiabilities = liabilityItems.reduce(
      (sum, item) => sum + item.amount,
      0
    );
    const updatedLiabilities = liabilityItems.map((item) => ({
      ...item,
      percentage:
        totalLiabilities > 0
          ? Math.round((item.amount / totalLiabilities) * 100)
          : 0,
    }));
    onSave(updatedLiabilities);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-cirka text-center mb-2">
            Edit Liabilities
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Modify your liability categories and amounts
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-4">
            {liabilityItems.map((liability) => (
              <div
                key={liability.category}
                className="flex items-center justify-between gap-8"
              >
                <label className="text-base text-gray-700 min-w-[200px]">
                  {liability.category}
                </label>
                <Input
                  type="number"
                  value={liability.amount}
                  onChange={(e) =>
                    handleAmountChange(liability.category, e.target.value)
                  }
                  className="w-[200px] text-right"
                />
              </div>
            ))}

            {/* Add Additional Liability Field */}
            {showAdditionalField ? (
              <div className="flex items-center justify-between gap-8">
                <Input
                  type="text"
                  placeholder="Please Specify Liability"
                  value={newLiabilityName}
                  onChange={(e) => setNewLiabilityName(e.target.value)}
                  className="min-w-[200px]"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleAddLiability();
                    }
                  }}
                />
                <Input
                  type="number"
                  placeholder="0.00"
                  className="w-[200px] text-right"
                />
              </div>
            ) : (
              <button
                onClick={() => setShowAdditionalField(true)}
                className="text-navyLight text-sm flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Additional Liability
              </button>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between gap-4 mt-4">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={onClose}
          >
            Back
          </Button>
          <Button
            type="button"
            className="flex-1 bg-navy hover:bg-navyLight"
            onClick={handleSave}
          >
            Modify
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditLiabilitiesModal;
