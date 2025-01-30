import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { OccupationScreen } from "./occupationSection";
import { MaritalStatusScreen } from "./maritalStatusSection";
import { IdentificationScreen } from "./identificationSection";
import { HomeAddressScreen } from "./homeAddressSection";
import { PersonalInfoSchema } from "@/Features/onboarding/schema";
import { useOnboardingStore } from "@/Features/onboarding/state";

const PersonalInfoScreen: React.FC = () => {
  const router = useRouter();
  const { formData, updateFormData, sections, currentSection, updateSectionProgress, completeSection } = useOnboardingStore();
  const [localFormData, setLocalFormData] = useState<PersonalInfoSchema>(formData.personal);
  const [isSectionComplete, setIsSectionComplete] = useState(false);

  useEffect(() => {
    setLocalFormData(formData.personal);
  }, [formData.personal]);

  useEffect(() => {
    const checkSectionComplete = () => {
      const { occupation, maritalStatus, identification, address } = localFormData;
      const isComplete = 
        occupation !== "" &&
        maritalStatus !== "" &&
        identification.type !== "" &&
        identification.uploadStatus === "completed" &&
        address.line1 !== "" &&
        address.city !== "" &&
        address.state !== "" &&
        address.postalCode !== "" &&
        address.country !== "";
      setIsSectionComplete(isComplete);
    };

    checkSectionComplete();
  }, [localFormData]);

  const handleFormUpdate = (section: keyof PersonalInfoSchema, field: string, value: string) => {
    const updatedSection = {
      ...(typeof localFormData[section] === 'object' ? localFormData[section] : {}),
      [field]: value,
    };

    const updatedFormData = {
      ...localFormData,
      [section]: updatedSection,
    };

    setLocalFormData(updatedFormData);
    updateFormData("personal", updatedFormData);
  };

  const handleBack = useCallback(() => {
    const currentStepIndex = sections[currentSection].currentStep;
    if (currentStepIndex > 0) {
      const newStep = currentStepIndex - 1;
      updateSectionProgress(currentSection, newStep);
    } else {
      router.push("/previous-page");
    }
  }, [currentSection, sections, router, updateSectionProgress]);

  const handleContinue = useCallback(() => {
    const currentStepIndex = sections[currentSection].currentStep;
    const isLastStep = currentStepIndex === sections[currentSection].totalSteps - 1;

    if (!isSectionComplete) {
      alert("Please fill in all the information in the section before continuing.");
      return;
    }

    if (isLastStep) {
      completeSection("personal");
      router.push("/next-page");
    } else {
      const newStep = currentStepIndex + 1;
      updateSectionProgress(currentSection, newStep);
    }
  }, [currentSection, sections, isSectionComplete, completeSection, router, updateSectionProgress]);

  return (
    <div className="font-helvetica max-w-xl mx-auto">
      <div className="text-center mb-8 flex flex-col gap-4">
        <h1 className="text-4xl font-cirka">Please provide your personal information</h1>
        <p className="text-gray-600">Fill the different forms that appear from the pop-ups</p>
      </div>
      <div className="space-y-4 max-w-sm mx-auto">
        <div className="border-b pb-4">
          <OccupationScreen
            value={localFormData.occupation}
            onChange={(value) => handleFormUpdate("occupation", "occupation", value)}
            onBack={handleBack}
            onContinue={handleContinue}
          />
        </div>
        <div className="border-b pb-4">
          <MaritalStatusScreen
            value={localFormData.maritalStatus}
            onChange={(value) => handleFormUpdate("maritalStatus", "maritalStatus", value)}
            onBack={handleBack}
            onContinue={handleContinue}
          />
        </div>
        <div className="border-b pb-4">
          <IdentificationScreen
            value={localFormData.identification}
            onChange={(field, value) => handleFormUpdate("identification", field, value)}
            onBack={handleBack}
            onContinue={handleContinue}
          />
        </div>
        <div className="border-b pb-4">
          <HomeAddressScreen
            values={localFormData.address}
            onChange={(field, value) => handleFormUpdate("address", field, value)}
            onBack={handleBack}
            onContinue={handleContinue}
          />
        </div>
      </div>
      <div className="flex gap-4 mt-8 w-full max-w-md mx-auto">
        <Button variant="outline" onClick={handleBack} className="flex-1">
          Back
        </Button>
        <Button
          onClick={handleContinue}
          className={`flex-1 bg-navy hover:bg-navyLight text-white ${
            !isSectionComplete ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!isSectionComplete}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export { PersonalInfoScreen };
