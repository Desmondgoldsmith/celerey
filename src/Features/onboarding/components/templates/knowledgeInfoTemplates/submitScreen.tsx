import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useOnboardingStore } from '@/Features/onboarding/state'
import Spinner from '@/components/ui/spinner'
import { useAuthStore } from '@/Features/auth/state'

interface NetWorthScreenProps {
  onContinue: () => void
  onBack: () => void
}

export const SubmitScreen = ({ onContinue, onBack }: NetWorthScreenProps) => {
  const [selection, setSelection] = useState<string | null>(null)

  const { loading, saveKnowledgeInfo, setLoading } = useOnboardingStore()
  const { user } = useAuthStore()


  const handleSelection = (choice: string) => {
    setSelection(choice)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true)
    e.preventDefault()
    await saveKnowledgeInfo()    
    setLoading(false)
    onContinue()
  }

  return (
    <div  className="text-center max-w-xl mx-auto">
      <h1 className="text-4xl font-cirka mb-6">
        Congratulations
        <span className="text-navyLight"> {(user?.firstName + ' ' + user?.lastName) || 'User'}</span>, you have
        completed the onboarding would you like to know your ideal asset
        allocation?
      </h1>

      <div className="flex gap-4 max-w-[200px] mx-auto mb-14">
        <Button
          variant="outline"
          className={`flex-1 ${
            selection === 'yes'
              ? 'bg-navy text-white hover:bg-navy hover:text-white'
              : ''
          }`}
          onClick={() => handleSelection('yes')}
        >
          Yes
        </Button>
        <Button
          variant="outline"
          className={`flex-1 ${
            selection === 'no'
              ? 'bg-navy text-white hover:bg-navy hover:text-white'
              : ''
          }`}
          onClick={() => handleSelection('no')}
        >
          No
        </Button>
      </div>

      <div className="flex gap-4 max-w-md mx-auto">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          className={`flex-1 w-full text-white ${
            selection ? 'bg-navy hover:bg-navyLight' : 'bg-gray-300'
          }`}
          disabled={!selection || loading}
        >
          {loading && <Spinner />} Submit
        </Button>
      </div>
    </div>
  )
}
