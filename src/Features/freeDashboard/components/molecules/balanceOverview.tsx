import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Info, MoreHorizontal, Plus } from "lucide-react";
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
import formatCurrency from "@/utils/formatCurrency";

interface BalanceOverviewProps {
  Chart: ChartType;
  timeframe: TimeframeKey;
  onTimeframeChange: (timeframe: TimeframeKey) => void;
  assets: any;
  liabilities: any;
  income: any;
  expense: any;
  currency: string;
  onAddCategory: () => void;
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

type IncomeCategory =
  | "Dividends"
  | "Rental"
  | "Interest Income"
  | "Other Income";
type ExpenditureCategory =
  | "Education"
  | "Childcare"
  | "Home"
  | "Travel"
  | "Healthcare"
  | "Giving";

interface DataItem {
  name: IncomeCategory | ExpenditureCategory;
  value: number;
  percentage?: number;
  height: string;
}

interface ColorMappings {
  [key: string]: string;
}

const BalanceOverview: React.FC<BalanceOverviewProps> = ({
  assets,
  liabilities,
  expense,
  income,
  onAddCategory,
  currency = "usd",
}) => {
  // Dummy data
  const realEstate = {
    percentage: assets.realEstate.percentage,
    value: assets.realEstate.value,
  };
  const privateSecurities = {
    percentage: assets.privateSecurities.percentage,
    value: assets.privateSecurities.value,
  };
  const publicSecurities = {
    percentage: assets.publicSecurities.percentage,
    value: assets.publicSecurities.value,
  };
  const cash = {
    percentage: assets.cash.percentage,
    value: assets.cash.value,
  };

  // =====

  const mortgages = {
    percentage: liabilities.mortgages?.percentage,
    value: liabilities.mortgages?.value,
  };
  const creditCards = {
    percentage: liabilities.creditCards?.percentage,
    value: liabilities.creditCards?.value,
  };
  const loans = {
    percentage: liabilities.loans?.percentage,
    value: liabilities.loans?.value,
  };
  const assetFinance = {
    percentage: liabilities.assetFinance?.percentage,
    value: liabilities.assetFinance?.value,
  };
  const otherLiability = {
    percentage: liabilities.otherLiabilities?.percentage,
    value: liabilities.otherLiabilities?.value,
  };

  const liabilityData = [
    { name: "Mortgages", value: mortgages.percentage },
    { name: "Credit Cards", value: creditCards.percentage },
    { name: "Loans", value: loans.percentage },
    { name: "Asset Finance", value: assetFinance.percentage },
    { name: "Other Liability", value: otherLiability.percentage },
  ];

  const assetData = [
    { name: "Real Estate", value: realEstate.percentage },
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
    Rental: income.rentalIncome,
    Dividends: income.dividends,
    "Interest Income": income.interestIncome,
    "Other Income": income.otherIncome,
  };

  const dummyAnnualExpenditure = {
    Home: expense.home,
    Childcare: expense.childcare,
    Education: expense.education,
    Healthcare: expense.healthcare,
    Travel: expense.travel,
    Giving: expense.giving,
  };

  const incomeData = Object.entries(dummyAnnualIncome).map(([name, value]) => ({
    name,
    value: value?.value || 0,
  }));
  const expenditureData = Object.entries(dummyAnnualExpenditure).map(
    ([name, value]) => ({ name, value: value?.value || 0 })
  );

  const incomeColors: Record<IncomeCategory, string> = {
    Dividends: "#4A1D96",
    Rental: "#F65A3B",
    "Interest Income": "#8BA78D",
    "Other Income": "#383396",
  };

  const expenditureColors: Record<ExpenditureCategory, string> = {
    Education: "#FF6B6B",
    Childcare: "#8BA78D",
    Home: "#1B1856",
    Travel: "#E15B2D",
    Healthcare: "#AAAAAA",
    Giving: "#383396",
  };

  // Transform and sort income data
  const sortedIncomeData = Object.entries(dummyAnnualIncome)
    .map(([name, value]) => ({
      name: name as IncomeCategory,
      value: value?.value || 0,
    }))
    .sort((a, b) => b.value - a.value);

  const totalIncome = sortedIncomeData.reduce(
    (sum, item) => sum + item.value,
    0
  );

  // Calculate percentages and heights for income bars
  const incomeWithHeights: DataItem[] = sortedIncomeData.map((item) => ({
    ...item,
    percentage: (item.value / totalIncome) * 100,
    height: `${(item.value / totalIncome) * 100}%`,
  }));

  // Transform and sort expenditure data
  const sortedExpenditureData = Object.entries(dummyAnnualExpenditure)
    .map(([name, value]) => ({
      name: name as ExpenditureCategory,
      value: value?.value || 0,
    }))
    .sort((a, b) => b.value - a.value);

  const totalExpenditure = sortedExpenditureData.reduce(
    (sum, item) => sum + item.value,
    0
  );

  // Calculate percentages and heights for expenditure bars
  const expenditureWithHeights: DataItem[] = sortedExpenditureData.map(
    (item) => ({
      ...item,
      percentage: (item.value / totalExpenditure) * 100,
      height: `${(item.value / totalExpenditure) * 100}%`,
    })
  );

  // Function to get color
  const getIncomeColor = (category: IncomeCategory): string =>
    incomeColors[category];
  const getExpenditureColor = (category: ExpenditureCategory): string =>
    expenditureColors[category];

  return (
    <Card className="bg-white p-2 w-full">
      {/* Header */}
      <div className="flex justify-between p-2 items-center mb-3 border-b border-[#AAAAAA] pb-2">
        <h2 className="text-xl font-cirka text-navy md:text-xl">
          Wealth Overview
        </h2>
        <MoreHorizontal className="h-6 w-6 text-gray-400 cursor-pointer" />
      </div>

      {/* Income and Expenditure Section */}
      <CardContent className="border-b border-[#AAAAAA]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Annual Income */}
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-gray-700 font-cirka text-md">
                Annual Income
              </h3>
              <Info className="h-3 w-3 text-gray-400" />
            </div>

            <div className="mb-2 mt-1">
              <span className="text-navy text-2xl font-semibold">
                {formatCurrency(
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  totalIncome,
                  currency
                )}
              </span>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={onAddCategory}
                className="flex items-center space-x-1 border border-navy text-navy rounded p-1 text-sm"
              >
                <Plus className="h-3 w-3" />
                <span>Add Income</span>
              </button>
            </div>

            <div className="space-y-3 mt-4">
              {incomeData.map((item) => (
                <div key={item.name} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-sm">
                      {formatCurrency(item.value, currency)}
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-sm overflow-hidden">
                    <div
                      className="h-full"
                      style={{
                        width: `${(item.value / totalIncome) * 100}%`,
                        backgroundColor: getIncomeColor(
                          item.name as IncomeCategory
                        ),
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Annual Expenditure */}
          <div>
            <div className="flex items-center justify-end space-x-2 ">
              <h3 className="text-gray-700 font-cirka text-md">
                Annual Expenditure
              </h3>
              <Info className="h-3 w-3 text-gray-400" />
            </div>

            <div className="flex justify-end mb-2 mt-1">
              <span className="text-navy text-2xl font-semibold">
                {formatCurrency(
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  totalExpenditure,
                  currency
                )}
              </span>
            </div>

            <div className="mt-3 flex justify-end">
              <button
                onClick={onAddCategory}
                className="flex items-center space-x-1 border border-navy text-navy rounded p-1 text-sm"
              >
                <Plus className="h-3 w-3" />
                <span>Add Expense</span>
              </button>
            </div>

            <div className="space-y-3 mt-4">
              {expenditureData.map((item) => (
                <div key={item.name} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-sm">
                      {formatCurrency(item.value, currency)}
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-sm overflow-hidden">
                    <div
                      className="h-full"
                      style={{
                        width: `${(item.value / totalExpenditure) * 100}%`,
                        backgroundColor: getExpenditureColor(
                          item.name as ExpenditureCategory
                        ),
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 p-2 pb-2 border-b border-[#AAAAAA] mb-3">
        {/* Assets Section */}
        <CardContent className="p-2 md:pr-2 md:border-r border-[#AAAAAA]">
          <div className="flex justify-between mb-3 items-center">
            <div className="flex items-center space-x-1">
              <h3 className="text-gray-700 font-cirka text-md">Assets</h3>
              <Info className="h-3 w-3 text-gray-400" />
            </div>

            <button
              onClick={onAddCategory}
              className="flex items-center space-x-1 border border-navy text-navy rounded p-1 text-sm"
            >
              <Plus className="h-3 w-3" />
              <span>Add Category</span>
            </button>
          </div>

          <div className="flex flex-col md:flex-row md:ml-[-28px]">
            {/* Pie Chart Column */}
            <div className="w-full md:w-1/3 flex justify-center md:justify-start mb-4 md:mb-0 md:pr-1 md:pl-[-4px]">
              <div className="w-40 h-40 md:w-full">
                <ResponsiveContainer width="100%" height={150}>
                  <PieChart>
                    <Pie
                      data={assetData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={55}
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
            </div>

            {/* Asset Details Column */}
            <div className="w-full md:w-2/3 md:pl-[-8px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-4 sm:gap-y-2">
                {/* Real Estate */}
                <div className="flex flex-col">
                  <div className="flex justify-between text-gray-700 text-sm font-medium">
                    <span className="truncate">Real Estate</span>
                    <span>{realEstate.percentage.toFixed(0)}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-[#1B1856] rounded-full"
                      style={{ width: `${realEstate.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-left text-gray-700 text-sm">
                    ${realEstate.value.toLocaleString()}
                  </div>
                </div>

                {/* Public Securities */}
                <div className="flex flex-col">
                  <div className="flex justify-between text-gray-700 text-sm font-medium">
                    <span className="truncate pr-1">Public Securities</span>
                    <span>{publicSecurities.percentage.toFixed(0)}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-navy rounded-full"
                      style={{ width: `${publicSecurities.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-left text-gray-700 text-sm">
                    ${publicSecurities.value.toLocaleString()}
                  </div>
                </div>

                {/* Private Securities */}
                <div className="flex flex-col">
                  <div className="flex justify-between text-gray-700 text-sm font-medium">
                    <span className="truncate pr-1">Private Securities</span>
                    <span>{privateSecurities.percentage.toFixed(0)}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-[#8BA78D] rounded-full"
                      style={{ width: `${privateSecurities.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-left text-gray-700 text-sm">
                    ${privateSecurities.value.toLocaleString()}
                  </div>
                </div>

                {/* Cash */}
                <div className="flex flex-col">
                  <div className="flex justify-between text-gray-700 text-sm font-medium">
                    <span>Cash</span>
                    <span>{cash.percentage.toFixed(0)}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-[#383396] rounded-full"
                      style={{ width: `${cash.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-left text-gray-700 text-sm">
                    ${cash.value.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        {/* Liabilities Section */}
        <CardContent className="p-2 mt-3 md:mt-0 md:pl-1">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center space-x-1">
              <h3 className="text-gray-700 font-cirka text-lg">Liabilities</h3>
              <Info className="h-3 w-3 text-gray-400" />
            </div>

            <button
              onClick={onAddCategory}
              className="flex items-center space-x-1 border border-navy text-navy rounded p-1 text-sm"
            >
              <Plus className="h-3 w-3" />
              <span>Add Category</span>
            </button>
          </div>

          <div className="flex flex-col md:flex-row md:ml-[-28px]">
            {/* Pie Chart Column */}
            <div className="w-full md:w-1/3 flex justify-center md:justify-start mb-4 md:mb-0 md:pr-1">
              <div className="w-40 h-40 md:w-full">
                <ResponsiveContainer width="100%" height={150}>
                  <PieChart>
                    <Pie
                      data={liabilityData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={55}
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
            </div>

            {/* Liability Details Column */}
            <div className="w-full md:w-2/3 md:ml-[-10px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-4 sm:gap-y-2">
                {/* Mortgages */}
                <div className="flex flex-col">
                  <div className="flex justify-between text-gray-700 text-sm font-medium">
                    <span>Mortgages</span>
                    <span>{mortgages.percentage?.toFixed(0)}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-[#1B1856] rounded-full"
                      style={{ width: `${mortgages.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-left text-gray-700 text-sm">
                    ${mortgages.value.toLocaleString()}
                  </div>
                </div>

                {/* Loans */}
                <div className="flex flex-col">
                  <div className="flex justify-between text-gray-700 text-sm font-medium">
                    <span>Loans</span>
                    <span>{loans.percentage?.toFixed(0)}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-navy rounded-full"
                      style={{ width: `${loans.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-left text-gray-700 text-sm">
                    ${loans.value.toLocaleString()}
                  </div>
                </div>

                {/* Credit Cards */}
                <div className="flex flex-col">
                  <div className="flex justify-between text-gray-700 text-sm font-medium">
                    <span>Credit Cards</span>
                    <span>{creditCards.percentage?.toFixed(0)}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-[#8BA78D] rounded-full"
                      style={{ width: `${creditCards.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-left text-gray-700 text-sm">
                    ${creditCards.value.toLocaleString()}
                  </div>
                </div>

                {/* Asset Finance */}
                <div className="flex flex-col">
                  <div className="flex justify-between text-gray-700 text-sm font-medium">
                    <span className="truncate pr-1">Asset Finance</span>
                    <span>{assetFinance.percentage?.toFixed(0)}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-[#383396] rounded-full"
                      style={{ width: `${assetFinance.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-left text-gray-700 text-sm">
                    ${assetFinance.value.toLocaleString()}
                  </div>
                </div>

                {/* Other Liabilities */}
                <div className="flex flex-col sm:col-span-2">
                  <div className="flex justify-between text-gray-700 text-sm font-medium">
                    <span>Other Liabilities</span>
                    <span>{otherLiability.percentage?.toFixed(0)}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-[#AAAAAA] rounded-full"
                      style={{ width: `${otherLiability.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-left text-gray-700 text-sm">
                    ${otherLiability.value.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </div>

      {/* Footer */}
      {/* <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 my-3">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
          <div className="flex flex-col space-y-2">
            <h3 className="font-helvetica text-base font-semibold text-gray-800">
              Need Financial Assistance?
            </h3>
            <p className="font-helvetica text-sm text-gray-600 max-w-md">
              Get personalized financial advice from our experts on maximizing
              returns and optimizing your investment portfolio.
            </p>
          </div>

          <button
            onClick={onAddCategory}
            className="bg-white hover:bg-gray-50 text-navy font-medium p-1 rounded-md border border-navy transition-colors duration-200 whitespace-nowrap self-end sm:self-center"
          >
            Request Advisory Service
          </button>
        </div>
      </div> */}
    </Card>
  );
};

export default BalanceOverview;
