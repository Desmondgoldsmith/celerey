import { Button } from "@/components/ui/button";
import { Option } from "../../../types";
import { RiskOptionsScreenProps } from "../../../types";
import { OptionCard } from "../../molecules/riskOptionCard";


const OPTIONS: Option[] = [
  {
    id: "low",
    title: "Low",
    description: "Investers prioritizing capital preservation over high returns",
  },
  {
    id: "medium",
    title: "Medium",
    description: "Investers willing to take on more risk for higher returns",
  },
  {
    id: "high",
    title: "High",
    description: "Investers highest highest tolerance for risk, in for highest possible returns",
  },
];

export const RiskToleranceScreen: React.FC<RiskOptionsScreenProps> = ({
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
        Let&apos;s test that theory, shall we? <br /> Which of the following statement best
        describes your risk tolerance?
      </h1>
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