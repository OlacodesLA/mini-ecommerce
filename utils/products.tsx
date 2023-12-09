import { CartContext } from "@/context/stateContext";
import { useContext } from "react";

export const items: Item[] = [
  {
    id: 1,
    name: "Christmas Cake/Christmas Pudding",
    price: 8500,
    image: "",
  },
  {
    id: 2,
    name: "Mince Pies",
    price: 7500,
    image: "",
  },
  {
    id: 3,
    name: "Fudge",
    price: 6000,
    image: "Fudge.png",
  },
  {
    id: 4,
    name: "Chocolate Box",
    price: 5000,
    image: "",
  },
  {
    id: 5,
    name: "Tea",
    price: 6500,
    image: "Hibiscus-Tea.png",
  },
  {
    id: 6,
    name: "Cupcakes",
    price: 10000,
    image: "Mixed-Cupcakes.png",
  },
  {
    id: 7,
    name: "Banana Cake",
    price: 4500,
    image: "Banana-Loaf.png",
  },
  {
    id: 8,
    name: "Cream Liquer",
    price: 15000,
    image: "",
  },
  {
    id: 9,
    name: "Red Wine",
    price: 10000,
    image: "",
  },
  {
    id: 10,
    name: "Champagne",
    price: 65000,
    image: "",
  },
  {
    id: 11,
    name: "Raffia Packaging",
    price: 8000,
    image: "",
  },
  {
    id: 12,
    name: "Jute Packaging",
    price: 15000,
    image: "",
  },
  {
    id: 13,
    name: "Spiced Honey",
    price: 7500,
    image: "Spiced-Honey.png",
  },
  {
    id: 14,
    name: "Gummie Sweets",
    price: 7500,
    image: "Gummy-Sweets.png",
  },
  {
    id: 15,
    name: "Scented Candle",
    price: 35000,
    image: "",
  },
  {
    id: 16,
    name: "Chin Chin",
    price: 2500,
    image: "",
  },
  {
    id: 17,
    name: "Nuts",
    price: 2500,
    image: "",
  },
];

export const product: Product[] = [
  {
    name: "Keresimesi",
    price: 183000,
    image: "",
    items: [1, 2, 3, 4, 5, 6, 7, 10, 12, 13, 14, 15, 16, 17],
  },
  {
    name: "Yuletide",
    price: 133000,
    image: "",
    items: [1, 2, 3, 4, 5, 6, 7, 8, 12, 13, 14, 15, 16, 17],
  },
  {
    name: "Noel",
    price: 128000,
    image: "",
    items: [1, 2, 3, 4, 5, 6, 7, 9, 12, 13, 14, 15, 16, 17],
  },
  {
    name: "Navidad",
    price: 85500,
    image: "",
    items: [1, 2, 3, 4, 5, 6, 7, 9, 12, 14, 16, 17],
  },
  {
    name: "Natale",
    price: 57000,
    image: "",
    items: [1, 3, 4, 6, 7, 9, 11, 16, 17],
  },
  {
    name: "Shona",
    price: 44500,
    image: "",
    items: [1, 3, 4, 7, 11, 14, 16, 17],
  },
];

export interface Item {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface Product {
  name: string;
  price: number;
  image: string;
  items: number[];
}

export function getItemsData(items: Item[], products: any): Product[] {
  const itemsMap = new Map<number, Item>(items.map((item) => [item.id, item]));

  const getProductItemsData = (productData: Product): Item[] => {
    const productItemsData = productData.items.map((itemId) => {
      const itemData = itemsMap.get(itemId);
      if (itemData) {
        return { ...itemData };
      }
      return null;
    });

    return productItemsData.filter((item) => item !== null) as Item[];
  };

  const productsWithData = products.map((productData: any) => ({
    ...productData,
    items: getProductItemsData(productData),
  }));

  //@ts-ignore
  return productsWithData;
}
