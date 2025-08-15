// components/checkout/PaymentMethodSelector.tsx
"use client";

interface PaymentMethodSelectorProps {
  paymentMethod: 'stripe' | 'paypal';
  onPaymentMethodChange: (method: 'stripe' | 'paypal') => void;
}

export const PaymentMethodSelector = ({ paymentMethod, onPaymentMethodChange }: PaymentMethodSelectorProps) => {
  return (
    <div className="grid grid-cols-2 gap-2 mb-4">
      <button
        type="button"
        onClick={() => onPaymentMethodChange('stripe')}
        className={`p-2 border rounded text-sm font-medium ${
          paymentMethod === 'stripe'
            ? 'border-blue-500 bg-blue-50 text-blue-700'
            : 'border-gray-300 text-gray-700'
        }`}
      >
        💳 Card
      </button>
      <button
        type="button"
        onClick={() => onPaymentMethodChange('paypal')}
        className={`p-2 border rounded text-sm font-medium ${
          paymentMethod === 'paypal'
            ? 'border-blue-500 bg-blue-50 text-blue-700'
            : 'border-gray-300 text-gray-700'
        }`}
      >
        🅿️ PayPal
      </button>
    </div>
  );
};