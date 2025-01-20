
import { Button } from "@/components/ui/button";
// import { useEffect, useState } from "react";
import { OptionCard } from "../../molecules/goalsOptionCard";

interface InvestmentScreenProps {
  value: {
    hasInvestments?: string;
    investmentType?: string;
  };
  onChange: (value: InvestmentScreenProps["value"]) => void;
  onBack: () => void;
  onContinue: () => void;
}

const INVESTMENT_OPTIONS = [
  { id: "stocks", title: "Stocks", description: "Investing in stocks" },
  { id: "bonds", title: "Bonds", description: "Investing in bonds" },
  { id: "realEstate", title: "Real Estate", description: "Investing in real estate" },
  { id: "mutualFunds", title: "Mutual Funds", description: "Investing in mutual funds" },
  { id: "other", title: "Other", description: "Other types of investments" },
];

export const InvestmentScreen: React.FC<InvestmentScreenProps> = ({
  value,
  onChange,
  onBack,
  onContinue,
}) => {
  const handleOptionSelect = (optionId: string) => {
    onChange({ ...value, investmentType: optionId });
  };

  const handleHasInvestmentsChange = (hasInvestments: string) => {
    onChange({ ...value, hasInvestments });
  };

  return (
    <div className="text-center max-w-xl mx-auto">
      <h1 className="text-4xl font-cirka mb-4">Do you have any investments?</h1>
      <div className="space-y-4 mb-8">
        <OptionCard
          title="Yes"
          description=""
          selected={value.hasInvestments === "yes"}
          onClick={() => handleHasInvestmentsChange("yes")}
        />
        <OptionCard
          title="No"
          description=""
          selected={value.hasInvestments === "no"}
          onClick={() => handleHasInvestmentsChange("no")}
        />
      </div>

      {value.hasInvestments === "yes" && (
        <div className="space-y-4 mb-8">
          <h2 className="text-2xl font-cirka mb-4">What type of investments do you have?</h2>
          {INVESTMENT_OPTIONS.map((option) => (
            <OptionCard
              key={option.id}
              title={option.title}
              description={option.description}
              selected={value.investmentType === option.id}
              onClick={() => handleOptionSelect(option.id)}
            />
          ))}
        </div>
      )}

      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          onClick={onContinue}
          className="flex-1 bg-navy hover:bg-navyLight text-white"
          disabled={value.hasInvestments === "yes" && !value.investmentType}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
