import { Button } from "@/components/ui/button";
import { Option } from "../../../types";
import { GoalsOptionsScreenProps } from "../../../types";
import { OptionCard } from "../../molecules/goalsOptionCard";

const OPTIONS: Option[] = [
  {
    id: "retirement",
    title: "Retirement,",
    description: "Savings for retirement",
  },
  {
    id: "debt",
    title: "Debt,",
    description: "Paying off debt",
  },
  {
    id: "mortgage",
    title: "Mortgage,",
    description: "Buying a home",
  },
  {
    id: "emergency Fund",
    title: "Emergency Fund,",
    description: "Creating an emergency fund",
  },
  {
    id: "other",
    title: "Other",
    description: "",
  },

];

export const FinancialGoalScreen: React.FC<GoalsOptionsScreenProps> = ({
  value,
  onChange,
  onBack,
  onContinue,
}) => {
  const handleOptionSelect = (optionId: string) => {
    onChange(optionId);
  };

  return (
    <div className="text-center max-w-xl mx-auto">
      <h1 className="text-4xl font-cirka mb-4">
        What is your primary financial goal right now?
      </h1>
      <p>
        Select primary financial goal
      </p>
      <div className="space-y-4 mb-8">
        {OPTIONS.map((option) => (
          <OptionCard
            key={option.id}
            title={option.title}
            description={option.description}
            selected={value === option.id}
            onClick={() => handleOptionSelect(option.id)}
          />
        ))}
      </div>

      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          onClick={onContinue}
          className="flex-1 bg-navy hover:bg-navyLight text-white"
          disabled={!value}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
