import { toast } from 'sonner';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartItem = Product & {
  quantity: number;
};

type CartStorage = {
  cart: CartItem[];
  increment: (product: Product) => void;
  decrement: (product: Product) => void;
  remove: (id: string) => void;
  removeAll: () => void;
  add: (product: Product) => void;
};

export const useCart = create<CartStorage>()(
  persist<CartStorage>(
    (set) => ({
      cart: [],
      increment: (product) =>
        set((state) => {
          const index = state.cart.findIndex((p) => p._id === product._id);
          if (index !== -1) {
            state.cart[index].quantity += 1;
            return { cart: [...state.cart] };
          }
          return { cart: [...state.cart, { ...product, quantity: 1 }] };
        }),
      decrement: (product) =>
        set((state) => {
          const index = state.cart.findIndex((p) => p._id === product._id);
          if (index !== -1) {
            if (state.cart[index].quantity === 1) {
              toast.error(`can't decrement more than`);
              return { cart: [...state.cart] };
            }
            state.cart[index].quantity -= 1;
            return { cart: [...state.cart] };
          }
          return { cart: [...state.cart] };
        }),
      remove: (id) =>
        set((state) => {
          const cart = state.cart.filter((p) => p._id != id);
          return { cart: [...cart] };
        }),
      removeAll: () => set(() => ({ cart: [] })),
      add: (product) =>
        set((state) => {
          const index = state.cart.findIndex((p) => p._id === product._id);
          if (index !== -1) {
            toast.error('Product already in cart');
            return { cart: [...state.cart] };
          }
          toast.success('Product added to cart');
          return { cart: [...state.cart, { ...product, quantity: 1 }] };
        }),
    }),
    {
      name: 'cart-storage',
    }
  )
);
