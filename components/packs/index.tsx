import { CartContext } from "@/context/stateContext";
import React, { useContext, Dispatch, SetStateAction } from "react";
import Pack from "./pack";
import NoPack from "./noPack";

type Props = {
  setCreatePack: Dispatch<SetStateAction<boolean>>;
};

const Packs = ({ setCreatePack }: Props) => {
  const { packs } = useContext(CartContext)!;
  return (
    <div>
      {packs.length >= 1 ? (
        <ul className="grid  justify-center items-center justify-self-center justify-items-center lg:gap-4 gap-2  xl:grid-cols-4 sm:grid-cols-3 grid-cols-2 mt-10">
          {packs &&
            packs.map((item) => {
              return (
                <li key={item.name}>
                  <Pack {...item} />
                </li>
              );
            })}
          <li>
            <div className="rounded-full  flex flex-col justify-center items-center w-40 h-40 font-bold group-hover:bg-pink-500 bg-gradient-to-r from-[#FEDB6B] to-[#D69C47]">
              <div className="text-4xl leading-3">+</div>
            </div>
            <div className="text-center mt-8">
              <button
                onClick={() => setCreatePack(true)}
                className="bg-black text-white px-2 py-1 text-sm rounded mt-2"
              >
                Create a pack
              </button>
            </div>
          </li>
        </ul>
      ) : (
        <NoPack setCreatePack={setCreatePack} />
      )}
    </div>
  );
};

export default Packs;
