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
}