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