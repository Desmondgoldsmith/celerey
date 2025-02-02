import React from "react";
import { Info } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface IncomeItem {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

const incomeData: IncomeItem[] = [
  {
    category: "Dividends",
    amount: 18354.23,
    percentage: 30,
    color: "#8BA78D",
  },
  {
    category: "Rental",
    amount: 12493.32,
    percentage: 28,
    color: "#1B1856",
  },
  {
    category: "Interest Income",
    amount: 14245.21,
    percentage: 18,
    color: "#E15B2D",
  },
  {
    category: "Other Income",
    amount: 9234.64,
    percentage: 24,
    color: "#383396",
  },
];

const IncomeSection = () => {
  // Transform income data for the pie chart
  const pieChartData = incomeData.map((item) => ({
    name: item.category,
    value: item.percentage,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Description and Buttons */}
      <div className="flex flex-col">
        <p className="text-sm text-gray-600 mb-6">
          Managing your personal finances start from having full control of
          where your money is going. We recommend creating a budget either
          manually or allowing us to create one for you so we can make your
          personal finance journey as smooth as possible.
        </p>
        <div className="flex gap-4">
          <button className="bg-[#1B1856] text-white px-6 py-2 rounded-md text-sm hover:bg-opacity-90 transition-colors">
            Create a Budget
          </button>
          <button className="border border-[#1B1856] text-[#1B1856] px-6 py-2 rounded-md text-sm hover:bg-gray-50 transition-colors">
            Generate my Budget
          </button>
        </div>
      </div>

      {/*  Income Overview */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-sm text-gray-600">Annual Income</h3>
            <Info className="h-3 w-3 text-gray-400" />
          </div>
          <span className="text-indigo-600 text-sm hover:cursor-pointer">
            Add Income
          </span>
        </div>

        {/* Pie Chart */}
        <div className="w-full aspect-square max-w-[180px] mx-auto mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                innerRadius="70%"
                outerRadius="100%"
                paddingAngle={2}
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={incomeData[index].color}
                    stroke="white"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Income Summary */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Total Annual Income</span>
            <span className="text-lg font-bold">
              ${(54859.26).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Income Categories</span>
            <span className="text-sm font-bold">4</span>
          </div>
        </div>

        {/* Income Breakdown */}
        {incomeData.map((income) => (
          <div key={income.category} className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">{income.category}</span>
              <span className="text-gray-900">{income.percentage}%</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="w-full h-1 bg-gray-100 rounded-full mr-4">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${income.percentage}%`,
                    backgroundColor: income.color,
                  }}
                />
              </div>
              <span className="text-sm text-gray-600 whitespace-nowrap">
                ${income.amount.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncomeSection;
