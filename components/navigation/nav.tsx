"use client";
import React, { useState } from "react";
import Link from "next/link";
import { TbMenuDeep } from "react-icons/tb";
import { AiOutlineShopping } from "react-icons/ai";
import { CartContext } from "@/context/stateContext";
import { useContext } from "react";
import { Cart } from "../cart";
import MobileNavigation from "./mobileNavigation";
import useWindowSize from "@/utils/size";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

type Props = {};

const Nav = (props: Props) => {
  const { showCart, setShowCart, totalQuantity } = useContext(CartContext)!;

  const { isTablet } = useWindowSize({
    isMobile: 640, // Custom mobile breakpoint
    isTablet: 767, // Custom tablet breakpoint
  });
  const pathname = usePathname();
  return (
    <>
      {!pathname.startsWith("/admin") && (
        <>
          <nav className="flex justify-between px-6 py-4">
            <Link href="/">
              {/* <div className="text-lg font-bold flex item-center flex-col justify-center md:text-xl">
                <span className="  font-bold text-center leading-3">Iro</span>
                <span className=" font-bold text-center">Lagos</span>
              </div> */}

              <img src="/logo.png" className="w-16 h-16" alt="Iro Lagos" />
            </Link>

            {/* Desktop View */}
            <ul className="lg:flex hidden items-center font-semibold space-x-7">
              {/* <li onClick={() => router.push("/")}>Home</li>
        <li onClick={() => router.push("/auth/register")}>Register</li>
        <li onClick={() => router.push("/auth/login")}>Login</li> */}

              {navLinks.map((link) => {
                const { name, href } = link;
                return (
                  <li key={name}>
                    <Link href={href}>{name}</Link>
                  </li>
                );
              })}
            </ul>
            <div className="flex gap-2 items-center">
              <div onClick={() => setShowCart(!showCart)} className="">
                <div className="relative">
                  <AiOutlineShopping className="text-[24px] right-4  w-10  " />
                  <div className="absolute w-3 h-3 top-0 right-1 rounded-full bg-red-500 text-[12px] flex items-center justify-center text-white">
                    {totalQuantity}
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`fixed top-0 left-0 right-0 bottom-0 blur-effect-theme transition-all duration-500 w-full h-auto opacity-100 z-[250] overflow-auto  ${
                showCart
                  ? "opacity-100 visible translate-x-0"
                  : "opacity-0 invisible translate-x-8"
              }`}
            >
              <div
                className={`blur-effect-theme  duration-500 h-full max-w-xl w-full absolute right-0 ${
                  showCart
                    ? "opacity-100 visible translate-x-0"
                    : "opacity-0 invisible translate-x-8"
                }`}
              >
                {showCart && (
                  <Cart showCart={showCart} setShowCart={setShowCart} />
                )}
              </div>
            </div>
          </nav>
          {isTablet && (
            <div className="relative flex lg:hidden">
              <MobileNavigation />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Nav;

const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Shop",
    href: "/shop",
  },
  {
    name: "Create Pack",
    href: "/pack",
  },

  {
    name: "Contact",
    href: "/contact",
  },
];
