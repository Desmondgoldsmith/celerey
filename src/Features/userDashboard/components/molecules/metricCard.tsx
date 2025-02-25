import React from "react";
import { Info } from "lucide-react";
import { FinancialMetric } from "../../types";
import formatCurrency from "@/utils/formatCurrency";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MetricCardProps {
  title: string;
  metric: FinancialMetric;
  icon: React.ReactNode;
  currency: string;
  infoText?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  metric,
  icon,
  currency,
  infoText,
}) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h3 className="text-sm font-cirka text-navy font-medium">{title}</h3>

        {/* Info icon with tooltip */}
        {infoText && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="ml-1 focus:outline-none"
                  aria-label={`Information about ${title}`}
                >
                  <Info className="h-4 w-4 text-gray-400" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-sm">{infoText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <p className="text-xl font-bold text-gray-900">
        {formatCurrency(metric?.value?.toString() || "0", currency)}
      </p>
    </div>
  );
};
