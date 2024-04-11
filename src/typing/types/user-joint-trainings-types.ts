import { CalendarResponseItemType } from './response-types';

export type UserJointTrainingsType = {
  id: string,
  name: string,
  trainingType: string,
  imageSrc: string | null,
  avgWeightInWeek: number,
  inviteId: string,
  status: string | null,
}

export type InviteType = {
  to: string,
  trainingId: string,
}

export type MyInvitationsType = {
  _id: string,
  from: {
    _id: string,
    firstName: string | null,
    lastName: string | null,
    imageSrc: string | null,
  },
  training: CalendarResponseItemType,
  status: string,
  createdAt: string,
}

export type InvitationResponseType = {
  id: string,
  status: 'accepted' | 'rejected',
}