"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useContext, useState } from "react";

export interface CartProduct extends Product {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  products: CartProduct[];
  toggleCart: () => void;
  addProductToCart: (product: CartProduct) => void;
  removeProductFromCart: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  decreaseProductQuantity: (productId: string) => void;
  calculateTotalOrder: () => number;
  calculateTotalQuantityOrder: () => number;
  cleanCart: () => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  toggleCart: () => {},
  addProductToCart: () => {},
  removeProductFromCart: () => {},
  increaseProductQuantity: () => {},
  decreaseProductQuantity: () => {},
  calculateTotalOrder: () => 0,
  calculateTotalQuantityOrder: () => 0,
  cleanCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<CartProduct[]>([]);
  const toggleCart = () => setIsOpen((prev) => !prev);
  const addProductToCart = (product: CartProduct) => {
    const existingProduct = products.find((p) => p.id === product.id);

    if (existingProduct) {
      setProducts(
        products.map((p) =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + product.quantity }
            : p,
        ),
      );
    } else {
      setProducts([...products, { ...product, quantity: product.quantity }]);
    }
  };
  const removeProductFromCart = (productId: string) => {
    setProducts(products.filter((product) => product.id !== productId));
  };
  const increaseProductQuantity = (productId: string) => {
    setProducts(
      products.map((product) =>
        product.id === productId
          ? { ...product, quantity: Math.min(99, product.quantity + 1) }
          : product,
      ),
    );
  };
  const decreaseProductQuantity = (productId: string) => {
    setProducts(
      products.map((product) =>
        product.id === productId
          ? { ...product, quantity: Math.max(1, product.quantity - 1) }
          : product,
      ),
    );
  };

  const calculateTotalOrder = () =>
    products.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0,
    );

  const calculateTotalQuantityOrder = () =>
    products.reduce(
      (acc, product) => acc + product.quantity,
      0,
    );

  const cleanCart = () => {
    setProducts([]);
    setIsOpen(false);
  };

  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        toggleCart,
        addProductToCart,
        removeProductFromCart,
        increaseProductQuantity,
        decreaseProductQuantity,
        calculateTotalOrder,
        calculateTotalQuantityOrder,
        cleanCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  return useContext(CartContext);
}
