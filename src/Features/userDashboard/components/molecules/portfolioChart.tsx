import React from "react";
import { Card } from "@/components/ui/card";
import { MoreHorizontal } from "lucide-react";
import { ApexOptions } from "apexcharts";

export type TimeframeKey = "1D" | "1W" | "1M" | "3M" | "1Y";

type ChartComponentProps = {
  options: ApexOptions;
  series: {
    name: string;
    data: { x: number; y: number }[];
  }[];
  type: "area";
  height: number;
};

interface PortfolioChartProps {
  Chart: React.ComponentType<ChartComponentProps>;
  timeframe: TimeframeKey;
  onTimeframeChange: (timeframe: TimeframeKey) => void;
}

export const PortfolioChart: React.FC<PortfolioChartProps> = ({
  Chart,
  timeframe,
  onTimeframeChange,
}) => {
  const chartOptions: ApexOptions = {
    chart: {
      type: "area" as const,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      height: 600,
    },
    colors: ["#6B4EFF"],
    fill: {
      type: "gradient" as const,
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [0, 100],
      },
    },
    stroke: {
      curve: "smooth" as const,
      width: 2,
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: "datetime" as const,
      labels: {
        style: {
          fontFamily: "Helvetica",
        },
        format: "dd MMM",
      },
    },
    yaxis: {
      labels: {
        formatter: function (value: number) {
          return `$${value.toLocaleString()}`;
        },
        style: {
          fontFamily: "Helvetica",
        },
      },
    },
    grid: {
      borderColor: "#f3f4f6",
      strokeDashArray: 4,
    },
  };

  const generateData = () => {
    const data: { x: number; y: number }[] = [];
    const date = new Date();
    for (let i = 30; i >= 0; i--) {
      data.push({
        x: date.setDate(date.getDate() - 1),
        y: Math.floor(Math.random() * (120000 - 90000) + 90000),
      });
    }
    return data;
  };

  return (
    <Card className="bg-white pt-5 pb-10">
      <div className="p-6 border-b border-[#AAAAAA]">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-cirka text-navy">
            Portfolio Performance
          </h2>
          <MoreHorizontal className="h-6 w-6 text-gray-400 cursor-pointer" />
        </div>
      </div>

      <div className="p-6">
        <Chart
          options={chartOptions}
          series={[{ name: "Portfolio Value", data: generateData() }]}
          type="area"
          height={280}
        />
      </div>

      <div className="border-t border-[#AAAAAA]">
        <div className="flex justify-between px-6 py-4">
          {["1D", "1W", "1M", "3M", "1Y"].map((period) => (
            <button
              key={period}
              onClick={() => onTimeframeChange(period as TimeframeKey)}
              className={`px-4 py-2 rounded-full text-sm font-helvetica transition-colors
                ${
                  timeframe === period
                    ? "bg-navy text-white"
                    : "text-gray-500 bg-gray-50 hover:bg-gray-80"
                }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-[#AAAAAA] p-3 pt-10">
        <div className="text-sm text-gray-600">
          <span className="text-green-500 font-medium">↑ 12%</span>
          <span className="ml-2">Last 30 Days</span>
        </div>
      </div>
    </Card>
  );
};
