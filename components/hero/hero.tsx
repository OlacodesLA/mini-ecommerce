import React from "react";
import { DefaultButton } from "../button";
import Link from "next/link";
import Contact from "./contact";

type Props = {};

const Hero = (props: Props) => {
  return (
    <div className="flex justify-between xl:flex-row flex-col">
      <div className="pt-20 md:pt-36">
        <div className="flex flex-col max-w-2xl gap-4">
          <div className="w-auto">
            <Contact />
          </div>
          <h1 className="text-4xl ms:text-5xl sm:text-6xl  lg:text-7xl font-bold  text-start font-charm ">
            Unwrap the joy of <br />
            <span className="text-red-500"> Christmas</span>
          </h1>
          <p className=" text-base md:text-lg">
            This Christmas, give the gift of delight. Our handpicked selection
            of quality products and unique packages will make your celebrations
            unforgettable. Discover incredible deals that will bring happiness
            to your Friends and Family.
          </p>
          <Link href="/shop" className="">
            <DefaultButton type="button" y="py-2.5" label="Shop Now" />
          </Link>
        </div>
      </div>
      <div className="md:pt-0 pt-10">
        <img src="/hero-png.png" className="w-[700px]" alt="h" />
      </div>
    </div>
  );
};

export default Hero;
