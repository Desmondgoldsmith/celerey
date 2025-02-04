import React, { useState } from "react";
import { DashboardLayout } from "./dashboardLayout";
import { MetricCard } from "../molecules/metricCard";
import { FinancialGoalsCard } from "../molecules/financialGoalsCard";
import BalanceOverviewCard from "../molecules/balanceOverview";
import AddFinancialGoalModal from "../molecules/addFinancialGoalModal";
import PortfolioRecommendationsModal from "../molecules/portfolioRecommendationModal";
import { DUMMY_DASHBOARD_DATA } from "../../constants";
import {
  Wallet,
  PiggyBank,
  TrendingUp,
  TrendingDown,
  Banknote,
  User,
  Upload,
  MessageSquare,
  Bell,
  Search,
  Calendar,
} from "lucide-react";
import type {
  AssetType,
  CountryType,
  ExpenseItem,
  FinancialPlan,
  IncomeItem,
} from "../../types";
import EditAssetModal from "../molecules/editAssetModal";
import EditIncomeModal from "../molecules/editIncomeModal";
import EditExpenseModal from "../molecules/editExpenseModal";
import RiskAttitudeModal from "../molecules/riskAttitudeModal";
import InvestmentExperienceModal from "../molecules/investmentExperience";
import FinancialKnowledgeModal from "../molecules/financialknowledgeModal";
import EditDebtModal from "../molecules/editDebtModal";
import { useRouter } from "next/navigation";

export const Dashboard: React.FC = () => {
  const [isAddGoalModalOpen, setIsAddGoalModalOpen] = React.useState(false);
  const [financialPlans, setFinancialPlans] = React.useState<FinancialPlan[]>(
    DUMMY_DASHBOARD_DATA.financialPlans
  );
  const [selectedPlan, setSelectedPlan] = React.useState<
    FinancialPlan | undefined
  >();
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = React.useState(false);

  const handlePortfolioRecommendationClick = () => {
    setIsPortfolioModalOpen(true);
  };

  const handleAddGoal = (newGoal: FinancialPlan) => {
    if (selectedPlan) {
      // If modifying, update existing plan
      setFinancialPlans((prev) =>
        prev.map((plan) => (plan.name === newGoal.name ? newGoal : plan))
      );
    } else {
      // If adding new plan
      setFinancialPlans((prev) => [...prev, newGoal]);
    }
  };

  const handleModifyGoal = (plan: FinancialPlan) => {
    setSelectedPlan(plan);
    setIsAddGoalModalOpen(true);
  };

  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isEditDebtModalOpen, setIsEditDebtModalOpen] = useState(false);
  const [incomeData, setIncomeData] = useState<IncomeItem[]>([
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
  ]);
  console.log(incomeData);

  const handleSaveIncome = (updatedIncome: IncomeItem[]) => {
    setIncomeData(updatedIncome);
  };

  const openIncomeModal = () => {
    setIsIncomeModalOpen(true);
  };

  const openDebtModal = () => {
    setIsEditDebtModalOpen(true);
  };

  const handleSaveModifiedGoal = (modifiedGoal: FinancialPlan) => {
    setFinancialPlans((prev) =>
      prev.map((plan) =>
        plan.name === modifiedGoal.name ? modifiedGoal : plan
      )
    );
    setSelectedPlan(undefined);
  };

  const [isEditAssetModalOpen, setIsEditAssetModalOpen] = React.useState(false);
  const [isViewRiskModal, setisViewRiskModal] = React.useState(false);
  const [isViewInvestModal, setisViewInvestModal] = React.useState(false);
  const [isViewFinancialModal, setisViewFinancialModal] = React.useState(false);
  const [userAssets, setUserAssets] = React.useState<AssetType[]>([
    { id: "1", category: "Real Estate", amount: 13252.13 },
    { id: "2", category: "Cash", amount: 43693.52 },
    { id: "3", category: "Public Securities", amount: 73953.05 },
    { id: "4", category: "Private Securities", amount: 85386.94 },
  ]);
  const [userCountries, setUserCountries] = React.useState<CountryType[]>([
    { id: "1", name: "South Africa" },
    { id: "2", name: "Ghana" },
    { id: "3", name: "United Kingdom" },
  ]);

  const handleEditAssetClick = () => {
    setIsEditAssetModalOpen(true);
  };

  const handleViewRiskModal = () => {
    setisViewRiskModal(true);
  };

  const handleViewFinancialModal = () => {
    setisViewFinancialModal(true);
  };

  const handleViewInvestModal = () => {
    setisViewInvestModal(true);
  };

  const handleSaveAssets = (assets: AssetType[], countries: CountryType[]) => {
    setUserAssets(assets);
    setUserCountries(countries);
  };

  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [expensesData, setExpensesData] = useState<ExpenseItem[]>([
    {
      category: "Home",
      amount: 33472.81,
      percentage: 18,
      color: "#1B1856",
    },
    {
      category: "Healthcare",
      amount: 25353.94,
      percentage: 8,
      color: "#D3D3D3",
    },
    {
      category: "Education",
      amount: 14353.89,
      percentage: 23,
      color: "#FF69B4",
    },
    {
      category: "Travel",
      amount: 23253.43,
      percentage: 15,
      color: "#E15B2D",
    },
    {
      category: "Giving",
      amount: 19343.65,
      percentage: 13,
      color: "#383396",
    },
    {
      category: "Childcare",
      amount: 14353.89,
      percentage: 20,
      color: "#8BA78D",
    },
  ]);

  const handleSaveExpenses = (updatedExpenses: ExpenseItem[]) => {
    setExpensesData(updatedExpenses);
    setIsExpenseModalOpen(false);
  };

  const router = useRouter();
  const handleAdvisors = () => {
    router.push("/advisors");
  };
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-3 pt-4 space-y-6">
        {/* Header Container */}
        <div className="bg-white rounded-2xl p-3">
          {/* Main Row */}
          <div className="flex justify-between items-start">
            {/* Left Section */}
            <div className="space-y-2">
              <h1 className="text-4xl font-cirka tracking-tight">
                Welcome, Jude!
              </h1>
              <div className="flex items-center gap-1.5">
                <span className="text-sm">Premium Account</span>
                <span className="text-gray-400 text-sm hover:cursor-pointer">
                  ⓘ
                </span>
              </div>
              <p className="text-gray-400 text-medium">
                Manage your money easily with Celerey.
              </p>
            </div>

            {/* Center Section - Action Buttons */}
            <div className="flex flex-col items-center">
              <div className="flex gap-4 mb-4">
                <button className="flex items-center gap-2 px-3 py-3 bg-navy text-white rounded-full text-sm">
                  Book Virtual Consultation
                  <span className="text-sm">›</span>
                </button>
                <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-full text-sm">
                  View Advisors Recommendations
                  <span className="text-sm">›</span>
                </button>
              </div>
              <a href="#" className="text-navy text-sm underline">
                Upload Financial Documents
              </a>
            </div>

            {/* Right Section */}
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-2 py-2 bg-gray-50 rounded-xl text-gray-600">
                  <Calendar className="h-3 w-3" />
                  <span>January 20, 2025</span>
                </div>
                <button className="flex items-center gap-2 px-2 py-2 bg-navy text-white rounded-xl">
                  Export
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-full border">
                  <Upload className="h-3 w-3 text-gray-600" />
                </button>
                <button className="p-2 rounded-full border relative">
                  <MessageSquare className="h-3 w-3 text-gray-600" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="p-2 rounded-full border">
                  <Bell className="h-3 w-3 text-gray-600" />
                </button>
                <button className="p-2 rounded-full border">
                  <Search className="h-3 w-3 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <MetricCard
            title="Net Worth"
            metric={DUMMY_DASHBOARD_DATA.netWorth}
            icon={<Wallet className="h-5 w-5 text-gray-400" />}
          />
          <MetricCard
            title="Balance"
            metric={DUMMY_DASHBOARD_DATA.balance}
            icon={<PiggyBank className="h-5 w-5 text-gray-400" />}
          />
          <MetricCard
            title="Income"
            metric={DUMMY_DASHBOARD_DATA.income}
            icon={<TrendingUp className="h-5 w-5 text-gray-400" />}
          />
          <MetricCard
            title="Expenses"
            metric={DUMMY_DASHBOARD_DATA.expenses}
            icon={<TrendingDown className="h-5 w-5 text-gray-400" />}
          />
          <MetricCard
            title="Savings"
            metric={DUMMY_DASHBOARD_DATA.savings}
            icon={<Banknote className="h-5 w-5 text-gray-400" />}
          />
        </div>

        {/* Financial Goals and Balance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FinancialGoalsCard
            plans={financialPlans}
            onAddGoalClick={() => {
              setSelectedPlan(undefined);
              setIsAddGoalModalOpen(true);
            }}
            onModifyGoal={handleModifyGoal}
          />
          <BalanceOverviewCard
            onPortfolioRecommendationClick={handlePortfolioRecommendationClick}
            onEditAssetClick={handleEditAssetClick}
            assets={userAssets}
            countries={userCountries}
            income={handleSaveIncome}
            openIncomeModal={openIncomeModal}
            expenses={expensesData}
            onEditExpenseClick={() => setIsExpenseModalOpen(true)}
            openDebtModal={openDebtModal}
          />
        </div>

        {/* Financial Knowledge Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <User className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-bold font-cirka text-navy">
              Financial Knowledge
            </h2>
            <span
              className="text-sm text-gray-500"
              title="Your financial knowledge is assessed based on your understanding of financial concepts and principles."
            >
              ⓘ
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Risk Attitude */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium  font-cirka text-navy">
                  Your Risk Attitude
                </h3>
                <button
                  onClick={handleViewRiskModal}
                  className="text-navyLight text-sm px-2 py-1 rounded-full bg-indigo-100"
                >
                  View Details
                </button>
              </div>
              <p className="text-xl font-bold font-cirka text-navy">
                Somewhat Aggressive
              </p>
            </div>

            {/* Investment Experience */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium font-cirka text-navy">
                  Your Investment Experience
                </h3>
                <button
                  onClick={handleViewInvestModal}
                  className="text-navyLight text-sm px-2 py-1 rounded-full bg-indigo-100"
                >
                  View Details
                </button>
              </div>
              <p className="text-xl font-bold font-cirka text-navy">Advanced</p>
            </div>

            {/* Financial Knowledge Assessment */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium  font-cirka text-navy ">
                  Financial Knowledge Assessment
                </h3>
                <button
                  onClick={handleViewFinancialModal}
                  className="text-navyLight text-sm px-2 py-1 rounded-full bg-indigo-100"
                >
                  View Details
                </button>
              </div>
              <p className="text-xl font-bold font-cirka text-navy">
                Intermediate
              </p>
            </div>
          </div>

          {/* Description and Action */}
          <div className="mt-6 flex justify-between items-start gap-6">
            <p className="text-gray-600 flex-grow">
              You are a{" "}
              <span className="font-medium ">somewhat aggressive</span> risk
              taker with an <span className="font-medium ">advanced</span>{" "}
              investment experience. Notwithstanding this, your financial
              knowledge is <span className="font-medium ">intermediate</span>.
              This means you have a fair grasp of finance. Although you are not
              an expert, you understand how macroeconomics works in relation to
              financial instruments. We can offer investment advice and assist
              you with proven risk management techniques to potentially improve
              your outcomes.
            </p>
            <button
              onClick={handleAdvisors}
              className="text-navyLight whitespace-nowrap hover:text-navy"
            >
              Speak to an Advisor
            </button>
          </div>
        </div>
      </div>

      <AddFinancialGoalModal
        isOpen={isAddGoalModalOpen}
        onClose={() => {
          setIsAddGoalModalOpen(false);
          setSelectedPlan(undefined);
        }}
        onAddGoal={selectedPlan ? handleSaveModifiedGoal : handleAddGoal}
        initialData={selectedPlan}
        isModifying={!!selectedPlan}
      />

      <PortfolioRecommendationsModal
        isOpen={isPortfolioModalOpen}
        onClose={() => setIsPortfolioModalOpen(false)}
      />

      <EditAssetModal
        isOpen={isEditAssetModalOpen}
        onClose={() => setIsEditAssetModalOpen(false)}
        onSave={handleSaveAssets}
        initialAssets={userAssets}
        initialCountries={userCountries}
      />

      <EditIncomeModal
        isOpen={isIncomeModalOpen}
        onClose={() => setIsIncomeModalOpen(false)}
        onSave={handleSaveIncome}
      />

      <EditExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
        onSave={handleSaveExpenses}
        initialExpenses={expensesData}
      />

      <RiskAttitudeModal
        isOpen={isViewRiskModal}
        onClose={() => setisViewRiskModal(false)}
      />

      <InvestmentExperienceModal
        isOpen={isViewInvestModal}
        onClose={() => setisViewInvestModal(false)}
      />

      <FinancialKnowledgeModal
        isOpen={isViewFinancialModal}
        onClose={() => setisViewFinancialModal(false)}
      />

      <EditDebtModal
        isOpen={isEditDebtModalOpen}
        onClose={() => setIsEditDebtModalOpen(false)}
        onSave={(updatedDebts) => {
          console.log(updatedDebts);
          setIsEditDebtModalOpen(false);
        }}
      />
    </DashboardLayout>
  );
};

export default Dashboard;
