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
    image: "Fudge.svg",
  },
  {
    id: 4,
    name: "Chocolate Box",
    price: 5000,
    image: "Chocolate-Chip-Cookies.svg",
  },
  {
    id: 5,
    name: "Tea",
    price: 6500,
    image: "Hibiscus-Tea.svg",
  },
  {
    id: 6,
    name: "Cupcakes",
    price: 10000,
    image: "Mixed-Cupcakes.svg",
  },
  {
    id: 7,
    name: "Banana Cake",
    price: 4500,
    image: "Banana-Loaf.svg",
  },
  {
    id: 8,
    name: "Cream Liquer",
    price: 15000,
    image: "",
  },
  {
    id: 9,
    name: "Wine",
    price: 10000,
    image: "Muled-Wine.svg",
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
    image: "Spiced-Honey.svg",
  },
  {
    id: 14,
    name: "Gummie Sweets",
    price: 7500,
    image: "Gummy-Sweets.svg",
  },
  {
    id: 15,
    name: "Scented Candle",
    price: 35000,
    image: "",
  },
];

export const product: Product[] = [
  {
    name: "Keresimesi",
    price: 178000,
    image: "",
    items: [1, 2, 3, 4, 5, 6, 7, 10, 12, 13, 14, 15],
  },
  {
    name: "Yuletide",
    price: 128000,
    image: "",
    items: [1, 2, 3, 4, 5, 6, 7, 8, 12, 13, 14, 15],
  },
  {
    name: "Noel",
    price: 123000,
    image: "",
    items: [1, 2, 3, 4, 5, 6, 7, 9, 12, 13, 14, 15],
  },
  {
    name: "Navidad",
    price: 80500,
    image: "",
    items: [1, 2, 3, 4, 5, 6, 7, 9, 12, 14],
  },
  {
    name: "Natale",
    price: 52000,
    image: "",
    items: [1, 3, 4, 6, 7, 9, 11],
  },
  {
    name: "Shona",
    price: 39500,
    image: "",
    items: [1, 3, 4, 7, 11, 14],
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

export function getItemsData(product: Product[], items: Item[]): Product[] {
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

  const productsWithData = product.map((productData) => ({
    ...productData,
    items: getProductItemsData(productData),
  }));
  //@ts-ignore
  return productsWithData;
}

export const productsWithData: Product[] = getItemsData(product, items);
