// components/Navbar.tsx
'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import CartButton from './CartButton';

export default function Navbar() {
  const router = useRouter();

  return (
    <motion.nav
      className="bg-white shadow-lg sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            onClick={() => router.push('/')}
            className="cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <h1 className="text-base lg:text-xl font-bold text-amber-600">Parcs</h1>
           
          </motion.div>

          {/* Navigation Links */}
          <div className="text-xs lg:text-xl flex items-center gap-8">
            <button
              onClick={() => router.push('/')}
              className="text-gray-700 hover:text-amber-600 transition-colors font-medium"
            >
              Home
            </button>
            <button
              onClick={() => router.push('/about')}
              className="text-gray-700 hover:text-amber-600 transition-colors font-medium"
            >
              About
            </button>
            <button
              onClick={() => router.push('/order')}
              className="text-gray-700 hover:text-amber-600 transition-colors font-medium"
            >
              Orders
            </button>
          </div>

          {/* Cart Button */}
          <CartButton />
        </div>
      </div>
    </motion.nav>
  );
}