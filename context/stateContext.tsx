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
import { Product, getItemsData, items, product } from "@/utils/products";

// Step 1: Create a context for the cart data
export interface CartItem {
  name: string;
  price: number;
  quantity: number;
  items: string;
  packQuantity?: number;
}

interface CartContextType {
  cart: CartItem[];
  totalQuantity: number;
  addToCart: (product: CartItem) => void;
  removeFromCart: (productName: string) => void;
  incrementQuantity: (productName: string) => void;
  decrementQuantity: (productName: string) => void;
  addToPack: (pack: PackItem) => void;
  removeFromPack: (packName: string) => void;
  clearPacks: () => void;
  showCart: boolean;
  setShowCart: Dispatch<SetStateAction<boolean>>;
  clearCart: () => void;
  totalPrice: number;
  totalPacks: number;
  totalPacksPrice: number;
  packs: PackItem[];
  products: any;
  setProducts: any;
}

export interface PackItem {
  name: string;
  price: number;
  items: CartItem[]; // An array of CartItems in the pack
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

// Step 2: Create a CartProvider component to manage the cart state
interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [packs, setPacks] = useState<PackItem[]>([]);
  const [products, setProducts] = useState<any>([]);

  const productsWithData: Product[] = getItemsData(items, products);

  useEffect(() => {
    // Check if localStorage is available (client-side)
    if (typeof window !== "undefined") {
      // Load cart data from localStorage on component initialization
      const initialCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(initialCart);

      // Load pack data from localStorage on component initialization
      const initialPacks = JSON.parse(localStorage.getItem("packs") || "[]");
      setPacks(initialPacks);

      const storedProducts = localStorage.getItem("products");
      const initialProducts = storedProducts
        ? JSON.parse(storedProducts)
        : product;

      setProducts(initialProducts);
    }
  }, []);

  const saveCartToLocalStorage = (cartData: CartItem[]) => {
    // Check if localStorage is available (client-side)
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cartData));

      // Save pack data to localStorage
      localStorage.setItem("packs", JSON.stringify(packs));
    }
  };

  const saveDataToLocalStorage = () => {
    // Check if localStorage is available (client-side)
    if (typeof window !== "undefined") {
      // Save cart data to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      // Save pack data to localStorage
      localStorage.setItem("packs", JSON.stringify(packs));
    }
  };

  useEffect(() => {
    // Update localStorage whenever cart or packs change

    setTimeout(() => {
      saveDataToLocalStorage();
    }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart, packs]);

  useEffect(() => {
    setTimeout(() => {
      if (typeof window !== "undefined") {
        // Save cart data to localStorage

        localStorage.setItem("products", JSON.stringify(products));
      }
    }, 200);
  }, [products]);

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
      const aproduct = productsWithData.find(
        (prod) => prod.name.toLowerCase() === product.name.toLowerCase()
      );

      const foundProductNames = aproduct?.items.map((prod: any) => prod.name);
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
          items: `${foundProductNames?.join(", ")},`,
          packQuantity: foundProductNames ? foundProductNames.length : 1,
        },
      ]);
      saveCartToLocalStorage([
        ...cart,
        {
          ...product,
          quantity: 1,
          items: `${foundProductNames?.join(", ")} ,`,
          packQuantity: foundProductNames ? foundProductNames.length : 1,
        },
      ]);
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
  const totalPrice = cart.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  // Functions to manage packs
  const addToPack = (pack: PackItem) => {
    setPacks([...packs, pack]);
  };

  const removeFromPack = (packName: string) => {
    const updatedPacks = packs.filter((pack) => pack.name !== packName);
    setPacks(updatedPacks);
  };

  const clearPacks = () => {
    setPacks([]);
  };

  const totalPacks = packs.length;

  const totalPacksPrice = packs.reduce((total, pack) => {
    const packTotal = pack.items.reduce(
      (itemTotal, item) => itemTotal + item.quantity * item.price,
      0
    );
    return total + packTotal;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        packs,
        totalPacks,
        totalPacksPrice,
        totalQuantity,
        addToCart,
        addToPack,
        removeFromPack,
        clearPacks,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        setShowCart,
        showCart,
        clearCart,
        totalPrice,
        setProducts,
        products,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
