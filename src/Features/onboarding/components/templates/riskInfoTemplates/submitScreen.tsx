import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

interface NetWorthScreenProps {
  onContinue: () => void;
  onBack: () => void;
}

export const SubmitScreen = ({ onContinue, onBack }: NetWorthScreenProps) => {
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
      <h1 className="text-3xl font-cirka mb-6">
        Thanks
        <span className="text-navyLight"> {firstName || "User"}</span>, from
        the assessment based on the answers, &nbsp; 
        <span className="text-navyLight">
           your attitube to risk is: <br /> Medium{" "}
        </span>
      </h1>
      <p className=" mb-12 font-helvetica text-sm">
        You seek to take on moderate risk for the opportunity of higher returns.
        You are willing to explore investment options with slightly higher risk
        levels. This is our assessment based on your responses.
      </p>
      <div className="flex gap-4 max-w-md mx-auto">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          type="submit"
          className="flex-1 bg-navy hover:bg-navyLight text-white"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};
