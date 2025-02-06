"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { ChartType } from "../../types";
import Image from "next/image";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import BalanceOverview from "../molecules/balanceOverview";
import { GeographicSpread } from "../molecules/geographicSpread";
import { IncomeVsDebt } from "../molecules/incomeVsDebt";
import { FinancialGoals } from "../molecules/financialGoals";
import { UserProfile } from "../molecules/userProfile";
import { FinancialKnowledgeAssessment } from "../molecules/financialKnowledge";
import IncomeAndExpenditure from "../molecules/incomeAndExpenditure";
import Link from "next/link";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full animate-pulse bg-gray-100 rounded-lg" />
  ),
}) as unknown as ChartType;

const DEFAULT_USER_DATA = {
  userName: "Jude",
  netWorth: 103550.43,
  riskAttitude: "Somewhat Aggressive",
  investmentExperience: "Advanced",
  profileCompletion: 40,
};

// Mobile components
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
        {netWorth.toLocaleString()}
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
      link: "/freebie-account/advisors",
    },
    // {
    //   icon: "/assets/recommendation.svg",
    //   text: "View advisors recommendation",
    //   alt: "Advisor",
    // },
    // {
    //   icon: "/assets/financialDoc.svg",
    //   text: "Upload financial documents",
    //   alt: "Upload Financial Document",
    // },
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
          <Link href={item.link} passHref>
            <button className="p-2 rounded-full bg-navy flex items-center justify-center">
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

const DashboardTemplate: React.FC = () => {
  const [timeframe, setTimeframe] = useState<"1D" | "1W" | "1M" | "3M" | "1Y">(
    "1M"
  );
  const {
    userName,
    netWorth,
    riskAttitude,
    investmentExperience,
    profileCompletion,
  } = DEFAULT_USER_DATA;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1440px] mx-auto">
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-6">
          {/* Left Column */}
          <div className="col-span-4 space-y-6">
            <UserProfile
              userName={userName}
              netWorth={netWorth}
              riskAttitude={riskAttitude}
              investmentExperience={investmentExperience}
              profileCompletion={profileCompletion}
            />
            <FinancialGoals Chart={Chart} />
          </div>

          {/* Middle Column */}
          <div className="col-span-5 space-y-6">
            <BalanceOverview
              Chart={Chart}
              timeframe={timeframe}
              onTimeframeChange={setTimeframe}
            />
            <IncomeAndExpenditure Chart={Chart} />
          </div>

          {/* Right Column */}
          <div className="col-span-3 space-y-6">
            {/* <RiskAllocation Chart={Chart} /> */}
            <GeographicSpread />
            <IncomeVsDebt />
            <FinancialKnowledgeAssessment progress={72} />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-6">
          <MobileGreeting userName={userName} />
          <MobileNetWorth netWorth={netWorth} />
          <BalanceOverview
            Chart={Chart}
            timeframe={timeframe}
            onTimeframeChange={setTimeframe}
          />
          <div className="bg-white rounded-lg overflow-hidden">
            <MobileActionItems />
          </div>
          <FinancialGoals Chart={Chart} />
          <IncomeAndExpenditure Chart={Chart} />
          <IncomeVsDebt />
          <FinancialKnowledgeAssessment progress={72} />
          <GeographicSpread />
        </div>
      </div>
    </div>
  );
};

export default DashboardTemplate;
