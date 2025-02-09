'use client'

import Spinner from '@/components/ui/spinner'
import { useAuthStore } from '@/Features/auth/state'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useOnboardingStore } from '@/Features/onboarding/state'
import { useDashboardStore } from '@/Features/userDashboard/state'

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const { setIsAuthenticated, isAuthenticated } = useAuthStore()
  const { getSectionProgress, hasCheckedProgress, setHasCheckedProgress } = useOnboardingStore()
  const { subscription, populateSubscription } = useDashboardStore()

  const [isFetchingData, setIsFetchingData] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const accessToken = Cookies.get('accessToken')
    if (!accessToken) {
      setIsAuthenticated(false)
      router.replace('/auth/signin')
      return
    }
    
    setTimeout(()=>{
      setIsAuthenticated(true)
    },1000)
    // Only run progress check once
    if (!hasCheckedProgress) {
      handleOnboardingProgress()
      populateSubscription()
    }
  }, [])


  useEffect(() => {
    if (subscription.status === 'active') {
      router.replace('/dashboard')
    }
  }, [subscription])

  const handleOnboardingProgress = async () => {
    setIsFetchingData(true)
    const activeSection = await getSectionProgress()

    console.log(activeSection)

    if (activeSection === 'completed') {
      router.replace('/freebie')
    } else {
      const sectionToRouteMap: { [key: string]: string } = {
        personal: '/personal-info',
        financial: '/financial-info',
        goals: '/goals-info',
        risk: '/risk-info',
        knowledge: '/knowledge-info',
      }
      const activeRoute = sectionToRouteMap[activeSection || 'personal']
      if (pathname !== activeRoute) {
        router.replace(activeRoute)
      }
    }
    setIsFetchingData(false)
    setHasCheckedProgress(true)
  
  }

  if (!isAuthenticated || isFetchingData) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Spinner />
      </div>
    )
  }

  return <>{children}</>
}

export default ProtectedLayout
