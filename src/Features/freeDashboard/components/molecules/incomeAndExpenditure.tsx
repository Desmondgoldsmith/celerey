"use client";
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
  Chart?: ChartType;
}

export const IncomeVsExpenditure: React.FC<IncomeVsExpenditureProps> = () => {
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
    <Card className="p-4 sm:p-6 bg-white">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 border-b border-[#AAAAAA] pb-2">
        <h2 className="text-lg sm:text-xl font-cirka text-navy mb-2 sm:mb-0">
          Income And Expenditure
        </h2>
        <MoreHorizontal className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 cursor-pointer" />
      </div>

      {/* Info Section */}
      <div className="flex flex-col mb-4">
        {/*  Net Income text and Last Updated */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2 sm:gap-0">
          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-base text-gray-600">
              Net Income
            </span>
            <HelpCircle className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
          </div>
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-2 sm:px-3 py-1">
            <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
            <span className="text-xs sm:text-sm text-gray-600">
              Last Updated on: Jan 20, 2025
            </span>
          </div>
        </div>

        {/* Amount and Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-8 gap-4 sm:gap-0">
          <div className="text-2xl sm:text-3xl font-normal">
            $
            {data.netIncome.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-2 sm:px-3 py-1">
              <Filter className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
              <span className="text-xs sm:text-sm">Filter</span>
            </button>
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-2 sm:px-3 py-1">
              <span className="text-xs sm:text-sm">Manage</span>
              <Settings className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Income and Expenditure Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
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
            <div className="mb-[60px] sm:mb-[100px] ml-2">
              <div className="text-xl sm:text-2xl font-normal">
                $
                {data.income.amount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                income last month
              </div>
            </div>
            <div className="mt-2 ml-2 text-purple-600 font-medium text-sm sm:text-base">
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
            <div className="mb-[60px] sm:mb-[100px] ml-2">
              <div className="text-xl sm:text-2xl font-normal">
                $
                {data.expenditure.amount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                expenditure last month
              </div>
            </div>
            <div className="mt-2 ml-2 text-orange-500 font-medium text-sm sm:text-base">
              {data.expenditure.percentage}%
            </div>
            <div className="h-2 bg-orange-500 rounded-full w-[69.2%]" />
          </div>
        </div>
      </div>

      {/* Bottom Border */}
      <div className="border-b border-gray-200 mt-4 sm:mt-8 p-2 sm:p-4 mb-6 sm:mb-10" />
    </Card>
  );
};

export default IncomeVsExpenditure;
