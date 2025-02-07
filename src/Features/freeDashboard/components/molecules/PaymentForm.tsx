import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { X } from 'lucide-react'
import { SubscriptionTier } from '../../types'
import {
  Elements,
  CardExpiryElement,
  CardCvcElement,
  CardNumberElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { getStripe } from '@/lib/stripe'
import { createSubscriptionApi, getSubscriptionStatusApi } from '../../service'

interface PaymentFormProps {
  selectedTier: SubscriptionTier | null
  onPaymentComplete: () => void
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  selectedTier,
  onPaymentComplete,
}) => {
  const stripe = useStripe()
  const elements = useElements()

  const elementStyles = {
    style: {
      base: {
        fontSize: '16px',
        color: '#333',
        '::placeholder': { color: '#A0AEC0' },
        fontFamily: 'inherit',
        padding: '10px',
      },
      invalid: { color: '#E53E3E' },
    },
  }
  const [loading, setLoading] = useState(false)

  const [errorMessage, setErrorMessage] = useState('')
  const [stripePromise, setStripePromise]: any = useState(null)

  useEffect(() => {
    getStripe().then(setStripePromise)
  }, [])

  const handlePayment = async () => {
    if (!stripe || !elements || !selectedTier) return
    setLoading(true)

    const cardElement = elements.getElement(CardNumberElement)
    try {
      // 2️⃣ Create Payment Method
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement!,
      })

      console.log(paymentMethod)

      if (error) {
        console.log(error)
        setErrorMessage(error?.message || '')
        setLoading(false)
        return
      }

      // 2️⃣ Send Payment Method to Backend
      const response = await createSubscriptionApi({
        plan: selectedTier.name.toLowerCase(),
        billing_interval:
          selectedTier.interval === 'yearly' ? 'yearly' : 'monthly',
        payment_method_id: paymentMethod.id,
      })

      console.log("response", response)

      if (!response.success) {
        setErrorMessage(response.message)
        setLoading(false)
        return
      }

      // 3️⃣ Confirm Payment Intent in Frontend
      const { error: confirmError } = await stripe.confirmCardPayment(
        response.data.client_secret,
      )

      if (confirmError) {
        setErrorMessage(confirmError?.message || '')
        setLoading(false)
        return
      }

      const subscriptionResponse = await getSubscriptionStatusApi(
        response.data.subscription.id,
      )

      console.log('subscriptionResponse', subscriptionResponse)

      if (subscriptionResponse.data.status === 'active') {
        alert('Subscription Successful!')
        // onPaymentComplete();
        // onClose();
      } else {
        alert('Subscription Pending. Please check your email.')
      }

      setErrorMessage('')
    } catch (error) {
      setErrorMessage('Subscription failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="space-y-4 text-left mb-6">
        {/* Card Number Field */}
        <div>
          <label className="block text-xs md:text-sm font-medium mb-1">
            Card Number
          </label>
          <div className="w-full p-2 text-sm md:text-base border rounded-md">
            <CardNumberElement options={elementStyles} />
          </div>
        </div>

        {/* Expiry Date & CVV Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs md:text-sm font-medium mb-1">
              Expiry Date
            </label>
            <div className="w-full p-2 text-sm md:text-base border rounded-md">
              <CardExpiryElement options={elementStyles} />
            </div>
          </div>
          <div>
            <label className="block text-xs md:text-sm font-medium mb-1">
              CVV
            </label>
            <div className="w-full p-2 text-sm md:text-base border rounded-md">
              <CardCvcElement options={elementStyles} />
            </div>
          </div>
        </div>
      </div>

      <p>{errorMessage}</p>

      <button
        onClick={handlePayment}
        className="w-full bg-[#6938EF] text-white py-2.5 md:py-3 text-sm md:text-base rounded-lg hover:bg-[#5b2ed9] transition-colors"
      >
        {loading ? 'Processing...' : `Pay $${selectedTier?.price}`}
      </button>
    </div>
  )
}
