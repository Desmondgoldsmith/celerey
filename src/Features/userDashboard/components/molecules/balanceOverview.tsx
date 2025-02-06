import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Info, MoreHorizontal } from "lucide-react";
import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import IncomeSection from "./incomeSection";
import ExpensesSection from "./expenseSection";
import IncomeVsDebtSection from "./incomeVsDebtSection";
import IncomeVsExpenditure from "./incomeVsExpenditure";
import {
  AssetType,
  CountryType,
  ExpenseItem,
  GeneratedBudget,
  IncomeItem,
  LiabilityItem,
} from "../../types";
import { useRouter } from "next/navigation";

const tabs = [
  "Assets",
  "Liabilities",
  "Income",
  "Expenses",
  "Income Vs Debt",
  "Income Vs Expenditure",
];

const assetData = [
  {
    category: "Real Estate",
    amount: 25353.94,
    percentage: 42,
    color: "#1B1856",
  },
  {
    category: "Public Securities",
    amount: 23532.25,
    percentage: 24,
    color: "#E15B2D",
  },
  {
    category: "Private Securities",
    amount: 21536.32,
    percentage: 20,
    color: "#8BA78D",
  },
  {
    category: "Cash",
    amount: 19245.35,
    percentage: 14,
    color: "#383396",
  },
];

interface LiabilitiesProps {
  liabilityData: LiabilityItem[];
  openLiabilityModal: () => void;
}

// Component for the Liabilities Content
const LiabilitiesContent = ({
  liabilityData,
  openLiabilityModal,
}: LiabilitiesProps) => {
  const pieChartData = liabilityData.map((item) => ({
    name: item.category,
    value: item.percentage,
  }));

  const router = useRouter();
  const handleAdvisors = () => {
    router.push("/advisors");
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <div className="flex flex-col">
          <h3 className="text-sm text-gray-600 mb-4">
            We can help you get a better grip of your liabilities. We can offer
            expert advise and help you structure an appropriate payment plan to
            service most of these liabilities efficiently while maintaining your
            financial goals.
          </h3>
          <button
            onClick={handleAdvisors}
            className="text-navyLight border border-navyLight rounded-md px-4 py-2 w-fit text-sm hover:bg-indigo-50 transition-colors"
          >
            Speak to an Advisor
          </button>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-sm text-gray-600">Liabilities</h3>
            <Info className="h-3 w-3 text-gray-400" />
          </div>
          <span
            onClick={openLiabilityModal}
            className="text-navyLight text-sm hover:cursor-pointer"
          >
            Edit Category
          </span>
        </div>

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
                    fill={liabilityData[index].color}
                    stroke="white"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Total Liabilities</span>
            <span className="text-lg font-bold">
              ${(84395.25).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              Liabilities Categories
            </span>
            <span className="text-sm font-bold">5</span>
          </div>
        </div>

        {liabilityData.map((liability) => (
          <div key={liability.category} className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">{liability.category}</span>
              <span className="text-gray-900">{liability.percentage}%</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="w-full h-1 bg-gray-100 rounded-full mr-4">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${liability.percentage}%`,
                    backgroundColor: liability.color,
                  }}
                />
              </div>
              <span className="text-sm text-gray-600 whitespace-nowrap">
                ${liability.amount.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface BalanceOverviewProps {
  onPortfolioRecommendationClick: () => void;
  onEditAssetClick: () => void;
  assets: AssetType[];
  countries: CountryType[];
  income: IncomeItem[];
  openIncomeModal: () => void;
  onEditExpenseClick: () => void;
  expenses: ExpenseItem[];
  openDebtModal: () => void;
  openDebtServicingModal: () => void;
  openStatementModal: () => void;
  openBudgetModal: () => void;
  openGenBudgetModal: () => void;
  openLiabilityModal: () => void;
  generatedBudget: GeneratedBudget;
  liabilityData: LiabilityItem[];
}

export default function BalanceOverview({
  onPortfolioRecommendationClick,
  onEditAssetClick,
  income,
  openIncomeModal,
  onEditExpenseClick,
  expenses,
  openDebtModal,
  openDebtServicingModal,
  openStatementModal,
  openBudgetModal,
  openGenBudgetModal,
  generatedBudget,
  liabilityData,
  openLiabilityModal,
}: BalanceOverviewProps) {
  const [activeTab, setActiveTab] = useState("Assets");

  const handlePortfolioRecommendationClick = () => {
    onPortfolioRecommendationClick();
  };

  const mapData = {
    GB: 1,
    GH: 2,
    ZA: 3,
  };

  const colorScale = {
    min: 1,
    max: 3,
    values: mapData,
    scale: ["#FF1493", "#0f0251", "#E15B2D"],
  };

  const pieChartData = assetData.map((item) => ({
    name: item.category,
    value: item.percentage,
  }));

  // Component for the Assets Content (existing content)
  const AssetsContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Geographic Spread Section */}
      <div>
        <div className="flex flex-col items-center mb-4">
          <h3 className="text-sm text-navy">
            Geographical Spread of Assets
            <Info className="inline-block ml-1 h-3 w-3 text-gray-400" />
          </h3>
          <span
            className="text-navyLight text-sm hover:cursor-pointer"
            onClick={handlePortfolioRecommendationClick}
          >
            portfolio recommendation
          </span>
        </div>

        <div className="h-[280px] relative mb-4">
          <VectorMap
            map={worldMill}
            backgroundColor="transparent"
            zoomOnScroll={false}
            containerStyle={{
              width: "100%",
              height: "100%",
            }}
            regionStyle={{
              initial: {
                fill: "#F3F4F6",
                stroke: "#E5E7EB",
                strokeWidth: 0.5,
                fillOpacity: 1,
              },
              hover: {
                fillOpacity: 0.8,
              },
            }}
            series={{
              regions: [
                {
                  scale: colorScale.scale,
                  values: colorScale.values,
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  min: colorScale.min,
                  max: colorScale.max,
                  normalizeFunction: "polynomial",
                },
              ],
            }}
            onRegionTipShow={() => false}
          />
        </div>

        <div className="flex justify-center space-x-6">
          <div className="flex items-center">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF1493] mr-2" />
            <span className="text-sm text-gray-600">United Kingdom</span>
          </div>
          <div className="flex items-center">
            <div className="w-2.5 h-2.5 rounded-full bg-[#0f0251] mr-2" />
            <span className="text-sm text-gray-600">Ghana</span>
          </div>
          <div className="flex items-center">
            <div className="w-2.5 h-2.5 rounded-full bg-[#E15B2D] mr-2" />
            <span className="text-sm text-gray-600">South Africa</span>
          </div>
        </div>
      </div>

      {/* Assets Overview Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-sm text-gray-600">Assets</h3>
            <Info className="h-3 w-3 text-gray-400" />
          </div>
          <span
            onClick={onEditAssetClick}
            className="text-navyLight text-sm hover:cursor-pointer"
          >
            Edit info
          </span>
        </div>

        <div className="w-full aspect-square max-w-[180px] mx-auto mb-3">
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
                    fill={assetData[index].color}
                    stroke="white"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Total Assets</span>
            <span className="text-lg font-bold">
              ${(79363.85).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Asset spread</span>
            <span className="text-sm font-bold">3 countries</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Asset Categories</span>
            <span className="text-sm font-bold">4</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Asset Locations</span>
            <div className="flex items-center justify-between">
              <p className="text-sm">Ghana, UK...</p>
              <button className="text-navyLight text-sm px-2 py-1">more</button>
            </div>
          </div>
        </div>

        {assetData.map((asset) => (
          <div key={asset.category} className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">{asset.category}</span>
              <span className="text-gray-900">{asset.percentage}%</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="w-full h-1 bg-gray-100 rounded-full mr-4">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${asset.percentage}%`,
                    backgroundColor: asset.color,
                  }}
                />
              </div>
              <span className="text-sm text-gray-600 whitespace-nowrap">
                ${asset.amount.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Card className="bg-white p-3 max-w-7xl mx-auto">
      {/* Header with Title and Icon */}
      <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-navy font-cirka">
            Balance Overview
          </h2>
          <Info className="h-3 w-3 text-gray-400" />
        </div>
        <MoreHorizontal className="h-3 w-3 text-gray-400" />
      </div>

      {/* Tabs */}
      <div className="bg-gray-50 rounded-lg p-1 mb-6">
        <div className="flex flex-wrap gap-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-md text-sm transition-colors ${
                activeTab === tab
                  ? "bg-white shadow-sm text-gray-900"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Animated Content Section */}
      <div className="transition-all duration-300 ease-in-out">
        {activeTab === "Assets" && <AssetsContent />}
        {activeTab === "Liabilities" && (
          <LiabilitiesContent
            liabilityData={liabilityData}
            openLiabilityModal={openLiabilityModal}
          />
        )}
        {activeTab === "Income" && (
          <IncomeSection
            income={income}
            openIncomeModal={openIncomeModal}
            openBudgetModal={openBudgetModal}
            openGenBudgetModal={openGenBudgetModal}
            generatedBudget={generatedBudget}
          />
        )}
        {activeTab === "Expenses" && (
          <ExpensesSection
            onEditClick={onEditExpenseClick}
            expenses={expenses}
          />
        )}
        {activeTab === "Income Vs Debt" && (
          <IncomeVsDebtSection
            openDebtModal={openDebtModal}
            openDebtServicingModal={openDebtServicingModal}
          />
        )}
        {activeTab === "Income Vs Expenditure" && (
          <IncomeVsExpenditure openStatementModal={openStatementModal} />
        )}
      </div>
    </Card>
  );
}
