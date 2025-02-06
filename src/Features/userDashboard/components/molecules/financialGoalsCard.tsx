import React from "react";
import { CircleDollarSign, Shield, Heart } from "lucide-react";

interface FinancialPlan {
  name: string;
  currentAmount: number;
  targetAmount: number;
  progress: number;
  durationStart: string;
  durationEnd: string;
  goalDuration: number;
  durationLeft: number;
}

interface FinancialPlanItemProps {
  plan: FinancialPlan;
  className?: string;
  onModify: (plan: FinancialPlan) => void;
}

interface FinancialGoalsCardProps {
  plans: FinancialPlan[];
  onAddGoalClick: () => void;
  onModifyGoal: (plan: FinancialPlan) => void;
}

// Helper function to determine the appropriate icon based on plan type
const getIcon = (name: string) => {
  switch (name) {
    case "Savings Plan":
      return <CircleDollarSign className="w-5 h-5" />;
    case "Emergency Fund":
      return <Shield className="w-5 h-5" />;
    case "Retirement Fund":
      return <Heart className="w-5 h-5" />;
    default:
      return <CircleDollarSign className="w-5 h-5" />;
  }
};

// Helper function to determine progress bar color based on completion percentage
const getProgressBarColor = (progress: number): string => {
  if (progress < 30) return "bg-red-500";
  if (progress < 70) return "bg-yellow-500";
  return "bg-green-500";
};

const FinancialPlanItem: React.FC<FinancialPlanItemProps> = ({
  plan,
  className = "",
  onModify,
}) => {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Progress bar section  */}
      <div className="mb-3 sm:mb-4">
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full ${getProgressBarColor(
              plan.progress
            )} transition-all duration-300`}
            style={{ width: `${plan.progress}%` }}
          />
        </div>
        <p className="text-lg sm:text-xl font-bold mt-2">
          {plan.progress.toFixed(1)}%
        </p>
      </div>

      {/* Plan details card */}
      <div className="p-3 sm:p-4 bg-white rounded-lg border border-gray-100">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {getIcon(plan.name)}
            <span className="font-medium text-gray-900 text-sm sm:text-base">
              {plan.name}
            </span>
          </div>
          <button
            onClick={() => onModify(plan)}
            className="text-navy text-sm hover:text-navy transition-colors px-2 py-1 sm:p-0"
          >
            Modify
          </button>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-3 sm:gap-y-2 text-sm">
          {/* Current Amount/Savings */}
          <div>
            <p className="text-gray-600">
              {plan.name === "Emergency Fund"
                ? "Current Amount"
                : "Current Savings"}
            </p>
            <p className="font-medium text-gray-900">
              {formatCurrency(plan.currentAmount)}
            </p>
          </div>

          {/* Duration Start */}
          <div>
            <p className="text-gray-600">Duration Start</p>
            <p className="text-green-600 font-medium">{plan.durationStart}</p>
          </div>

          {/* Target Amount */}
          <div>
            <p className="text-gray-600">Target Amount</p>
            <p className="text-gray-400">{formatCurrency(plan.targetAmount)}</p>
          </div>

          {/* Duration End */}
          <div>
            <p className="text-gray-600">Duration End</p>
            <p className="text-gray-400">{plan.durationEnd}</p>
          </div>

          {/* Goal Duration */}
          <div>
            <p className="text-gray-600">Goal Duration</p>
            <p className="font-medium text-gray-900">
              {plan.goalDuration} months
            </p>
          </div>

          {/* Duration Left */}
          <div>
            <p className="text-gray-600">Duration Left</p>
            <p className="text-red-500 font-medium">
              {plan.durationLeft} months
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FinancialGoalsCard: React.FC<FinancialGoalsCardProps> = ({
  plans,
  onAddGoalClick,
  onModifyGoal,
}) => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const plansPerPage = window.innerWidth < 640 ? 2 : 4;
  const totalPages = Math.ceil((plans.length + 1) / plansPerPage);

  const getCurrentPagePlans = (): FinancialPlan[] => {
    const startIdx = currentPage * plansPerPage;
    let endIdx = startIdx + plansPerPage;

    if (currentPage === 0) {
      endIdx = plansPerPage - 1;
      return plans.slice(startIdx, endIdx);
    }

    return plans.slice(startIdx - 1, endIdx - 1);
  };

  return (
    <div className="bg-white rounded-lg p-3 shadow-sm">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <CircleDollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
          <h2 className="text-lg sm:text-xl font-cirka text-navy font-medium">
            Financial Goals
          </h2>
          <span className="text-sm text-gray-500 hover:cursor-pointer">ⓘ</span>
        </div>
      </div>

      {/* Plans Count  */}
      <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
        {plans.length} financial plans
      </h3>

      {/* Grid Container  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
        {/* Decorative lines */}
        <div className="hidden sm:block absolute right-1/2 top-0 bottom-0 border-l border-dashed border-gray-200 -ml-3" />
        <div className="hidden sm:block absolute left-0 right-0 top-1/2 border-t border-dashed border-gray-200" />

        {/* Render current page plans */}
        {getCurrentPagePlans().map((plan) => (
          <FinancialPlanItem
            key={plan.name}
            plan={plan}
            onModify={onModifyGoal}
            className="relative"
          />
        ))}

        {/* Add Financial Goal button */}
        {currentPage === 0 && (
          <div className="flex items-center justify-center min-h-[150px] sm:min-h-[200px] border rounded-lg border-dashed border-gray-300">
            <button
              onClick={onAddGoalClick}
              className="text-navy text-sm hover:text-navyLight font-medium transition-colors px-4 py-2 sm:p-0"
            >
              Add Financial Goal
            </button>
          </div>
        )}
      </div>

      {/* Pagination dots */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6 sm:mt-4">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentPage === idx ? "bg-navy" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FinancialGoalsCard;
