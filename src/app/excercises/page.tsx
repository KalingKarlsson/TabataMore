import { getExcercises } from "@/db/NeonDB";
import React from "react";

const page: React.FC = async () => {
  const fetchedExercises: any[] = await getExcercises();

  return (
    <div className="my-8">
      {fetchedExercises.length > 0 ? (
        fetchedExercises
          .sort((a: TNewExcercise, b: TNewExcercise) => a.workgroup.localeCompare(b.workgroup))
          .map((excercise: TNewExcercise) => (
            <div key={excercise.id} className="flex flex-row gap-4 items-center justify-between p-4 ">
              <h2 className="text-xl">{excercise.workgroup}</h2>
              <p>{excercise.excercise}</p>
            </div>
          ))
      ) : (
        <p>empty</p>
      )}
    </div>
  );
};

export default page;
