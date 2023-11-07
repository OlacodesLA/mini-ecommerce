import { CartContext } from "@/context/stateContext";
import { textToDot } from "@/utils";
import { Product, getItemsData, items } from "@/utils/products";
import Link from "next/link";
import React, { useContext } from "react";

type Props = {
  name: string;
  price: number;
};

const Pack = ({ name, price }: Props) => {
  const { addToCart, products } = useContext(CartContext)!;

  const productsWithData: Product[] = getItemsData(items, products);

  const product = productsWithData.find(
    (product) => product.name.toLowerCase() === name.toLowerCase()
  );

  const foundProductNames = product?.items.map((product: any) => product.name);
  return (
    <div key={name} className="my-3 cursor-pointer group ">
      <Link href={`/shop/${name.toLowerCase()}`}>
        <div className="rounded-full text-lg text-center flex justify-center items-center w-40 h-40 font-bold group-hover:bg-pink-500 bg-pink-300">
          {textToDot(name, 10)}
        </div>
      </Link>
      <div className="text-center mt-2">
        <p>₦{price}</p>
        <button
          onClick={() =>
            addToCart({
              name,
              price,
              quantity: 1,
              items: `${foundProductNames?.join(", ")}`,
            })
          }
          className="bg-black text-white px-2 py-1 text-sm rounded mt-2"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Pack;
