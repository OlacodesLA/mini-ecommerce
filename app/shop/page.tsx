"use client";
import React from "react";
import { useContext } from "react";
import { CartContext } from "@/context/stateContext";

type Props = {};

const Shop = (props: Props) => {
  const {
    cart,

    addToCart,
  } = useContext(CartContext)!;
  {
    console.log(cart);
  }
  return (
    <div>
      <div className="my-5">
        <h1 className="text-2xl sm:text-4xl text-center font-bold ">Shop</h1>
        <p className="text-center">Select packages</p>
      </div>

      <div className="grid  justify-center items-center justify-self-center justify-items-center lg:gap-4 gap-2  xl:grid-cols-4 sm:grid-cols-3 grid-cols-2 mt-10">
        {product.map((item) => {
          const { name, image, price } = item;
          return (
            <div key={name} className="my-3 cursor-pointer group ">
              <div className="rounded-full text-lg flex justify-center items-center w-40 h-40 font-bold group-hover:bg-pink-500 bg-pink-300">
                {name}
              </div>
              <div className="text-center mt-2">
                <p>₦{price}</p>
                <button
                  onClick={() =>
                    addToCart({
                      name,
                      price,
                      quantity: 1,
                    })
                  }
                  className="bg-black text-white px-2 py-1 text-sm rounded mt-2"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Shop;

const product = [
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

const products = [
  {
    name: "Banana Loaf",
    price: "",
    image: "/Banana-Loaf.svg",
    description: "",
  },
  {
    name: "Chocolate Chip ",
    price: "",
    image: "/Banana-Loaf.svg",
    description: "",
  },
  {
    name: "Cinnamon",
    price: "",
    image: "/Cinnamon.svg",
    description: "",
  },
  {
    name: "Frosted",
    price: "",
    image: "/Frosted.svg",
    description: "",
  },
  {
    name: "Fudge",
    price: "",
    image: "/Fudge.svg",
    description: "",
  },
  {
    name: "Gummy Sweets",
    price: "",
    image: "/Gummy-Sweets.svg",
    description: "",
  },
  {
    name: "Hibiscus Tea",
    price: "",
    image: "/Hibiscus-Tea.svg",
    description: "",
  },
  {
    name: "Mixed Cupcaks",
    price: "",
    image: "/Mixed-Cupcakes.svg",
    description: "",
  },
  {
    name: "Muled Wine",
    price: "",
    image: "/Muled-Wine.svg",
    description: "",
  },
  {
    name: "Salted Caramel",
    price: "",
    image: "/Muled-Wine.svg",
    description: "",
  },
  {
    name: "Spiced Honey",
    price: "",
    image: "/Spiced-Honey.svg",
    description: "",
  },
];
