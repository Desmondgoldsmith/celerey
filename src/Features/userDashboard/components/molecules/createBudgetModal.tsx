import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BudgetCategory {
  id: string;
  name: string;
  amount: number;
}

interface CreateBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateBudget: (
    budgetName: string,
    duration: string,
    categories: BudgetCategory[]
  ) => void;
}

const DURATION_OPTIONS = [
  { value: "3", label: "3 months" },
  { value: "6", label: "6 months" },
  { value: "12", label: "12 months" },
  { value: "18", label: "18 months" },
  { value: "24", label: "24 months" },
];

const CreateBudgetModal: React.FC<CreateBudgetModalProps> = ({
  isOpen,
  onClose,
  onCreateBudget,
}) => {
  const [budgetName, setBudgetName] = React.useState("");
  const [duration, setDuration] = React.useState("");
  const [categories, setCategories] = React.useState<BudgetCategory[]>([]);

  // Generate unique ID for categories
  const generateId = () =>
    `category-${Date.now()}-${Math.random().toString(36).slice(2)}`;

  // Add new category
  const addCategory = () => {
    setCategories((prev) => [
      ...prev,
      { id: generateId(), name: "", amount: 0 },
    ]);
  };

  // Update category name
  const updateCategory = (
    id: string,
    field: "name" | "amount",
    value: string
  ) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === id
          ? {
              ...category,
              [field]: field === "amount" ? parseFloat(value) || 0 : value,
            }
          : category
      )
    );
  };

  // Remove category
  const removeCategory = (id: string) => {
    setCategories((prev) => prev.filter((category) => category.id !== id));
  };

  // Handle form submission
  const handleSubmit = () => {
    onCreateBudget(budgetName, duration, categories);
    resetForm();
    onClose();
  };

  // Reset form
  const resetForm = () => {
    setBudgetName("");
    setDuration("");
    setCategories([]);
  };

  // Reset form when modal closes
  React.useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-cirka text-2xl text-center font-normal">
            Create Budget
          </DialogTitle>
          <p className="text-gray-600 text-sm text-center mt-2">
            Create your own budget
          </p>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Input
                value={budgetName}
                onChange={(e) => setBudgetName(e.target.value)}
                placeholder="Please Specify"
                className="w-full"
              />
            </div>

            {/* Budget Duration Select */}
            <div className="flex-1">
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="e.g 12 months" />
                </SelectTrigger>
                <SelectContent>
                  {DURATION_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {categories.map((category) => (
            <div key={category.id} className="flex items-center gap-4">
              <Input
                value={category.name}
                onChange={(e) =>
                  updateCategory(category.id, "name", e.target.value)
                }
                placeholder="Please Specify"
                className="flex-1"
              />
              <Input
                type="number"
                value={category.amount || ""}
                onChange={(e) =>
                  updateCategory(category.id, "amount", e.target.value)
                }
                placeholder="0.00"
                className="w-[150px] text-right"
              />
            </div>
          ))}

          {/* Add Category Button */}
          <button
            onClick={addCategory}
            className="text-navyLight text-sm hover:underline flex items-center gap-2"
          >
            + Add Additional Category(ies)
          </button>

          {/* Action Buttons */}
          <div className="flex gap-4">
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
              className="flex-1 bg-[#1B1856] hover:bg-[#1B1856]/90"
              onClick={handleSubmit}
              disabled={!duration || !budgetName}
            >
              Create Budget
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBudgetModal;
