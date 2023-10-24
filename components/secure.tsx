import React from "react";
import Image from "next/image";

const Secure = () => {
  return (
    <div className="flex justify-between flex-col items-center">
      <fieldset className="border rounded-lg border-gray-300 dark:border-gray-500 px-6 pt-2 pb-3">
        <legend className="text-sm text-center px-1  text-gray-700 text-best">
          Secured By Flutterwave
        </legend>

        <img src="/secure.svg" alt="" className="w-full h-7" />
      </fieldset>
    </div>
  );
};

export default Secure;
