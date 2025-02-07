import React, { useState } from "react";
import { SubscriptionTier, SubscriptionInterval } from "../../types";
import { ToggleButton } from "./toggleButton";
import { FeaturesList } from "./featureList";

const BIENNIAL_DISCOUNTS = {
  Standard: 0.1, // 10% discount
  Pro: 0.12, // 12% discount
  Elite: 0.15, // 15% discount
};

interface PricingCardProps {
  tier: SubscriptionTier;
  onSubscribe: () => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  tier,
  onSubscribe,
}) => {
  const [interval, setInterval] = useState<SubscriptionInterval>("yearly");

  const calculateYearlyPrice = () => {
    return tier.price * 12;
  };

  const calculateBiennialPrice = () => {
    const twoYearPrice = calculateYearlyPrice() * 2;
    const discountRate =
      BIENNIAL_DISCOUNTS[tier.name as keyof typeof BIENNIAL_DISCOUNTS] || 0;
    const discountAmount = twoYearPrice * discountRate;
    return twoYearPrice - discountAmount;
  };

  const getPrice = () => {
    return interval === "yearly"
      ? calculateYearlyPrice()
      : calculateBiennialPrice();
  };

  const getDiscountAmount = () => {
    const twoYearPrice = calculateYearlyPrice() * 2;
    const discountRate =
      BIENNIAL_DISCOUNTS[tier.name as keyof typeof BIENNIAL_DISCOUNTS] || 0;
    return twoYearPrice * discountRate;
  };

  const getDiscountMessage = () => {
    if (interval === "biennial") {
      const discountPercent =
        BIENNIAL_DISCOUNTS[tier.name as keyof typeof BIENNIAL_DISCOUNTS] * 100;
      const savingsAmount = getDiscountAmount();
      return (
        <div className="text-navyLight text-base font-cirka mt-4 font-semibold">
          Save {discountPercent}% (${savingsAmount.toFixed(2)}) with biennial
          billing
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#F4F5F6] text-[#242424] rounded-lg p-4 md:p-6 flex flex-col h-full">
      <div className="mb-4 md:mb-6">
        <h3 className="text-lg md:text-xl text-[#242424] font-semibold font-cirka mb-2">
          {tier.name}
        </h3>
        <p className="text-xs md:text-sm text-[#242424] font-circa">
          {tier.description}
        </p>
      </div>

      <div className="mb-4 md:mb-6">
        <ToggleButton
          options={[
            { label: "Yearly", value: "yearly" },
            { label: "Biennial", value: "biennial" },
          ]}
          value={interval}
          onChange={(value) => setInterval(value)}
        />
        {getDiscountMessage()}
      </div>

      <div className="mb-4 md:mb-6">
        <div className="flex items-baseline gap-2">
          <div className="text-2xl md:text-3xl font-bold">
            ${getPrice().toLocaleString()}
          </div>
          {interval === "biennial" && (
            <div className="text-xs md:text-sm text-[#242424]">
              (${(getPrice() / 24).toFixed(2)}/month)
            </div>
          )}
        </div>
        <div className="text-xs md:text-sm text-[#242424]">
          {interval === "yearly" ? "Per year" : "Every two years"}
        </div>
      </div>

      <button
        onClick={onSubscribe}
        className="bg-[#F4F5F6] w-full border border-navy text-navy rounded-md py-2 px-4 text-sm md:text-base hover:bg-navy hover:text-white transition-colors mb-4 md:mb-6"
      >
        Subscribe
      </button>

      <div className="border-t">
        <h4 className="font-semibold mt-4 md:mt-5 text-[#242424] mb-3 md:mb-4 text-sm md:text-base">
          Features
        </h4>
        <p className="font-helvatica text-[#242424] mt-2 text-xs md:text-sm mb-3 md:mb-4">
          {tier.intro}
        </p>
        <FeaturesList features={tier.features} />
      </div>
    </div>
  );
};
