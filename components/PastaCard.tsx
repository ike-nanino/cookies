// components/PastaCard.tsx
'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ShoppingCart, Info, X } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { BakeryItem } from '../constants/mockData';

interface PastaCardProps {
  pasta: BakeryItem;
}

const PastaCard: React.FC<PastaCardProps> = ({ pasta }) => {
  const [showDetails, setShowDetails] = useState(false);
  const { addItem, removeItem, getItemQuantity } = useCartStore();
  const quantity = getItemQuantity(pasta.id);

  const handleAddToCart = () => {
    addItem(pasta);
  };

  const handleRemoveFromCart = () => {
    removeItem(pasta.id);
  };

  return (
    <>
      <motion.div
        className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-green-200"
        whileHover={{ scale: 1.02, y: -5 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="relative h-48 overflow-hidden">
          <Image
            src={pasta.image}
            alt={pasta.name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded-full text-sm font-semibold shadow-lg">
            ${pasta.price.toFixed(2)}
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-800 leading-tight">
              {pasta.name}
            </h3>
            <button
              onClick={() => setShowDetails(true)}
              className="text-green-600 hover:text-green-700 transition-colors p-1"
              title="View Details"
            >
              <Info size={20} />
            </button>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {pasta.description}
          </p>

          <div className="flex justify-between items-center">
            {quantity > 0 ? (
              <div className="flex items-center space-x-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleRemoveFromCart}
                  className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-full transition-colors shadow-sm"
                >
                  <Minus size={16} />
                </motion.button>
                
                <span className="text-lg font-semibold text-gray-800 min-w-[2rem] text-center">
                  {quantity}
                </span>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleAddToCart}
                  className="bg-green-100 hover:bg-green-200 text-green-600 p-2 rounded-full transition-colors shadow-sm"
                >
                  <Plus size={16} />
                </motion.button>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 transition-colors shadow-md hover:shadow-lg"
              >
                <ShoppingCart size={16} />
                <span>Add to Cart</span>
              </motion.button>
            )}
            
            <div className="text-right">
              <p className="text-lg font-bold text-green-600">
                ${pasta.price.toFixed(2)}
              </p>
              {quantity > 0 && (
                <p className="text-sm text-gray-500">
                  Total: ${(pasta.price * quantity).toFixed(2)}
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Pasta Details Modal */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <Image
                  src={pasta.image}
                  alt={pasta.name}
                  width={400}
                  height={250}
                  className="w-full h-64 object-cover rounded-t-2xl"
                />
                <button
                  onClick={() => setShowDetails(false)}
                  className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm text-gray-700 p-2 rounded-full hover:bg-white transition-colors"
                >
                  <X size={20} />
                </button>
                <div className="absolute bottom-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full font-semibold">
                  ${pasta.price.toFixed(2)}
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  {pasta.name}
                </h2>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {pasta.description}
                </p>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Ingredients:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {pasta.ingredients.map((ingredient, index) => (
                      <span
                        key={index}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  {quantity > 0 ? (
                    <div className="flex items-center space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleRemoveFromCart}
                        className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-full transition-colors"
                      >
                        <Minus size={18} />
                      </motion.button>
                      
                      <span className="text-xl font-semibold text-gray-800 min-w-[2.5rem] text-center">
                        {quantity}
                      </span>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleAddToCart}
                        className="bg-green-100 hover:bg-green-200 text-green-600 p-2 rounded-full transition-colors"
                      >
                        <Plus size={18} />
                      </motion.button>
                    </div>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAddToCart}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors shadow-md"
                    >
                      <ShoppingCart size={18} />
                      <span>Add to Cart</span>
                    </motion.button>
                  )}
                  
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">
                      ${pasta.price.toFixed(2)}
                    </p>
                    {quantity > 0 && (
                      <p className="text-sm text-gray-500">
                        Total: ${(pasta.price * quantity).toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PastaCard;