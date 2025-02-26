import React from "react";
import { InvestmentRiskProfile } from "./investmentRiskProfile";

export default function InvestmentRiskPage({riskAllocation}: any) {
  const riskProfiles = [
    {
      level: "Low",
      percentage: riskAllocation?.low_risk || 0,
      investmentTypes: [
        { name: "US Government Securities" },
        { name: "Other G7 Government Securities" },
        { name: "Investment Grade Corporate Bonds" },
        { name: "Listed Indices Such As S&P 500" },
      ],
    },
    {
      level: "Medium",
      percentage: riskAllocation?.medium_risk || 0,
      investmentTypes: [
        { name: "Publicly Listed Large Corporates" },
        { name: "Mutual Funds (Equity Or Bonds)" },
        { name: "Listed Collective Investment Schemes" },
        { name: "Low Volatility Commodities" },
      ],
    },
    {
      level: "High",
      percentage: riskAllocation?.high_risk || 0,
      investmentTypes: [
        { name: "Public Shares Of Small Companies" },
        { name: "Private Equity (Growth Stage Businesses)" },
        { name: "Venture Capital (Early Stage Businesses)" },
        { name: "Alternative Assets Such As Crypto" },
      ],
    },
  ];

  const handleViewDetails = (level: string) => {
    console.log(`Viewing details for ${level} risk profile`);
  };

  return (
    <div className="container mx-auto px-4 py-2">
      <InvestmentRiskProfile
        riskProfiles={riskProfiles}
        onViewDetails={handleViewDetails}
      />
    </div>
  );
}
