import React from "react";

interface ISwitchProps {
  text: string;
  setState: any;
  state: boolean;
}

const Switch: React.FC<ISwitchProps> = ({ text, state, setState }) => {
  return (
    <div className="-mb-2 mt-4 flex w-full flex-row text-sm  md:text-base items-center justify-end gap-4">
      <p>{text}</p>
      <div
        onClick={() => {
          setState(!state);
        }}
        className={`group flex h-9 w-[80px] cursor-pointer items-center rounded-full p-1 ${
          state ? "bg-blue-300" : "bg-gray-300"
        }`}
      >
        <div
          className={` h-full w-[40%] rounded-full bg-white ${
            state
              ? "translate-x-10 transition-all duration-500 ease-in-out"
              : "translate-x-1 transition-all duration-500 ease-in-out"
          }`}
        />
      </div>
    </div>
  );
};

export default Switch;
