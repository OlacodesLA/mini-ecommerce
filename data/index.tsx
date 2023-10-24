export function findPriceByName(productName: any) {
  const product = products.find(
    (product) => product.name.toLowerCase() === productName
  );
  return product ? product.price : null;
}

const products = [
  {
    name: "Keresimesi",
    price: 178000,
    image: "",
  },
  {
    name: "Yuletide",
    price: 128000,
    image: "",
  },
  {
    name: "Noel",
    price: 123000,
    image: "",
  },
  {
    name: "Navidad",
    price: 80500,
    image: "",
  },
  {
    name: "Natale",
    price: 52000,
    image: "",
  },
  {
    name: "Shona",
    price: 39500,
    image: "",
  },
];
