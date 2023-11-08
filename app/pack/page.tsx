"use client";
import React, { useContext, useState } from "react";
import { CartContext } from "@/context/stateContext";
import { items, Product, Item, product } from "@/utils/products";
import { DefaultButton } from "@/components/button";
import { PackItem } from "@/context/stateContext";
import toast from "react-hot-toast";
import Link from "next/link";
import Packs from "@/components/packs";

interface CreatePackProps {}

const CreatePack: React.FC<CreatePackProps> = () => {
  const { addToPack, addToCart, packs, setProducts, products } =
    useContext(CartContext)!;
  const [Createpack, setCreatePack] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [packName, setPackName] = useState<string>("");

  const handleItemSelection = (itemId: number) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  console.log("packs", packs);

  const calculateTotalPrice = () => {
    const totalPrice = items
      .filter((item) => selectedItems.includes(item.id))
      .reduce((total, item) => total + item.price, 0);
    return totalPrice;
  };

  const createPack = () => {
    if (selectedItems.length === 0) {
      toast.error("Please select at least one item for the pack.");
      return;
    }

    if (packName.trim() === "") {
      toast.error("Please enter a name for the pack.");
      return;
    }

    const packItems: Item[] = items.filter((item) =>
      selectedItems.includes(item.id)
    );

    const totalPrice = packItems.reduce((total, item) => total + item.price, 0);

    const pack: PackItem = {
      name: packName,
      price: totalPrice,
      items: packItems.map((item) => {
        return {
          name: item.name,
          price: item.price,
          quantity: 1,
          items: "", // Initial quantity for each item in the pack
        };
      }),
    };

    addToPack(pack);

    setSelectedItems([]);
    setPackName("");

    toast.success(`Pack "${packName}" created with selected items.`);

    // Add the created pack to the products array
    const newProduct: Product = {
      name: packName,
      price: totalPrice,
      image: "",
      items: packItems.map((item) => item.id),
    };

    setProducts([newProduct, ...products]);
  };

  function textToSlug(text: string) {
    return text
      .toLowerCase() // Convert to lowercase
      .replace(/[^a-z0-9 -]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-"); // Remove consecutive hyphens
  }

  return (
    <div className="px-4">
      <div className="my-5">
        <h1 className="text-2xl sm:text-4xl text-center font-bold text-gold ">
          Pack
        </h1>
        <p className="text-center">Create a pack</p>
      </div>

      <div className="my-3">
        <h2 className="text-2xl font-bold mb-4">Your Pack</h2>
        <Packs setCreatePack={setCreatePack} />
      </div>
      {Createpack && (
        <div className="">
          <hr className="bg-black text-black my-10" />
          <h2 className="text-2xl font-bold mb-4">Create Pack</h2>
          <div className="w-full items-center flex-col justify-center flex">
            <p className="mt-4 text-base text-start font-medium">
              Pack Price: ${calculateTotalPrice()} {/* Display total price */}
            </p>
            <div className="inline-flex items-center space-x-3">
              <div className="mb-4  w-full ">
                <label
                  htmlFor="packName"
                  className="block font-medium text-gold"
                >
                  Pack Name:
                </label>
                <input
                  type="text"
                  id="packName"
                  value={packName}
                  onChange={(e) => setPackName(textToSlug(e.target.value))}
                  className="px-3 py-2 w-full  md:w-[400px]  border h-9 rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="w-full mt-2">
                <DefaultButton
                  click={createPack}
                  label="Create Pack"
                  type="submit"
                />
              </div>
            </div>
          </div>
          <h3 className="text-lg text-center font-medium mb-2 text-gold">
            Select Items for the Pack
          </h3>
          <ul className="grid  justify-center items-center justify-self-center justify-items-center lg:gap-4 gap-2  xl:grid-cols-4 sm:grid-cols-3 grid-cols-2 mt-10">
            {items.map((item) => {
              const { id, name, image, price } = item;

              return (
                <li key={id} className="mb-2 ">
                  <label htmlFor={name}>
                    <div className="flex flex-col items-center space-x-2 cursor-pointer text-black ">
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
                      <input
                        id={name}
                        type="checkbox"
                        checked={selectedItems.includes(id)}
                        onChange={() => handleItemSelection(id)}
                        className="text-blue-500"
                      />
                    </div>
                  </label>
                </li>
              );
            })}
          </ul>{" "}
        </div>
      )}
    </div>
  );
};

export default CreatePack;
