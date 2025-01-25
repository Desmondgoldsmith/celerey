import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Info, MoreHorizontal } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ChartType, TimeframeKey } from "../../types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface BalanceOverviewProps {
  Chart: ChartType;
  timeframe: TimeframeKey;
  onTimeframeChange: (timeframe: TimeframeKey) => void;
  // annualIncome: {
  //   Rental: number;
  //   Dividends: number;
  //   "Interest Income": number;
  //   "Other Income": number;
  // };
  // annualExpenditure: {
  //   Home: number;
  //   Childcare: number;
  //   Education: number;
  //   Healthcare: number;
  //   Travel: number;
  //   Giving: number;
  // };
}

const BalanceOverview: React.FC<BalanceOverviewProps> = ({}) => {
  // Dummy data
  const realEstate = {
    percentage: 42,
    value: 25353.94,
  };
  const privateSecurities = {
    percentage: 20,
    value: 21536.32,
  };
  const publicSecurities = {
    percentage: 24,
    value: 23532.25,
  };
  const cash = {
    percentage: 14,
    value: 19245.35,
  };

  // =====

  const mortgages = {
    percentage: 60,
    value: 25353.94,
  };
  const creditCards = {
    percentage: 16,
    value: 21536.32,
  };
  const loans = {
    percentage: 30,
    value: 23532.25,
  };
  const assetFinance = {
    percentage: 50,
    value: 19245.35,
  };
  const otherLiability = {
    percentage: 14,
    value: 19245.35,
  };

  const liabilityData = [
    { name: "Mortgages", value: realEstate.percentage },
    { name: "Credit Cards", value: creditCards.percentage },
    { name: "Loans", value: loans.percentage },
    { name: "Asset Finance", value: assetFinance.percentage },
    { name: "Other Liability", value: otherLiability.percentage },
  ];

  const assetData = [
    { name: "Real Estate", value: mortgages.percentage },
    { name: "Private Securities", value: privateSecurities.percentage },
    { name: "Public Securities", value: publicSecurities.percentage },
    { name: "Cash", value: cash.percentage },
  ];

  const assetCOLORS = ["#1B1856", "#8BA78D", "#E15B2D", "#383396"];
  const liabilityCOLORS = [
    "#1B1856",
    "#8BA78D",
    "#E15B2D",
    "#383396",
    "#AAAAAA",
  ];

  const dummyAnnualIncome = {
    Rental: 12493.32,
    Dividends: 18354.23,
    "Interest Income": 14245.21,
    "Other Income": 9234.64,
  };

  const dummyAnnualExpenditure = {
    Home: 22953.93,
    Childcare: 24583.84,
    Education: 28253.29,
    Healthcare: 5294.95,
    Travel: 9364.32,
    Giving: 11245.76,
  };

  const incomeData = Object.entries(dummyAnnualIncome).map(([name, value]) => ({
    name,
    value,
  }));
  const expenditureData = Object.entries(dummyAnnualExpenditure).map(
    ([name, value]) => ({ name, value })
  );

  const incomeColors = ["#FF6B6B", "#6B4EFF", "#4CAF50", "#2196F3"];
  const expenditureColors = [
    "#1B1856",
    "#8BA78D",
    "#E15B2D",
    "#383396",
    "#AAAAAA",
  ];

  return (
    <Card className="bg-white p-4 w-full">
      {/* Header */}
      <div className="flex justify-between p-2 items-center mb-6 border-b border-[#AAAAAA] pb-2">
        <h2 className="text-xl font-cirka text-navy md:text-2xl">
          Balance Overview
        </h2>
        <MoreHorizontal className="h-6 w-6 text-gray-400 cursor-pointer" />
      </div>

      <CardContent>
        {/* Assets Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-2">
          <div className="flex items-center space-x-2 mb-2 md:mb-0">
            <h3 className="text-gray-700 font-cirka text-xl">Assets</h3>
            <Info className="h-3 w-3 text-gray-400" />
          </div>

          <div>
            <p className="text-[#2117DC] hover:cursor-pointer">add category</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-b border-[#AAAAAA]">
          {/* Pie Chart - Full width on mobile, 1/3 on desktop */}
          <div className="flex justify-center md:block">
            <ResponsiveContainer width="100%" height={130}>
              <PieChart>
                <Pie
                  data={assetData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {assetData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={assetCOLORS[index % assetCOLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Asset Details - Stacked on mobile, side-by-side on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-2">
            {/* Real Estate */}
            <div>
              <div className="mb-2">
                <div className="flex justify-between text-gray-700 font-medium mb-2">
                  <span>Real Estate</span>
                  <span>{realEstate.percentage}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-[#1B1856] rounded-full"
                    style={{ width: `${realEstate.percentage}%` }}
                  ></div>
                </div>
                <div className="text-left text-gray-700 mb-3 mt-2">
                  ${realEstate.value.toLocaleString()}
                </div>
              </div>

              {/* Private Securities */}
              <div>
                <div className="flex justify-between text-gray-700 font-medium mb-2">
                  <span>Private Securities</span>
                  <span>{privateSecurities.percentage}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-[#8BA78D] rounded-full"
                    style={{ width: `${privateSecurities.percentage}%` }}
                  ></div>
                </div>
                <div className="text-left text-gray-700 mb-3 mt-2">
                  ${privateSecurities.value.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Cash and Public Securities */}
            <div>
              {/* Cash */}
              <div>
                <div className="flex justify-between text-gray-700 font-medium mb-2">
                  <span>Cash</span>
                  <span>{cash.percentage}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-[#383396] rounded-full"
                    style={{ width: `${cash.percentage}%` }}
                  ></div>
                </div>
                <div className="text-left text-gray-700 mb-3 mt-2">
                  ${cash.value.toLocaleString()}
                </div>
              </div>

              {/* Public Securities */}
              <div className="mb-6">
                <div className="flex justify-between text-gray-700 font-medium mb-2">
                  <span>Public Securities</span>
                  <span>{publicSecurities.percentage}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-[#E15B2D] rounded-full"
                    style={{ width: `${publicSecurities.percentage}%` }}
                  ></div>
                </div>
                <div className="text-left text-gray-700 mb-3 mt-2">
                  ${publicSecurities.value.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Liabilities Section - Similar responsive modifications */}
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between items-center mb-2">
          <div className="flex items-center space-x-2 mb-2 md:mb-0">
            <h3 className="text-gray-700 font-cirka text-xl">Liabilities</h3>
            <Info className="h-3 w-3 text-gray-400" />
          </div>

          <div>
            <p className="text-[#2117DC] hover:cursor-pointer">add category</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-b border-[#AAAAAA]">
          {/* Pie Chart */}
          <div className="flex justify-center md:block">
            <ResponsiveContainer width="100%" height={130}>
              <PieChart>
                <Pie
                  data={liabilityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {liabilityData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={liabilityCOLORS[index % liabilityCOLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Liability Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-2">
            {/* Mortgages and Credit Cards */}
            <div>
              {/* Mortgages */}
              <div className="mb-2">
                <div className="flex justify-between text-gray-700 font-medium mb-2">
                  <span>Mortgages</span>
                  <span>{mortgages.percentage}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-[#1B1856] rounded-full"
                    style={{ width: `${mortgages.percentage}%` }}
                  ></div>
                </div>
                <div className="text-left text-gray-700 mb-3 mt-2">
                  ${mortgages.value.toLocaleString()}
                </div>
              </div>

              {/* Credit Cards */}
              <div>
                <div className="flex justify-between text-gray-700 font-medium mb-2">
                  <span>Credit Cards</span>
                  <span>{creditCards.percentage}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-[#8BA78D] rounded-full"
                    style={{ width: `${creditCards.percentage}%` }}
                  ></div>
                </div>
                <div className="text-left text-gray-700 mb-3 mt-2">
                  ${creditCards.value.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Asset Finance and Loans */}
            <div>
              {/* Asset Finance */}
              <div>
                <div className="flex justify-between text-gray-700 font-medium mb-2">
                  <span>Asset Finance</span>
                  <span>{assetFinance.percentage}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-[#383396] rounded-full"
                    style={{ width: `${assetFinance.percentage}%` }}
                  ></div>
                </div>
                <div className="text-left text-gray-700 mb-3 mt-2">
                  ${assetFinance.value.toLocaleString()}
                </div>
              </div>

              {/* Loans */}
              <div className="mb-6">
                <div className="flex justify-between text-gray-700 font-medium mb-2">
                  <span>Loans</span>
                  <span>{loans.percentage}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-[#E15B2D] rounded-full"
                    style={{ width: `${loans.percentage}%` }}
                  ></div>
                </div>
                <div className="text-left text-gray-700 mb-3 mt-2">
                  ${loans.value.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Income and Expenditure Section */}
      <CardContent className="border-b border-[#AAAAAA]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Annual Income */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <h3 className="text-gray-700 font-cirka text-xl">
                Annual Income
              </h3>
              <Info className="h-3 w-3 text-gray-400" />
            </div>
            <ResponsiveContainer width="100%" height={170}>
              <BarChart data={incomeData}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8">
                  {incomeData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={incomeColors[index % incomeColors.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Annual Expenditure */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <h3 className="text-gray-700 font-cirka text-xl">
                Annual Expenditure
              </h3>
              <Info className="h-3 w-3 text-gray-400" />
            </div>
            <ResponsiveContainer width="100%" height={170}>
              <BarChart data={expenditureData}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8">
                  {expenditureData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={expenditureColors[index % expenditureColors.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-2">
        <div className="flex flex-col sm:flex-row items-center mb-2 sm:mb-0">
          <div className="font-helvetica text-medium pr-2 text-center sm:text-left">
            Need Help?
          </div>
          <div className="text-xs font-helvetica text-gray-300 text-center sm:text-left sm:w-[140px]">
            Get Financial advice on maximizing the returns on your money.
          </div>
        </div>
        <div className="font-bold text-sm text-[#E15B2D] text-center sm:text-right">
          Request Advisory Service
        </div>
      </div>
    </Card>
  );
};

export default BalanceOverview;
