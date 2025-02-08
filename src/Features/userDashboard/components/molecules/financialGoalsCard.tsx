import React from "react";
import { CircleDollarSign, Shield, Heart } from "lucide-react";
import { FinancialPlan, EmergencyPlan } from "../../types";

interface FinancialPlanItemProps {
  plan: FinancialPlan | EmergencyPlan;
  className?: string;
  onModifyEmergency: (plan: EmergencyPlan) => void;
  onModifyGoal: (plan: FinancialPlan) => void;
}

interface FinancialGoalsCardProps {
  plans: (FinancialPlan | EmergencyPlan)[];
  onAddGoalClick: () => void;
  onModifyGoal: (plan: FinancialPlan) => void;
  onModifyEmergency: (plan: EmergencyPlan) => void;
}

const isEmergencyPlan = (
  plan: FinancialPlan | EmergencyPlan
): plan is EmergencyPlan => {
  return plan.name === "Emergency Fund";
};

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

const getProgressBarColor = (progress: number): string => {
  if (progress < 30) return "bg-red-500";
  if (progress < 70) return "bg-yellow-500";
  return "bg-green-500";
};

const FinancialPlanItem: React.FC<FinancialPlanItemProps> = ({
  plan,
  className = "",
  onModifyEmergency,
  onModifyGoal,
}) => {
  const handleModifyClick = () => {
    if (isEmergencyPlan(plan)) {
      onModifyEmergency(plan);
    } else {
      onModifyGoal(plan);
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getCurrentAmountLabel = (): string => {
    if (isEmergencyPlan(plan)) {
      return "Duration";
    }
    return plan.name === "Retirement Fund"
      ? "Current Amount"
      : "Current Savings";
  };

  const getCurrentAmountDisplay = (): string => {
    if (isEmergencyPlan(plan)) {
      return `${plan.duration} months`;
    }
    return formatCurrency(plan.currentAmount);
  };

  const getTargetAmountDisplay = (): string => {
    if (isEmergencyPlan(plan)) {
      return `${plan.targetDuration} months`;
    }
    return formatCurrency(plan.targetAmount);
  };

  return (
    <div className={`relative w-full ${className}`}>
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

      <div className="p-3 sm:p-4 bg-white rounded-lg border border-gray-100">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {getIcon(plan.name)}
            <span className="font-medium text-gray-900 text-sm sm:text-base">
              {plan.name}
            </span>
          </div>
          <button
            onClick={handleModifyClick}
            className="text-navy text-sm hover:text-navy transition-colors px-2 py-1 sm:p-0"
          >
            Modify
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-3 sm:gap-y-2 text-sm">
          <div>
            <p className="text-gray-600">{getCurrentAmountLabel()}</p>
            <p className="font-medium text-gray-900">
              {getCurrentAmountDisplay()}
            </p>
          </div>

          <div>
            <p className="text-gray-600">Duration Start</p>
            <div className="flex items-center justify-between">
              <p className="text-green-600 font-medium">
                {plan.durationStart || "Not Set"}
              </p>
              {!plan.durationStart && (
                <button
                  onClick={handleModifyClick}
                  className="text-navy text-xs font-bold hover:text-navyLight"
                >
                  Add
                </button>
              )}
            </div>
          </div>

          <div>
            <p className="text-gray-600">
              {isEmergencyPlan(plan) ? "Target Duration" : "Target Amount"}
            </p>
            <p className="text-gray-400">{getTargetAmountDisplay()}</p>
          </div>

          <div>
            <p className="text-gray-600">Duration End</p>
            <div className="flex items-center justify-between">
              <p className="text-gray-400">{plan.durationEnd || "Not Set"}</p>
              {!plan.durationEnd && (
                <button
                  onClick={handleModifyClick}
                  className="text-navy text-xs font-bold hover:text-navyLight"
                >
                  Add
                </button>
              )}
            </div>
          </div>

          <div>
            <p className="text-gray-600">Goal Duration</p>
            <p className="font-medium text-gray-900">
              {plan.goalDuration} months
            </p>
          </div>

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
  onModifyEmergency,
}) => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const plansPerPage = window.innerWidth < 640 ? 2 : 4;
  const totalPages = Math.ceil((plans.length + 1) / plansPerPage);

  const getCurrentPagePlans = () => {
    const startIdx = currentPage * plansPerPage;
    let endIdx = startIdx + plansPerPage;

    // Show all types of plans on the first page
    if (currentPage === 0) {
      endIdx = plansPerPage - 1;
      return plans.slice(startIdx, endIdx);
    }

    // Show remaining plans on subsequent pages
    return plans.slice(startIdx - 1, endIdx - 1);
  };

  return (
    <div className="bg-white rounded-lg p-3 shadow-sm">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <CircleDollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
          <h2 className="text-lg sm:text-xl font-cirka text-navy font-medium">
            Financial & Emergency Goals
          </h2>
          <span className="text-sm text-gray-500 hover:cursor-pointer">ⓘ</span>
        </div>
      </div>

      <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
        {plans.length} plans
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
        <div className="hidden sm:block absolute right-1/2 top-0 bottom-0 border-l border-dashed border-gray-200 -ml-3" />
        <div className="hidden sm:block absolute left-0 right-0 top-1/2 border-t border-dashed border-gray-200" />

        {getCurrentPagePlans().map((plan) => (
          <FinancialPlanItem
            key={plan.name}
            plan={plan}
            onModifyEmergency={onModifyEmergency}
            onModifyGoal={onModifyGoal}
            className="relative"
          />
        ))}

        {currentPage === 0 && (
          <div className="flex items-center justify-center min-h-[150px] sm:min-h-[200px] border rounded-lg border-dashed border-gray-300">
            <button
              onClick={onAddGoalClick}
              className="text-navy text-sm hover:text-navyLight font-medium transition-colors px-4 py-2 sm:p-0"
            >
              Add Goal
            </button>
          </div>
        )}
      </div>

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
