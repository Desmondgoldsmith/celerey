import React from "react";
import { Info } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ExpenseItem } from "../../types";

interface ExpenseSectionProps {
  onEditClick: () => void;
  expenses: ExpenseItem[];
  totalExpense: number
}

const ExpensesSection = ({ onEditClick, expenses, totalExpense }: ExpenseSectionProps) => {
  // Transform expenses data for the pie chart visualization
  const pieChartData = expenses.map((item) => ({
    name: item.category,
    value: Number(item.percentage),
    fill: item.color,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/*  Description and Action Buttons */}
      <div className="flex flex-col">
        <p className="text-sm text-gray-600 mb-6">
          Tracking your expenses allows us to efficiently assist you in
          prioritizing your spendings to meet the financial targets you have
          set. It also allows us to recommend budgets for you based on the
          lifestyle you might prefer. You can either create a budget or we can
          personalize one for you.
        </p>
        <div className="flex gap-4">
          <button className="bg-[#1B1856] text-white px-6 py-2 rounded-md text-sm hover:bg-opacity-90 transition-colors">
            Create a Budget
          </button>
          {/* <button className="border border-[#1B1856] text-[#1B1856] px-6 py-2 rounded-md text-sm hover:bg-gray-50 transition-colors">
            Generate my Budget
          </button> */}
        </div>
      </div>

      {/* Expenses Overview */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-sm text-gray-600">Expenses</h3>
            <Info className="h-3 w-3 text-gray-400" />
          </div>
          <span
            onClick={onEditClick}
            className="text-navyLight text-sm hover:cursor-pointer"
          >
            Edit Category
          </span>
        </div>

        {/* Donut Chart */}
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
                    fill={expenses[index].color}
                    stroke="white"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Expenses Summary */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Total Annual Expenses</span>
            <span className="text-lg font-bold">
              ${(totalExpense).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Expenses Categories</span>
            <span className="text-sm font-bold">{expenses?.length || 0}</span>
          </div>
        </div>

        {/* Expenses Breakdown with Progress Bars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {expenses.map((expense) => (
            <div key={expense.category} className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">{expense.category}</span>
                <span className="text-gray-900">{expense.percentage}%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="w-full h-1 bg-gray-100 rounded-full mr-4">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${expense.percentage}%`,
                      backgroundColor: expense.color,
                    }}
                  />
                </div>
                <span className="text-sm text-gray-600 whitespace-nowrap">
                  ${Number(expense?.amount || 0).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpensesSection;
