"use client";
import Link from "next/link";
import Setter from "../components/Setter";
import { useState } from "react";
import SetterDouble from "@/components/SetterDouble";
import Switch from "@/components/Switch";
import { EXCERCISES } from "@/assets/Contstants";

export default function Home() {
  const [autoExcerices, setAutoExcerices] = useState(false);
  const [isOutdoors, setIsOutdoors] = useState(false);
  const [includeDifficultExcercises, setIncludeDifficultExcercises] = useState(false);
  const [tabata, setTabata] = useState<ITabata>({
    repetitions: 8,
    work: { min: "00", sec: "30" },
    rest: { min: "00", sec: "10" },
    includeDifficultExcercises: includeDifficultExcercises,
    isOutdoors: isOutdoors,
    excercises: [],
  });

  const updateTabata = (value: any, key: string) => {
    setTabata((prevState) => {
      const item: any = { ...prevState };
      item[key] = value;

      return item;
    });
  };

  const generateExcercises = (allExcercises: TExcercise[], outdoors: boolean, difficultExcercises: boolean) => {
    if (!outdoors) {
      allExcercises = allExcercises.filter((row) => row.workGroup !== "Outdoors");
    }

    if (!difficultExcercises) {
      allExcercises = allExcercises.filter((row) => row.workGroup !== "difficultExcercises");
    }

    // Function to shuffle an array (Fisher-Yates algorithm)
    function shuffleArray(array: any[]) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    // Shuffle the exercises within each workout group
    allExcercises.forEach((exerciseGroup) => shuffleArray(exerciseGroup.excercises));

    let currentRepetition = 0;
    const excercises: string[] = [];

    // Function to get the next unique exercise
    function getNextUniqueExercise(workoutGroup: string) {
      const exercisesInGroup = allExcercises.find((exercise) => exercise.workGroup === workoutGroup)!.excercises;
      const exercise = exercisesInGroup[currentRepetition % exercisesInGroup.length];
      currentRepetition++;
      return exercise;
    }

    // Generate random workouts for each repetition
    for (let i = 0; i < tabata.repetitions; i++) {
      const randomWorkoutGroup = allExcercises[Math.floor(Math.random() * allExcercises.length)].workGroup;
      const exercise = getNextUniqueExercise(randomWorkoutGroup);
      excercises.push(exercise);
    }

    return excercises;
  };


  return (
    <div className="content flex w-full max-w-[800px] flex-col items-center gap-4 px-4 ">
      <Setter title="Repetitions" value={tabata.repetitions} setValue={updateTabata} />
      <SetterDouble title="Work" value={tabata.work} setValue={updateTabata} />
      <SetterDouble title="Rest" value={tabata.rest} setValue={updateTabata} />
      <Switch text="Use random built-in excercies" state={autoExcerices} setState={setAutoExcerices} />
      {autoExcerices && <Switch text="Include outdoor activities" state={isOutdoors} setState={setIsOutdoors} />}
      {autoExcerices && (
        <Switch
          text="Include difficult excercises"
          state={includeDifficultExcercises}
          setState={setIncludeDifficultExcercises}
        />
      )}
      <p className="-mb-2 mt-2">Ready, set,</p>
      <Link
        href={{
          pathname: "/tabataTimer",

          query: {
            repetitions: tabata.repetitions,
            work: [tabata.work.min, tabata.work.sec],
            rest: [tabata.rest.min, tabata.rest.sec],
            excercises: autoExcerices ? generateExcercises(EXCERCISES, isOutdoors, includeDifficultExcercises) : [],
            isOutdoors: isOutdoors,
            includeDifficultExcercises: includeDifficultExcercises,
          },
        }}
        className="w-full bg-secondary py-3 text-center"
      >
        GO!
      </Link>
    </div>
  );
}
