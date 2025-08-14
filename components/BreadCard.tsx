'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { Bread } from '../types/bread';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface BreadCardProps {
  bread: Bread;
}

export default function BreadCard({ bread }: BreadCardProps) {
  const { addItem, removeItem, getItemQuantity } = useCartStore();
  const router = useRouter();
  const quantity = getItemQuantity(bread.id);

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.cart-button')) return;
    router.push(`/order/${bread.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(bread);
  };

  const handleRemoveFromCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeItem(bread.id);
  };

  return (
    <motion.div
      onClick={handleCardClick}
      className="relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300"
      whileTap={{ scale: 0.98 }}
    >
      {/* Counter / Add Button */}
      <div className="cart-button absolute top-4 right-4 z-10">
        <AnimatePresence mode="wait" initial={false}>
          {quantity > 0 ? (
            <motion.div
              key="counter"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2 bg-white rounded-full shadow-md px-2 py-1"
            >
              <motion.button
                onClick={handleRemoveFromCart}
                className="bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Minus size={16} />
              </motion.button>

              <motion.span
                key={quantity} // triggers animation on number change
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.15 }}
                className="text-sm font-semibold text-gray-800 w-5 text-center"
              >
                {quantity}
              </motion.span>

              <motion.button
                onClick={handleAddToCart}
                className="bg-amber-500 hover:bg-amber-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Plus size={16} />
              </motion.button>
            </motion.div>
          ) : (
            <motion.button
              key="plus-only"
              onClick={handleAddToCart}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="bg-amber-500 hover:bg-amber-600 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Plus size={16} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Bread Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={bread.image}
          alt={bread.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Bread Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{bread.name}</h3>
        <p className="text-xl font-bold text-amber-600">${bread.price.toFixed(2)}</p>
      </div>
    </motion.div>
  );
}
