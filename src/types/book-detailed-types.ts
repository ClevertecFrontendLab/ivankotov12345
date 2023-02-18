import { BookingType, DeliveryType, HistoryType } from './book-types'

export type BookType = {
    id: number | null,
    title: string,
    rating: number | null,
    issueYear: string | null,
    description: string | null,
    publish: string | null,
    pages: string | null,
    cover: string | null,
    weight: string | null,
    format: string | null,
    ISBN: string | null,
    producer: string | null,
    authors: string[] | null,
    images: ImagesType[] | null,
    categories: string[] | null,
    comments: CommentsType[],
    booking: BookingType | null,
    delivery: DeliveryType | null,
    histories: HistoryType[] | null, 
}

type ImagesType = {
    url: string | null,
}

export type CommentsType = {
    id: number | null,
    rating: number | null,
    text: string | null,
    createdAt: string,
    user: UserType
}

type UserType = {
    commentUserId: number | null,
    firstName: string | null,
    lastName: string | null,
    avatarUrl: string | null,
}