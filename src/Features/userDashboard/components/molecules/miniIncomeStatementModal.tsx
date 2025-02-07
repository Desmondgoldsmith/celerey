import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MiniIncomeStatementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: (duration: string) => void;
}

const DURATION_OPTIONS = [
  { value: "3", label: "3 months" },
  { value: "6", label: "6 months" },
  { value: "12", label: "12 months" },
  { value: "18", label: "18 months" },
  { value: "24", label: "24 months" },
];

const MiniIncomeStatementModal: React.FC<MiniIncomeStatementModalProps> = ({
  isOpen,
  onClose,
  onDownload,
}) => {
  const [selectedDuration, setSelectedDuration] = React.useState<string>("");

  // Handle download action
  const handleDownload = () => {
    if (selectedDuration) {
      onDownload(selectedDuration);
      onClose();
    }
  };

  // Reset form when modal closes
  React.useEffect(() => {
    if (!isOpen) {
      setSelectedDuration("");
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-cirka text-2xl text-center font-normal">
            Generate Mini-Income Statement
          </DialogTitle>
          <p className="text-gray-600 text-sm text-center mt-2">
            Modify your saving goal
          </p>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="space-y-2">
            <label htmlFor="duration" className="text-sm text-gray-600">
              Duration for statement generation
            </label>
            <Select
              value={selectedDuration}
              onValueChange={setSelectedDuration}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="e.g 18 months" />
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
              onClick={handleDownload}
              disabled={!selectedDuration}
            >
              Download
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MiniIncomeStatementModal;
