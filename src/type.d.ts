declare module '*.mp3'; // '*.wav' if you're using wav format
declare module 'use-sound'

interface IDouble {
  min: string;
  sec: string;
}

interface ITabata {
  name?: string;
  id?: string;
  excercises: string | string[];
  isOutdoors: boolean;
  includeDifficultExcercises: boolean;
  repetitions: number;
  work: IDouble;
  rest: IDouble;
}

interface IExcercises {
  cardio: string[];
  upperBody: string[];
  lowerBody: string[];
  abdominals: string[];
  dangerous: string[];
  outdoors: string[];
}

type TExcercise = {
  excercises: string[];
  workGroup: string;
  icon?: string;
};

type TNewExcercise = {
  id:number;
  excercise: string;
  workgroup: string;
  icon?: string;
};


type TExcercises = {
  cardio: string[];
  upperBody: string[];
  lowerBody: string[];
  abdominals: string[];
  dangerous: string[];
  outdoors: string[];
};
