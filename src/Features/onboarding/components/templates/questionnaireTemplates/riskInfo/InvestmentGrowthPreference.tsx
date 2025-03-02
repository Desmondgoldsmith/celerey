import { Button } from "@/components/ui/button";
import { Option } from "@/Features/onboarding/types";
import { RiskOptionsScreenProps } from "@/Features/onboarding/types";
import { OptionCard } from "@/Features/onboarding/components/molecules/riskOptionCard";

const OPTIONS: Option[] = [
  {
    id: 0,
    key: "high-returns",
    title: "I want high returns and can handle big ups and downs.",
    description: "",
  },
  {
    id: 1,
    key: "steady-growth",
    title: "I want steady growth and can handle some risk.",
    description: "",
  },
  {
    id: 2,
    key: "balanced-risk",
    title: "I’m okay with some risk but prefer balance.",
    description: "",
  },
  {
    id: 3,
    key: "protect-money",
    title: "I want to protect my money with little risk.",
    description: "",
  },
];

export const InvestmentGrowthPreferenceScreen: React.FC<
  RiskOptionsScreenProps
> = ({ value, onChange, onBack, onContinue, enableBack = true }) => {
  const handleOptionSelect = (option: any) => {
    onChange(option);
  };

  return (
    <div className="text-center max-w-xl mx-auto">
      <h1 className="text-4xl font-cirka mb-4">
        How do you prefer your investments to grow?
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
