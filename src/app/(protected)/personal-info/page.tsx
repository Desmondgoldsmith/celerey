"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SectionId, useOnboardingStore } from "@/Features/onboarding/state";
import { PersonalInfoSchema } from "@/Features/onboarding/schema";
import { WelcomeTemplate } from "@/Features/onboarding/components/templates/personalInfoTemplates/welcomeTemplate";
import { BioDataScreen } from "@/Features/onboarding/components/templates/personalInfoTemplates/bioDataScreen";
// import { LastNameScreen } from "@/Features/onboarding/components/templates/personalInfoTemplates/lastNameScreen";
// import { OccupationScreen } from "@/Features/onboarding/components/templates/personalInfoTemplates/occupationScreen";
// import { CitizenshipStatusScreen } from "@/Features/onboarding/components/templates/personalInfoTemplates/citizenshipStatusScreen";
// import { HomeAddressScreen } from "@/Features/onboarding/components/templates/personalInfoTemplates/homeAddressScreen";
// import { MaritalStatusScreen } from "@/Features/onboarding/components/templates/personalInfoTemplates/maritalStatusScreen";
// import { DependentsScreen } from "@/Features/onboarding/components/templates/personalInfoTemplates/dependantsScreen";
import { IdentificationScreen } from "@/Features/onboarding/components/templates/personalInfoTemplates/identificationScreen";
import { OptionsSelectionScreen } from "@/Features/onboarding/components/templates/personalInfoTemplates/optionsSelectionScreen";
import { OnboardingLayout } from "@/Features/onboarding/components/templates/sharedTemplates/onboardingLayout";
import { SectionProgressBars } from "@/Features/onboarding/components/molecules/progressBar";

export default function PersonalInfo() {
  const router = useRouter();
  const {
    sections,
    currentSection,
    formData,
    updateFormData,
    updateSectionProgress,
    completeSection,
    setActiveSection,
    resetOnboarding,
  } = useOnboardingStore();

  useEffect(() => {
    const shouldReset =
      !sections.personal.currentStep && !sections.personal.isCompleted;
    if (shouldReset) {
      resetOnboarding();
    }
    setActiveSection("personal");
  }, [
    setActiveSection,
    sections.personal.currentStep,
    sections.personal.isCompleted,
    resetOnboarding,
  ]);

  const handleFormUpdate = useCallback(
    (updates: Partial<PersonalInfoSchema>) => {
      updateFormData("personal", updates);
    },
    [updateFormData]
  );

  const validateCurrentStep = useCallback((): boolean => {
    const currentStepIndex = sections[currentSection].currentStep;
    const data = formData.personal;

    switch (currentStepIndex) {
      case 1:
        return !!(
          data.firstName.trim() &&
          data.lastName.trim() &&
          data.dob.day &&
          data.dob.month &&
          data.dob.year
        );
      case 2:
         return !!(
           data.identification.type &&
           data.identification.uploadStatus === "completed"
         );
      case 3:
        return data.options.length > 0;
      default:
        return true;
    }
  }, [currentSection, sections, formData.personal]);

  const handleBack = useCallback(() => {
    const currentStepIndex = sections[currentSection].currentStep;
    if (currentStepIndex > 0) {
      const newStep = currentStepIndex - 1;
      updateSectionProgress(currentSection, newStep);
    }
  }, [currentSection, sections, updateSectionProgress]);

  const getNextSection = useCallback(
    (currentSectionId: SectionId): SectionId | null => {
      const sectionOrder: SectionId[] = [
        "personal",
        "financial",
        "goals",
        "risk",
        "knowledge",
      ];
      const currentIndex = sectionOrder.indexOf(currentSectionId);
      return currentIndex < sectionOrder.length - 1
        ? sectionOrder[currentIndex + 1]
        : null;
    },
    []
  );

  // And then in handleContinue:
  const handleContinue = useCallback(() => {
    const currentStepIndex = sections[currentSection].currentStep;
    const isLastStep =
      currentStepIndex === sections[currentSection].totalSteps - 1;

    if (!validateCurrentStep()) {
      return;
    }

    if (isLastStep) {
      completeSection(currentSection);
      const nextSection = getNextSection(currentSection);
      if (nextSection) {
        setActiveSection(nextSection);
        router.push(`/${nextSection}-info`);
      }
    } else {
      const newStep = currentStepIndex + 1;
      updateSectionProgress(currentSection, newStep);
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
  ]);

  const renderStep = () => {
    const currentStepIndex = sections[currentSection].currentStep;
    const personalData = formData.personal;

    switch (currentStepIndex) {
      case 0:
          return <WelcomeTemplate onStart={handleContinue} />;
      case 1:
        return (
          <BioDataScreen
            value={{
              firstName: personalData.firstName,
              lastName: personalData.lastName,
              dob: {
                day: personalData.dob.day,
                month: personalData.dob.month,
                year: personalData.dob.year,
              },
            }}
            onChange={handleFormUpdate}
            onBack={handleBack}
            onContinue={handleContinue}
          />
        );
    
      case 2:
        return (
          <IdentificationScreen
            value={personalData.identification}
            onChange={(value) => handleFormUpdate({ identification: value })}
            onBack={handleBack}
            onContinue={handleContinue}
          />
        );
      case 3:
        return (
          <OptionsSelectionScreen
            value={personalData.options}
            onChange={(value) => handleFormUpdate({ options: value })}
            onBack={handleBack}
            onContinue={handleContinue}
          />
        );
      default:
        return null;
    }
  };

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
  );
}
