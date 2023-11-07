import React, { SetStateAction, Dispatch } from "react";

type Props = {
  setCreatePack: Dispatch<SetStateAction<boolean>>;
};

const NoPack = ({ setCreatePack }: Props) => {
  return (
    <div>
      <p className="text-center text-base">
        You have no pack.
        <span className="text-pink-500" onClick={() => setCreatePack(true)}>
          Create pack.
        </span>
      </p>
    </div>
  );
};

export default NoPack;
