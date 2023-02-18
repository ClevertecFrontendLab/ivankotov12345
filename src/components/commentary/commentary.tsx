
import { CommentsType } from '../../types/book-detailed-types'
import { Rating } from '../rating/rating'

import styles from './commentary.module.css'


export const Commentary = ({ rating, text, createdAt, user }: CommentsType) => {
  const formatDate = (date: string) => {
    const dateComment = new Intl.DateTimeFormat('ru', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    return dateComment.format(Date.parse(date));
  }

  return (
  <div className={styles.comment_wrapper}>
    <div className={styles.comment_head}>
      {user.avatarUrl 
      ? <img src={`https://strapi.cleverland.by/api/books${user.avatarUrl}`} alt={`${user.lastName}`} className={styles.avatar} />
      : null}

      <span className={styles.user_name}>
        <span>{user.firstName}</span>
        <span>{user.lastName}</span>
      </span>

      <span className={styles.date}>{formatDate(createdAt)}</span>
    </div>

    <Rating ratingVal={rating} classStars={styles.rating} />

    {text === null ? null : <p className={styles.commentary}>{text}</p>}
  </div>
  )
}
