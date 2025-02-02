import React from "react";
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
  CircleDollarSign,
  User,
  Upload,
  MessageSquare,
  Bell,
  Search,
  Calendar,
} from "lucide-react";
import type { FinancialPlan } from "../../types";

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

  const handleSaveModifiedGoal = (modifiedGoal: FinancialPlan) => {
    setFinancialPlans((prev) =>
      prev.map((plan) =>
        plan.name === modifiedGoal.name ? modifiedGoal : plan
      )
    );
    setSelectedPlan(undefined);
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

        {/* Main Content Grid: Financial Goals and Balance Overview */}
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
          />
        </div>

        {/* Financial Knowledge Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <User className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-bold">Financial Knowledge</h2>
            <span className="text-sm text-gray-500">ⓘ</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Risk Attitude */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-900">
                  Your Risk Attitude
                </h3>
                <button className="text-indigo-600 text-sm px-2 py-1 rounded-full bg-indigo-100">
                  View Details
                </button>
              </div>
              <p className="text-xl font-bold">Somewhat Aggressive</p>
            </div>

            {/* Investment Experience */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-900">
                  Your Investment Experience
                </h3>
                <button className="text-indigo-600 text-sm px-2 py-1 rounded-full bg-indigo-100">
                  View Details
                </button>
              </div>
              <p className="text-xl font-bold">Advanced</p>
            </div>

            {/* Financial Knowledge Assessment */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-900">
                  Financial Knowledge Assessment
                </h3>
                <button className="text-indigo-600 text-sm px-2 py-1 rounded-full bg-indigo-100">
                  View Details
                </button>
              </div>
              <p className="text-xl font-bold">Intermediate</p>
            </div>
          </div>

          {/* Description and Action */}
          <div className="mt-6 flex justify-between items-start gap-6">
            <p className="text-gray-600 flex-grow">
              You are a <span className="font-medium">somewhat aggressive</span>{" "}
              risk taker with an <span className="font-medium">advanced</span>{" "}
              investment experience. Notwithstanding this, your financial
              knowledge is <span className="font-medium">intermediate</span>.
              This means you have a fair grasp of finance. Although you are not
              an expert, you understand how macroeconomics works in relation to
              financial instruments. We can offer investment advice and assist
              you with proven risk management techniques to potentially improve
              your outcomes.
            </p>
            <button className="text-indigo-600 whitespace-nowrap hover:text-indigo-700">
              Speak to an Advisor
            </button>
          </div>
        </div>

        {/* Quick Actions Footer */}
        <div className="flex justify-end gap-4">
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <PiggyBank className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <CircleDollarSign className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <User className="w-5 h-5 text-gray-600" />
          </button>
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
    </DashboardLayout>
  );
};

export default Dashboard;
