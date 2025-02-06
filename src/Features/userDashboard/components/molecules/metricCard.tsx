import React from "react";
import { FinancialMetric } from "../../types";

interface MetricCardProps {
  title: string;
  metric: FinancialMetric;
  icon: React.ReactNode;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  metric,
  icon,
}) => {
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: metric.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h3 className="text-sm font-cirka text-navy font-medium">{title}</h3>
      </div>
      <p className="text-xl font-bold text-gray-900">
        {formatCurrency(metric.value)}
      </p>
    </div>
  );
};
