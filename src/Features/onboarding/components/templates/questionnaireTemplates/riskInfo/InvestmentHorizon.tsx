import { Button } from "@/components/ui/button";
import { Option } from "@/Features/onboarding/types";
import { RiskOptionsScreenProps } from "@/Features/onboarding/types";
import { OptionCard } from "@/Features/onboarding/components/molecules/riskOptionCard";

const OPTIONS: Option[] = [
  {
    id: 0,
    key: "long-term",
    title: "I’m investing for the long term.",
    description: "",
  },
  {
    id: 1,
    key: "medium-term",
    title: "I have a medium-term goal.",
    description: "",
  },
  {
    id: 2,
    key: "flexibility",
    title: "I want flexibility.",
    description: "",
  },
  {
    id: 3,
    key: "need-soon",
    title: "I might need the money soon.",
    description: "",
  },
];

export const InvestmentHorizonScreen: React.FC<RiskOptionsScreenProps> = ({
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
        How long do you plan to invest?
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
