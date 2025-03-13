import React, { useState } from "react";
import { SubscriptionTier } from "../../types";
import { FeaturesList } from "./featureList";
import {
  createSubscriptionCheckoutSessionApi,
  getSubscriptionStatusApi,
} from "@/Features/userDashboard/service";
import Spinner from "@/components/ui/spinner";

interface PricingCardProps {
  tier: SubscriptionTier;
  handlePaymentComplete: any;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  tier,
  handlePaymentComplete,
}) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const handleSubscription = async () => {
    setLoading(true);

    try {
      const response = await createSubscriptionCheckoutSessionApi({
        plan: tier.id.toLowerCase(),
        billing_interval: "yearly",
      });

      if (response.data.url && response.data.session_id) {
        const checkoutTab = window.open(response.data.url, "_blank");
        const interval = setInterval(async () => {
          console.log("Checkout Tab", checkoutTab);
          if (checkoutTab?.closed) {
            console.log("Checkout tab closed by user. Stopping polling.");
            clearInterval(interval);
            setLoading(false);
            return;
          }

          if (!checkoutTab?.closed) {
            // Poll backend for subscription status
            const subscriptionResponse = await getSubscriptionStatusApi();

            if (subscriptionResponse.data.status === "active") {
              clearInterval(interval); // Stop polling
              checkoutTab?.close(); // Close checkout tab if still open
              setLoading(false);
              handlePaymentComplete();
            }
          }
        }, 3000);
      }

      // Poll the backend every 3 seconds to check subscription status

      // Call your function to update the subscription
    } catch (error: any) {
      setErrorMessage(error?.message);
      setLoading(false);
    }
  };

  return (
    <div
      className={`bg-[#F4F5F6] ${
        tier.isPopular ? "border border-navy" : "border-transparent"
      } text-[#242424] rounded-lg p-4 md:p-6 flex flex-col h-full relative`}
    >
      <div className="mb-4 md:mb-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg md:text-xl text-[#242424] font-semibold font-cirka mb-2">
            {tier.name}
          </h3>
          {/* Popular Badge */}
          {tier.isPopular && (
            <div className="bg-navy text-white px-3 py-1 rounded-full text-sm">
              Most Popular
            </div>
          )}
        </div>

        <p className="text-xs md:text-sm text-[#242424] font-circa mb-2">
          {tier.description}
        </p>
        <p className="text-xs md:text-sm text-navy font-circa ">
          {tier.idealCustomer}
        </p>
      </div>

      <div className="mb-4 md:mb-6">
        <div className="flex items-baseline gap-2">
          <div className="text-2xl md:text-3xl font-bold">
            ${tier.price.toLocaleString()}
          </div>
          <div className="text-xs md:text-sm text-[#242424]">
            (${tier.pricePerMonth}/month)
          </div>
        </div>
        <div className="text-xs md:text-sm text-[#242424]">Per year</div>
      </div>

      <div>
        <button
          onClick={handleSubscription}
          disabled={loading}
          className={`w-full   flex items-center justify-center gap-4 rounded-md py-2 px-4 text-sm md:text-base transition-colors bg-[#F4F5F6] border border-navy text-navy hover:bg-navy hover:text-white ${
            loading
              ? "bg-gray-300 hover:bg-gray-300 text-gray-700 hover:text-gray-700 cursor-not-allowed"
              : ""
          }`}
        >
          {loading && <Spinner />}
          {tier.buttonText}
        </button>
      </div>

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
