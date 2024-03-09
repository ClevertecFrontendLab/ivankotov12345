export type ParametersType = {
  repeat: boolean,
  period: number,
  jointTraining: boolean,
  participants: string[],
}

export type ExerciseType = {
  _id: string;
  name: string;
  replays: number;
  weight: number;
  approaches: number;
  isImplementation: boolean;
};