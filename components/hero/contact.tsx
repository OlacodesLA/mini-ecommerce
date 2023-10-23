import React from "react";
import Link from "next/link";

type Props = {};

const Contact = (props: Props) => {
  return (
    <div className="w-auto">
      <div className="inline-block  px-2 py-1 font-semibold bg-pink-200 rounded-full">
        <div className="flex flex-wrap justify-start items-center lg:-m-1">
          <div className="w-auto p-1">
            <Link className="text-sm " href="/shop">
              &#x1F44B; Get in touch with us.
            </Link>
          </div>
          <div className="w-auto p-1">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.66667 3.41675L12.75 7.50008M12.75 7.50008L8.66667 11.5834M12.75 7.50008L2.25 7.50008"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
