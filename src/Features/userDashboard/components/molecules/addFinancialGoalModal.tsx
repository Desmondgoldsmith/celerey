import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  AddFinancialGoalModalProps,
  GoalFormData,
  FinancialPlan,
} from "../../types";

const AddFinancialGoalModal: React.FC<AddFinancialGoalModalProps> = ({
  isOpen,
  onClose,
  onAddGoal,
  initialData,
  isModifying = false,
}) => {
  const [formData, setFormData] = React.useState<GoalFormData>(() => ({
    name: initialData?.name || "",
    targetAmount: initialData?.targetAmount.toString() || "",
    currentAmount: initialData?.currentAmount.toString() || "",
    goalDuration: initialData?.goalDuration.toString() || "",
  }));

  // Update form data when initialData changes
  React.useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        targetAmount: initialData.targetAmount.toString(),
        currentAmount: initialData.currentAmount.toString(),
        goalDuration: initialData.goalDuration.toString(),
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const startDate = initialData?.durationStart
      ? new Date(initialData.durationStart)
      : new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + parseInt(formData.goalDuration));

    const newGoal: FinancialPlan = {
      name: formData.name,
      targetAmount: parseFloat(formData.targetAmount),
      currentAmount: parseFloat(formData.currentAmount),
      progress:
        (parseFloat(formData.currentAmount) /
          parseFloat(formData.targetAmount)) *
        100,
      durationStart: startDate.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
      durationEnd: endDate.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
      goalDuration: parseInt(formData.goalDuration),
      durationLeft: parseInt(formData.goalDuration),
    };

    onAddGoal(newGoal);
    onClose();
    // Reset form only if not modifying
    if (!isModifying) {
      setFormData({
        name: "",
        targetAmount: "",
        currentAmount: "",
        goalDuration: "",
      });
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0">
        <DialogHeader className="px-8 py-6 space-y-3">
          <DialogTitle className="text-3xl text-center font-cirka">
            {isModifying
              ? `Modify ${initialData?.name}`
              : "Add New Financial Goal"}
          </DialogTitle>
          <p className="text-gray-600 text-center">
            {isModifying
              ? `Update your ${initialData?.name.toLowerCase()} details`
              : "Enter your new financial goal"}
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-gray-900">Name of goal</label>
              <Input
                placeholder="e.g Saving towards a new car"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="rounded-lg border-gray-200"
                disabled={isModifying} // Disable name field when modifying
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-900">Goal target</label>
              <Input
                type="number"
                placeholder="e.g $140,000"
                value={formData.targetAmount}
                onChange={(e) =>
                  setFormData({ ...formData, targetAmount: e.target.value })
                }
                required
                className="rounded-lg border-gray-200"
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-900">Amount contributed</label>
              <Input
                type="number"
                placeholder="e.g $20,000"
                value={formData.currentAmount}
                onChange={(e) =>
                  setFormData({ ...formData, currentAmount: e.target.value })
                }
                required
                className="rounded-lg border-gray-200"
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-900">Deadline for goal</label>
              <Select
                value={formData.goalDuration}
                onValueChange={(value) =>
                  setFormData({ ...formData, goalDuration: value })
                }
              >
                <SelectTrigger className="rounded-lg border-gray-200">
                  <SelectValue placeholder="e.g 18 months" />
                </SelectTrigger>
                <SelectContent>
                  {[6, 12, 18, 24, 36].map((months) => (
                    <SelectItem key={months} value={months.toString()}>
                      {months} months
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-between gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 rounded-lg"
            >
              Back
            </Button>
            <Button
              type="submit"
              className="flex-1 rounded-lg bg-navy hover:bg-navyLight"
            >
              {isModifying ? "Save Changes" : "Add Goal"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddFinancialGoalModal;
