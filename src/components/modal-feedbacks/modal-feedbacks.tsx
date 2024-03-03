import { Button, Modal } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useState } from 'react';

import { Rating } from '@components/rating';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';

import styles from './modal-feedbacks.module.scss';
import { getFeedbackFetch } from '@redux/slices/send-feedback';

type PropsType = {
  isSendFeedbackOpen: boolean,
  setIsSendFeedbackOpen: (isSendFeedbackOpen: boolean) => void
}

export const ModalFeedbacks: React.FC<PropsType> = ({ isSendFeedbackOpen, setIsSendFeedbackOpen }) => {
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');

  const dispatch = useAppDispatch();

  const onCancel = () => {
    setIsSendFeedbackOpen(false);
  }

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const currentFeedback = e.target.value;
    setFeedback(currentFeedback);
  }

  const onSubmit = () => {
    dispatch(getFeedbackFetch({
      message: feedback,
      rating: rating,
    }))
  }
  return (
    <Modal
      title='Ваш отзыв'
      open={isSendFeedbackOpen}
      onCancel={onCancel}
      centered
      footer={[
        <Button
          size='large'
          type='primary'
          className={styles.modalButton}
          disabled={rating === 0 ? true : false}
          onClick={onSubmit}
        >
          Опубликовать
        </Button>
      ]}
      className={styles.modalFeedback}
    >
      <Rating
        rating={rating}
        setRating={setRating}
        size={24}
        disabled={false}
      />

      <TextArea
        placeholder='Autosize height based on content lines'
        onChange={onChange}
      />
    </Modal>
  )
}
