'use client';

import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';


function FixedCartButton() {

      const { items } = useCartStore();
    const router = useRouter();

  const totalCartItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      {/* Cart Button - Fixed */}
      {totalCartItems > 0 && (
        <motion.button
          onClick={() => router.push("/cart")}
          className="fixed lg:hidden bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl z-50 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <ShoppingCart size={24} />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
            {totalCartItems}
          </span>
        </motion.button>
      )}
    </div>
  );
}

export default FixedCartButton;
