import React from "react";
import { Card } from "@/components/ui/card";

interface FinancialKnowledgeAssessmentProps {
  onUpgradeClick: () => void;
}

export const FinancialKnowledgeAssessment: React.FC<
  FinancialKnowledgeAssessmentProps
> = ({ onUpgradeClick }) => {
  return (
    <Card className="p-6 bg-white rounded-lg shadow-sm md:h-[480px] flex flex-col">
      {/* Header Section */}
      <div className="flex justify-between items-center border-b border-[#AAAAAA] pb-2">
        <h2 className="text-xl font-cirka text-navy">Connect With Us</h2>
      </div>

      {/* Main Content Section - This takes up all available space and centers its children */}
      <div className="flex flex-col justify-center items-center flex-grow">
        <div className="text-center mb-8">
          <p className="text-lg font-helvatica text-gray-700">
            Your pathway to financial freedom begins here!
          </p>
        </div>

        <button
          onClick={onUpgradeClick}
          className="border-2 border-navy text-navy rounded-md py-2 px-4 font-medium text-md hover:bg-indigo-50 transition-colors"
        >
          Request Advisory Service
        </button>
      </div>
    </Card>
  );
};
