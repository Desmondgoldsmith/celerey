'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { OTPInput } from '../molecules/otpInput'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '../../state'
import Spinner from '@/components/ui/spinner'
import { OTP_LENGTH } from '../../constants'
// import { useAssetAllocationStore } from '@/Features/assetAllocation/state'

export const OTPTemplate = () => {
  const [otpValues, setOTPValues] = useState(Array(6).fill(''))

  const { validateOTP, loading, user } = useAuthStore()
  // const { getSubscriptionStatus } = useAssetAllocationStore()
  const router = useRouter()

  const handleSignIn = async () => {
   const success = await validateOTP(otpValues.join(''), 'SIGN_IN')
   if(success) {
    router.push('/personal-info')
   }

    // const subscription = await getSubscriptionStatus()

    // if (subscription.status === 'active') {
    //   router.push('/dashboard')
    // } else {
    //   router.push('/asset-allocation')
    // }
  }

  const handleOpenEmail = () => {
    window.open('https://mail.google.com', '_blank')
  }

  return (
    <div className="max-w-md mx-auto text-center">
      <div className="mb-8">
        <Image
          src="/assets/logo1.svg"
          alt="Celerey Logo"
          width={60}
          height={60}
          className="mx-auto"
        />
        <h1 className="text-4xl font-cirka mt-4 mb-2">Verify your identity</h1>
        <p className="text-sm text-gray-600 font-helvetica">
          Enter the code we just sent to {user?.email}
        </p>
      </div>

      <OTPInput length={6} value={otpValues} onChange={setOTPValues} />

      <Button
        disabled={otpValues.join('').length !== OTP_LENGTH || loading}
        onClick={handleSignIn}
        className="w-80 bg-navy text-white mb-4 hover:bg-navyLight"
      >
        {loading && <Spinner className="text-white" />} Sign in to my dashboard
      </Button>

      <div className="space-y-2 text-sm">
        <p
          className="text-gray-600 hover:cursor-pointer hover:text-navyLight"
          onClick={handleOpenEmail}
        >
          Open Email
        </p>
        <p className="text-navyLight hover:cursor-pointer">Resend The Code</p>
      </div>
    </div>
  )
}
