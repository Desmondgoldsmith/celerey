import React, { useEffect, useState } from "react";
import { CircleDollarSign, Shield, Heart, Info } from "lucide-react";
import { FinancialPlan, EmergencyPlan, FinancialGoal } from "../../types";
import { differenceInMonths, parseISO, format } from "date-fns";
import formatCurrency from "@/utils/formatCurrency";

interface FinancialGoalItemProps {
  goal: FinancialGoal;
  className?: string;
  onModifyGoal: (goal: FinancialGoal) => void;
  currency: string;
}

interface FinancialGoalsCardProps {
  goals: FinancialGoal[];
  onAddGoalClick: () => void;
  onModifyGoal: (goal: FinancialGoal) => void;
  currency: string;
}

const isEmergencyGoal = (goal: FinancialGoal) => {
  return goal?.type === "emergency";
};

// Helper function to get the appropriate icon based on plan name
const getIcon = (name: string) => {
  switch (name) {
    case "savings":
      return <CircleDollarSign className="w-5 h-5" />;
    case "emergency":
      return <Shield className="w-5 h-5" />;
    case "retirement":
      return <Heart className="w-5 h-5" />;
    default:
      return <CircleDollarSign className="w-5 h-5" />;
  }
};

const FinancialPlanItem: React.FC<FinancialGoalItemProps> = ({
  goal,
  className = "",
  onModifyGoal,
  currency,
}) => {
  const handleModifyClick = () => {
    onModifyGoal(goal);
  };

  const getMonthsBetweenDates = (
    startDate: string,
    endDate: string
  ): number => {
    if (!startDate || !endDate) return 0;
    return differenceInMonths(parseISO(endDate), parseISO(startDate));
  };

  const getCurrentValueLabel = (type: string) => {
    switch (type) {
      case "emergency":
        return "Current Duration";
      case "retirement":
        return "Current Amount";
      case "saving":
      case "savings":
        return "Current Savings";
      default:
        return "Current Amount";
    }
  };

  const getTargetValueLabel = (type: string) => {
    switch (type) {
      case "emergency":
        return "Target Duration";
      case "retirement":
        return "Target Amount";
      case "saving":
      case "savings":
        return "Target Amount";
      default:
        return "Target Amount";
    }
  };

  const getCurrentAmountDisplay = (): string => {
    if (isEmergencyGoal(goal)) {
      return `${goal?.currentValue || 0} `;
    }
    return formatCurrency(
      String(goal?.currentValue || "0"),
      currency
    ).toString();
  };

  const getTargetAmountDisplay = (): string => {
    if (isEmergencyGoal(goal)) {
      return `${goal?.targetValue || 0} `;
    }
    return formatCurrency(
      String(goal?.targetValue || "0"),
      currency
    ).toString();
  };

  const hasTargetValue =
    goal?.targetValue !== undefined && goal?.targetValue !== null;
  const hasGoalDuration = goal?.startDate && goal?.endDate;

  return (
    <div className={`relative w-full ${className}`}>
      <h3 className="font-medium text-lg mb-2">{goal.name}</h3>

      <p className="text-xl font-bold mb-2">
        {Number(goal?.percentage || 0).toFixed(0)}%
      </p>

      {/* Progress bar section */}
      <div className="mb-3">
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-navy transition-all duration-300"
            style={{ width: `${goal?.percentage || 0}%` }}
          />
        </div>
      </div>

      {/* Plan details */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <p className="text-sm text-gray-600">
            {getCurrentValueLabel(goal?.type || "")}
          </p>
          <p className="font-bold text-base">{getCurrentAmountDisplay()}</p>
        </div>

        {hasTargetValue && (
          <div>
            <p className="text-sm text-gray-600">
              {getTargetValueLabel(goal?.type || "")}
            </p>
            <p className="text-gray-400">{getTargetAmountDisplay()}</p>
          </div>
        )}

        {goal?.type !== "retirement" && (
          <div>
            <p className="text-sm text-gray-600">Goal Duration</p>
            {hasGoalDuration ? (
              <p className="text-base font-bold">
                {getMonthsBetweenDates(
                  goal?.startDate || "",
                  goal?.endDate || ""
                )}{" "}
                months
              </p>
            ) : (
              <div className="flex items-center mt-1">
                <button
                  onClick={handleModifyClick}
                  className="text-white rounded-md px-3 py-1 bg-navy text-xs font-bold"
                >
                  Add
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <button
        onClick={handleModifyClick}
        className="absolute top-0 right-0 text-navy rounded-md px-3 py-1 bg-white border border-navy text-xs font-bold hover:text-navyLight hover:border-navyLight"
      >
        Modify
      </button>
    </div>
  );
};

export const FinancialGoalsCard: React.FC<FinancialGoalsCardProps> = ({
  goals,
  onAddGoalClick,
  onModifyGoal,
  currency,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the screen is mobile sized
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px breakpoint for mobile
    };

    // Initial check
    checkIsMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIsMobile);

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  const emergencyGoal = goals.find((goal) => goal.type === "emergency");
  const retirementGoal = goals.find((goal) => goal.type === "retirement");
  const savingsGoal = goals.find(
    (goal) => goal.type === "savings" || goal.type === "saving"
  );

  const additionalGoals = goals.filter((goal) => {
    return (
      goal.type !== "emergency" &&
      goal.type !== "retirement" &&
      goal.type !== "savings" &&
      goal.type !== "saving"
    );
  });

  // For mobile view, combine all goals into a single array for carousel
  const mobileGoals = [
    emergencyGoal,
    retirementGoal,
    savingsGoal,
    ...additionalGoals,
  ].filter(Boolean); // Filter out any undefined goals

  // Calculate total pages needed
  const totalAdditionalPages = Math.ceil(additionalGoals.length / 4);
  const totalPages = isMobile
    ? Math.ceil(mobileGoals.length / 1) // 1 goal per page on mobile
    : 1 + totalAdditionalPages;

  // Get goals for the current page
  const getCurrentPageGoals = () => {
    if (isMobile) {
      // For mobile, show one goal per page
      const startIdx = currentPage;
      return [mobileGoals[startIdx]];
    } else {
      if (currentPage === 0) {
        // First page shows standard goals on desktop
        return [];
      } else {
        // Get additional goals for this page (4 per page) on desktop
        const startIdx = (currentPage - 1) * 4;
        const endIdx = startIdx + 4;
        return additionalGoals.slice(startIdx, endIdx);
      }
    }
  };

  // Determine if pagination should be shown
  const shouldShowPagination = isMobile
    ? mobileGoals.length > 0
    : additionalGoals.length > 0;

  return (
    <div className="bg-white rounded-lg p-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          {/* <CircleDollarSign className="w-5 h-5 text-navy" /> */}
          <h2 className="text-xl font-bold text-navy font-cirka flex items-center gap-1">
            Financial Goals <Info className="h-3 w-3 text-gray-400" />
          </h2>
        </div>
        <h3 className="text-xl font-medium">{goals.length} Financial plans</h3>
      </div>

      <div
        className={`${
          isMobile ? "grid grid-cols-1 gap-4" : "grid grid-cols-2 gap-4"
        }`}
      >
        {isMobile ? (
          // Mobile view with carousel
          <>
            {mobileGoals.length > 0 && currentPage < mobileGoals.length && (
              <div className="border rounded-lg p-4">
                <FinancialPlanItem
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  goal={mobileGoals[currentPage]}
                  onModifyGoal={onModifyGoal}
                  className="relative"
                  currency={currency}
                />
              </div>
            )}

            {/* Financial Goal button - always visible on mobile */}
            <div className="flex items-center justify-center border rounded-lg border-dashed border-gray-300 p-4">
              <button
                onClick={onAddGoalClick}
                className="flex items-center border border-navy rounded-sm p-1 justify-center text-navy hover:text-navyLight font-medium"
              >
                Add Financial Goal
              </button>
            </div>
          </>
        ) : // Desktop view
        currentPage === 0 ? (
          // First page with standard goals
          <>
            {/* Top-left: Emergency Fund */}
            <div className="border rounded-lg p-4">
              {emergencyGoal ? (
                <FinancialPlanItem
                  goal={emergencyGoal}
                  onModifyGoal={onModifyGoal}
                  className="relative"
                  currency={currency}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <p className="text-gray-500 mb-2">No Emergency Fund</p>
                  <button
                    onClick={onAddGoalClick}
                    className="text-white rounded-md px-3 py-1 bg-navy text-xs font-bold"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>

            {/* Top-right: Retirement Fund */}
            <div className="border rounded-lg p-4">
              {retirementGoal ? (
                <FinancialPlanItem
                  goal={retirementGoal}
                  onModifyGoal={onModifyGoal}
                  className="relative"
                  currency={currency}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <p className="text-gray-500 mb-2">No Retirement Fund</p>
                  <button
                    onClick={onAddGoalClick}
                    className="text-white rounded-md px-3 py-1 bg-navy text-xs font-bold"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>

            {/* Bottom-left: Savings Plan */}
            <div className="border rounded-lg p-4">
              {savingsGoal ? (
                <FinancialPlanItem
                  goal={savingsGoal}
                  onModifyGoal={onModifyGoal}
                  className="relative"
                  currency={currency}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <p className="text-gray-500 mb-2">No Savings Plan</p>
                  <button
                    onClick={onAddGoalClick}
                    className="text-white rounded-md px-3 py-1 bg-navy text-xs font-bold"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>

            {/* Bottom-right: Add Financial Goal button */}
            <div className="flex items-center justify-center border rounded-lg border-dashed border-gray-300 p-4">
              <button
                onClick={onAddGoalClick}
                className="flex items-center border border-navy rounded-sm p-1 justify-center text-navy hover:text-navyLight font-medium"
              >
                Add Financial Goal
              </button>
            </div>
          </>
        ) : (
          // Additional pages with extra goals (4 per page)
          getCurrentPageGoals().map((goal, idx) => (
            <div key={goal?.id || idx} className="border rounded-lg p-4">
              <FinancialPlanItem
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                goal={goal}
                onModifyGoal={onModifyGoal}
                className="relative"
                currency={currency}
              />
            </div>
          ))
        )}
      </div>

      {/* Pagination dots - adjust for mobile */}
      {shouldShowPagination && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentPage === idx ? "bg-navy" : "bg-gray-300"
              }`}
              aria-label={`Go to page ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Mobile navigation arrows - only on mobile */}
      {isMobile && mobileGoals.length > 1 && (
        <div className="flex justify-between mt-4">
          <button
            onClick={() =>
              setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev))
            }
            disabled={currentPage === 0}
            className={`p-2 rounded-full ${
              currentPage === 0 ? "text-gray-300" : "text-navy"
            }`}
            aria-label="Previous goal"
          >
            ←
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                prev < mobileGoals.length - 1 ? prev + 1 : prev
              )
            }
            disabled={currentPage === mobileGoals.length - 1}
            className={`p-2 rounded-full ${
              currentPage === mobileGoals.length - 1
                ? "text-gray-300"
                : "text-navy"
            }`}
            aria-label="Next goal"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
};

export default FinancialGoalsCard;
