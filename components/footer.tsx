"use client";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  const pathname = usePathname();
  return (
    <>
      {!pathname.startsWith("/admin") && (
        <footer className="py-4 lg:pb-0 pb-20 border-t-2 border-gold mt-10">
          <div className="flex justify-center font-bold text-center sm:text-base text-sm">
            Iro Lagos © 2023
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
