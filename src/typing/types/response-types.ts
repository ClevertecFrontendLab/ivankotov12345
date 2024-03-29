import { ExerciseType, ParametersType } from './exercise-types';
import { TariffType } from './tariff-types';

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

export type UserResponseType = {
  email?: string,
  firstName?: string,
  lastName?: string,
  birthday?: string,
  imgSrc?: string,
  readyForJointTraining: boolean,
  sendNotification: boolean,
  tariff: TariffType,
}

export type ImageResponseType = {
  name: string,
  url: string,
}