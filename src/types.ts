import { BookCardType } from './types/book-types'
import { NavListItemType } from './types/nav-list-type'

export type RatingPropsType = {
    ratingVal?: number | null,
    classRating?: string,
    classStars?: string,
    classStar?: string,
}

export type MenuProps = {
    closeMenu?: () => void,
    dataTestIdShowcase?: string,
    dataTestIdBooks?: string,
    dataTestIdTerms?: string,
    dataTestIdContract?: string,
    dataTestIdCategory?: string,
    dataTestIdQuantity?: string,
    navListCategories: NavListItemType[] | null
    booksListAll: BookCardType[] | null,
}