import React from "react";
import { Card } from "@/components/ui/card";
import {
  MoreHorizontal,
  HelpCircle,
  Filter,
  Settings,
  RefreshCw,
} from "lucide-react";
import { ChartType } from "../../types";

interface IncomeVsExpenditureProps {
  Chart: ChartType;
}

export const IncomeVsExpenditure: React.FC<IncomeVsExpenditureProps> = ({
  Chart,
}) => {
  const data = {
    netIncome: 24256.12,
    income: {
      amount: 51424.58,
      percentage: 65,
    },
    expenditure: {
      amount: 27168.46,
      percentage: 45,
    },
  };

  return (
    <Card className="p-6 bg-white">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl">Income And Expenditure</h2>
        <MoreHorizontal className="h-6 w-6 text-gray-400" />
      </div>

      {/* Border line */}
      <div className="border-b border-gray-200 mb-6" />

      {/* Info Section */}
      <div className="flex flex-col">
        {/* First row: Net Income text and Last Updated */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Net Income</span>
            <HelpCircle className="h-4 w-4 text-gray-400" />
          </div>
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1">
            <RefreshCw className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-600">
              Last Updated on: Jan 20, 2025
            </span>
          </div>
        </div>

        {/* Second row: Amount and Action Buttons */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-4xl font-normal">
            $
            {data.netIncome.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1">
              <Filter className="h-4 w-4 text-gray-600" />
              <span className="text-sm">Filter</span>
            </button>
            <button className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1">
              <span className="text-sm">Manage</span>
              <Settings className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Income and Expenditure Section */}
        <div className="grid grid-cols-2 gap-8">
          {/* Income Section */}
          <div className="relative">
            {/* Vertical Line */}
            <div
              className="absolute left-0 w-[2px] bg-purple-600"
              style={{
                height: "calc(150% - 7rem)",
                top: "1rem",
              }}
            />
            <div className="mb-[100px] ml-2">
              <div className="text-2xl font-normal">
                $
                {data.income.amount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
              <div className="text-gray-600">income last month</div>
            </div>
            <div className="mt-2 ml-2 text-purple-600 font-medium">
              {data.income.percentage}%
            </div>
            <div className="h-2 bg-purple-600 rounded-full w-full" />
          </div>

          {/* Expenditure Section */}
          <div className="relative">
            {/* Vertical Line */}
            <div
              className="absolute left-0 w-[2px] bg-orange-500"
              style={{
                height: "calc(150% - 7rem)",
                top: "1rem",
              }}
            />
            <div className="mb-[100px] ml-2">
              <div className="text-2xl font-normal">
                $
                {data.expenditure.amount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
              <div className="text-gray-600">expenditure last month</div>
            </div>
            <div className="mt-2 text-orange-500 font-medium">
              {data.expenditure.percentage}%
            </div>
            <div className="h-2 bg-orange-500 rounded-full w-[69.2%]" />
          </div>
        </div>
      </div>

      {/* Bottom Border */}
      <div className="border-b border-gray-200 mt-8" />
    </Card>
  );
};

export default IncomeVsExpenditure;
