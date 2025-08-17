// constants/mockData.ts
export interface BakeryItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  ingredients: string[];
  category: 'bread' | 'cake' | 'cookie' | 'pasta';
}

// Bread Data
export const breadData: BakeryItem[] = [
  {
    id: '1',
    name: 'Sourdough Bread',
    price: 8.50,
    image: '/images/order.png',
    description: 'Traditional sourdough bread with a perfectly tangy flavor and crispy crust. Made with our 100-year-old starter, this artisanal loaf features a complex flavor profile with hints of wine and nuts. The long fermentation process creates a bread that\'s not only delicious but also easier to digest.',
    ingredients: ['Organic flour', '100-year-old sourdough starter', 'Filtered water', 'Sea salt', 'Time and patience'],
    category: 'bread'
  },
  {
    id: '2',
    name: 'French Baguette',
    price: 4.25,
    image: '/images/order.png',
    description: 'Classic French baguette with a golden-brown crust and soft, airy interior. Perfect for sandwiches or enjoying with butter and jam.',
    ingredients: ['French flour', 'Water', 'Fresh yeast', 'Sea salt'],
    category: 'bread'
  },
  {
    id: '3',
    name: 'Whole Wheat Bread',
    price: 6.75,
    image: '/images/order.png',
    description: 'Nutritious whole wheat bread packed with fiber and nutrients. Made with organic whole wheat flour and a touch of honey for natural sweetness.',
    ingredients: ['Organic whole wheat flour', 'Honey', 'Water', 'Active dry yeast', 'Sea salt', 'Olive oil'],
    category: 'bread'
  },
  {
    id: '4',
    name: 'Rye Bread',
    price: 7.00,
    image: '/images/order.png',
    description: 'Dense and flavorful rye bread with caraway seeds. Perfect for deli sandwiches and pairs wonderfully with pastrami or corned beef.',
    ingredients: ['Rye flour', 'Bread flour', 'Caraway seeds', 'Water', 'Yeast', 'Salt', 'Molasses'],
    category: 'bread'
  },
  {
    id: '5',
    name: 'Ciabatta',
    price: 5.50,
    image: '/images/order.png',
    description: 'Italian ciabatta with an open crumb structure and crispy crust. Ideal for paninis, bruschetta, or simply drizzled with olive oil.',
    ingredients: ['Italian 00 flour', 'Water', 'Fresh yeast', 'Salt', 'Extra virgin olive oil'],
    category: 'bread'
  },
  {
    id: '6',
    name: 'Brioche',
    price: 9.25,
    image: '/images/order.png',
    description: 'Rich and buttery French brioche with a tender, pillowy texture. Made with eggs and butter for an indulgent treat perfect for French toast or enjoyed on its own.',
    ingredients: ['Bread flour', 'Fresh eggs', 'European butter', 'Sugar', 'Fresh yeast', 'Milk', 'Sea salt'],
    category: 'bread'
  }
];

// Cake Data
export const cakeData: BakeryItem[] = [
  {
    id: 'c1',
    name: 'Chocolate Fudge Cake',
    price: 28.99,
    image: '/images/order.png',
    description: 'Decadent three-layer chocolate cake with rich fudge frosting. Made with premium Belgian chocolate and topped with chocolate ganache. Perfect for celebrations or when you need the ultimate chocolate fix.',
    ingredients: ['Dark chocolate', 'Cocoa powder', 'Butter', 'Sugar', 'Eggs', 'Flour', 'Heavy cream', 'Vanilla extract'],
    category: 'cake'
  },
  {
    id: 'c2',
    name: 'Red Velvet Cake',
    price: 32.50,
    image: '/images/order.png',
    description: 'Classic Southern red velvet cake with cream cheese frosting. Moist, tender layers with a hint of cocoa and that signature red color. Finished with our signature cream cheese buttercream.',
    ingredients: ['Cake flour', 'Cocoa powder', 'Red food coloring', 'Buttermilk', 'Cream cheese', 'Butter', 'Powdered sugar', 'Vanilla'],
    category: 'cake'
  },
  {
    id: 'c3',
    name: 'Lemon Drizzle Cake',
    price: 24.75,
    image: '/images/order.png',
    description: 'Light and zesty lemon cake soaked in lemon syrup with a tangy glaze. Made with fresh lemon juice and zest for an authentic citrus burst that\'s both refreshing and indulgent.',
    ingredients: ['Fresh lemons', 'Butter', 'Sugar', 'Eggs', 'Self-raising flour', 'Lemon zest', 'Powdered sugar', 'Lemon juice'],
    category: 'cake'
  },
  {
    id: 'c4',
    name: 'Carrot Cake',
    price: 26.99,
    image: '/images/order.png',
    description: 'Moist spiced carrot cake loaded with fresh carrots, walnuts, and warm spices. Topped with our signature cream cheese frosting and a sprinkle of chopped walnuts.',
    ingredients: ['Fresh carrots', 'Walnuts', 'Cinnamon', 'Nutmeg', 'Flour', 'Brown sugar', 'Vegetable oil', 'Cream cheese', 'Butter'],
    category: 'cake'
  },
  {
    id: 'c5',
    name: 'Strawberry Shortcake',
    price: 22.50,
    image: '/images/order.png',
    description: 'Light vanilla sponge layered with fresh strawberries and whipped cream. Made with locally sourced strawberries when in season for the perfect summer dessert.',
    ingredients: ['Fresh strawberries', 'Heavy cream', 'Vanilla sponge', 'Sugar', 'Vanilla extract', 'Eggs', 'Flour', 'Butter'],
    category: 'cake'
  },
  {
    id: 'c6',
    name: 'Tiramisu Cake',
    price: 34.99,
    image: '/images/order.png',
    description: 'Italian-inspired tiramisu in cake form. Coffee-soaked ladyfingers layered with mascarpone cream and dusted with cocoa powder. A sophisticated dessert for coffee lovers.',
    ingredients: ['Ladyfingers', 'Espresso', 'Mascarpone cheese', 'Heavy cream', 'Sugar', 'Eggs', 'Cocoa powder', 'Dark rum'],
    category: 'cake'
  }
];

// Cookie Data
export const cookieData: BakeryItem[] = [
  {
    id: 'k1',
    name: 'Chocolate Chip Cookies',
    price: 3.50,
    image: '/images/order.png',
    description: 'Classic homestyle chocolate chip cookies with a perfect chewy texture. Made with premium chocolate chips and a hint of vanilla. The ultimate comfort cookie that never goes out of style.',
    ingredients: ['Chocolate chips', 'Butter', 'Brown sugar', 'White sugar', 'Eggs', 'Vanilla', 'Flour', 'Baking soda', 'Salt'],
    category: 'cookie'
  },
  {
    id: 'k2',
    name: 'Oatmeal Raisin Cookies',
    price: 3.25,
    image: '/images/order.png',
    description: 'Hearty oatmeal cookies packed with plump raisins and warm cinnamon. These wholesome treats offer the perfect balance of chewy oats and sweet raisins.',
    ingredients: ['Rolled oats', 'Raisins', 'Cinnamon', 'Brown sugar', 'Butter', 'Eggs', 'Flour', 'Vanilla extract'],
    category: 'cookie'
  },
  {
    id: 'k3',
    name: 'Sugar Cookies',
    price: 3.00,
    image: '/images/order.png',
    description: 'Soft and buttery sugar cookies with a delicate vanilla flavor. Perfect for decorating or enjoying as-is. These classic treats melt in your mouth with every bite.',
    ingredients: ['Butter', 'Sugar', 'Eggs', 'Vanilla extract', 'Flour', 'Baking powder', 'Salt', 'Almond extract'],
    category: 'cookie'
  },
  {
    id: 'k4',
    name: 'Double Chocolate Cookies',
    price: 3.75,
    image: '/images/order.png',
    description: 'Rich chocolate cookies loaded with chocolate chips for the ultimate chocolate experience. Fudgy, decadent, and perfect for serious chocolate lovers.',
    ingredients: ['Dark chocolate', 'Chocolate chips', 'Cocoa powder', 'Butter', 'Sugar', 'Eggs', 'Flour', 'Vanilla'],
    category: 'cookie'
  },
  {
    id: 'k5',
    name: 'Snickerdoodles',
    price: 3.25,
    image: '/images/order.png',
    description: 'Soft cinnamon-sugar cookies with a tender crumb and irresistible cinnamon coating. These classic American cookies are comfort food at its finest.',
    ingredients: ['Butter', 'Sugar', 'Eggs', 'Cream of tartar', 'Baking soda', 'Flour', 'Cinnamon', 'Salt'],
    category: 'cookie'
  },
  {
    id: 'k6',
    name: 'Peanut Butter Cookies',
    price: 3.50,
    image: '/images/order.png',
    description: 'Rich and nutty peanut butter cookies with the classic crisscross pattern. Made with natural peanut butter for an authentic, robust flavor.',
    ingredients: ['Natural peanut butter', 'Brown sugar', 'White sugar', 'Eggs', 'Vanilla', 'Flour', 'Baking soda', 'Salt'],
    category: 'cookie'
  }
];

// Pasta Data
export const pastaData: BakeryItem[] = [
  {
    id: 'p1',
    name: 'Fresh Fettuccine',
    price: 12.99,
    image: '/images/fresh-fettuccine.jpg',
    description: 'Hand-rolled fresh fettuccine made daily with organic eggs and semolina flour. Perfect with our homemade sauces or your favorite pasta preparations. Silky texture and rich flavor.',
    ingredients: ['Semolina flour', 'Organic eggs', 'Extra virgin olive oil', 'Sea salt', 'Durum wheat'],
    category: 'pasta'
  },
  {
    id: 'p2',
    name: 'Spinach Linguine',
    price: 13.50,
    image: '/images/spinach-linguine.jpg',
    description: 'Vibrant green linguine infused with fresh spinach. This colorful pasta not only looks beautiful but adds a subtle earthy flavor and extra nutrients to your meal.',
    ingredients: ['Fresh spinach', 'Semolina flour', 'Eggs', 'Olive oil', 'Salt', 'Durum wheat'],
    category: 'pasta'
  },
  {
    id: 'p3',
    name: 'Homemade Ravioli',
    price: 16.75,
    image: '/images/homemade-ravioli.jpg',
    description: 'Delicate pasta parcels filled with ricotta, parmesan, and fresh herbs. Each ravioli is hand-crafted and sealed to perfection. Available with various seasonal fillings.',
    ingredients: ['Pasta dough', 'Ricotta cheese', 'Parmesan cheese', 'Fresh herbs', 'Eggs', 'Nutmeg', 'Black pepper'],
    category: 'pasta'
  },
  {
    id: 'p4',
    name: 'Pappardelle',
    price: 14.25,
    image: '/images/pappardelle.jpg',
    description: 'Wide ribbon pasta perfect for hearty sauces. Our pappardelle has the ideal thickness and texture to hold rich ragùs and cream sauces beautifully.',
    ingredients: ['00 flour', 'Egg yolks', 'Whole eggs', 'Olive oil', 'Semolina flour', 'Salt'],
    category: 'pasta'
  },
  {
    id: 'p5',
    name: 'Gnocchi',
    price: 11.99,
    image: '/images/gnocchi.jpg',
    description: 'Pillowy soft potato gnocchi made from scratch with russet potatoes and minimal flour. These delicate dumplings are perfect with butter, sage, or your favorite sauce.',
    ingredients: ['Russet potatoes', '00 flour', 'Egg', 'Parmesan cheese', 'Salt', 'Nutmeg'],
    category: 'pasta'
  },
  {
    id: 'p6',
    name: 'Squid Ink Linguine',
    price: 15.50,
    image: '/images/squid-ink-linguine.jpg',
    description: 'Dramatic black linguine infused with squid ink for a unique briny flavor and striking appearance. Perfect for seafood dishes and special occasions.',
    ingredients: ['Squid ink', 'Semolina flour', 'Eggs', 'Olive oil', 'Salt', 'Durum wheat'],
    category: 'pasta'
  }
];

// Combined data for easy access
export const allBakeryItems: BakeryItem[] = [
  ...breadData,
  ...cakeData,
  ...cookieData,
  ...pastaData
];

// Helper functions
export const getItemsByCategory = (category: BakeryItem['category']): BakeryItem[] => {
  return allBakeryItems.filter(item => item.category === category);
};

export const getItemById = (id: string): BakeryItem | undefined => {
  return allBakeryItems.find(item => item.id === id);
};

export const searchItems = (query: string): BakeryItem[] => {
  const lowercaseQuery = query.toLowerCase();
  return allBakeryItems.filter(item => 
    item.name.toLowerCase().includes(lowercaseQuery) ||
    item.description.toLowerCase().includes(lowercaseQuery) ||
    item.ingredients.some(ingredient => 
      ingredient.toLowerCase().includes(lowercaseQuery)
    )
  );
};