'use client'

import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { GoalsInfoSchema } from '@/Features/onboarding/schema'

import { useOnboardingStore, SectionId } from '@/Features/onboarding/state'
import { SectionProgressBars } from '@/Features/onboarding/components/molecules/progressBar'
import { OnboardingLayout } from '@/Features/onboarding/components/templates/sharedTemplates/onboardingLayout'
import { WelcomeScreen } from '@/Features/onboarding/components/templates/goalsInfoTemplates/welcomeScreen'
import { FinancialGoalScreen } from '@/Features/onboarding/components/templates/goalsInfoTemplates/financialGoalScreeen'
import { TargetAmountScreen } from '@/Features/onboarding/components/templates/goalsInfoTemplates/targetAmountScreen'
import { useAuthStore } from '@/Features/auth/state'
export default function GoalsInfo() {
  const router = useRouter()
  const {
    sections,
    currentSection,
    formData,
    updateFormData,
    updateSectionProgress,
    completeSection,
    setActiveSection,
    populateGoalInfo
  } = useOnboardingStore()

  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    if (isAuthenticated) {
      populateGoalInfo()
    }
  }, [])

  useEffect(() => {
    // if (!sections.financial.isCompleted) {
    //   router.push('/financial-info')
    //   return
    // }

    if (currentSection !== 'goals') {
      setActiveSection('goals')
    }
  }, [sections.financial.isCompleted, currentSection, router, setActiveSection])

  const handleFormUpdate = useCallback(
    (updates: Partial<GoalsInfoSchema>) => {
      updateFormData('goals', updates)
    },
    [updateFormData],
  )

  const validateCurrentStep = useCallback((): boolean => {
    const currentStepIndex = sections[currentSection].currentStep
    const data = formData.goals

    switch (currentStepIndex) {
      case 0:
        return true
      case 1:
        return !!data.primamryFinancialGoal.trim()
      case 2:
        return parseFloat(data.targetAmount || '0') >= 0
      default:
        return true
    }
  }, [currentSection, sections, formData.goals])

  const handleBack = useCallback(() => {
    const currentStepIndex = sections[currentSection].currentStep
    if (currentStepIndex > 0) {
      const newStep = currentStepIndex - 1
      updateSectionProgress(currentSection, newStep)
    } else {
      router.push('/financial-info')
    }
  }, [currentSection, sections, router, updateSectionProgress])

  const getNextSection = useCallback(
    (currentSectionId: SectionId): SectionId | null => {
      const sectionOrder: SectionId[] = [
        'personal',
        'financial',
        'goals',
        'risk',
        'knowledge',
      ]
      const currentIndex = sectionOrder.indexOf(currentSectionId)
      return currentIndex < sectionOrder.length - 1
        ? sectionOrder[currentIndex + 1]
        : null
    },
    [],
  )

  const handleContinue = useCallback(() => {
    const currentStepIndex = sections[currentSection].currentStep
    const isLastStep =
      currentStepIndex === sections[currentSection].totalSteps - 1

    if (!validateCurrentStep()) {
      return
    }

    if (isLastStep) {
      completeSection(currentSection)
      const nextSection = getNextSection(currentSection)
      if (nextSection) {
        setActiveSection(nextSection)
        router.push(`/${nextSection}-info`)
      }
    } else {
      const newStep = currentStepIndex + 1
      updateSectionProgress(currentSection, newStep)
    }
  }, [
    currentSection,
    sections,
    validateCurrentStep,
    completeSection,
    getNextSection,
    setActiveSection,
    router,
    updateSectionProgress,
  ])

  const renderStep = () => {
    const currentStepIndex = sections[currentSection].currentStep
    const goalsData = formData.goals

    switch (currentStepIndex) {
      case 0:
        return <WelcomeScreen onContinue={handleContinue} />
      case 1:
        return (
          <FinancialGoalScreen
            value={goalsData.primamryFinancialGoal}
            onChange={(value) =>
              handleFormUpdate({ primamryFinancialGoal: value })
            }
            onBack={handleBack}
            onContinue={handleContinue}
          />
        )

      case 2:
        return (
          <TargetAmountScreen
            values={{ targetAmount: goalsData.targetAmount }}
            onChange={(field, value) => handleFormUpdate({ [field]: value })}
            onBack={handleBack}
            onContinue={handleContinue}
          />
        )
      default:
        return null
    }
  }

  return (
    <OnboardingLayout>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <SectionProgressBars
          sections={sections}
          currentSection={currentSection}
        />
        <div className="mt-12">{renderStep()}</div>
      </div>
    </OnboardingLayout>
  )
}
