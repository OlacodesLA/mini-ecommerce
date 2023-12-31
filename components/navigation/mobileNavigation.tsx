"use client";
import Link from "next/link";
import React from "react";
import { HiHome, HiOutlineHome, HiUser, HiOutlineUser } from "react-icons/hi";
import { AiOutlineShop, AiFillShop } from "react-icons/ai";
import { LuPackagePlus } from "react-icons/lu";
import {
  HiChatBubbleOvalLeftEllipsis,
  HiOutlineChatBubbleOvalLeftEllipsis,
} from "react-icons/hi2";
import { usePathname } from "next/navigation";

type Props = {};
const activeIconClass = "text-2xl text-gold ";
const iconClass = "text-2xl text-white";
const MobileNavigation = (props: Props) => {
  const pathname = usePathname();
  return (
    <div className="fixed w-full left-0 bottom-0 bg-green-950 py-4 m z-40 ">
      <div className="flex w-full px-4 justify-between items-center  ">
        {Links.map((a: any) => {
          return (
            <div key={a.href} className="relative">
              <Link href={a.href}>
                <button
                  className={` ${
                    pathname === a.href
                      ? "text-gold after:w-2 after:left-1/2  after:-translate-x-[50%] after:flex after:justify-center after:items-center  after:absolute after:content-['']  after:h-2 after:rounded-full after:bg-gradient-to-r from-[#FEDB6B] to-[#D69C47] after:mt-2"
                      : "text-gray-600"
                  }`}
                >
                  {pathname === a.href ? <>{a.activeIcon}</> : <>{a.icon}</>}
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNavigation;

export const Links = [
  {
    name: "Home",
    href: "/",
    activeIcon: <HiHome className={activeIconClass} />,
    icon: <HiOutlineHome className={iconClass} />,
  },
  {
    name: "Shop",
    href: "/shop",
    activeIcon: <AiFillShop className={activeIconClass} />,
    icon: <AiOutlineShop className={iconClass} />,
  },
  {
    name: "Pack",
    href: "/pack",
    activeIcon: <LuPackagePlus className={activeIconClass} />,
    icon: <LuPackagePlus className={iconClass} />,
  },
  {
    name: "Contact",
    href: "/contact",
    activeIcon: <HiChatBubbleOvalLeftEllipsis className={activeIconClass} />,
    icon: <HiOutlineChatBubbleOvalLeftEllipsis className={iconClass} />,
  },
];
