
// store/cartStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Bread } from '../types/bread';

interface CartStore {
  items: CartItem[];
  addItem: (bread: Bread) => void;
  removeItem: (breadId: string) => void;
  updateQuantity: (breadId: string, quantity: number) => void;
  getTotalPrice: () => number;
  getItemQuantity: (breadId: string) => number;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (bread) => {
        const items = get().items;
        const existingItem = items.find(item => item.id === bread.id);
        
        if (existingItem) {
          set({
            items: items.map(item =>
              item.id === bread.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          });
        } else {
          set({
            items: [...items, { ...bread, quantity: 1 }]
          });
        }
      },
      removeItem: (breadId) => {
        const items = get().items;
        const existingItem = items.find(item => item.id === breadId);
        
        if (existingItem && existingItem.quantity > 1) {
          set({
            items: items.map(item =>
              item.id === breadId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
          });
        } else {
          set({
            items: items.filter(item => item.id !== breadId)
          });
        }
      },
      updateQuantity: (breadId, quantity) => {
        if (quantity <= 0) {
          set({
            items: get().items.filter(item => item.id !== breadId)
          });
        } else {
          set({
            items: get().items.map(item =>
              item.id === breadId
                ? { ...item, quantity }
                : item
            )
          });
        }
      },
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
      getItemQuantity: (breadId) => {
        const item = get().items.find(item => item.id === breadId);
        return item?.quantity || 0;
      },
      clearCart: () => {
        set({ items: [] });
      }
    }),
    {
      name: 'bakery-cart'
    }
  )
);