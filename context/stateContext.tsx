"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";
import toast, { useToaster } from "react-hot-toast";
import { useEffect } from "react";

// Step 1: Create a context for the cart data
interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  totalQuantity: number;
  addToCart: (product: CartItem) => void;
  removeFromCart: (productName: string) => void;
  incrementQuantity: (productName: string) => void;
  decrementQuantity: (productName: string) => void;
  showCart: boolean;
  setShowCart: Dispatch<SetStateAction<boolean>>;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

// Step 2: Create a CartProvider component to manage the cart state
interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  // Load cart data from localStorage on component initialization
  const initialCart = JSON.parse(localStorage.getItem("cart") || "[]");
  const [cart, setCart] = useState<CartItem[]>(initialCart);
  const [showCart, setShowCart] = useState(false);

  // Function to save the cart data to localStorage
  const saveCartToLocalStorage = (cartData: CartItem[]) => {
    localStorage.setItem("cart", JSON.stringify(cartData));
  };

  // Initialize the cart with the loaded data from localStorage
  useEffect(() => {
    setCart(initialCart);
  }, []);

  const addToCart = (product: CartItem) => {
    const existingProductIndex = cart.findIndex(
      (item) => item.name === product.name
    );

    if (existingProductIndex !== -1) {
      // If the product is already in the cart, increment its quantity
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
      saveCartToLocalStorage(updatedCart);
      toast(
        `${product.name} quantity increased to ${updatedCart[existingProductIndex].quantity}`,
        { icon: "🛒" }
      );
    } else {
      // If the product is not in the cart, toast it
      setCart([...cart, { ...product, quantity: 1 }]);
      saveCartToLocalStorage([...cart, { ...product, quantity: 1 }]);
      toast(`${product.name} toasted to cart`, { icon: "🛒" });
    }
  };

  const removeFromCart = (productName: string) => {
    const updatedCart = cart.filter((item) => item.name !== productName);
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
    toast(`${productName} removed from cart`, { icon: "🗑️" });
  };

  const incrementQuantity = (productName: string) => {
    const updatedCart = cart.map((item) =>
      item.name === productName
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
    toast(
      `${productName} quantity increased to ${
        updatedCart.find((item) => item.name === productName)?.quantity
      }`,
      { icon: "🛒" }
    );
  };

  const decrementQuantity = (productName: string) => {
    const updatedCart = cart.map((item) =>
      item.name === productName && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
    toast(
      `${productName} quantity decreased to ${
        updatedCart.find((item) => item.name === productName)?.quantity
      }`,
      { icon: "🛒" }
    );
  };

  const clearCart = () => {
    // Clear the cart and remove the cart data from localStorage
    setCart([]);
    localStorage.removeItem("cart");
    toast("Cart cleared!", { icon: "🗑️" });
  };

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        totalQuantity,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        setShowCart,
        showCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
