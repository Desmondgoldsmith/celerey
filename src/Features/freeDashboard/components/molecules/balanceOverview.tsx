"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { MoreHorizontal, Filter, Settings } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface ExpenseCategory {
  name: string;
  value: number;
  color: string;
  percentage: number;
}

interface BalanceOverviewProps {
  totalExpenses: number;
  data: ExpenseCategory[];
  onTimeframeChange: (months: string) => void;
  lastUpdated?: Date;
}

export const BalanceOverview: React.FC<BalanceOverviewProps> = ({
  totalExpenses,
  data = [
    { name: "Others", value: 24223.61, color: "#1E1B4B", percentage: 56 },
    { name: "Home", value: 13842.06, color: "#4ADE80", percentage: 32 },
    { name: "Loans", value: 5190.78, color: "#FB923C", percentage: 12 },
  ],
  onTimeframeChange,
  lastUpdated = new Date(),
}) => {
  const months = ["1", "2", "3", "6", "12"];

  return (
    <Card className="bg-white p-4 sm:p-6 w-full">
      {/* Header section  */}
      <div className="flex justify-between items-start sm:items-center mb-4 sm:mb-6 border-b border-[#AAAAAA] pb-2">
        <h2 className="text-lg sm:text-xl font-cirka text-navy mb-2 sm:mb-0">
          Balance Overview
        </h2>
        <MoreHorizontal className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 cursor-pointer" />
      </div>

      {/* Total Expenses and Timeframe Selector */}
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <div>
          <div className="text-sm text-gray-500 mb-1">Total Expenses</div>
          <div className="text-xl sm:text-2xl font-semibold">
            ${totalExpenses.toLocaleString()}
          </div>
        </div>
        <div className="w-full sm:w-auto">
          <Select defaultValue="12" onValueChange={onTimeframeChange}>
            <SelectTrigger className="w-full sm:w-[120px] bg-gray-50">
              <SelectValue placeholder="Select months" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month} months
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Chart and Legend */}
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-4 sm:mb-6">
        {/* Donut Chart  */}
        <div className="w-[150px] sm:w-[180px] h-[150px] sm:h-[180px] mx-auto md:mx-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={65}
                paddingAngle={4}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full md:flex-1">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between mb-3 sm:mb-4 pb-2 sm:pb-3 last:mb-0 border-b border-[#AAAAAA]"
            >
              <div className="w-full">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="text-base sm:text-[18px] font-bold font-cirka">
                    {item.name}
                  </div>
                </div>
                <div className="flex items-center justify-between ml-5">
                  <div className="text-xs sm:text-sm text-gray-500">
                    {item.percentage}%
                  </div>
                  <div className="text-sm sm:text-base font-medium">
                    ${item.value.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 mb-4 sm:mb-6 justify-center sm:justify-start">
        <div className="flex items-center gap-2 px-2 py-2 bg-gray-50 rounded-md text-center">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 3.33337V8.00004L11.3333 9.66671"
              stroke="#344054"
              strokeWidth="1.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14.6668 8.00004C14.6668 11.6819 11.6821 14.6667 8.00016 14.6667C4.31826 14.6667 1.3335 11.6819 1.3335 8.00004C1.3335 4.31814 4.31826 1.33337 8.00016 1.33337C11.6821 1.33337 14.6668 4.31814 14.6668 8.00004Z"
              stroke="#344054"
              strokeWidth="1.33333"
            />
          </svg>
          <span className="text-xs sm:text-sm text-gray-700">
            Last Updated on:{" "}
            {lastUpdated.toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </span>
        </div>

        <button className="flex items-center gap-2 px-2 py-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
          <Filter className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="text-xs sm:text-sm text-gray-700">Filter</span>
        </button>

        <button className="flex items-center gap-2 px-2 py-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
          <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="text-xs sm:text-sm text-gray-700">Manage</span>
        </button>
      </div>

      {/* Help Section */}
      <div className="mt-4 sm:mt-8 pt-4 sm:pt-6 border-t border-[#AAAAAA]">
        <h3 className="font-bold mb-2 text-xl sm:text-2xl font-cirka">
          Need Help?
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
          Get insights on your total expenses with a personalised report for
          your major expenses and advisory services to assist you to make the
          best financial decisions.
        </p>
        <button className="w-full sm:w-auto bg-[#FF4405] text-white px-4 py-2 rounded-md text-xs sm:text-sm hover:bg-[#E63D04] transition-colors">
          Request Advisory Service
        </button>
      </div>

      <div className="border-b border-[#AAAAAA] p-2 sm:p-3 mb-3 sm:mb-5"></div>
    </Card>
  );
};

export default BalanceOverview;
