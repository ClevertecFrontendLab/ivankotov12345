import { Button, Modal, Result } from 'antd';
import { push } from 'redux-first-history';

import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { clearError, reviewsSelect } from '@redux/slices/reviews';
import { clearFeedbackResult } from '@redux/slices/send-feedback';
import { useScreenWidth } from '@hooks/use-screen-width-hook';
import { calendarSelect, clearCalendarError } from '@redux/slices/calendar';
import { MOBILE_WIDTH, MODAL_WIDTH_DESKTOP, MODAL_WIDTH_MOBILE } from '@constants/constants';

import styles from './modal-results.module.scss';


export const ModalResults: React.FC = () => {
  const { message: reviewsMessage, isError: isReviewsError } = useAppSelector(reviewsSelect);
  const { message: calendarMessage, isError: isCalendarError } = useAppSelector(calendarSelect);
  const screenWidth = useScreenWidth();
  
  const dispatch = useAppDispatch();

  const onResultButtonClick = () => {
    if(reviewsMessage) {
      dispatch(push(reviewsMessage.buttonLink));
      dispatch(clearError());
      dispatch(clearFeedbackResult());
    }
    if(calendarMessage) {
      dispatch(push(calendarMessage.buttonLink));
      dispatch(clearCalendarError());
    }
  };
  return (
    <Modal
      open={isReviewsError || isCalendarError}
      closable={false}
      footer={null}
      centered
      className={styles.modal}
      maskStyle={{
        backgroundColor: 'rgba(121, 156, 213, 0.5)',
        backdropFilter: 'blur(5px)'
      }}
      width={
        screenWidth 
          && screenWidth > MOBILE_WIDTH
          ? MODAL_WIDTH_DESKTOP 
          : MODAL_WIDTH_MOBILE
        }
        data-test-id='modal-no-review'
    >
      <Result
        status={reviewsMessage?.status || calendarMessage?.status}
        title={reviewsMessage?.title || calendarMessage?.title}
        subTitle={reviewsMessage?.subTitle || calendarMessage?.subTitle}
        extra={[
          <Button
            type='primary'
            size='large'
            onClick={onResultButtonClick}
            className={styles.resultButton}
          >
            {reviewsMessage?.buttonText || calendarMessage?.buttonText}
          </Button>
        ]}
        className={styles.result}
      />
    </Modal>
  )
}
