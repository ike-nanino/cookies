// app/bread/page.tsx
'use client';
import { motion } from 'framer-motion';
import BreadCard from '../../components/BreadCard';
import { breadData } from '../../constants/mockData';

export default function BreadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100" style={{ backgroundImage: 'url(/images/bread-background2.jpg)', backgroundSize: 'cover' }}>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
            Artisan Breads
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Freshly baked daily with the finest ingredients
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {breadData.map((bread, index) => (
            <motion.div
              key={bread.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <BreadCard bread={bread} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}