'use client'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { ChartType, SubscriptionTier } from '../../types'
import Image from 'next/image'
import { ChevronRight, MoreHorizontal } from 'lucide-react'
import BalanceOverview from '../molecules/balanceOverview'
import { GeographicSpread } from '../molecules/geographicSpread'
import { IncomeVsDebt } from '../molecules/incomeVsDebt'
import { FinancialGoals } from '../molecules/financialGoals'
import { UserProfile } from '../molecules/userProfile'
import { FinancialKnowledgeAssessment } from '../molecules/financialKnowledge'
import IncomeAndExpenditure from '../molecules/incomeAndExpenditure'
import Link from 'next/link'
import { CongratulationsModal } from '../molecules/congratulationModal'
import { SubscriptionModal } from '../molecules/subscriptionModal'
import { PaymentModal } from '../molecules/paymentModal'
import { useDashboardStore } from '../../../userDashboard/state'
import Spinner from '@/components/ui/spinner'
import { useRouter } from 'next/navigation'

const Chart = (dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full animate-pulse bg-gray-100 rounded-lg" />
  ),
}) as unknown) as ChartType

const DEFAULT_USER_DATA = {
  userName: 'Jude',
  netWorth: 103550.43,
  riskAttitude: 'Incomplete',
  investmentExperience: 'Incomplete',
  profileCompletion: 40,
}

// Mobile components
const MobileGreeting: React.FC<{ userName: string }> = ({ userName }) => (
  <div className="mb-6 lg:hidden">
    <div className="text-center items-center mb-4">
      <div className="text-[28px] font-cirka text-black">
        Good Morning {userName}
      </div>
    </div>
  </div>
)

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
)

const MobileActionItems = () => {
  const actionItems = [
    {
      icon: '/assets/consultation.svg',
      text: 'Book a consultation call with an advisor',
      alt: 'Consultation',
      link: '/freebie-account/advisors',
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
  ]

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
  )
}

const DashboardTemplate: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '3M' | '1Y'>(
    '1M',
  )
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [isCongratsModalOpen, setIsCongratsModalOpen] = useState(false)
  const [selectedTier, setSelectedTier] = useState<SubscriptionTier | null>(
    null,
  )
  const router = useRouter()
  const { profileCompletion } = DEFAULT_USER_DATA

  const {
    populateDashboardData,
    data,
    loading,
    populateFinancialGoals,
    financialGoals,
  } = useDashboardStore()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    await populateDashboardData()
    await populateFinancialGoals()
  }

  // Handle subscription modal opening
  const handleOpenSubscriptionModal = () => {
    setIsSubscriptionModalOpen(true)
  }

  // Handle tier selection
  const handleSubscriptionSelect = (tier: SubscriptionTier) => {
    setSelectedTier(tier)
    setIsSubscriptionModalOpen(false)
    setIsPaymentModalOpen(true)
  }

  // Handle payment completion
  const handlePaymentComplete = () => {
    setIsPaymentModalOpen(false)
    setIsCongratsModalOpen(true)

    setTimeout(() => {
      router.replace('/dashboard')
    }, 5000)
  }

  return (
    <>
      {loading ? (
        <div className="h-screen w-screen flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-[1440px] mx-auto">
            {/* Desktop Layout */}
            <div className="hidden lg:grid lg:grid-cols-12 lg:gap-6">
              {/* Left Column */}
              <div className="col-span-4 space-y-6">
                <UserProfile
                  userName={data?.userName || ''}
                  netWorth={data?.netWorth || 0}
                  riskAttitude={data?.userRiskTolerance || ''}
                  investmentExperience={data?.userFinancialKnowledge || ''}
                  profileCompletion={profileCompletion}
                  onUpgradeClick={handleOpenSubscriptionModal}
                />
                <FinancialGoals
                  currency={data?.currency || 'usd'}
                  onModify={handleOpenSubscriptionModal}
                  Chart={Chart}
                  financialGoals={financialGoals}
                />
              </div>

              {/* Middle Column */}
              <div className="col-span-5 space-y-6">
                {data?.assets &&
                  data?.liabilities &&
                  data?.allIncome &&
                  data?.expense && (
                    <BalanceOverview
                      currency={data?.currency || 'usd'}
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
                <IncomeAndExpenditure
                  currency={data?.currency || 'usd'}
                  totalIncome={data?.totalIncome || 0}
                  totalExpense={data?.totalExpense || 0}
                  totalExpenseFromIncome={data?.totalExpenseFromIncome}
                  totalIncomeFromExpense={data?.totalIncomeFromExpense}
                  Chart={Chart}
                />
              </div>

              {/* Right Column */}
              <div className="col-span-3 space-y-6">
                {/* <RiskAllocation Chart={Chart} /> */}
                <GeographicSpread assetCountries={data?.assetCountries || []} />
                <IncomeVsDebt
                  currency={data?.currency || 'usd'}
                  income={data?.income || 0}
                  debt={data?.debt}
                  incomeAndDebt={data?.incomeAndDebt}
                  onAddExpense={handleOpenSubscriptionModal}
                />
                <FinancialKnowledgeAssessment
                  progress={72}
                  onUpgradeClick={handleOpenSubscriptionModal}
                />
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden space-y-6">
              <MobileGreeting userName={data?.userName || ''} />
              <MobileNetWorth netWorth={data?.netWorth || 0} />
              {data?.assets &&
                data?.liabilities &&
                data?.allIncome &&
                data?.expense && (
                  <BalanceOverview
                    currency={data?.currency || 'usd'}
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
                <MobileActionItems />
              </div>
              <FinancialGoals
                currency={data?.currency || 'usd'}
                Chart={Chart}
                financialGoals={financialGoals}
                onModify={handleOpenSubscriptionModal}
              />
              <IncomeAndExpenditure
                currency={data?.currency || 'usd'}
                totalIncome={data?.totalIncome || 0}
                totalExpense={data?.totalExpense || 0}
                totalExpenseFromIncome={data?.totalExpenseFromIncome}
                totalIncomeFromExpense={data?.totalIncomeFromExpense}
                Chart={Chart}
              />
              <IncomeVsDebt
                currency={data?.currency || 'usd'}
                income={data?.income || 0}
                debt={data?.debt}
                incomeAndDebt={data?.incomeAndDebt}
                onAddExpense={handleOpenSubscriptionModal}
              />
              <FinancialKnowledgeAssessment
                progress={72}
                onUpgradeClick={handleOpenSubscriptionModal}
              />
              <GeographicSpread assetCountries={data?.assetCountries || []} />
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

      <CongratulationsModal
        isOpen={isCongratsModalOpen}
        onClose={() => {
          setIsCongratsModalOpen(false)
          router.replace('/dashboard')
        }}
        subscriptionTier={selectedTier?.name || ''}
      />
    </>
  )
}

export default DashboardTemplate
