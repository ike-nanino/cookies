/* eslint-disable @typescript-eslint/no-explicit-any */
// components/checkout/PayPalButton.tsx
"use client";
import { useEffect } from 'react';

interface PayPalButtonProps {
  orderData: {
    total: number;
    items: { length: number };
  };
  onSuccess: (order: any) => void;
  onError: (error: any) => void;
  disabled: boolean;
}

export const PayPalButton = ({ orderData, onSuccess, onError, disabled }: PayPalButtonProps) => {
  useEffect(() => {
    if (disabled) return;
    
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`;
    script.async = true;
    script.onload = () => {
      if ((window as any).paypal) {
        (window as any).paypal.Buttons({
          createOrder: (data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: orderData.total.toFixed(2)
                },
                description: `Bakery Order - ${orderData.items.length} items`
              }]
            });
          },
          onApprove: async (data: any, actions: any) => {
            const order = await actions.order.capture();
            onSuccess(order);
          },
          onError: onError
        }).render('#paypal-button-container');
      }
    };
    document.body.appendChild(script);

    return () => {
      const existingScript = document.querySelector(`script[src*="paypal.com/sdk"]`);
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, [orderData, onSuccess, onError, disabled]);

  if (disabled) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg text-center text-gray-500">
        Please fill in all required fields to continue
      </div>
    );
  }

  return <div id="paypal-button-container"></div>;
};