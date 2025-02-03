import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useOnboardingStore } from '@/Features/onboarding/state'
import Spinner from '@/components/ui/spinner'

interface NetWorthScreenProps {
  onContinue: () => void
  onBack: () => void
}

export const SubmitScreen = ({ onContinue, onBack }: NetWorthScreenProps) => {
  const [firstName, setFirstName] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selection, setSelection] = useState<string | null>(null)
  const router = useRouter()

  const { loading, saveKnowledgeInfo } = useOnboardingStore()

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    router.push('/asset-allocation')
  }

  const handleSelection = (choice: string) => {
    setSelection(choice)
  }

  useEffect(() => {
    const storedState = localStorage.getItem('onboarding-storage')
    if (storedState) {
      const parsedState = JSON.parse(storedState)
      setFirstName(parsedState.state?.formData?.personal?.firstName || null)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await saveKnowledgeInfo()
    onContinue()
  }

  return (
    <div  className="text-center max-w-xl mx-auto">
      <h1 className="text-4xl font-cirka mb-6">
        Congratulations
        <span className="text-navyLight"> {firstName || 'User'}</span>, you have
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
          disabled={isLoading || !selection || loading}
        >
          {loading && <Spinner />} Submit
          {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
        </Button>
      </div>
    </div>
  )
}
