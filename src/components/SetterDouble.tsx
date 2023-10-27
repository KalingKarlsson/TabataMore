import React from "react";

interface ISetterProps {
  title: string;
  value: IDouble;
  setValue: (value: any, key: string) => void;
}

const SetterDouble: React.FC<ISetterProps> = ({ value, setValue, title }) => {
  let min = +value.min;
  let sec = +value.sec;

  const addSecond = () => {
    if (sec < 59) {
      sec = sec + 1;
    } else {
      sec = 0;
      min = min + 1;
    }
    setValue({ min: min.toString(), sec: sec.toString() }, title.toLowerCase());
  };

  const subtractSecond = () => {
    if (sec > 0) {
      sec = sec - 1;
    } else {
      if (min > 0) {
        min = min - 1;
        sec = 59;
      }
    }

    setValue({ min: min.toString(), sec: sec.toString() }, title.toLowerCase());
  };

  const handleMinutesChange = (e: any) => {
    const newMinutes = parseInt(e.target.value) || 0;
    if (newMinutes < 60) {
      setValue({ min: newMinutes.toString(), sec: sec.toString() }, title.toLowerCase());
    }
  };

  const handleSecondsChange = (e: any) => {
    const newSeconds = parseInt(e.target.value) || 0;
    if (newSeconds >= 0 && newSeconds <= 59) {
      setValue({ min: min.toString(), sec: newSeconds.toString() }, title.toLowerCase());
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-2">
      <h2 className="text-base">{title}</h2>
      <div className="flex w-full flex-row justify-between gap-2">
        <button className="w-16 rounded-sm border border-white text-lg"
        onClick={subtractSecond}>
          -
        </button>
        <div className="text-2xl text-white flex flex-row justify-between max-w-[100px] w-full">
          <input
            className=" max-w-[40px] bg-transparent text-center tracking-widest"
            value={value.min.length === 1 ? "0" + value.min : value.min}
            onChange={handleMinutesChange}
          />
          <span className="mb-1" >{" : "}</span>

          <input
            className=" max-w-[40px] bg-transparent text-center tracking-widest"
            value={value.sec.length === 1 ? "0" + value.sec : value.sec}
            onChange={handleSecondsChange}
          />
        </div>
        <button className="w-16 rounded-sm border border-white text-lg" onClick={addSecond}>
          +
        </button>
      </div>
    </div>
  );
};

export default SetterDouble;
