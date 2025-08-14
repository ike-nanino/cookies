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
  params: Promise<{
    id: string;
  }>;
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <motion.div
          className="text-center bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">😔</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Item not found</h1>
          <p className="text-gray-600 mb-6">The item you're looking for doesn't exist or may have been removed.</p>
          <motion.button 
            onClick={() => router.push('/orders')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
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
    // If nothing in cart, add at least 1 item
    if (cartQuantity === 0) {
      addItem(item);
    }
    router.push('/cart');
  };

  // Dynamic back navigation based on category
  const getBackPath = () => {
    switch (item.category) {
      case 'cake': return '/cakes';
      case 'cookie': return '/cookies';
      case 'pasta': return '/pasta';
      default: return '/bread';
    }
  };

  const getCategoryDisplayName = () => {
    switch (item.category) {
      case 'cake': return 'Cakes';
      case 'cookie': return 'Cookies';
      case 'pasta': return 'Pasta';
      default: return 'Breads';
    }
  };

  const getCategoryColor = () => {
    switch (item.category) {
      case 'cake': return 'from-pink-500 to-rose-600';
      case 'cookie': return 'from-amber-500 to-orange-600';
      case 'pasta': return 'from-green-500 to-emerald-600';
      default: return 'from-amber-500 to-orange-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Back Button */}
        <motion.button
          onClick={() => router.push(getBackPath())}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors bg-white/60 backdrop-blur-sm px-4 py-2 rounded-xl hover:bg-white/80 border border-white/30"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          whileHover={{ x: -5 }}
        >
          <ArrowLeft size={20} />
          Back to {getCategoryDisplayName()}
        </motion.button>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Item Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="aspect-[4/3] max-w-md mx-auto lg:max-w-none rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
              />
            </div>

          </motion.div>

          {/* Item Details */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/30">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">{item.name}</h1>
                  <span className={`inline-block px-3 py-1 bg-gradient-to-r ${getCategoryColor()} text-white text-sm font-medium rounded-full capitalize`}>
                    {item.category}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    ${item.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">per item</p>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">{item.description}</p>

              {/* Ingredients Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {item.ingredients.map((ingredient, index) => (
                    <motion.span
                      key={ingredient}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {ingredient}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">Quantity:</span>
                  <div className="flex items-center gap-3">
                    <motion.button
                      onClick={handleDecreaseQuantity}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                        cartQuantity > 0 
                          ? 'bg-gradient-to-r from-red-100 to-pink-100 hover:from-red-200 hover:to-pink-200 text-red-600' 
                          : 'bg-gray-100 cursor-not-allowed text-gray-400'
                      }`}
                      whileHover={cartQuantity > 0 ? { scale: 1.1 } : {}}
                      whileTap={cartQuantity > 0 ? { scale: 0.9 } : {}}
                      disabled={cartQuantity === 0}
                    >
                      <Minus size={18} />
                    </motion.button>
                    
                    <div className="w-12 text-center">
                      <motion.span 
                        key={displayQuantity}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-xl font-bold text-gray-800"
                      >
                        {displayQuantity}
                      </motion.span>
                    </div>
                    
                    <motion.button
                      onClick={handleIncreaseQuantity}
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 hover:from-green-200 hover:to-emerald-200 text-green-600 flex items-center justify-center transition-all duration-200"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Plus size={18} />
                    </motion.button>
                  </div>
                </div>

                {/* Total Price */}
                <div className="flex justify-between items-center py-3 border-t border-gray-200">
                  <span className="text-lg font-semibold text-gray-700">Total:</span>
                  <motion.span 
                    key={displayQuantity}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  >
                    ${(item.price * displayQuantity).toFixed(2)}
                  </motion.span>
                </div>

                {/* Cart Status */}
                {cartQuantity > 0 ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-green-600 font-medium bg-green-50 p-3 rounded-xl border border-green-200"
                  >
                    ✓ {cartQuantity} item(s) in cart
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-gray-500 bg-gray-50 p-3 rounded-xl border border-gray-200"
                  >
                    Click + to add to cart
                  </motion.div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <motion.button
                  onClick={handleCheckout}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ShoppingCart size={18} />
                  {cartQuantity > 0 ? 'Go to Cart' : 'Add & Checkout'}
                </motion.button>
                
                <motion.button
                  onClick={() => router.push('/orders')}
                  className="px-6 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-white hover:border-gray-300 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Browse More
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}