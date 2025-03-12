import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ASSESSMENT } from "../../constants";

interface FinancialKnowledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  calculatedFinancialKnowledge: string
}

interface GuidingPrinciple {
  title: string;
  description: string;
}

const FinancialKnowledgeModal: React.FC<FinancialKnowledgeModalProps> = ({
  isOpen,
  onClose,
  calculatedFinancialKnowledge
}) => {
  const guidingPrinciples: GuidingPrinciple[] = [
    {
      title: "Fundamental Analysis",
      description:
        "You already have a good understanding of how a lot of things work in the world of finance. We can help you to get even better at understanding what moves the markets.",
    },
    {
      title: "Financial Market Insights",
      description:
        "We know you are busy and we hate to waste your time so we will send you a brief summary about relevant",
    },
  ];

  const router = useRouter();
  const handleAdvisors = () => {
    router.push("/advisors");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-center text-3xl font-cirka text-navy font-normal">
            Financial Knowledge Report
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6">
          <div className="text-center mb-4">
            <h3 className="text-medium font-normal mb-2">
              Financial Knowledge Summary
            </h3>
            <p className="text-lg text-navy font-normal mb-4">{calculatedFinancialKnowledge}</p>

            <div className="w-40 h-40 mx-auto mb-4">
              <Image
                src="/assets/finiancial.svg"
                alt="Risk attitude illustration"
                width={80}
                height={80}
                className="w-full h-full"
              />
            </div>
          </div>
          <div className="relative pl-6 mb-6">
            <div className="absolute left-0 top-0 h-full w-1 bg-navy" />
            <p className="text-navy text-sm">
            {ASSESSMENT[calculatedFinancialKnowledge]}            
            </p>
          </div>

        </div>

        <DialogFooter className="px-6 py-4 border-t">
          <div className="flex justify-between gap-4 w-full sm:justify-center">
            <Button
              variant="outline"
              className="flex-1 sm:flex-none"
              onClick={onClose}
            >
              Back
            </Button>
            <Button
              onClick={handleAdvisors}
              className="flex-1 sm:flex-none bg-navy hover:bg-navyLight"
            >
              Talk With Advisor
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FinancialKnowledgeModal;
