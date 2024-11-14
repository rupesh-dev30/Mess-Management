import { CartItem, Product, Tables } from "@/types/types";
import { createContext, ReactNode, useContext, useState } from "react";
import { randomUUID } from "expo-crypto";

type CartType = {
  items: CartItem[];
  addItem: (product: Tables<'products'>) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: number;
};

export const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
});

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product) => {
    setItems((prevItems) => {
      // Check if the item is already in the cart
      const existingItem = prevItems.find(
        (item) => item.product_id === product.id
      );

      if (existingItem) {
        // If it exists, increase the quantity
        return prevItems.map((item) =>
          item.product_id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If it doesn't exist, add it as a new item
        const newCartItem: CartItem = {
          id: randomUUID(),
          product,
          product_id: product.id,
          quantity: 1,
        };
        return [newCartItem, ...prevItems];
      }
    });
  };

  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    const updatedItems = items
      .map((item) =>
        item.id !== itemId
          ? item
          : { ...item, quantity: item.quantity + amount }
      )
      .filter((item) => item.quantity > 0);
    setItems(updatedItems);
  };

  const total = items.reduce((sum, item) => (sum += item.product.price *  item.quantity), 0);

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, total }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
