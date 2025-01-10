import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Plus, MoreHorizontal } from "lucide-react";
import { ChartType } from "../../types";
import { ApexOptions } from "apexcharts";

interface Goal {
  name: string;
  progress: number;
  amount: number;
  lastUpdated: string;
}

interface GoalsProps {
  Chart: ChartType;
}

export const Goals: React.FC<GoalsProps> = ({ Chart }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const goals: Goal[] = [
    {
      name: "Family Holiday",
      progress: 80,
      amount: 8505,
      lastUpdated: "29.12.24",
    },
    {
      name: "Pension Boost",
      progress: 50,
      amount: 15221,
      lastUpdated: "13.09.24",
    },
    {
      name: "Debt Reduction",
      progress: 20,
      amount: 1001,
      lastUpdated: "03.10.24",
    },
  ];

  const allCards = [
    ...goals,
    {
      name: "add-goal",
      progress: 0,
      amount: 0,
      lastUpdated: "",
    },
  ];

  const renderGoalCard = (goal: Goal) => {
    if (goal.name === "add-goal") {
      return (
        <div className="bg-[#F5F5F5] rounded-lg p-4 w-full h-[220px] flex flex-col items-center justify-center">
          <button className="w-12 h-12 rounded-full bg-[#1C1F33] flex items-center justify-center mb-3">
            <Plus className="h-6 w-6 text-white" />
          </button>
          <span className="text-sm text-[#1C1F33]">Add Goal</span>
        </div>
      );
    }

    const options: ApexOptions = {
      chart: {
        type: "radialBar",
        sparkline: { enabled: true },
      },
      colors: ["#0b026aFF"],
      plotOptions: {
        radialBar: {
          hollow: { size: "55%" },
          track: { background: "#E5E7EB" },
          dataLabels: {
            name: { show: false },
            value: {
              fontSize: "18px",
              fontWeight: "500",
              formatter: function (val: number) {
                return `${val}%`;
              },
              color: "#1C1F33",
            },
          },
        },
      },
    };

    return (
      <div className="bg-[#F5F5F5] rounded-lg p-4 w-full h-[220px]">
        <div className="flex justify-between items-center mb-2">
          <div></div>
          <MoreHorizontal className="h-4 w-4 text-gray-400" />
        </div>
        <div className="text-sm mt-1 text-center items-center font-helvatica text-[#1C1F33]">
          {goal.name}
        </div>

        <div className="w-full flex justify-center items-center">
          <div className="w-32 h-24 justify-center items-center pl-3">
            <Chart
              options={options}
              series={[goal.progress]}
              type="radialBar"
              height={100}
              width={100}
            />
          </div>
        </div>

        <div className="text-center">
          <div className="text-lg font-medium text-[#4F028F]">
            ${goal.amount.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            last updated {goal.lastUpdated}
          </div>
        </div>
      </div>
    );
  };

  const totalPairs = Math.ceil(allCards.length / 2);

  return (
    <Card className="p-6 bg-white">
      <div className="flex justify-between items-center border-b border-[#AAAAAA] pb-2 mb-3">
        <h2 className="text-xl font-cirka text-[#1C1F33]">Saving Goals</h2>
        <MoreHorizontal className="h-6 w-6 text-gray-400" />
      </div>

      <div className="flex space-x-4 mb-2 border-b border-gray-100 pb-2">
        {allCards
          .slice(activeSlide * 2, activeSlide * 2 + 2)
          .map((goal, index) => (
            <div key={`${goal.name}-${index}`} className="w-1/2">
              {renderGoalCard(goal)}
            </div>
          ))}
      </div>

      <div className="flex justify-center space-x-2">
        {[...Array(totalPairs)].map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              activeSlide === index ? "bg-[#1C1F33]" : "bg-gray-300"
            }`}
            onClick={() => setActiveSlide(index)}
          />
        ))}
      </div>
    </Card>
  );
};
