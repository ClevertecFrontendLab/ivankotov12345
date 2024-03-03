import { useEffect, useState } from 'react';
import { Button } from 'antd';

import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { getReviewsFetch, reviewsSelect } from '@redux/slices/reviews';
import { Commentary } from '@components/commentary';
import { ModalFeedbacks } from '@components/modal-feedbacks';
import { ModalResults } from '@components/modal-results';
import { SendFeedbackResults } from '@components/send-feedback-results';

import styles from './feedbacks-page.module.scss';
import { FeedbacksNoResults } from '@components/feedbacks-no-results';



export const FeedbacksPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isFullList, setIsFullList] = useState<boolean>(false);
  const [isSendFeedbackOpen, setIsSendFeedbackOpen] = useState<boolean>(false);
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

  const onWriteFeedbackButtonClick = () => {
    setIsSendFeedbackOpen(true);
  }
  return (
    <section className={styles.feedbacksSection}>
      {feedbacks && feedbacks.length > 0 &&
        <>
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
            onClick={onWriteFeedbackButtonClick}
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
        </>}
      {feedbacks && !feedbacks.length &&
        <FeedbacksNoResults setIsSendFeedbackOpen={setIsSendFeedbackOpen} />
      }
      <ModalFeedbacks
        isSendFeedbackOpen={isSendFeedbackOpen}
        setIsSendFeedbackOpen={setIsSendFeedbackOpen}
      />
      <ModalResults />
      <SendFeedbackResults
        setIsSendFeedbackOpen={setIsSendFeedbackOpen}
      />
    </section>
  )
}
