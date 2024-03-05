import { Button, Modal, Result } from 'antd';
import { push } from 'redux-first-history';

import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { clearError, reviewsSelect } from '@redux/slices/reviews';
import { clearFeedbackResult } from '@redux/slices/send-feedback';
import { useScreenWidth } from '@hooks/use-screen-width-hook';
import { MOBILE_WIDTH, MODAL_WIDTH_DESKTOP, MODAL_WIDTH_MOBILE } from '@constants/constants';

import styles from './modal-results.module.scss';

export const ModalResults: React.FC = () => {
  const { message: reviewsMessage, isError } = useAppSelector(reviewsSelect);
  const screenWidth = useScreenWidth();
  
  const dispatch = useAppDispatch();

  const onResultButtonClick = () => {
    if(reviewsMessage) {
      dispatch(push(reviewsMessage.buttonLink));
      dispatch(clearError());
      dispatch(clearFeedbackResult());
    }
  };
  return (
    <Modal
      open={isError}
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
    >
      <Result
        status={reviewsMessage?.status}
        title={reviewsMessage?.title}
        subTitle={reviewsMessage?.subTitle}
        extra={[
          <Button
            type='primary'
            size='large'
            onClick={onResultButtonClick}
            className={styles.resultButton}
          >
            {reviewsMessage?.buttonText}
          </Button>
        ]}
        className={styles.result}
      />
    </Modal>
  )
}
