import TabataTimer from "@/components/TabataTimer";

function page({
  searchParams,
}: {
  searchParams: {
    repetitions: string;
    work: string[];
    rest: string[];
    excercises: string[];
    isOutdoors: boolean;
    includeDifficultExcercises: boolean;
  };
}) {
  const tabata: ITabata = {
    repetitions: +searchParams.repetitions,
    work: { min: searchParams.work[0], sec: searchParams.work[1] },
    rest: { min: searchParams.rest[0], sec: searchParams.rest[1] },
    excercises: searchParams.excercises
      ? typeof searchParams.excercises === "string"
        ? [searchParams.excercises]
        : searchParams.excercises
      : [],
    isOutdoors: searchParams.isOutdoors,
    includeDifficultExcercises: searchParams.includeDifficultExcercises,
  };

  return <TabataTimer tabata={tabata} />;
}

export default page;
