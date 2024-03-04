import { Button, Modal, Result } from 'antd';

import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { clearFeedbackInputs, clearFeedbackResult, sendFeedbackSelect } from '@redux/slices/send-feedback';
import { getReviewsFetch } from '@redux/slices/reviews';

import styles from './send-feedback-results.module.scss';

type PropsType = {
  setIsSendFeedbackOpen: (isSendFeedbackOpen: boolean) => void,
}

export const SendFeedbackResults: React.FC<PropsType> = ({ setIsSendFeedbackOpen }) => {
  const { isResult, message, messageError } = useAppSelector(sendFeedbackSelect);

  const dispatch = useAppDispatch();

  const onSuccessButtonClick = () => {
    setIsSendFeedbackOpen(false);
    dispatch(clearFeedbackResult());
    dispatch(getReviewsFetch());
  }

  const onWriteFeedbackButton = () => {
    setIsSendFeedbackOpen(true);
    dispatch(clearFeedbackResult());
    dispatch(clearFeedbackInputs());
  }

  const onCloseModalButton = () => {
    setIsSendFeedbackOpen(false);
    dispatch(clearFeedbackResult());
  }
  return (
    <Modal
    open={isResult}
    closable={false}
    footer={null}
    className={styles.modal}
    width={539}
  >
    <Result
      status={message?.status || messageError?.status}
      title={message?.title || messageError?.title}
      subTitle={message?.subTitle || messageError?.subTitle}
      extra={[
        message && (
          <Button
            type='primary'
            size='large'
            className={styles.resultButton}
            block
            onClick={onSuccessButtonClick}
          >
            {message.buttonText}
          </Button>
        ),
        messageError && (
          <>
            <Button
              type='primary'
              size='large'
              className={styles.resultButton}
              onClick={onWriteFeedbackButton}
              data-test-id='write-review-not-saved-modal'
            >
              {messageError.buttonTextWriteMessage}
            </Button>

            <Button
              size='large'
              onClick={onCloseModalButton}
            >
              {messageError.buttonTextClose}
            </Button>
          </>
        )
      ]}
      className={styles.result}
    />
  </Modal>
  )
}
