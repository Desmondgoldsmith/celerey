import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  MoreHorizontal,
  ChevronRight,
  HelpCircle,
  RefreshCw,
} from "lucide-react";
import { ChartType } from "../../types";

interface Goal {
  name: string;
  currentAmount: number;
  targetAmount: number;
  type: string;
  legendLabels: {
    current: string;
    target: string;
  };
}

interface GoalsProps {
  Chart: ChartType;
}

export const Goals: React.FC<GoalsProps> = () => {
  // Track which slide is currently visible
  const [activeSlide, setActiveSlide] = useState(0);

  // Extended goals array to include multiple slides
  const goals: Goal[][] = [
    [
      {
        name: "Current Savings",
        currentAmount: 21234,
        targetAmount: 30000,
        type: "Current Savings",
        legendLabels: {
          current: "Current Savings",
          target: "Target Savings",
        },
      },
      {
        name: "Emergency Fund",
        currentAmount: 10106,
        targetAmount: 50000,
        type: "Emergency Fund",
        legendLabels: {
          current: "Emergency Fund",
          target: "Target",
        },
      },
    ],
    [
      {
        name: "Vacation Fund",
        currentAmount: 5000,
        targetAmount: 15000,
        type: "Vacation Fund",
        legendLabels: {
          current: "Vacation Fund",
          target: "Target",
        },
      },
      {
        name: "New Car Fund",
        currentAmount: 15000,
        targetAmount: 45000,
        type: "New Car Fund",
        legendLabels: {
          current: "New Car Fund",
          target: "Target",
        },
      },
    ],
  ];

  const calculateProgress = (current: number, target: number) => {
    return (current / target) * 100;
  };

  const renderGoalItem = (goal: Goal) => {
    const progress = calculateProgress(goal.currentAmount, goal.targetAmount);

    return (
      <div className="mb-3">
        {/* Header with title and help icon */}
        <div className="mb-2">
          <div className="flex items-center justify-between  mb-3">
            <div></div>
            {/* Last updated section - only show for first goal */}
            {goal.name === "Current Savings" && (
              <div className="flex items-center gap-2  bg-gray-50 border border-gray-200 rounded-lg px-3 py-1">
                <RefreshCw className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-600">
                  Last Updated on: Jan 20, 2025
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1">
            <span className="text-gray-800">{goal.name}</span>
            <HelpCircle className="h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Amount and legends section */}
        <div className="flex justify-between items-start mb-2">
          <div className="flex flex-col">
            <span className="text-3xl font-semibold mb-2">
              ${goal.currentAmount.toLocaleString()}
            </span>
            <div className="flex gap-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-700" />
                <span className="text-sm text-gray-600">
                  {goal.legendLabels.current}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gray-200" />
                <span className="text-sm text-gray-600">
                  {goal.legendLabels.target}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar and target amount */}
        <div className="mt-2">
          <div className="relative h-2 bg-gray-200 rounded-full mb-1">
            <div
              className="absolute h-full bg-purple-700 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-end">
            <span className="text-gray-500">
              ${goal.targetAmount.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % goals.length);
  };

  return (
    <Card className="p-6 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 border-b border-[#AAAAAA] pb-2">
        <h2 className="text-xl font-cirka text-navy">Saving Goals</h2>
        <MoreHorizontal className="h-6 w-6 text-gray-400 cursor-pointer" />
      </div>

      {/* Goals content */}
      <div className="mb-6">
        {goals[activeSlide].map((goal, index) => renderGoalItem(goal))}
      </div>

      {/* Bottom border */}
      <div className="border-b border-gray-200 mb-4" />

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <div className="flex-1" /> {/* Spacer */}
        <div className="flex gap-2">
          {goals.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                activeSlide === index ? "bg-purple-700" : "bg-gray-200"
              }`}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
        <div className="flex-1 flex justify-end">
          <ChevronRight
            className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-600"
            onClick={handleNext}
          />
        </div>
      </div>
    </Card>
  );
};

export default Goals;
