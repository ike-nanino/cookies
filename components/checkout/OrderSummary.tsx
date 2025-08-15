// components/checkout/OrderSummary.tsx
"use client";
import { CartItem } from '@/types/checkout';

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
}

export const OrderSummary = ({ items, subtotal, deliveryFee, total }: OrderSummaryProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-3">Order Summary</h3>
      
      <div className="space-y-2 max-h-32 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-center text-sm">
            <div className="flex-1 min-w-0">
              <span className="font-medium truncate block">{item.name}</span>
              <span className="text-gray-500">×{item.quantity}</span>
            </div>
            <span className="font-medium ml-2">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <hr className="my-3" />
      
      <div className="space-y-1 text-sm">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Fee:</span>
          <span>${deliveryFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-base border-t pt-2">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};