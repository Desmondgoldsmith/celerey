import { Button } from "@/components/ui/button";
import { Option } from "@/Features/onboarding/types";
import { RiskOptionsScreenProps } from "@/Features/onboarding/types";
import { OptionCard } from "@/Features/onboarding/components/molecules/riskOptionCard";

const OPTIONS: Option[] = [
  {
    id: 0,
    key: "opportunity",
    title: "I see it as an opportunity.",
    description: "",
  },
  {
    id: 1,
    key: "wait-recovery",
    title: "I’ll wait for recovery.",
    description: "",
  },
  {
    id: 2,
    key: "reduce-risk",
    title: "I’ll reduce my risk.",
    description: "",
  },
  {
    id: 3,
    key: "no-losses",
    title: "I don’t want any losses.",
    description: "",
  },
];

export const MarketReactionScreen: React.FC<RiskOptionsScreenProps> = ({
  value,
  onChange,
  onBack,
  onContinue,
  enableBack = true,
}) => {
  const handleOptionSelect = (option: any) => {
    onChange(option);
  };

  return (
    <div className="text-center max-w-xl mx-auto">
      <h1 className="text-4xl font-cirka mb-4">
        If your investments drop suddenly, what would you do?
      </h1>
      <div className="space-y-4 mb-8">
        {OPTIONS.map((option) => (
          <OptionCard
            key={option.id}
            title={option.title}
            description={option.description}
            selected={value?.key === option.key} // Add optional chaining to avoid errors
            onClick={() => handleOptionSelect(option)}
          />
        ))}
      </div>

      <div className="flex gap-4">
        {enableBack && (
          <Button variant="outline" onClick={onBack} className="flex-1">
            Back
          </Button>
        )}
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
