import React from "react";
import Stepper from "../../components/stepper/steps";
import Image from "next/image";

export default function Checkout() {
  return (
    <main className="flex flex-col items-center justify-between px-2">
      <div className="my-5">
        <h1 className="text-2xl sm:text-4xl text-center font-bold ">
          Checkout
        </h1>
        <p className="text-center">Select packages</p>
      </div>
      <Stepper />
    </main>
  );
}
