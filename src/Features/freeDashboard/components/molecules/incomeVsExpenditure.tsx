import React from "react";
import { Card } from "@/components/ui/card";
import { MoreHorizontal } from "lucide-react";
import { ChartType } from "../../types";
import { ApexOptions } from "apexcharts";

interface IncomeVsExpenditureProps {
  Chart: ChartType;
}

export const IncomeVsExpenditure: React.FC<IncomeVsExpenditureProps> = ({
  Chart,
}) => {
  const data = {
    totalAssets: 1200000,
    totalLiabilities: 400000,
  };

  const options: ApexOptions = {
    chart: {
      type: "bar",
      stacked: true,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "40%",
      },
    },
    colors: ["#6B4EFF", "#FFB547"],
    dataLabels: { enabled: false },
    xaxis: {
      categories: ["Total Assets", "Total Liabilities"],
      labels: {
        formatter: function (val) {
          return `$${(Number(val) / 1000000).toFixed(1)}M`;
        },
      },
    },
    grid: { show: false },
  };

  const series = [
    {
      name: "Assets",
      data: [data.totalAssets, 0],
    },
    {
      name: "Liabilities",
      data: [0, data.totalLiabilities],
    },
  ];

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6 border-b border-[#AAAAAA] pb-2">
        <h2 className="text-xl font-cirka text-navy">Income vs Expenditure</h2>
        <MoreHorizontal className="h-6 w-6 text-gray-400 cursor-pointer" />
      </div>

      <Chart options={options} series={series} type="bar" height={150} />
    </Card>
  );
};
