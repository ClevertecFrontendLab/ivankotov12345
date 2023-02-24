import { Link, useLocation } from 'react-router-dom'

import NoCoverBook from '../../assets/img/no-cover-book.jpg'
import { NAV_BOOKS_ALL, NAV_LIST } from '../../constants/paths'
import { BookCardPropsType } from '../../types/prop-types'
import { Button } from '../button/button'
import { Highlight } from '../highlight-text/highlight-text'
import { Rating } from '../rating/rating'

import styles from './book-card.module.css'

export const BookCard = ({ id, authors, booking, delivery, image, issueYear, rating, title, isTile, bookName }: BookCardPropsType) => {
  const location = useLocation();

  const classRatingText = isTile ? styles.rating : styles.rating_list;
  const classButton = isTile ? styles.button : styles.button_list;
  const classsButtonNotReserved = styles.button_not_reserved;
  const classsButtonReserved = styles.button_reserved;
  const classStar = isTile ? styles.star : styles.star_list;

  const coverImage = image ? `https://strapi.cleverland.by${image.url}` : NoCoverBook

  const authorsList = authors?.join(', ');

  return (
    <Link to={
      location.pathname.split('/')[2] 
      ? `/${NAV_LIST.books.path}/${location.pathname.split('/')[2]}/${id}`
      : `/${NAV_LIST.books.path}/${NAV_BOOKS_ALL.path}/${id}`
    }>

      <li data-test-id='card' className={isTile === true ? styles.card : styles.card_list}>
        
        <img src={coverImage} alt={title} className={isTile === true ? styles.card_cover : styles.card_cover_list} />

        <Rating ratingVal={rating} classRating={classRatingText} classStars={styles.stars_wrapper} classStar={classStar} />

        <div className={isTile === true ? styles.card_name_wrapper : styles.card_name_wrapper_list}>
          <div className={isTile === true ? styles.card_name_text : styles.card_name_text_list}>
            <p className={isTile === true ? styles.card_name : styles.card_name_list}>
              <Highlight title={title} bookName={bookName} />
            </p>
          </div>

          <span className={isTile === true ? styles.card_author : styles.card_author_list}>{authorsList}, {issueYear}</span>
        </div>
        
        <Button delivery={delivery} booking={booking} buttonStyles={classButton} buttonReservedStyles={classsButtonReserved} buttonNotReservedStyles={classsButtonNotReserved} />
      </li>
    </Link>
  )
}
