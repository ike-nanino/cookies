/* eslint-disable react/no-unescaped-entities */
// app/order/[id]/page.tsx
'use client';
import { motion } from 'framer-motion';
import { Plus, Minus, ArrowLeft, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../../../store/cartStore';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getItemById } from '../../../constants/mockData';
import { use } from 'react';

interface OrderPageProps {
  params: Promise<{ id: string }>;
}

export default function OrderPage({ params }: OrderPageProps) {
  const router = useRouter();
  const { addItem, removeItem, getItemQuantity } = useCartStore();

  // Unwrap params using React.use()
  const resolvedParams = use(params);
  const item = getItemById(resolvedParams.id);
  const cartQuantity = getItemQuantity(resolvedParams.id);

  // Use cart quantity or 1 as minimum display
  const displayQuantity = Math.max(cartQuantity, 1);

  if (!item) {
    return (
      <div className="min-h-screen bg-[#E8DDD4] flex items-center justify-center p-4">
        <motion.div
          className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/30"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-20 h-20 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">😔</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Item not found</h1>
          <p className="text-gray-600 mb-6">
            The item you're looking for doesn't exist or may have been removed.
          </p>
          <motion.button
            onClick={() => router.push('/orders')}
            className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Menu
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const handleIncreaseQuantity = () => {
    addItem(item);
  };

  const handleDecreaseQuantity = () => {
    if (cartQuantity > 0) {
      removeItem(item.id);
    }
  };

  const handleCheckout = () => {
    if (cartQuantity === 0) {
      addItem(item);
    }
    router.push('/cart');
  };

  const getBackPath = () => {
    switch (item.category) {
      case 'cake':
        return '/cakes';
      case 'cookie':
        return '/cookies';
      case 'pasta':
        return '/pasta';
      default:
        return '/bread';
    }
  };

  const getCategoryDisplayName = () => {
    switch (item.category) {
      case 'cake':
        return 'Cakes';
      case 'cookie':
        return 'Cookies';
      case 'pasta':
        return 'Pasta';
      default:
        return 'Breads';
    }
  };

  return (
    <div className="min-h-screen bg-[#E8DDD4]">
      <div className="container mx-auto px-4 py-6 lg:py-10 max-w-7xl">
        {/* Back Button */}
        <motion.button
          onClick={() => router.push(getBackPath())}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6 lg:mb-10 transition-colors bg-white/40 backdrop-blur-sm px-4 py-2 rounded-xl hover:bg-white/60 border border-white/30"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          whileHover={{ x: -5 }}
        >
          <ArrowLeft size={20} />
          Back to {getCategoryDisplayName()}
        </motion.button>

        {/* Responsive Layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
          {/* Item Image */}
          <motion.div
            className="flex-1 flex justify-center items-center w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Container with proper aspect ratio */}
              <div className="relative aspect-square w-full min-h-[280px] sm:min-h-[350px] lg:min-h-[450px]">
                {/* Shadow effect - positioned at left bottom corner */}
                <div className="absolute bottom-2 left-2 w-3/4 h-3/4 bg-black/15 blur-xl rounded-full transform rotate-12"></div>

                {/* Main image */}
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain z-10 relative"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Side Panel (Details + Controls) */}
          <div className="w-full lg:w-80 flex flex-col gap-6">
            {/* Item Details */}
            <motion.div
              className="bg-white/60 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-white/30"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-xl font-bold text-gray-800 mb-3 leading-tight">
                {item.name}
              </h1>

              {/* Ingredients */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {item.ingredients.map((ingredient, index) => (
                    <motion.span
                      key={ingredient}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="px-2 py-1 text-xs bg-gray-100 rounded-full text-gray-700"
                    >
                      {ingredient}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Controls */}
            <motion.div
              className="bg-white/60 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-white/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Quantity Controls */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 font-medium">
                    Quantity:
                  </span>
                  <div className="flex items-center gap-3">
                    <motion.button
                      onClick={handleDecreaseQuantity}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                        cartQuantity > 0
                          ? 'bg-white/80 hover:bg-white text-gray-600 border border-gray-200'
                          : 'bg-gray-100 cursor-not-allowed text-gray-400'
                      }`}
                      whileHover={cartQuantity > 0 ? { scale: 1.1 } : {}}
                      whileTap={cartQuantity > 0 ? { scale: 0.9 } : {}}
                      disabled={cartQuantity === 0}
                    >
                      <Minus size={14} />
                    </motion.button>

                    <div className="w-10 text-center">
                      <motion.span
                        key={displayQuantity}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-lg font-bold text-gray-800"
                      >
                        {displayQuantity}
                      </motion.span>
                    </div>

                    <motion.button
                      onClick={handleIncreaseQuantity}
                      className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-gray-600 border border-gray-200 flex items-center justify-center transition-all duration-200"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Plus size={14} />
                    </motion.button>
                  </div>
                </div>

                {/* Total Price */}
                <div className="flex justify-between items-center py-2 border-t border-gray-200">
                  <span className="text-sm font-semibold text-gray-700">
                    Total:
                  </span>
                  <motion.span
                    key={displayQuantity}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-lg font-bold text-gray-800"
                  >
                    ${(item.price * displayQuantity).toFixed(2)}
                  </motion.span>
                </div>

                {/* Cart Status */}
                {cartQuantity > 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-green-700 font-medium bg-green-100/60 p-2 rounded-lg border border-green-200/60"
                  >
                    ✓ {cartQuantity} item(s) in cart
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-gray-600 bg-gray-100/60 p-2 rounded-lg border border-gray-200/60"
                  >
                    Click + to add to cart
                  </motion.div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-3">
                  <motion.button
                    onClick={handleCheckout}
                    className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ShoppingCart size={14} />
                    {cartQuantity > 0 ? 'Go to Cart' : 'Checkout'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}