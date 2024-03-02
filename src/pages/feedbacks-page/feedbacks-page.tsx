import { useEffect, useState } from 'react';
import { Button } from 'antd';

import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { getReviewsFetch, reviewsSelect } from '@redux/slices/reviews';
import { Commentary } from '@components/commentary';

import styles from './feedbacks-page.module.scss';

export const FeedbacksPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isFullList, setIsFullList] = useState(false);
  useEffect(() => {
    dispatch(getReviewsFetch());
  }, [dispatch]);

  const { feedbacks } = useAppSelector(reviewsSelect);

  const sortedFeedbacks = feedbacks 
    && [...feedbacks]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const displayFullListToggle = () => {
    setIsFullList(!isFullList);
  }
  return (
    <section className={styles.feedbacksSection}>
      <ul className={styles.feedbacksList}>
        {sortedFeedbacks
          && sortedFeedbacks
            .slice(0, isFullList ? sortedFeedbacks.length : 4)
            .map(({ createdAt, fullName, imageSrc, message, rating, id }) => (
          <li key={id}>
            <Commentary
              createdAt={createdAt}
              fullName = {fullName}
              imageSrc={imageSrc}
              message={message}
              rating={rating}
            />
          </li>
        ))}
      </ul>

      <div className={styles.buttonsWrapper}>
        <Button
          type='primary'
          className={styles.buttonFeedback}
          size='large'
        >
          Написать отзыв
        </Button>
        <Button
          type='link'
          onClick={displayFullListToggle}
          className={styles.buttonShowAll}
          size='large'
        >
          {isFullList
            ? 'Свернуть все отзывы'
            : 'Развернуть все отзывы'}
        </Button>
      </div>
    </section>
  )
}
