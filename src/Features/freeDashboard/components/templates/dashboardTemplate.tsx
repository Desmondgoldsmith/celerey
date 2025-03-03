"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ChartType, SubscriptionTier } from "../../types";
import Image from "next/image";
import { ChevronRight, MoreHorizontal, X } from "lucide-react";
import BalanceOverview from "../molecules/balanceOverview";
import { GeographicSpread } from "../molecules/geographicSpread";
// import { IncomeVsDebt } from '../molecules/incomeVsDebt'
import { FinancialGoals } from "../molecules/financialGoals";
import { UserProfile } from "../molecules/userProfile";
import { FinancialKnowledgeAssessment } from "../molecules/financialKnowledge";
// import IncomeAndExpenditure from '../molecules/incomeAndExpenditure'
import Link from "next/link";
import { CongratulationsModal } from "../molecules/congratulationModal";
import { SubscriptionModal } from "../molecules/subscriptionModal";
import { PaymentModal } from "../molecules/paymentModal";
import { useDashboardStore } from "../../../userDashboard/state";
import Spinner from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full animate-pulse bg-gray-100 rounded-lg" />
  ),
}) as unknown as ChartType;

const DEFAULT_USER_DATA = {
  userName: "Jude",
  netWorth: 103550.43,
  riskAttitude: "Incomplete",
  investmentExperience: "Incomplete",
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
        {netWorth?.toLocaleString()}
      </div>
    </div>
  </div>
);
interface MobileActionItemsProps {
  bookCall: () => void;
}

const MobileActionItems = ({ bookCall }: MobileActionItemsProps) => {
  const actionItems = [
    {
      icon: "/assets/consultation.svg",
      text: "Book a consultation call with an advisor",
      alt: "Consultation",
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
          <button
            onClick={bookCall}
            className="p-2 rounded-full bg-navy flex items-center justify-center"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
        </div>
      ))}
    </div>
  );
};

const DashboardTemplate: React.FC = () => {
  const [timeframe, setTimeframe] = useState<"1D" | "1W" | "1M" | "3M" | "1Y">(
    "1M"
  );
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isCongratsModalOpen, setIsCongratsModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<SubscriptionTier | null>(
    null
  );
  const router = useRouter();
  const { profileCompletion } = DEFAULT_USER_DATA;

  const {
    populateDashboardData,
    data,
    loading,
    populateFinancialGoals,
    financialGoals,
    subscription,
    populateSubscription,
  } = useDashboardStore();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    await populateDashboardData();
    await populateFinancialGoals();
  };

  // Handle subscription modal opening
  const handleOpenSubscriptionModal = () => {
    setIsSubscriptionModalOpen(true);
  };

  // Handle tier selection
  const handleSubscriptionSelect = (tier: SubscriptionTier) => {
    setSelectedTier(tier);
    setIsSubscriptionModalOpen(false);
    setIsPaymentModalOpen(true);
  };

  // Handle payment completion
  const handlePaymentComplete = async () => {
    setIsPaymentModalOpen(false);
    setIsCongratsModalOpen(true);
    await populateSubscription();
    setTimeout(() => {
      router.replace("/dashboard");
    }, 3000);
  };

  const [showCalendarModal, setShowCalendarModal] = useState(false);

  const CalendarModal = () => {
    return (
      <div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={() => setShowCalendarModal(false)}
      >
        <div
          className="relative w-full max-w-[1200px] max-h-[90vh] bg-white rounded-xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={() => setShowCalendarModal(false)}
            className="absolute top-4 right-4 z-60 bg-white/90 rounded-full p-2 hover:bg-gray-100 transition-colors"
          >
            <X className="h-6 w-6 text-gray-700" />
          </button>

          {/* Calendar Iframe */}
          <div className="w-full h-[80vh]">
            <iframe
              src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ07MqAIpdxG4-Ocb3GyglJAGLLs-0UPtz-c0JewAqW29kr4NC-_Lh7xkKejcdpLB7oCkhINsGiW?gv=true"
              width="100%"
              height="100%"
              frameBorder="0"
              title={`Book Appointment`}
            />
          </div>
        </div>
      </div>
    );
  };

  const bookCall = () => {
    setShowCalendarModal(true);
  };
  return (
    <>
      {loading ? (
        <div className="h-screen w-screen flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="min-h-screen bg-gray-50 p-6">
          <div className=" mx-auto">
            {/* Desktop Layout */}
            <div className="hidden lg:grid lg:grid-cols-12 lg:gap-6">
              {/* Left Column */}
              <div className="col-span-3 space-y-6">
                <UserProfile
                  userName={data?.userName || ""}
                  netWorth={data?.netWorth || 0}
                  riskAttitude={data?.userRiskTolerance || ""}
                  investmentExperience={data?.userFinancialKnowledge || ""}
                  profileCompletion={profileCompletion}
                  onUpgradeClick={handleOpenSubscriptionModal}
                  bookCall={bookCall}
                />
                <FinancialKnowledgeAssessment
                  onUpgradeClick={handleOpenSubscriptionModal}
                />
              </div>

              {/* Middle Column */}
              <div className="col-span-9 space-y-6">
                {data?.assets &&
                  data?.liabilities &&
                  data?.allIncome &&
                  data?.expense && (
                    <BalanceOverview
                      currency={data?.currency || "usd"}
                      Chart={Chart}
                      timeframe={timeframe}
                      onTimeframeChange={setTimeframe}
                      assets={data?.assets}
                      liabilities={data?.liabilities}
                      income={data?.allIncome}
                      expense={data?.expense}
                      altAsset={data?.altAsset}
                      onAddCategory={handleOpenSubscriptionModal}
                    />
                  )}
                <div className="grid grid-cols-2 gap-6">
                  <GeographicSpread
                    assetCountries={data?.assetCountries || []}
                  />
                  <FinancialGoals
                    currency={data?.currency || "usd"}
                    onModify={handleOpenSubscriptionModal}
                    Chart={Chart}
                    financialGoals={financialGoals}
                  />
                </div>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden space-y-6">
              <MobileGreeting userName={data?.userName || ""} />
              <MobileNetWorth netWorth={data?.netWorth || 0} />
              {data?.assets &&
                data?.liabilities &&
                data?.allIncome &&
                data?.expense && (
                  <BalanceOverview
                    altAsset={data?.altAsset}
                    currency={data?.currency || "usd"}
                    Chart={Chart}
                    timeframe={timeframe}
                    onTimeframeChange={setTimeframe}
                    assets={data?.assets}
                    liabilities={data?.liabilities}
                    income={data?.allIncome}
                    expense={data?.expense}
                    onAddCategory={handleOpenSubscriptionModal}
                  />
                )}
              <div className="bg-white rounded-lg overflow-hidden">
                <MobileActionItems bookCall={bookCall} />
              </div>
              <FinancialGoals
                currency={data?.currency || "usd"}
                Chart={Chart}
                financialGoals={financialGoals}
                onModify={handleOpenSubscriptionModal}
              />
              <GeographicSpread assetCountries={data?.assetCountries || []} />
              <FinancialKnowledgeAssessment
                onUpgradeClick={handleOpenSubscriptionModal}
              />
            </div>
          </div>
        </div>
      )}
      {/* Subscription Modal */}
      <SubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
        onSubscriptionSelect={handleSubscriptionSelect}
      />

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        selectedTier={selectedTier}
        onPaymentComplete={handlePaymentComplete}
      />
      {showCalendarModal && <CalendarModal />}

      <CongratulationsModal
        isOpen={isCongratsModalOpen}
        onClose={() => {
          if (subscription.status === "active") {
            router.replace("/dashboard");
          }
          setIsCongratsModalOpen(false);
        }}
        subscriptionTier={selectedTier?.name || ""}
      />
    </>
  );
};

export default DashboardTemplate;
