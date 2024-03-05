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