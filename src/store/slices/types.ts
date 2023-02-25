import { BookType } from '../../types/book-detailed-types'
import { BookCardType } from '../../types/book-types'
import { NavListItemType } from '../../types/nav-list-type'

export const enum SortType {
    RATING_UP_FIRST = 'RATING_UP',
    RATING_LOW_FIRST = 'RATING_LOW',
}

export type BooksStateType = {
    books: BookCardType[] | null,
    error: string | null,
    isLoading: boolean,
}

export type NavListState = {
    navList: NavListItemType[] | null,
    error: string | null,
    isLoading: boolean,
}

export type BookStateType = {
    book: BookType | null,
    error: string | null,
    isLoading: boolean,
    id: string | null,
}

export type SortStateType = {
    sortingType: SortType
}