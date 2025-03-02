import { Button } from "@/components/ui/button";
import { Option } from "@/Features/onboarding/types";
import { RiskOptionsScreenProps } from "@/Features/onboarding/types";
import { OptionCard } from "@/Features/onboarding/components/molecules/riskOptionCard";

const OPTIONS: Option[] = [
  {
    id: 0,
    key: "locked-away",
    title: "I’m okay with my money being locked away.",
    description: "",
  },
  {
    id: 1,
    key: "wait-grow",
    title: "I can wait for some of my money to grow.",
    description: "",
  },
  {
    id: 2,
    key: "accessible",
    title: "I prefer most of my money to be accessible.",
    description: "",
  },
  {
    id: 3,
    key: "quick-access",
    title: "I need quick access to my funds.",
    description: "",
  },
];

export const LiquidityPreferenceScreen: React.FC<RiskOptionsScreenProps> = ({
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
        How much of your money can be in long-term investments? (e.g., real
        estate, private equity, etc.)
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
