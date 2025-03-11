import React from "react";
import formatCurrency from "@/utils/formatCurrency";

interface IncomeVsExpenditureProps {
  openStatementModal: () => void;
  totalIncome: number;
  totalExpenseFromIncome: { value: number; percentage: number };
  totalIncomeFromExpense: { value: number; percentage: number };
  currency: string;
}

const IncomeVsExpenditure = ({
  openStatementModal,
  totalIncome,
  totalExpenseFromIncome,
  totalIncomeFromExpense,
  currency,
}: IncomeVsExpenditureProps) => {
  const annualIncome = totalIncome || 0;
  const annualExpenditure = totalExpenseFromIncome?.value || 0;

  // Calculate monthly values
  const avgMonthlyIncome = annualIncome / 12;
  const avgMonthlyExpenditure = annualExpenditure / 12;

  // Determine the dynamic scale (maximum value)
  const maxValue = Math.max(annualIncome, annualExpenditure);
  const scaleStep = Math.ceil(maxValue / 5 / 1000) * 1000; // Rounded step

  // Generate scale labels dynamically
  const scaleLabels = Array.from({ length: 6 }, (_, i) =>
    formatCurrency(String(i * scaleStep), currency)
  );

  // **Fixed Percentage Calculation**
  const incomePercentage = annualIncome - annualExpenditure; // Direct value
  const expenditurePercentage = annualExpenditure; // Direct value

  // Convert percentages for bar width
  const totalAmount = maxValue > 0 ? maxValue : 1; // Prevent division by zero
  const incomeWidth = ((annualIncome - annualExpenditure) / totalAmount) * 100;
  const expenditureWidth = (annualExpenditure / totalAmount) * 100;

  return (
    <div className="w-full">
      {/* Financial Metrics Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="border flex flex-col justify-between rounded-lg p-2 bg-white">
          <div className="text-sm text-gray-600 mb-2 text-left">
            Annual Income
          </div>
          <div className="text-lg font-bold text-center">
            {formatCurrency(String(annualIncome), currency)}
          </div>
        </div>

        <div className="border flex flex-col justify-between rounded-lg p-2 bg-white">
          <div className="text-sm text-gray-600 mb-2 text-left">
            Annual Expenditure
          </div>
          <div className="text-lg font-bold text-center">
            {formatCurrency(String(annualExpenditure), currency)}
          </div>
        </div>

        <div className="border flex flex-col justify-between rounded-lg p-2 bg-white">
          <div className="text-sm text-gray-600 mb-2 text-left">
            Avg Monthly Income
          </div>
          <div className="text-lg font-bold text-center">
            {formatCurrency(String(avgMonthlyIncome), currency)}
          </div>
        </div>

        <div className="border flex flex-col justify-between rounded-lg p-2 bg-white">
          <div className="text-sm text-gray-600 mb-2 text-left">
            Avg Monthly Expenditure
          </div>
          <div className="text-lg font-bold text-center">
            {formatCurrency(String(avgMonthlyExpenditure), currency)}
          </div>
        </div>
      </div>

      {/* Dynamic Money Scale */}
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        {scaleLabels.map((label, index) => (
          <div key={index}>{label}</div>
        ))}
      </div>

      {/* Dynamic Bar Chart */}
      <div className="w-full h-20 rounded-lg overflow-hidden flex border">
        <div
          className="h-full bg-red-300"
          style={{ width: `${expenditureWidth}%` }}
        ></div>
        <div
          className="h-full bg-green-600"
          style={{ width: `${incomeWidth}%` }}
        ></div>
      </div>

      {/* Legend */}
      <div className="flex gap-6 mt-4">
        <div className="flex items-center">
          <div className="w-6 h-6 bg-red-300 mr-2"></div>
          <span className="text-sm">Expenditure</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-green-600 mr-2"></div>
          <span className="text-sm">Disposable Income</span>
        </div>
      </div>
    </div>
  );
};

export default IncomeVsExpenditure;
