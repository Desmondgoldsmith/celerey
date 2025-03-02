import { Button } from "@/components/ui/button";
import { Option } from "@/Features/onboarding/types";
import { RiskOptionsScreenProps } from "@/Features/onboarding/types";
import { OptionCard } from "@/Features/onboarding/components/molecules/riskOptionCard";

const OPTIONS: Option[] = [
  {
    id: 0,
    key: "big-drops",
    title: "I can handle big drops for higher gains.",
    description: "",
  },
  {
    id: 1,
    key: "some-loss",
    title: "I accept some loss but prefer stability.",
    description: "",
  },
  {
    id: 2,
    key: "balanced-growth",
    title: "I prefer smaller losses and balanced growth.",
    description: "",
  },
  {
    id: 3,
    key: "minimal-risk",
    title: "I want minimal risk and loss.",
    description: "",
  },
];

export const LossToleranceScreen: React.FC<RiskOptionsScreenProps> = ({
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
        How much loss can you tolerate in a downturn?
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
