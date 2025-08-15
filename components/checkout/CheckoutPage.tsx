/* eslint-disable @typescript-eslint/no-explicit-any */
// components/checkout/CheckoutPage.tsx
"use client";
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useCartStore } from '@/store/cartStore';
import { CustomerForm } from './CustomerForm';
import { OrderSummary } from './OrderSummary';
import { PaymentMethodSelector } from './PaymentMethodSelector';
import { StripeCardForm } from './StripeCardForm';
import { PayPalButton } from './PayPalButton';
import { customerSchema, CustomerFormData } from '@/types/checkout';
import { calculateDeliveryFee } from '@/utils/deliveryFee';


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export const CheckoutPage = () => {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal'>('stripe');
  const [deliveryFee, setDeliveryFee] = useState(5);
  const [processingOrder, setProcessingOrder] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid }
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    mode: 'onChange'
  });

  const watchedCity = watch('city');
  const watchedZipCode = watch('zipCode');

  useEffect(() => {
    if (watchedCity && watchedZipCode) {
      const fee = calculateDeliveryFee(watchedCity, watchedZipCode);
      setDeliveryFee(fee);
    }
  }, [watchedCity, watchedZipCode]);

  const subtotal = getTotalPrice();
  const total = subtotal + deliveryFee;

  const handlePaymentSuccess = async (paymentResult: any, customerData: CustomerFormData) => {
    // Set processing state immediately
    setProcessingOrder(true);
    
    // Clear the form
    reset();
    
    try {
      const orderData = {
        items,
        subtotal,
        deliveryFee,
        total,
        customerInfo: customerData,
        paymentMethod,
        paymentId: paymentResult.id,
        status: 'paid'
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        clearCart();
        window.location.href = `/order-success?orderId=${paymentResult.id}`;
      }
    } catch (error) {
      console.error('Error saving order:', error);
      setProcessingOrder(false);
    }
  };

  const handlePaymentError = (error: any) => {
    console.error('Payment error:', error);
    alert('Payment failed. Please try again.');
    setProcessingOrder(false);
  };

  const onSubmit = (data: CustomerFormData) => {
    console.log('Form validated:', data);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <a href="/products" className="text-blue-600 hover:underline text-sm">
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  // Show processing state for entire page
  if (processingOrder) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              <span className="text-green-800 font-semibold text-lg">Processing Your Order</span>
            </div>
            <div className="space-y-3 text-gray-600">
              <p className="flex items-center justify-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Payment successful</span>
              </p>
              <p className="flex items-center justify-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span>Creating your order...</span>
              </p>
              <p className="flex items-center justify-center space-x-2">
                <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                <span>Sending confirmation email...</span>
              </p>
            </div>
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <p className="text-green-800 font-medium">Thank you for your order!</p>
              <p className="text-green-700 text-sm mt-1">
                You'll be redirected to your order confirmation page shortly.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-center mb-6">Checkout</h1>
        
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <CustomerForm
                register={register}
                errors={errors}
                watchedCity={watchedCity}
                deliveryFee={deliveryFee}
              />
            </form>
          </div>

          <div className="space-y-4">
            <OrderSummary
              items={items}
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              total={total}
            />

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Payment</h3>
              
              <PaymentMethodSelector
                paymentMethod={paymentMethod}
                onPaymentMethodChange={setPaymentMethod}
              />

              {paymentMethod === 'stripe' && (
                <Elements stripe={stripePromise}>
                  <StripeCardForm 
                    customerInfo={watch()}
                    orderData={{ items, subtotal, deliveryFee, total }}
                    onSuccess={(paymentIntent) => handlePaymentSuccess(paymentIntent, watch())}
                    onError={handlePaymentError}
                    disabled={!isValid}
                  />
                </Elements>
              )}

              {paymentMethod === 'paypal' && (
                <PayPalButton
                  orderData={{ total, items }}
                  onSuccess={(order) => handlePaymentSuccess(order, watch())}
                  onError={handlePaymentError}
                  disabled={!isValid}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
