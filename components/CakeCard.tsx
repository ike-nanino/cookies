// components/CakeCard.tsx
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { BakeryItem } from '../constants/mockData';
import { useRouter } from 'next/navigation';

interface CakeCardProps {
  cake: BakeryItem;
}

const CakeCard: React.FC<CakeCardProps> = ({ cake }) => {
  const router = useRouter();
  const { addItem, removeItem, getItemQuantity } = useCartStore();
  const quantity = getItemQuantity(cake.id);

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.cart-button')) return;
    router.push(`/order/${cake.id}`);
  };

  const handleAddToCart = () => addItem(cake);
  const handleRemoveFromCart = () => removeItem(cake.id);

  return (
    <motion.div
      onClick={handleCardClick}
      className="relative rounded-xl shadow-lg overflow-hidden border border-pink-200 h-72 bg-cover bg-center group"
      style={{ backgroundImage: `url(${cake.image})` }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Zoom image on hover */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${cake.image})` }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Price at top right */}
      <span className="absolute top-3 right-3 bg-pink-500 px-3 py-1 rounded-full text-sm font-semibold text-white shadow-lg z-10">
        ${cake.price.toFixed(2)}
      </span>

      {/* Content at bottom */}
      <div className="absolute bottom-0 left-0 w-full p-4 text-white z-10">
        <h3 className="text-lg font-bold leading-tight">{cake.name}</h3>

        {/* Description with 2 lines */}
        <p className="text-sm text-gray-200 line-clamp-2">{cake.description}</p>

        {/* Ingredients as tags (max 4) */}
        {cake.ingredients && cake.ingredients.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {cake.ingredients.slice(0, 4).map((ingredient, index) => (
              <span
                key={index}
                className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs text-white font-medium"
              >
                {ingredient}
              </span>
            ))}
          </div>
        )}

        {/* Cart Buttons */}
        <div className="mt-3 flex justify-between items-center cart-button">
          {quantity > 0 ? (
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleRemoveFromCart}
                className="bg-red-100/80 hover:bg-red-200 text-red-600 p-1.5 rounded-full transition-colors shadow-sm"
              >
                <Minus size={16} />
              </motion.button>

              <span className="text-lg font-semibold min-w-[2rem] text-center">
                {quantity}
              </span>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleAddToCart}
                className="bg-pink-100/80 hover:bg-pink-200 text-pink-600 p-1.5 rounded-full transition-colors shadow-sm"
              >
                <Plus size={16} />
              </motion.button>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1.5 rounded-lg font-semibold flex items-center space-x-2 transition-colors shadow-md hover:shadow-lg text-sm"
            >
              <ShoppingCart size={14} />
              <span>Add</span>
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CakeCard;
