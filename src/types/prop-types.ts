import { ChangeEvent } from 'react'

import { BookCardType, BookingType, DeliveryType } from './book-types'

export interface BookCardPropsType extends BookCardType {
    isTile?: boolean,
    bookName: string
}

export type CommentPropsType = {
    userAvatar?: string
    commentatorName?: string,
    date?: string,
    rating?: number,
    commentText?: string | null,
}

export type ButtonPropsType = {
    booking: BookingType | null | undefined,
    delivery: DeliveryType | null | undefined,
    buttonStyles?: string,
    buttonReservedStyles?: string,
    buttonNotReservedStyles?: string,
}

export type ErrorPropsType = {
    error: string
}

export type BreadCrumbsPropsType = {
    categoryName: string,
    bookId: string | undefined,
}

export type PanelPropsType = {
    isTile: boolean,
    setIsTile: React.Dispatch<React.SetStateAction<boolean>>,
    searchPanelChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export type HighlightsPropsType = {
    title: string,
    bookName: string,
}