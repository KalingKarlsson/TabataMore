"use client";
import React, { useState, useEffect } from "react";
import PrimaryButton from "./PrimaryButton";
import Link from "next/link";
import useSound from "use-sound";
import startBeep from "../assets/start.mp3";
import Beep1Sec from "../assets/beep1Sec.mp3";

interface ITabataTimerProps {
  tabata: ITabata;
}

const TabataTimer: React.FC<ITabataTimerProps> = ({ tabata }) => {
  const { work, rest } = tabata;
  const [repetitions, setRepetitions] = useState(tabata.repetitions);
  const [currentRound, setCurrentRound] = useState(1);
  const [isWorking, setIsWorking] = useState(true);
  const [minutes, setMinutes] = useState(+work.min);
  const [seconds, setSeconds] = useState(+work.sec);
  const [isDone, setIsDone] = useState(false);

  const [playActive] = useSound(startBeep, { volume: 0.25 });
  const [playIntense] = useSound(Beep1Sec, { volume: 0.25, interrupt: true, playbackRate: 1.1 });
  const [playEnd] = useSound(Beep1Sec, { volume: 0.25, interrupt: true, playbackRate: 0.75 });

  useEffect(() => {
    if (currentRound <= repetitions && !isDone) {
      const interval = setInterval(() => {
        if (minutes === 0 && seconds === 0) {
          if (isWorking) {
            setIsWorking(false);
            setMinutes(parseInt(rest.min, 10));
            setSeconds(parseInt(rest.sec, 10));
            if (currentRound + 1 > repetitions) {
              setIsDone(true);
            }
          } else {
            setIsWorking(true);
            setMinutes(parseInt(work.min, 10));
            setSeconds(parseInt(work.sec, 10));
            setCurrentRound(currentRound + 1);
          }
        } else {
          if (seconds === 0) {
            setMinutes(minutes - 1);
            setSeconds(59);
          } else {
            if (seconds === 5 && currentRound + 1 <= repetitions) {
              playActive();
            }
            if (seconds > 1 && seconds < 6 && currentRound + 1 > repetitions) {
              if (seconds === 2) {
                playEnd();
              } else {
                playIntense();
              }
            }

            setSeconds(seconds - 1);
          }
        }
      }, 1000);

      return () => clearInterval(interval);
    } else {
    }
  }, [currentRound, isWorking, minutes, seconds]);

  const trainAgain = () => {
    setIsWorking(true);
    setMinutes(parseInt(work.min, 10));
    setSeconds(parseInt(work.sec, 10));
    setCurrentRound(1);
    setIsDone(false);
  };

  return (
    <div className="mt-8 flex h-[30vh] w-full flex-col justify-between bg-inherit text-center text-2xl">
      {isDone && (
        <div className=" absolute top-0 z-50 flex h-screen w-full flex-col items-center  bg-blue-950">
          <h1 className="mt-24 text-5xl">Great Work!</h1>
          <div className="flex h-[60%] w-full max-w-[400px] flex-col justify-center gap-6 px-4">
            <PrimaryButton text="Train Again" onClick={trainAgain} />
            <Link href={"/"}>
              <PrimaryButton
                text="Go Back"
                className="w-[50%] min-w-[200px] self-center text-base"
                isSecondary
                onClick={trainAgain}
              />
            </Link>
          </div>
        </div>
      )}
      <p className="">
        Round {currentRound}/{repetitions}
      </p>
      <div>
        <p className=" text-neutral-200">{isWorking ? "Work" : "Rest"}</p>
        {tabata.excercises.length > 0 &&
          (isWorking ? (
            <p className="text-4xl">{tabata.excercises[currentRound - 1]}</p>
          ) : (
            <>
              <span className="mt-1">Upcoming excercise:</span>
              <p className="text-4xl">{tabata.excercises[currentRound]}</p>
            </>
          ))}
      </div>
      <p className="text-7xl">{`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}</p>
    </div>
  );
};

export default TabataTimer;
