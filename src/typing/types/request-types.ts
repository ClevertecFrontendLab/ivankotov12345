import { ExerciseType, ParametersType } from './exercise-types';

export type TrainingRequestType = {
  name: string,
  date: string,
  isImplementation?: boolean,
  parameters?: ParametersType,
  exercises: ExerciseType[],
}

export type PayTariffRequestType = {
  tariffId: string,
  days: number,
}