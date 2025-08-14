// components/CartButton.tsx
'use client';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useRouter } from 'next/navigation';

export default function CartButton() {
  const { items, getTotalPrice } = useCartStore();
  const router = useRouter();
  
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = getTotalPrice();

  const handleCartClick = () => {
    router.push('/cart');
  };

  return (
    <motion.button
      onClick={handleCartClick}
      className="relative flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium cursor-pointer transition-colors shadow-lg"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative">
        <ShoppingCart size={20} />
        {totalItems > 0 && (
          <motion.div
            key={totalItems} // Key ensures animation triggers on count change
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-md"
          >
            {totalItems > 99 ? '99+' : totalItems}
          </motion.div>
        )}
      </div>
      
      <div className="hidden sm:flex flex-col items-start">
        <span className="text-xs opacity-90">Cart</span>
        {totalItems > 0 && (
          <motion.span
            key={totalPrice} // Key ensures animation triggers on price change
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold"
          >
            ${totalPrice.toFixed(2)}
          </motion.span>
        )}
      </div>
    </motion.button>
  );
}