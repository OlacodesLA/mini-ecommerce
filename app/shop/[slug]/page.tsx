"use client";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Product, getItemsData, items } from "@/utils/products";
import { findPriceByName } from "@/data";
import { CartContext } from "@/context/stateContext";

type Props = {
  params: { slug: string };
};

const Slug = ({ params }: Props) => {
  //   useEffect(()=>{
  // const products = localStorage.getItem(JSON.parse(cartData));
  //   }
  //   ,[])
  const { products } = useContext(CartContext)!;

  const productsWithData: Product[] = getItemsData(items, products);

  const product = productsWithData.find(
    (product: any) => product.name.toLowerCase() === params.slug
  );

  if (!product) {
    return <div>Product not found</div>;
  }
  console.log(product);

  return (
    <div>
      <h1 className="text-center capitalize text-light font-bold text-2xl">
        {params.slug} Pack
      </h1>
      <p className="text-center font-medium text-sm py-1">
        Price:{" "}
        <span className="bg-black p-1 rounded-sm text-white">
          ₦{product.price}
        </span>{" "}
      </p>
      <p className="text-center font-medium text-sm mt-4">The pack includes</p>

      <ul className="grid  justify-center items-center justify-self-center justify-items-center lg:gap-4 gap-2  xl:grid-cols-4 sm:grid-cols-3 grid-cols-2 mt-10">
        {product.items.map((item: any) => {
          const { name, image, price } = item;
          return (
            <li key={item.id}>
              <div className="my-3 cursor-pointer group text-black">
                {image ? (
                  <img
                    src={`/items/${image}`}
                    alt=""
                    className="rounded-full text-lg flex justify-center items-center w-40 h-40 font-bold group-hover:bg-yellow-300 bg-primary"
                  />
                ) : (
                  <div className="rounded-full text-sm flex justify-center items-center text-center w-40 h-40 font-semibold group-hover:bg-primary-300 bg-primary">
                    {name}
                  </div>
                )}

                <div className="text-center mt-2 text-white">
                  <p>₦{price}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Slug;
