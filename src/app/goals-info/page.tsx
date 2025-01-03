"use client";

import { SectionProgressBars } from "@/Features/onboarding/components/molecules/progressBar";
import { OnboardingLayout } from "@/Features/onboarding/components/templates/sharedTemplates/onboardingLayout";
import { useOnboardingStore } from "@/Features/onboarding/state";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GoalsInfo() {
  const router = useRouter();
  const { sections, currentSection, setActiveSection } = useOnboardingStore();
  useEffect(() => {
    // Check if personal section is completed
    if (!sections.financial.isCompleted) {
      router.push("/financial-info");
      return;
    }

    if (currentSection !== "financial") {
      setActiveSection("financial");
    }
  }, [sections.financial.isCompleted, currentSection, router, setActiveSection]);

  return (
    <OnboardingLayout>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <SectionProgressBars
          sections={sections}
          currentSection={currentSection}
        />
        <h1 className="mt-[240px] text-center text-7xl">
          This is the Goals information page!
        </h1>
      </div>
    </OnboardingLayout>
  );
}
