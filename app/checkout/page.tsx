"use client";
import React, { useContext } from "react";
import Stepper from "../../components/stepper/steps";
import Image from "next/image";
import money from "@/utils/money";
import { CartContext } from "@/context/stateContext";
import Secure from "@/components/secure";
import { productsWithData } from "@/utils/products";

export default function Checkout() {
  const { cart } = useContext(CartContext)!;
  return (
    <main className="flex flex-col items-center justify-between px-2">
      <div className="my-5">
        <h1 className="text-2xl sm:text-4xl text-center font-bold ">
          Secure Checkout
        </h1>
        <p className="text-center">Make sure all details are correct</p>
      </div>
      <div className="flex lg:flex-row flex-col-reverse  w-full justify-between gap-5">
        <div className="w-full  sm:max-w-lg mx-auto">
          <Stepper />
        </div>
        <div className="w-full lg:mb-5 mb-10">
          <p className="text-lg font-bold text-pink-800">Cart</p>
          {cart &&
            cart.map((item) => {
              const { name, quantity, price } = item;
              const product = productsWithData.find(
                (product) => product.name.toLowerCase() === name.toLowerCase()
              );

              const foundProductNames = product?.items.map(
                (product: any) => product.name
              );
              return (
                <div
                  key={name}
                  className=" w-full px-1 tl:px-5 border-b dark:border-gray-300 mt-2"
                >
                  <div className="flex w-full items-start gap-5">
                    <div
                      className={`relative rounded-lg h-20 w-[200px] hover:scale-105 transition-all duration-75 ease-in-out grid items-center`}
                    >
                      <div className="w-full">
                        <div className=" bg-pink-300 font-bold flex w-full justify-center items-center h-[70px]  rounded-lg object-cover ">
                          {name}
                        </div>
                      </div>

                      <div className="absolute right-1 top-1 blur-theme-effect bg-white/80 text-black text-xs px-1 rounded">
                        &#x20A6;{price}
                      </div>
                    </div>
                    <div className="grid items-center w-full gap-4">
                      <div className="grid items-center w-full leading-none">
                        <div className="flex items-start justify-between w-full">
                          <div className="">
                            <h1 className="font-medium text-sm tl:text-lg text-slate-900 lg:text-sm">
                              {item.name}
                            </h1>
                            <p className=" text-[8.5px] ms:text-[10px] md:text-[12px] pr-1 md:pr-5">
                              {" "}
                              {foundProductNames?.join(", ")}{" "}
                            </p>
                          </div>
                          <div className="flex flex-col justify-between h-full ">
                            <div className="flex justify-center">
                              <div className="w-7 h-7 flex items-center  rounded-lg justify-center border-gray-400 border">
                                {quantity}
                              </div>
                            </div>
                            <h1 className="text-sm tl:text-lg mt-4 text-slate-900 font-medium">
                              &#x20A6;{money(price * quantity)}
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

          <div className="w-full">
            <div className="flex w-full justify-between py-4 border-b  border-gray-300">
              <div className="text-black  font-bold">SubTotal</div>
              <div className="text-gray-700 0">
                {cart &&
                  cart
                    .reduce(
                      (total, item) => total + item.quantity * item.price,
                      0
                    )
                    .toLocaleString("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    })}
              </div>
            </div>
            <div className="flex w-full justify-between py-4 border-b  border-gray-300">
              <div className="text-black  font-bold">Total</div>
              <div className="text-gray-700 font-bold">
                {cart &&
                  cart
                    .reduce(
                      (total, item) => total + item.quantity * item.price,
                      0
                    )
                    .toLocaleString("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    })}
              </div>
            </div>
            <Secure />
          </div>
        </div>
      </div>
    </main>
  );
}
