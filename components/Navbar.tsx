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
            <h1 className="text-2xl font-bold text-amber-600">Golden Crust</h1>
            <p className="text-xs text-gray-600">Artisan Bakery</p>
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => router.push('/')}
              className="text-gray-700 hover:text-amber-600 transition-colors font-medium"
            >
              Home
            </button>
            <button
              onClick={() => router.push('/bread')}
              className="text-gray-700 hover:text-amber-600 transition-colors font-medium"
            >
              Breads
            </button>
            <button
              onClick={() => router.push('/cake')}
              className="text-gray-700 hover:text-amber-600 transition-colors font-medium"
            >
              Cakes
            </button>
            <button
              onClick={() => router.push('/cookie')}
              className="text-gray-700 hover:text-amber-600 transition-colors font-medium"
            >
              Cookies
            </button>
            <button
              onClick={() => router.push('/pasta')}
              className="text-gray-700 hover:text-amber-600 transition-colors font-medium"
            >
              Pasta
            </button>
            <button
              onClick={() => router.push('/about')}
              className="text-gray-700 hover:text-amber-600 transition-colors font-medium"
            >
              About
            </button>
          </div>

          {/* Cart Button */}
          <CartButton />
        </div>
      </div>
    </motion.nav>
  );
}