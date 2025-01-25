"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { ChartType } from "../../types";
import Image from "next/image";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { BalanceOverview } from "../molecules/balanceOverview";
import RiskAllocation from "../molecules/riskAllocationCharts";
import IncomeVsExpenditure from "../molecules/incomeAndExpenditure";
import { Goals } from "../molecules/goalsChart";
import { UserProfile } from "../molecules/userProfile";
import IncomeVsDebt from "../molecules/incomeVsDebt";

// expense data structure
const INITIAL_EXPENSE_DATA = {
  totalExpenses: 43256.45,
  categories: [
    { name: "Others", value: 24223.61, color: "#1E1B4B", percentage: 56 },
    { name: "Home", value: 13842.06, color: "#4ADE80", percentage: 32 },
    { name: "Loans", value: 5190.78, color: "#FB923C", percentage: 12 },
  ],
};

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full animate-pulse bg-gray-100 rounded-lg" />
  ),
}) as unknown as ChartType;

const DEFAULT_USER_DATA = {
  userName: "Jude",
  netWorth: 103550.0,
  riskAttitude: "Low",
  investmentExperience: "Beginner",
  profileCompletion: 40,
};

// Mobile component
const MobileGreeting: React.FC<{ userName: string }> = ({ userName }) => (
  <div className="mb-6 lg:hidden">
    <div className="text-center items-center mb-4">
      <div className="text-[28px] font-cirka text-black">
        Good Morning {userName}
      </div>
    </div>
  </div>
);

const MobileNetWorth: React.FC<{ netWorth: number }> = ({ netWorth }) => (
  <div className="lg:hidden bg-white p-6 rounded-lg mb-2">
    <div className="flex justify-between items-center">
      <div></div>
      <MoreHorizontal className="h-6 w-6 text-gray-400" />
    </div>
    <div className="pb-2 text-center items-center">
      <div className="text-lg text-gray-600 font-cirka">
        Your current networth is
      </div>
      <div className="text-[28px] text-navyLight font-cirka mt-1">
        ${netWorth.toLocaleString()}
      </div>
    </div>
  </div>
);

const MobileActionItems = () => {
  const actionItems = [
    {
      icon: "/assets/consultation.svg",
      text: "Book a consultation call with an advisor",
      alt: "Consultation",
    },
    {
      icon: "/assets/recommendation.svg",
      text: "View advisors recommendation",
      alt: "Advisor",
    },
    {
      icon: "/assets/financialDoc.svg",
      text: "Upload financial documents",
      alt: "Upload Financial Document",
    },
  ];

  return (
    <div className="divide-y divide-[#AAAAAA]">
      {actionItems.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4 bg-white"
        >
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center">
              <Image
                src={item.icon}
                alt={item.alt}
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-navy font-helvatica text-sm">
              {item.text}
            </span>
          </div>
          <button className="p-2 rounded-full bg-navy flex items-center justify-center">
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
        </div>
      ))}
    </div>
  );
};

const DashboardTemplate: React.FC = () => {
  const [selectMonths, setSelectedMonths] = useState<string>("12");
  const {
    userName,
    netWorth,
    riskAttitude,
    investmentExperience,
    profileCompletion,
  } = DEFAULT_USER_DATA;

  // Handler for timeframe changes
  const handleTimeframeChange = (months: string) => {
    setSelectedMonths(months);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-[1990px] mx-auto">
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-4">
          {/* Left Column */}
          <div className="col-span-4 space-y-5">
            <UserProfile
              userName={userName}
              netWorth={netWorth}
              riskAttitude={riskAttitude}
              investmentExperience={investmentExperience}
              profileCompletion={profileCompletion}
            />
            <Goals Chart={Chart} />
          </div>

          {/* Middle Column */}
          <div className="col-span-5 space-y-5">
            <BalanceOverview
              totalExpenses={INITIAL_EXPENSE_DATA.totalExpenses}
              data={INITIAL_EXPENSE_DATA.categories}
              onTimeframeChange={handleTimeframeChange}
              lastUpdated={new Date("2025-01-20")}
            />
            <IncomeVsExpenditure Chart={Chart} />
          </div>

          {/* Right Column */}
          <div className="col-span-3 space-y-5">
            <RiskAllocation />
            <IncomeVsDebt />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-6">
          <MobileGreeting userName={userName} />
          <MobileNetWorth netWorth={netWorth} />
          <BalanceOverview
            totalExpenses={INITIAL_EXPENSE_DATA.totalExpenses}
            data={INITIAL_EXPENSE_DATA.categories}
            onTimeframeChange={handleTimeframeChange}
          />
          <div className="bg-white rounded-lg overflow-hidden">
            <MobileActionItems />
          </div>
          <Goals Chart={Chart} />
          <RiskAllocation />
          <IncomeVsExpenditure Chart={Chart} />
          <IncomeVsDebt />
          <IncomeVsDebt />
        </div>
      </div>
    </div>
  );
};

export default DashboardTemplate;
