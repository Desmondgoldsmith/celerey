import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Info, MoreHorizontal } from "lucide-react";
import { ChartType } from "../../types";
import { FinancialGoal } from "@/Features/userDashboard/types";
import formatCurrency from "@/utils/formatCurrency";

interface Goal {
  name: string;
  progress: number;
  amount: number;
  targetAmount: number;
  lastUpdated: string;
}

interface FinancialGoalsProps {
  Chart: ChartType;
  financialGoals: FinancialGoal[];
  onModify?: () => void;
  currency: string;
}

export const FinancialGoals: React.FC<FinancialGoalsProps> = ({
  Chart,
  financialGoals,
  onModify,
  currency,
}) => {
  const goalColors = ["#0b026aFF"];

  const [activeSlide, setActiveSlide] = useState(0);

  const sampleGoals: Goal[] = [
    {
      name: "Family Holiday",
      progress: 72,
      amount: 21234.35,
      targetAmount: 30000,
      lastUpdated: "29.12.24",
    },
    {
      name: "Pension Boost",
      progress: 45,
      amount: 15221.0,
      targetAmount: 35000,
      lastUpdated: "13.09.24",
    },
    {
      name: "Debt Reduction",
      progress: 20,
      amount: 1001.23,
      targetAmount: 5000,
      lastUpdated: "03.10.24",
    },
    {
      name: "Emergency Fund",
      progress: 65,
      amount: 12345.67,
      targetAmount: 20000,
      lastUpdated: "19.05.24",
    },
  ];

  const getCurrentValueLabel = (type: string) => {
    switch (type) {
      case "emergency":
        return "Emergency Duration";
      case "retirement":
        return "Current Pension";
      case "saving":
        return "Current Savings";
      default:
        return "Current Amount";
    }
  };

  const getTargetValueLabel = (type: string) => {
    switch (type) {
      case "emergency":
        return "Target Duration";
      case "retirement":
        return "Target Pension";
      case "saving":
        return "Target Savings";
      default:
        return "Target Amount";
    }
  };

  const renderGoalCard = (goal: FinancialGoal, color: string) => {
    const formattedCurrentValue =
      goal?.type !== "emergency"
        ? formatCurrency(goal.currentValue, currency)
        : goal.currentValue;

    const formattedTargetValue =
      goal?.type !== "emergency"
        ? formatCurrency(goal.targetValue, currency)
        : goal.targetValue;

    return (
      <div className="bg-white border-b border-[#AAAAAA] mt-2 mb-3 w-full">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <span className="text-sm font-helvatica truncate max-w-32">
              {goal.name}
            </span>
            <Info className="h-3 w-3 ml-1 text-gray-400" />
          </div>
          <div className="mt-2 flex justify-end">
            <button
              onClick={onModify}
              className="flex items-center space-x-1 border border-navy text-navy rounded px-2 py-1 text-sm"
            >
              <span>modify</span>
            </button>
          </div>
        </div>

        <div className="flex flex-row justify-between items-center">
          <div className="flex-shrink-0">
            <div className="w-32 h-32">
              <Chart
                type="radialBar"
                series={[goal.percentage]}
                options={{
                  chart: {
                    sparkline: { enabled: true },
                  },
                  colors: [color],
                  plotOptions: {
                    radialBar: {
                      hollow: { size: "35%" },
                      track: { background: "#b5b5b5" },
                      dataLabels: {
                        name: { show: false },
                        value: {
                          fontSize: "12px",
                          fontWeight: "500",
                          formatter: (val) => `${val}%`,
                          color: "#1C1F33",
                        },
                      },
                    },
                  },
                }}
                height={140}
                width={140}
              />
            </div>
          </div>

          <div className="text-right flex-1 ml-2">
            <p className="font-helvatica font-bold text-xs">
              {getCurrentValueLabel(goal?.type || "")}
            </p>
            <div className="text-base font-medium text-navy truncate max-w-full">
              {formattedCurrentValue}
            </div>
            <div className="text-gray-500 text-xs">out of</div>
            <div className="text-helvatica text-xs">
              {getTargetValueLabel(goal?.type || "")}
            </div>
            <div className="text-gray-500 text-helvatica text-sm truncate max-w-full">
              {formattedTargetValue}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="p-2 bg-white">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4 border-b border-[#AAAAAA] pb-1">
        <h2 className="text-xl font-cirka text-navy">Financial Goals</h2>
        <MoreHorizontal className="h-4 w-4 text-gray-400 cursor-pointer" />
      </div>
      <CardContent className="p-2">
        <div className="space-y-2">
          {[...financialGoals]
            .slice(activeSlide * 2, activeSlide * 2 + 2)
            .map((goal, index) => (
              <div key={`${goal.name}-${index}`}>
                {renderGoalCard(goal, goalColors[index])}
              </div>
            ))}
        </div>

        <div className="flex justify-center space-x-2 mt-4">
          {[...Array(Math.ceil(sampleGoals.length / 2))].map((_, index) => (
            <button
              key={index}
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                activeSlide === index ? "bg-[#1C1F33]" : "bg-gray-300"
              }`}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialGoals;
