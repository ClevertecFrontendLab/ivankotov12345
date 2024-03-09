import { ExerciseType, ParametersType } from './exercise-types';

export type AuthResponseType = {
  accessToken: string,
}

export type FeedbackResponseType = {
  id: string,
  fullName: string | null,
  imageSrc: string | null,
  message: string | null,
  rating: number,
  createdAt: string
}

export type CalendarResponseItemType = {
  _id: string,
  name: string,
  date: string,
  isImplementation: boolean,
  userId: string,
  parameters: ParametersType,
  exercises: ExerciseType[],
}

export type TrainingType = {
  name: string,
  key: string,
}