import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface NetWorthScreenProps {
  onContinue: () => void;
  onBack: () => void;
}

export const SubmitScreen = ({ onContinue, onBack }: NetWorthScreenProps) => {
  const [firstName, setFirstName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push("/asset-allocation");
  };

  useEffect(() => {
    const storedState = localStorage.getItem("onboarding-storage");
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      setFirstName(parsedState.state?.formData?.personal?.firstName || null);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContinue();
  };

  return (
    <form onSubmit={handleSubmit} className="text-center max-w-xl mx-auto">
      <h1 className="text-4xl font-cirka mb-6">
        Congratulations
        <span className="text-navyLight"> {firstName || "User"}</span>, you have
        completed the onboarding would you like to know your ideal asset
        allocation?
      </h1>

      <div className="flex gap-4 max-w-[200px] mx-auto mb-14">
        <Button variant="outline" className="flex-1">
          Yes
        </Button>
        <Button variant="outline" className="flex-1">
          No
        </Button>
      </div>

      <div className="flex gap-4 max-w-md mx-auto">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          type="submit"
          className="flex-1 bg-navy w-full hover:bg-navyLight text-white"
          onClick={handleSave}
          disabled={isLoading}
        >
          Submit
          {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
        </Button>
      </div>
    </form>
  );
};
