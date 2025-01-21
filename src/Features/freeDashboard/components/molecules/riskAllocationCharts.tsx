"use client";
import React, { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Info, MoreHorizontal } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface RiskData {
  name: string;
  value: number;
  color: string;
}

interface ProgressData {
  month: string;
  amount: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: ProgressData;
  }>;
}

// interface RiskAllocationProps {}

const RiskAllocation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Financial data constants
  const financialGoal = 54000;
  const currentAmount = 1329;
  const targetAmount = 2571;
  const monthsToGoal = 21;

  // Risk gauge data
  const riskData: RiskData[] = [
    { name: "Risk", value: 60, color: "#4ADE80" },
    { name: "Remaining", value: 40, color: "#808285" },
  ];

  // Progress chart data
  const progressData: ProgressData[] = [
    { month: "Jan", amount: 800 },
    { month: "Feb", amount: 1200 },
    { month: "Mar", amount: 900 },
    { month: "Apr", amount: 1500 },
    { month: "May", amount: 1100 },
    { month: "Jun", amount: 1800 },
    { month: "Jul", amount: 1300 },
    { month: "Aug", amount: 1600 },
    { month: "Sep", amount: 1400 },
    { month: "Oct", amount: 1700 },
    { month: "Nov", amount: 1500 },
    { month: "Dec", amount: 1800 },
  ];

  // Format currency for axis labels
  const formatCurrency = (value: number): string =>
    `$${value.toLocaleString()}`;

  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length > 0) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded-md shadow-sm">
          <p className="text-sm font-medium text-gray-900">
            ${payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-4 w-full" ref={containerRef}>
      <div className="flex justify-between items-center mb-6 border-b border-[#AAAAAA] pb-3">
        <h2 className="text-xl font-cirka text-navy">Risk Allocation</h2>
        <MoreHorizontal className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
      </div>

      {/* Risk Summary Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-5">
          <span className="text-sm font-medium text-gray-700">
            Risk Summary
          </span>
          <Info className="h-4 w-4 text-gray-400 cursor-help" />
        </div>

        <div className="relative h-36 flex justify-center items-center">
          <PieChart width={200} height={200}>
            <Pie
              data={riskData}
              cx="50%"
              cy="50%"
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={0}
              dataKey="value"
            >
              {riskData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-lg font-bold text-gray-900">Low</div>
            <div className="text-xs text-gray-600">Risk</div>
          </div>
        </div>

        <p className="text-xs text-gray-600 text-center mt-2 mb-4">
          Based on the risk assessment you are a Low Risk individual who might
          be a bit more passive about investing in financial instruments.
        </p>
      </div>

      {/* Financial Goal Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-medium text-gray-700">
            Financial Goal
          </span>
          <Info className="h-4 w-4 text-gray-400 cursor-help" />
        </div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-2xl font-bold text-gray-900">
            ${financialGoal.toLocaleString()}
          </span>
          <button className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-3 py-1 rounded transition-colors">
            Change Goal
          </button>
        </div>
        <div className="text-xs text-gray-500 mb-4">
          Suggested Financial Goal
        </div>
      </div>

      {/* Progress Chart */}
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={progressData}
            margin={{ top: 5, right: 0, left: -45, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              interval={0}
            />
            <YAxis
              tickFormatter={formatCurrency}
              tick={{ fontSize: 6 }}
              tickLine={false}
              axisLine={false}
              tickCount={5}
            />
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              opacity={0.3}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#2563eb"
              fillOpacity={1}
              fill="url(#colorAmount)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mb-2">
        <div className="flex justify-between text-sm mb-1">
          <span className="font-medium text-gray-700">
            ${currentAmount.toLocaleString()}
          </span>
          <span className="font-bold text-gray-900">
            ${targetAmount.toLocaleString()}
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-purple-600 rounded-full transition-all duration-500"
            style={{ width: `${(currentAmount / targetAmount) * 100}%` }}
          />
        </div>
        <div className="text-right text-xs text-gray-500 mt-1">
          Paid For This Month
        </div>
      </div>

      <div className="text-sm font-medium text-gray-700 text-right">
        {monthsToGoal} Months To Achieve Goal
      </div>
    </Card>
  );
};

export default RiskAllocation;
