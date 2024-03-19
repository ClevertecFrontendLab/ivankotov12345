import { Button, Modal } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useEffect, useId, useState } from 'react';

import { Rating } from '@components/rating';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { getFeedbackFetch, sendFeedbackSelect } from '@redux/slices/send-feedback';
import { useScreenWidth } from '@hooks/use-screen-width-hook';
import { MOBILE_WIDTH, MODAL_WIDTH_DESKTOP, MODAL_WIDTH_MOBILE } from '@constants/constants';

import styles from './modal-feedbacks.module.scss';


type ModalFeedbacksProps = {
  isSendFeedbackOpen: boolean,
  setIsSendFeedbackOpen: (isSendFeedbackOpen: boolean) => void,
}

export const ModalFeedbacks: React.FC<ModalFeedbacksProps> = ({ isSendFeedbackOpen, setIsSendFeedbackOpen }) => {
  const { submittedData, clearModalInputs } = useAppSelector(sendFeedbackSelect);
  const id = useId();
  const screenWidth = useScreenWidth();

  const [rating, setRating] = useState<number | undefined>(submittedData?.rating);
  const [feedback, setFeedback] = useState<string | undefined>(submittedData?.message);

  const dispatch = useAppDispatch();

  const onCancel = () => setIsSendFeedbackOpen(false);

  useEffect(() => {
    if(clearModalInputs) {
      setFeedback('');
      setRating(0);
    }
  }, [clearModalInputs]);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setFeedback(e.target.value);

  const onSubmit = () => {
    if(rating) {
      dispatch(getFeedbackFetch({
        message: feedback || '',
        rating: rating,
      }));
      setIsSendFeedbackOpen(false);
    }
  };
  return (
    <Modal
      title='Ваш отзыв'
      centered
      open={isSendFeedbackOpen}
      onCancel={onCancel}
      width={
        screenWidth 
          && screenWidth > MOBILE_WIDTH
          ? MODAL_WIDTH_DESKTOP
          : MODAL_WIDTH_MOBILE
      }
      maskStyle={{
        backgroundColor: 'rgba(121, 156, 213, 0.5)',
        backdropFilter: 'blur(5px)'
      }}
      footer={[
        <Button
          key={id}
          type='primary'
          size='large'
          className={styles.modalButton}
          disabled={!rating ? true : false}
          onClick={onSubmit}
          data-test-id='new-review-submit-button'
        >
          Опубликовать
        </Button>
      ]}
      className={styles.modalFeedback}
    >
      <Rating
        rating={rating || 0}
        setRating={setRating}
        size={24}
        disabled={false}
      />

      <TextArea
        placeholder='Autosize height based on content lines'
        onChange={onChange}
        autoSize={{ minRows: 2 }}
        value={feedback || ''}
      />
    </Modal>
  )
}