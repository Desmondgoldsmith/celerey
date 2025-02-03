/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useAuthStore } from '@/Features/auth/state'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import Spinner from '@/components/ui/spinner'

const PublicLayoutTemplate = ({ children }: { children: React.ReactNode }) => {
  const { setIsAuthenticated, isAuthenticated } = useAuthStore()
  const pathname = usePathname()
  const router = useRouter()


  useEffect(() => {
    const accessToken = Cookies.get('accessToken')
    if (accessToken) {
      setTimeout(()=>{
        setIsAuthenticated(true)
      },1000)
      router.replace('/personal-info')
    }
  }, [pathname, router])


  if (!isAuthenticated) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Spinner />
      </div>
    )
  }


  return <>{children}</>
}

export default PublicLayoutTemplate
