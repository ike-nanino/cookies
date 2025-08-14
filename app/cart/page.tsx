// app/cart/page.tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft, CreditCard, Truck, Shield } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function CartPage() {
  const { items, addItem, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
  const router = useRouter();
  const totalPrice = getTotalPrice();
  const tax = totalPrice * 0.08; // 8% tax
  const shipping = totalPrice > 50 ? 0 : 5.99; // Free shipping over $50
  const finalTotal = totalPrice + tax + shipping;

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      updateQuantity(id, 0);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleCheckout = () => {
    alert('Proceeding to secure checkout...');
    // clearCart(); // Uncomment to clear cart after checkout
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <motion.div
          className="text-center max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <ShoppingBag size={40} className="text-white" />
            </motion.div>
            
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
              Your cart is empty
            </h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Discover our fresh baked goods and add some delicious items to your cart!
            </p>
            
            <motion.button
              onClick={() => router.push('/orders')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Browse Our Menu
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => router.push('/orders')}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors bg-white/60 backdrop-blur-sm px-4 py-2 rounded-xl hover:bg-white/80 border border-white/30"
              whileHover={{ x: -5 }}
            >
              <ArrowLeft size={20} />
              <span className="hidden sm:inline">Continue Shopping</span>
            </motion.button>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Shopping Cart
          </h1>
          
          <motion.button
            onClick={clearCart}
            className="text-red-500 hover:text-red-600 transition-colors flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-xl hover:bg-red-50/80 border border-white/30"
            whileHover={{ scale: 1.05 }}
          >
            <Trash2 size={18} />
            <span className="hidden sm:inline">Clear All</span>
          </motion.button>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-8 space-y-4">
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 sm:p-6 border border-white/30"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    {/* Item Image */}
                    <div className="w-full sm:w-24 h-48 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-200">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-grow min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 truncate">
                        {item.name}
                      </h3>
                      <p className="text-blue-600 font-semibold text-sm sm:text-base">
                        ${item.price.toFixed(2)} each
                      </p>
                      {item.category && (
                        <span className="inline-block mt-2 px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-xs font-medium rounded-full capitalize">
                          {item.category}
                        </span>
                      )}
                    </div>

                    {/* Quantity Controls - Mobile */}
                    <div className="flex sm:hidden items-center justify-between w-full pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-3">
                        <motion.button
                          onClick={() => removeItem(item.id)}
                          className="w-10 h-10 rounded-full bg-gradient-to-r from-red-100 to-pink-100 hover:from-red-200 hover:to-pink-200 flex items-center justify-center transition-all duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Minus size={16} className="text-red-600" />
                        </motion.button>
                        
                        <span className="w-12 text-center font-bold text-lg text-gray-800">
                          {item.quantity}
                        </span>
                        
                        <motion.button
                          onClick={() => addItem(item)}
                          className="w-10 h-10 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 hover:from-green-200 hover:to-emerald-200 flex items-center justify-center transition-all duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Plus size={16} className="text-green-600" />
                        </motion.button>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-xl font-bold text-gray-800">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>

                        <motion.button
                          onClick={() => updateQuantity(item.id, 0)}
                          className="text-red-500 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-lg"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Trash2 size={20} />
                        </motion.button>
                      </div>
                    </div>

                    {/* Quantity Controls - Desktop */}
                    <div className="hidden sm:flex items-center gap-3">
                      <motion.button
                        onClick={() => removeItem(item.id)}
                        className="w-10 h-10 rounded-full bg-gradient-to-r from-red-100 to-pink-100 hover:from-red-200 hover:to-pink-200 flex items-center justify-center transition-all duration-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Minus size={16} className="text-red-600" />
                      </motion.button>
                      
                      <span className="w-12 text-center font-bold text-lg text-gray-800">
                        {item.quantity}
                      </span>
                      
                      <motion.button
                        onClick={() => addItem(item)}
                        className="w-10 h-10 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 hover:from-green-200 hover:to-emerald-200 flex items-center justify-center transition-all duration-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Plus size={16} className="text-green-600" />
                      </motion.button>
                    </div>

                    {/* Item Total - Desktop */}
                    <div className="hidden sm:block text-right min-w-[100px]">
                      <p className="text-xl font-bold text-gray-800">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    {/* Remove Button - Desktop */}
                    <motion.button
                      onClick={() => updateQuantity(item.id, 0)}
                      className="hidden sm:block text-red-500 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 size={20} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/30 sticky top-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
                Order Summary
              </h2>
              
              {/* Order Items */}
              <div className="space-y-3 mb-6 max-h-40 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-gray-600 flex-1 truncate pr-2">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="text-gray-800 font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-3 mb-6 py-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="text-gray-800 font-semibold">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (8%):</span>
                  <span className="text-gray-800 font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="text-gray-800 font-semibold">
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {totalPrice < 50 && (
                  <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded-lg">
                    Add ${(50 - totalPrice).toFixed(2)} more for free shipping!
                  </div>
                )}
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-800">Total:</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Security Features */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="text-center">
                  <Shield size={20} className="text-green-600 mx-auto mb-1" />
                  <span className="text-xs text-gray-600">Secure</span>
                </div>
                <div className="text-center">
                  <Truck size={20} className="text-blue-600 mx-auto mb-1" />
                  <span className="text-xs text-gray-600">Fast Delivery</span>
                </div>
                <div className="text-center">
                  <CreditCard size={20} className="text-purple-600 mx-auto mb-1" />
                  <span className="text-xs text-gray-600">Safe Payment</span>
                </div>
              </div>

              <motion.button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-6 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Proceed to Checkout
              </motion.button>

              <div className="text-xs text-gray-500 text-center mt-4 leading-relaxed">
                🔒 Secure checkout with 256-bit SSL encryption
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}