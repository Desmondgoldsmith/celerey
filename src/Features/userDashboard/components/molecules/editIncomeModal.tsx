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
import { IncomeItem } from "../../types";

interface EditIncomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (income: IncomeItem[]) => void;
  initialIncome?: IncomeItem[];
}

const defaultIncomeTypes: Omit<IncomeItem, "percentage">[] = [
  {
    category: "Rental Income",
    amount: 13252.13,
    color: "#1B1856",
  },
  {
    category: "Dividends",
    amount: 43693.52,
    color: "#8BA78D",
  },
  {
    category: "Interest Income",
    amount: 73953.05,
    color: "#E15B2D",
  },
  {
    category: "Other Income",
    amount: 85386.94,
    color: "#383396",
  },
];

const EditIncomeModal: React.FC<EditIncomeModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialIncome = defaultIncomeTypes,
}) => {
  const [incomeItems, setIncomeItems] = useState(initialIncome);
  const [showAdditionalField, setShowAdditionalField] = useState(false);
  const [newIncomeName, setNewIncomeName] = useState("");

  // Handle amount changes for existing income items
  const handleAmountChange = (category: string, value: string) => {
    const newIncome = incomeItems.map((item) =>
      item.category === category
        ? { ...item, amount: parseFloat(value) || 0 }
        : item
    );
    setIncomeItems(newIncome);
  };

  // Handle adding a new income source
  const handleAddIncome = () => {
    if (newIncomeName.trim()) {
      const newIncome = {
        category: newIncomeName.trim(),
        amount: 0,
        percentage: 0, // Will be calculated on save
        color: "#" + Math.floor(Math.random() * 16777215).toString(16), // Generate random color
      };
      setIncomeItems([...incomeItems, newIncome]);
      setNewIncomeName("");
      setShowAdditionalField(false);
    }
  };

  // Calculate percentages and handle save
  const handleSave = () => {
    const totalIncome = incomeItems.reduce((sum, item) => sum + item.amount, 0);
    const updatedIncome = incomeItems.map((item) => ({
      ...item,
      percentage:
        totalIncome > 0 ? Math.round((item.amount / totalIncome) * 100) : 0,
    }));
    onSave(updatedIncome);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-cirka text-center mb-2">
            Edit Income
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Modify your income
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-4">
            {incomeItems.map((income) => (
              <div
                key={income.category}
                className="flex items-center justify-between gap-8"
              >
                <label className="text-base text-gray-700 min-w-[200px]">
                  {income.category}
                </label>
                <Input
                  type="number"
                  value={income.amount}
                  onChange={(e) =>
                    handleAmountChange(income.category, e.target.value)
                  }
                  className="w-[200px] text-right"
                />
              </div>
            ))}

            {/* Add Additional Income Field */}
            {showAdditionalField ? (
              <div className="flex items-center justify-between gap-8">
                <Input
                  type="text"
                  placeholder="Please Specify"
                  value={newIncomeName}
                  onChange={(e) => setNewIncomeName(e.target.value)}
                  className="min-w-[200px]"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleAddIncome();
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
                Add Additional Income
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

export default EditIncomeModal;
