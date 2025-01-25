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

interface FinancialData {
  netBalance: number;
  income: {
    amount: number;
    percentage: number;
  };
  debt: {
    amount: number;
    percentage: number;
  };
}

// interface IncomeVsDebtProps {}

export const IncomeVsDebt = () => {
  const financialData: FinancialData = {
    netBalance: 52124.24,
    income: {
      amount: 33880.76,
      percentage: 65,
    },
    debt: {
      amount: 18243.48,
      percentage: 35,
    },
  };

  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <Card className="p-6 w-full max-w-md bg-white">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 border-b border-[#AAAAAA] pb-2">
        <h2 className="text-xl font-cirka text-navy">Income Vs Debt</h2>
        <MoreHorizontal className="h-6 w-6 text-gray-400 cursor-pointer" />
      </div>

      {/* Net Balance Label and Last Updated */}
      <div className="space-y-2 mb-3">
        <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1">
          <RefreshCw className="h-3 w-3 text-green-500" />
          <span className="text-xs text-gray-600">
            Last Updated on: Jan 20, 2025
          </span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-sm text-gray-600">Net Balance</span>
          <HelpCircle className="h-4 w-4 text-gray-400" />
        </div>
      </div>

      {/* Net Balance Amount */}
      <div className="mb-4">
        <div className="text-3xl font-normal mb-4">
          {formatCurrency(financialData.netBalance)}
        </div>

        {/* Controls */}
        <div className="flex gap-2 mb-4">
          <button className="flex items-center gap-1 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg">
            <Filter className="h-4 w-4 text-gray-600" />
            <span className="text-xs">Filter</span>
          </button>
          <button className="flex items-center gap-1 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg">
            <span className="text-xs">Manage</span>
            <Settings className="h-4 w-4 text-gray-600" />
          </button>
        </div>

        <div className="text-xs text-gray-500 mb-4">Distribution</div>
      </div>

      {/* Income Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-600" />
            <span className="text-sm font-medium">Income</span>
          </div>
          <span className="text-sm font-medium">
            {formatCurrency(financialData.income.amount)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-grow h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-600 rounded-full transition-all duration-500"
              style={{ width: `${financialData.income.percentage}%` }}
            />
          </div>
          <span className="text-xs text-gray-600 min-w-[32px]">
            {financialData.income.percentage}%
          </span>
        </div>
      </div>

      {/* Debt Section */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <span className="text-sm font-medium">Debt</span>
          </div>
          <span className="text-sm font-medium">
            {formatCurrency(financialData.debt.amount)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-grow h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-500 rounded-full transition-all duration-500"
              style={{ width: `${financialData.debt.percentage}%` }}
            />
          </div>
          <span className="text-xs text-gray-600 min-w-[32px]">
            {financialData.debt.percentage}%
          </span>
        </div>
      </div>
      {/* Bottom Border */}
      <div className="border-b border-gray-200 mt-2 p-4 mb-10" />
    </Card>
  );
};

export default IncomeVsDebt;
