import React from "react";

type Props = {
  type: "button" | "submit" | "reset" | undefined;
  isLoading?: boolean;
  label: string;
  disable?: boolean;
  click?: () => void;
};

const PreviousButton = ({ type, isLoading, label, disable, click }: Props) => {
  return (
    <button
      type={type}
      onClick={click}
      disabled={disable ? isLoading || disable : isLoading}
      className="relative inline-flex items-center px-8 py-1.5 overflow-hidden text-sm font-medium text-pink-600 border-none border-pink-600 rounded-md hover:text-pink-600 group hover:bg-gray-50"
    >
      <span className="absolute left-0 block w-full h-0 transition-all opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
      <span className="absolute left-0 flex items-center justify-end w-10 h-10 duration-300 transform -translate-x-full group-hover:-translate-x-4 ease">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          ></path>
        </svg>
      </span>
      <span className="relative">{label}</span>
    </button>
  );
};

export default PreviousButton;
