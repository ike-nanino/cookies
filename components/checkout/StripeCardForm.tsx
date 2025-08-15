/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */

// components/checkout/StripeCardForm.tsx
"use client";
import { useState } from 'react';
import { 
  CardNumberElement, 
  CardExpiryElement, 
  CardCvcElement, 
  useStripe, 
  useElements 
} from '@stripe/react-stripe-js';
import { CustomerFormData } from '@/types/checkout';

interface StripeCardFormProps {
  customerInfo: CustomerFormData;
  orderData: {
    total: number;
    items: any[];
  };
  onSuccess: (paymentIntent: any) => void;
  onError: (error: any) => void;
  disabled: boolean;
}

const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

export const StripeCardForm = ({ customerInfo, orderData, onSuccess, onError, disabled }: StripeCardFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [processingOrder, setProcessingOrder] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements || disabled) return;

    setProcessing(true);
    const cardNumberElement = elements.getElement(CardNumberElement);

    try {
      // Create payment intent on your server
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Math.round(orderData.total * 100),
          currency: 'usd',
          customerInfo,
          orderData
        })
      });
      
      const { clientSecret } = await response.json();

      // Confirm payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardNumberElement!,
          billing_details: {
            name: customerInfo.name,
            email: customerInfo.email,
            phone: customerInfo.phone,
            address: {
              postal_code: customerInfo.zipCode,
            }
          }
        }
      });

      if (error) {
        onError(error);
        setProcessing(false);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        setProcessing(false);
        setProcessingOrder(true);
        
        // Clear all card elements
        cardNumberElement?.clear();
        elements.getElement(CardExpiryElement)?.clear();
        elements.getElement(CardCvcElement)?.clear();
        
        // Call success handler
        onSuccess(paymentIntent);
      }
    } catch (err) {
      onError(err);
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {processingOrder ? (
        <div className="space-y-4 text-center">
          <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
              <span className="text-green-800 font-semibold">Processing Order...</span>
            </div>
            <p className="text-green-700 text-sm">
              Your payment was successful! We're now processing your order and will redirect you shortly.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {/* Card Number */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <div className="p-3 border border-gray-300 rounded-lg bg-white">
                <CardNumberElement options={cardElementOptions} />
              </div>
            </div>

            {/* Expiry and CVC */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <div className="p-3 border border-gray-300 rounded-lg bg-white">
                  <CardExpiryElement options={cardElementOptions} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  CVC
                </label>
                <div className="p-3 border border-gray-300 rounded-lg bg-white">
                  <CardCvcElement options={cardElementOptions} />
                </div>
              </div>
            </div>

            {/* Billing ZIP Code */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Billing ZIP Code
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="12345"
                maxLength={5}
              />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={!stripe || processing || disabled}
            className={`w-full py-2.5 px-4 rounded-lg font-medium text-white text-sm ${
              processing || disabled
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {processing ? 'Processing Payment...' : `Pay ${orderData.total.toFixed(2)}`}
          </button>
        </>
      )}
    </form>
  );
};
