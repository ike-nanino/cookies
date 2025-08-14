// app/orders/page.tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Search, Filter, ShoppingCart, Grid, List } from 'lucide-react';
import { allBakeryItems, breadData, cakeData, cookieData, pastaData } from '../../constants/mockData';
import BreadCard from '../../components/BreadCard';
import CakeCard from '../../components/CakeCard';
import CookieCard from '../../components/CookieCard';
import PastaCard from '../../components/PastaCard';
import { useCartStore } from '../../store/cartStore';
import { useRouter } from 'next/navigation';

type CategoryType = 'all' | 'bread' | 'cake' | 'cookie' | 'pasta';
type ViewType = 'grid' | 'list';

export default function OrdersPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewType, setViewType] = useState<ViewType>('grid');
  const { items } = useCartStore();
  const router = useRouter();

  const categories = [
    { id: 'all', name: 'All Items', count: allBakeryItems.length, color: 'from-gray-500 to-gray-600' },
    { id: 'bread', name: 'Fresh Bread', count: breadData.length, color: 'from-amber-500 to-orange-600' },
    { id: 'cake', name: 'Cakes', count: cakeData.length, color: 'from-pink-500 to-rose-600' },
    { id: 'cookie', name: 'Cookies', count: cookieData.length, color: 'from-amber-600 to-yellow-600' },
    { id: 'pasta', name: 'Fresh Pasta', count: pastaData.length, color: 'from-green-500 to-emerald-600' },
  ];

  const filteredItems = allBakeryItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.ingredients.some(ingredient => 
                           ingredient.toLowerCase().includes(searchQuery.toLowerCase())
                         );
    return matchesCategory && matchesSearch;
  });

  const renderCard = (item: any) => {
    const cardProps = { [item.category]: item };
    
    switch (item.category) {
      case 'bread':
        return <BreadCard key={item.id} bread={item} />;
      case 'cake':
        return <CakeCard key={item.id} cake={item} />;
      case 'cookie':
        return <CookieCard key={item.id} cookie={item} />;
      case 'pasta':
        return <PastaCard key={item.id} pasta={item} />;
      default:
        return null;
    }
  };

  const totalCartItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Artisan Bakery Menu
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Discover our fresh-baked goods, handcrafted daily with the finest ingredients and traditional techniques
          </p>
        </motion.div>

        {/* Cart Button - Fixed */}
        {totalCartItems > 0 && (
          <motion.button
            onClick={() => router.push('/cart')}
            className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl z-50 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
              {totalCartItems}
            </span>
          </motion.button>
        )}

        {/* Search and Filters */}
        <motion.div
          className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 mb-8 border border-white/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for bread, cakes, cookies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/80 backdrop-blur-sm"
              />
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-gray-100/80 backdrop-blur-sm rounded-xl p-1">
              <button
                onClick={() => setViewType('grid')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewType === 'grid' 
                    ? 'bg-white shadow-sm text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewType('list')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewType === 'list' 
                    ? 'bg-white shadow-sm text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id as CategoryType)}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 border-2 ${
                  selectedCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white border-transparent shadow-lg`
                    : 'bg-white/80 backdrop-blur-sm text-gray-700 border-white/50 hover:border-gray-300 hover:bg-white'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <span className="flex items-center gap-2">
                  {category.name}
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    selectedCategory === category.id 
                      ? 'bg-white/20' 
                      : 'bg-gray-200'
                  }`}>
                    {category.count}
                  </span>
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Results Counter */}
        <motion.div
          className="mb-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-gray-600">
            Showing <span className="font-semibold text-blue-600">{filteredItems.length}</span> 
            {searchQuery && (
              <> results for "<span className="font-semibold">{searchQuery}</span>"</>
            )}
          </p>
        </motion.div>

        {/* Products Grid/List */}
        <AnimatePresence mode="wait">
          {filteredItems.length > 0 ? (
            <motion.div
              key={`${selectedCategory}-${viewType}-${searchQuery}`}
              className={
                viewType === 'grid'
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={viewType === 'list' ? 'max-w-md mx-auto' : ''}
                >
                  {renderCard(item)}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 max-w-md mx-auto shadow-lg border border-white/30">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search size={32} className="text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">No items found</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  We couldn't find any items matching your search. Try adjusting your filters or search terms.
                </p>
                <motion.button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear Filters
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}