import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { SubscriptionTier } from "../../types";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTier: SubscriptionTier | null;
  onPaymentComplete: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  selectedTier,
  onPaymentComplete,
}) => {
  const handlePayment = () => {
    setTimeout(() => {
      onPaymentComplete();
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTitle />
      <DialogContent className="sm:max-w-[500px] w-[95vw] bg-white p-4 md:p-6 rounded-xl">
        <button
          onClick={onClose}
          className="absolute right-2 md:right-4 top-2 md:top-4 rounded-sm opacity-70 hover:opacity-100"
        >
          <X className="h-5 w-5 md:h-6 md:w-6" />
          <span className="sr-only">Close</span>
        </button>

        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-cirka mb-4">
            Complete Your Payment
          </h2>
          <p className="text-sm md:text-base text-gray-600 mb-6">
            You are subscribing to {selectedTier?.name} plan at $
            {selectedTier?.price}/month
          </p>

          {/* Dummy payment form */}
          <div className="space-y-4 text-left mb-6">
            <div>
              <label className="block text-xs md:text-sm font-medium mb-1">
                Card Number
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full p-2 text-sm md:text-base border rounded-md"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs md:text-sm font-medium mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full p-2 text-sm md:text-base border rounded-md"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full p-2 text-sm md:text-base border rounded-md"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handlePayment}
            className="w-full bg-navy text-white py-2.5 md:py-3 text-sm md:text-base rounded-lg hover:bg-navyLight transition-colors"
          >
            Pay ${selectedTier?.price}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
