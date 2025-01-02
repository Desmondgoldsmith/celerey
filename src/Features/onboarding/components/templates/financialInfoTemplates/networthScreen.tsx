import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

interface NetWorthScreenProps {
  onContinue: () => void;
  onBack: () => void;
}

export const NetWorthScreen = ({ onContinue, onBack }: NetWorthScreenProps) => {
  const [firstName, setFirstName] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the state from local storage
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
        Thank You 
        <span className="text-blue-500"> {firstName || "User"}</span>, based on
        the information submitted we estimate your net worth to be{" "}
        <span className="text-blue-500">$103,550,43</span>
      </h1>
      <p className=" mb-12 font-helvetica text-sm">Does this look right? If not, please go back and make some adjustments.</p>
      <div className="flex gap-4 max-w-md mx-auto">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          type="submit"
          className="flex-1 bg-navy hover:bg-navyLight text-white"
        >
          Continue
        </Button>
      </div>
    </form>
  );
};
