import React from "react";
import { Card } from "@/components/ui/card";
import { Info, MoreHorizontal } from "lucide-react";
import { ApexOptions } from "apexcharts";
import { ChartType } from "../../types";

interface RiskAllocationProps {
  Chart: ChartType;
}

export const RiskAllocation: React.FC<RiskAllocationProps> = ({ Chart }) => {
  // Financial data constants
  const financialGoal = 54000;
  const currentAmount = 1329;
  const targetAmount = 2571;
  const monthsToGoal = 21;

  // Gauge chart configuration for risk level
  const gaugeChartOptions: ApexOptions = {
    chart: {
      type: "radialBar",
      height: 250,
      sparkline: {
        enabled: true,
      },
    },
    colors: ["#4ADE80"],
    plotOptions: {
      radialBar: {
        startAngle: 0,
        endAngle: 90,
        hollow: {
          size: "55%",
        },
        track: {
          background: "#808285",
          strokeWidth: "100%",
        },
        dataLabels: {
          name: {
            show: true,
            color: "#111827",
            fontSize: "16px",
            fontWeight: "500",
            offsetY: 10,
            fontFamily: "Helvetica",
          },
          value: {
            show: false,
          },
        },
      },
    },
    labels: ["Low"],
  };

  // Area chart configuration for progress visualization
  const areaChartOptions: ApexOptions = {
    chart: {
      type: "area",
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [0, 100],
      },
    },
    colors: ["#2563eb"],
    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    grid: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
  };

  // Sample data for the area chart
  const areaChartSeries = [
    {
      name: "Progress",
      data: [30, 150, 50, 120, 80, 150, 60, 100, 50, 130, 80, 100],
    },
  ];

  return (
    <Card className="p-4">
      {/* Header */}

      <div className="flex justify-between items-center mb-6 border-b border-[#AAAAAA] pb-2">
        <h2 className="text-xl font-cirka text-navy">Risk Allocation</h2>
        <MoreHorizontal className="h-6 w-6 text-gray-400 cursor-pointer" />
      </div>

      {/* Risk Summary Section */}
      <div className="mb-6">
        <div className="flex items-center gap-1 mb-3">
          <span className="text-sm text-gray-600">Risk Summary</span>
          <Info className="h-4 w-4 text-gray-400" />
        </div>
        <div className="h-32">
          <Chart
            options={gaugeChartOptions}
            series={[60]}
            type="radialBar"
            height="100%"
          />
        </div>
        <p className="text-xs text-gray-600 text-center mt-2 mb-4">
          Based on the risk assessment you are a Low Risk individual who might
          be a bit more passive about investing in financial instruments.
        </p>
      </div>

      {/* Financial Goal Section */}
      <div className="mb-6">
        <div className="flex items-center gap-1 mb-3">
          <span className="text-sm text-gray-600">Financial Goal</span>
          <Info className="h-4 w-4 text-gray-400" />
        </div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-2xl font-bold">
            ${financialGoal.toLocaleString()}
          </span>
          <button className="bg-orange-500 text-white text-xs px-3 py-1 rounded">
            Change Goal
          </button>
        </div>
        <div className="text-xs text-gray-500 mb-4">
          Suggested Financial Goal
        </div>
      </div>

      {/* Progress Chart */}
      <div className="h-24 mb-4">
        <Chart
          options={areaChartOptions}
          series={areaChartSeries}
          type="area"
          height="100%"
        />
      </div>

      {/* Progress Bar */}
      <div className="mb-2">
        <div className="flex justify-between text-sm mb-1">
          <span>${currentAmount.toLocaleString()}</span>
          <span className="font-bold">${targetAmount.toLocaleString()}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-purple-600 rounded-full"
            style={{ width: `${(currentAmount / targetAmount) * 100}%` }}
          />
        </div>
        <div className="text-right text-xs text-gray-500 mt-1">
          Paid For This Month
        </div>
      </div>

      {/* Months to Goal */}
      <div className="text-sm text-gray-600 text-right">
        {monthsToGoal} Months To Achieve Goal
      </div>
    </Card>
  );
};
