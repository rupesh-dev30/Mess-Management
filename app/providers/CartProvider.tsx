import { CartItem, Product, Tables } from "@/types/types";
import { createContext, ReactNode, useContext, useState } from "react";
import { randomUUID } from "expo-crypto";
import { createOrder } from "../api/orders";
import { useRouter } from "expo-router";
import { createOrderItems } from "../api/order-items";

type CartType = {
  items: CartItem[];
  addItem: (product: Tables<"products">) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: number;
  checkout: () => void;
};

export const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  checkout: () => {},
});

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const { mutate: addOrder } = createOrder();
  const { mutate: addOrderItems } = createOrderItems();

  const router = useRouter();

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

  const total = items.reduce(
    (sum, item) => (sum += item.product.price * item.quantity),
    0
  );

  const clearCart = () => {
    setItems([]);
  };

  const checkout = () => {
    addOrder(
      { total },
      {
        onSuccess: saveOrderItems,
      }
    );
  };

  const saveOrderItems = (order: Tables<"orders">) => {
    const orderItems = items.map((cartItem) => ({
      order_id: order.id,
      product_id: cartItem.product_id,
      quantity: cartItem.quantity,
    }));

    addOrderItems(orderItems, {
      onSuccess(){
        clearCart();
        router.push(`/(user)/orders/${order.id}`);
      },
    });
  };

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, total, checkout }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
