// app/cakes/page.tsx
'use client';
import { motion } from 'framer-motion';
import CakeCard from '../../components/CakeCard';
import { cakeData } from '../../constants/mockData';

export default function CakesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100">
      <div className="container mx-auto px-4 py-8">
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
            Artisan Cakes & Desserts
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Exquisite cakes crafted with passion and the finest ingredients for every celebration
          </p>
        </motion.div> */}

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {cakeData.map((cake, index) => (
            <motion.div
              key={cake.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <CakeCard cake={cake} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}