import { CartContext } from "@/context/stateContext";
import React, { useContext } from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { MdDeleteSweep } from "react-icons/md";
import { IoTrash } from "react-icons/io5";
import { HiMinus, HiPlus } from "react-icons/hi";
import { default as money } from "../../utils/money";
import Link from "next/link";
import { productsWithData } from "@/utils/products";

type Props = {};

const Cart = ({ showCart, setShowCart }: any) => {
  const {
    cart,
    totalQuantity,
    clearCart,

    removeFromCart,
    incrementQuantity,
    decrementQuantity,
  } = useContext(CartContext)!;

  return (
    <div className="bg-white h-screen">
      <div className="py-2 px-2">
        {/* <div className="bg-white h-11 flex items-center justify-between px-3 sticky top-0 left-0 right-0 w-full "></div> */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div
              className="grid items-center cursor-pointer"
              // onClick={onCartToggle}
              onClick={() => setShowCart(false)}
            >
              <BsFillArrowLeftCircleFill className="w-5 h-5 text-slate-900 hover:text-pink-500 " />
            </div>
            <div className="grid items-center">
              <h1 className="text-base font-medium text-slate-900">
                Your Cart{" "}
                <span className="bg-theme-cart rounded px-1 py-0.5 text-gray-100 font-normal text-sm">
                  {/* ({totalQTY} Items) */}({totalQuantity}{" "}
                  {totalQuantity > 1 ? "items" : "item"})
                </span>
              </h1>
            </div>
          </div>

          <div className="flex items-center">
            <button
              type="button"
              // onClick={onClearCartItems}
              className="rounded bg-theme-cart active:scale-90 p-0.5"
            >
              <MdDeleteSweep
                onClick={() => clearCart()}
                className="w-6 h-6 text-white"
              />
            </button>
          </div>
        </div>
        <div className="mt-5">
          {cart &&
            cart.map((item) => {
              const { name, quantity, price } = item;
              const product = productsWithData.find(
                (product) => product.name.toLowerCase() === name.toLowerCase()
              );

              const foundProductNames = product?.items.map(
                (product: any) => product.name
              );
              console.log(foundProductNames);
              return (
                <div key={name} className=" w-full px-1 tl:px-5 lg:mb-5 mb-10">
                  <div className="flex w-full items-start gap-5">
                    <div
                      className={`relative rounded-lg h-20 w-[200px] hover:scale-105 transition-all duration-75 ease-in-out grid items-center`}
                    >
                      <div className="w-full">
                        <div className=" bg-pink-300 font-bold flex w-full justify-center items-center lg:h-[120px] tl:h-[134px] h-[134px] rounded-lg object-cover ">
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
                            <h1 className="font-medium text-base tl:text-lg text-slate-900 lg:text-sm">
                              {item.name}
                            </h1>
                            <p className=" text-[8.5px] ms:text-[10px] md:text-[12px] pr-1 md:pr-5">
                              {" "}
                              {foundProductNames?.join(", ")}{" "}
                            </p>
                          </div>

                          <h1 className="text-base tl:text-lg text-slate-900 font-medium">
                            &#x20A6;{money(price * quantity)}
                          </h1>
                        </div>
                      </div>
                      <div className="flex justify-between w-full pt-2">
                        {/* <QtyAdjust mycolor cartQtyAdjust item={item} /> */}{" "}
                        <div className="flex items-center gap-5 ">
                          <div
                            onClick={() => decrementQuantity(name)}
                            className="bg-black  flex justify-center items-center text-center w-7 h-7 rounded-md cursor-pointer shadow-sm active:scale-90"
                          >
                            <HiMinus className={`${"text-white"} `} />
                          </div>
                          <div
                            className={` flex justify-center items-center text-center ${"w-7 h-7 bg-black"} rounded-md cursor-pointer shadow-sm`}
                          >
                            <p className="mx-3 text-white text-center">
                              {quantity}
                            </p>
                          </div>

                          <div
                            onClick={() => incrementQuantity(name)}
                            className="bg-black flex justify-center items-center text-center  w-7 h-7 rounded-md cursor-pointer shadow-sm active:scale-90"
                          >
                            <HiPlus className="text-white" />
                          </div>
                        </div>
                        <button
                          type="button"
                          className="bg-theme-cart rounded p-1 lg:p-0.5 grid items-center justify-items-center cursor-pointer"
                          onClick={() => removeFromCart(item.name)}
                        >
                          <IoTrash className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* <div className="grid items-center gap-20">
                <div className="grid items-center justify-center">
                  <h1 className="text-base tl:text-lg text-slate-900 font-medium">
                    &#x20A6;{money(item.price * item.quantity)}
                  </h1>
                </div>
                <div className="grid items-center justify-center">
                  <button
                    type="button"
                    className="bg-theme-cart rounded p-1 lg:p-0.5 grid items-center justify-items-center cursor-pointer"
                    onClick={() =>
                      toggleCartQuantity(
                        item.newid,
                        "del",
                        item.size,
                        item.selectedColor
                      )
                    }
                  >
                    <IoTrash className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div> */}
                </div>
              );
            })}
        </div>
        {totalQuantity === 0 && (
          <div className="w-full h-full items-center flex flex-col justify-center pt-20">
            <div className="">
              <img src="/bag.png" className="w-[80px]" alt="" />
            </div>
            <p className="text-best mt-4 font-semibold text-center ">
              Your Shopping Bag Is Empty
            </p>
          </div>
        )}
      </div>
      <div className="absolute bottom-0 bg-white w-full px-5 py-2 grid items-center">
        <div className="flex items-center justify-between">
          <h1 className="text-best font-semibold uppercase">SubTotal</h1>
          {cart.length >= 1 && (
            <h1 className="text-sm rounded bg-theme-cart text-slate-100 px-1 py-0.5">
              &#x20A6;
              {money(
                cart.reduce(
                  (total, item) => total + item.quantity * item.price,
                  0
                )
              )}
            </h1>
          )}
        </div>
        <div className="grid items-center gap-2">
          <p className="text-sm text-best font-medium text-center">
            Taxes and Shipping Will Calculate At Shipping
          </p>
          <Link href="/checkout">
            <button
              onClick={() => setShowCart(false)}
              type="button"
              className="w-full button-theme bg-theme-cart text-white"
            >
              Check Out
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
