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
  const dummyData = {
    annualRevenue: 4465852,
    annualIncome: 2225852,
    annualExpenditure: 1525852,
  };

  // Calculate values using dummy data
  const annualRevenue = dummyData.annualRevenue;
  const annualIncome = dummyData.annualIncome;
  const annualExpenditure = dummyData.annualExpenditure;

  /* 
  // Calculate values for display
  const annualRevenue = totalIncome || 0;
  const annualIncome = Number(totalIncomeFromExpense?.value || 0);
  const annualExpenditure = Number(totalExpenseFromIncome?.value || 0);
  */

  // Calculate monthly averages
  const avgMonthlyIncome = annualIncome / 12;
  const avgMonthlyExpenditure = annualExpenditure / 12;

  // Calculate percentages for the bar chart
  const totalAmount = annualIncome + annualExpenditure;
  const incomePercentage = (annualIncome / totalAmount) * 100;
  const expenditurePercentage = (annualExpenditure / totalAmount) * 100;

  // Format fixed values for the scale
  const formatScaleValue = (value: string) => {
    return value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  const getTextSizeClass = (value: number) => {
    const formattedValue = formatCurrency(String(value), currency);
    const valueLength = formattedValue ? formattedValue.length : 0;

    if (valueLength > 12) {
      return "text-sm font-bold";
    } else if (valueLength > 10) {
      return "text-base font-bold";
    } else {
      return "text-lg font-bold";
    }
  };

  return (
    <div className="w-full">
      {/* Financial Metrics Cards */}
      <div className="grid grid-cols-5 gap-4 mb-8">
        <div className="border rounded-lg p-4 bg-white">
          <div className="text-sm text-gray-600 mb-2">Annual Revenue</div>
          <div className={getTextSizeClass(annualRevenue)}>
            {formatCurrency(String(annualRevenue), currency)}
          </div>
        </div>

        <div className="border rounded-lg p-4 bg-white">
          <div className="text-sm text-gray-600 mb-2">Annual Income</div>
          <div className={getTextSizeClass(annualIncome)}>
            {formatCurrency(String(annualIncome), currency)}
          </div>
        </div>

        <div className="border rounded-lg p-4 bg-white">
          <div className="text-sm text-gray-600 mb-2">Annual Expenditure</div>
          <div className={getTextSizeClass(annualExpenditure)}>
            {formatCurrency(String(annualExpenditure), currency)}
          </div>
        </div>

        <div className="border rounded-lg p-4 bg-white">
          <div className="text-sm text-gray-600 mb-2">Avg Monthly Income</div>
          <div className={getTextSizeClass(avgMonthlyIncome)}>
            {formatCurrency(String(avgMonthlyIncome), currency)}
          </div>
        </div>

        <div className="border rounded-lg p-4 bg-white">
          <div className="text-sm text-gray-600 mb-2">
            Avg Monthly Expenditure
          </div>
          <div className={getTextSizeClass(avgMonthlyExpenditure)}>
            {formatCurrency(String(avgMonthlyExpenditure), currency)}
          </div>
        </div>
      </div>

      {/* Money Scale */}
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <div>$0</div>
        <div>
          ${totalAmount >= 20000 ? "20,000" : formatScaleValue("20000")}
        </div>
        <div>
          ${totalAmount >= 40000 ? "40,000" : formatScaleValue("40000")}
        </div>
        <div>
          ${totalAmount >= 60000 ? "60,000" : formatScaleValue("60000")}
        </div>
        <div>
          ${totalAmount >= 80000 ? "80,000" : formatScaleValue("80000")}
        </div>
        <div>
          ${totalAmount >= 100000 ? "100,000" : formatScaleValue("100000")}
        </div>
        <div>
          ${totalAmount >= 120000 ? "120,000" : formatScaleValue("120000")}
        </div>
      </div>

      {/* Bar Chart */}
      <div className="w-full h-20 rounded-lg overflow-hidden flex">
        <div
          className="h-full bg-red-300"
          style={{ width: `${expenditurePercentage}%` }}
        ></div>
        <div
          className="h-full bg-green-400"
          style={{ width: `${incomePercentage}%` }}
        ></div>
      </div>

      {/* Legend */}
      <div className="flex gap-6 mt-4">
        <div className="flex items-center">
          <div className="w-6 h-6 bg-red-300 mr-2"></div>
          <span className="text-sm">Expenditure</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-green-400 mr-2"></div>
          <span className="text-sm">Income</span>
        </div>
      </div>
    </div>
  );
};

export default IncomeVsExpenditure;
