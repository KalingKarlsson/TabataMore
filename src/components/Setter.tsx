import React from "react";

interface ISetterProps {
  title: string;
  value: number;
  setValue: (value: any, key: string) => void;
}

const Setter: React.FC<ISetterProps> = ({ value, setValue, title }) => {
  return (
    <div className="flex w-full flex-col items-center gap-2">
      <h2 className="text-base">{title}</h2>
      <div className="flex w-full flex-row justify-between gap-2">
        <button
          className="w-16 rounded-sm border border-white text-lg "
          onClick={() => {
            setValue(value - 1, title.toLowerCase());
          }}
        >
          -
        </button>
        {typeof value === "number" ? <label className="text-2xl">{value}</label> : <div></div>}
        <button
          className="w-16 rounded-sm border border-white text-lg"
          onClick={() => {
            setValue(value + 1, title.toLowerCase());
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Setter;
