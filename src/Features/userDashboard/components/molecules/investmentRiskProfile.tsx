import React from "react";
import { Card } from "@/components/ui/card";

interface InvestmentType {
  name: string;
}

interface RiskProfile {
  level: string;
  percentage: number;
  investmentTypes: InvestmentType[];
}

interface InvestmentRiskProfileProps {
  riskProfiles: RiskProfile[];
  onViewDetails?: (level: string) => void;
}

export const InvestmentRiskProfile: React.FC<InvestmentRiskProfileProps> = ({
  riskProfiles,
  onViewDetails = () => {},
}) => {
  // Function to render the donut chart
  const renderDonutChart = (percentage: number, color: string) => {
    // Calculate the circumference and stroke-dasharray for the donut chart
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const dashArray = (percentage / 100) * circumference;
    const dashOffset = circumference - dashArray;

    return (
      <div className="relative flex items-center justify-center w-24 h-24 mx-auto">
        {/* Background circle */}
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="#e6f4ea"
            strokeWidth="12"
          />
          {/* Foreground circle with percentage */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            transform="rotate(-90 50 50)"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute text-2xl font-semibold">{percentage}%</div>
      </div>
    );
  };

  // Function to determine the color based on risk level
  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "low":
        return "#1e0e4b";
      case "medium":
        return "#1e0e4b";
      case "high":
        return "#1e0e4b";
      default:
        return "#1e0e4b";
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      {riskProfiles.map((profile) => (
        <Card key={profile.level} className="flex-1 p-4 rounded-lg shadow-sm">
          <div className="mb-4">
            {renderDonutChart(profile.percentage, getRiskColor(profile.level))}
          </div>

          <div className="text-center mb-6">
            <h3 className="text-lg font-medium">{profile.level}</h3>
          </div>

          <div className="space-y-4 mb-6">
            {profile.investmentTypes.map((investment, index) => (
              <div
                key={index}
                className="py-3 border-b border-gray-200 text-sm"
              >
                {investment.name}
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => onViewDetails(profile.level)}
              className="inline-flex items-center justify-center rounded-md border border-indigo-900 text-indigo-900 px-4 py-2 text-sm font-medium hover:bg-indigo-50 transition-colors"
            >
              View Details
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default InvestmentRiskProfile;
