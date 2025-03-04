import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useOnboardingStore } from "@/Features/onboarding/state";
import Spinner from "@/components/ui/spinner";
import { useAuthStore } from "@/Features/auth/state";

interface SubmitScreenProps {
  onContinue: () => void;
  onBack: () => void;
}

export const SubmitScreen = ({ onContinue, onBack }: SubmitScreenProps) => {
  const [selection, setSelection] = useState<string | null>(null);

  const { loading, saveKnowledgeInfo, setLoading } = useOnboardingStore();
  const { user } = useAuthStore();

  const handleSelection = (choice: string) => {
    setSelection(choice);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    setLoading(false);
    onContinue(); // Call the onContinue function to proceed
  };

  return (
    <div className="text-center max-w-xl mx-auto">
      <h1 className="text-4xl font-cirka mb-6">
        Congratulations
        <span className="text-navyLight"> {user?.firstName || "User"}</span>,
        you have completed the onboarding.
      </h1>

      <div className="flex gap-4 max-w-md mx-auto">
        <Button
          onClick={handleSubmit}
          className={`flex-1 w-full text-white bg-navy hover:bg-navyLight`}
          disabled={loading}
        >
          {loading && <Spinner />} View my Dashboard
        </Button>
      </div>
    </div>
  );
};
