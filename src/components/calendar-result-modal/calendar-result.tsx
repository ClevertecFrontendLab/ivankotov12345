import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Modal, Typography } from 'antd';

import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { clearError, getTrainingListFetch, trainingListSelect } from '@redux/slices/training-list';
import { MODAL_WIDTH_CALENDAR } from '@constants/constants';

import styles from './calendar-result.module.scss'
import { clearCreateTrainingError, closeCreateTrainingModal, createTrainingSelect } from '@redux/slices/create-training';
import classNames from 'classnames';
import { clearRedactingError, redactTrainingSelect } from '@redux/slices/redact-training';

const { Title, Text } = Typography;

type PrposType = {
  setIsModalOpen: (isModalOpen: boolean) => void,
}

export const CalendarResult: React.FC<PrposType> = ({ setIsModalOpen }) => {
  const dispatch = useAppDispatch()
  const {
    message: trainingListMessage,
    isError: isTrainingListError
  } = useAppSelector(trainingListSelect);
  const {
    message: createTrainingMessage,
    isError: isCreateTrainingError,
  } = useAppSelector(createTrainingSelect);

  const {
    message: redactTrainingMessage,
    isError: isRedactTrainingError,
  } = useAppSelector(redactTrainingSelect);

  const onRetryButtonClick = () => {
    if(isTrainingListError) {
      dispatch(getTrainingListFetch());
    }
    if(isCreateTrainingError) {
      dispatch(clearCreateTrainingError());
      dispatch(closeCreateTrainingModal());
      setIsModalOpen(false);
    }
    if(isRedactTrainingError) {
      dispatch(clearRedactingError());
      dispatch(closeCreateTrainingModal());
      setIsModalOpen(false);
    }
  };

  const onCloseModalClick = () => dispatch(clearError());
  return(
    <Modal
      transitionName=''
      maskTransitionName=''
      className={styles.modal}
      width={MODAL_WIDTH_CALENDAR}
      open={isTrainingListError || isCreateTrainingError || isRedactTrainingError}
      maskStyle={{
        backgroundColor: 'rgba(121, 156, 213, 0.5)',
        backdropFilter: 'blur(5px)'
      }}
      centered
      title={
        <div className={styles.headerWrapper}>
          <CloseCircleOutlined className={
            isTrainingListError
              ? styles.closeCircleBlue
              : classNames(styles.closeCircleBlue, styles.closeCircleRed)
          } />
          <div>
            <Title level={5} className={styles.title} data-test-id='modal-error-user-training-title'>
              {trainingListMessage?.title
                || createTrainingMessage?.title
                || redactTrainingMessage?.title}
            </Title>
            <Text type='secondary' data-test-id='modal-error-user-training-subtitle'>
              {trainingListMessage?.text
                || createTrainingMessage?.text
                || redactTrainingMessage?.text}
            </Text>
            </div>

            {trainingListMessage &&
              <Button
                type='text'
                size='small'
                icon={<CloseOutlined className={styles.buttonCloseIcon} />}
                onClick={onCloseModalClick}
                data-test-id='modal-error-user-training-button-close'
              />}
        </div>
      }
      bodyStyle={{
        display: 'none',
      }}
      footer={[
        <Button 
          key={
            trainingListMessage?.buttonText
            || createTrainingMessage?.buttonText
            || redactTrainingMessage?.buttonText}
          type='primary'
          onClick={onRetryButtonClick}
          className={styles.retryButton}
          size='large'
          data-test-id='modal-error-user-training-button'
        >
          {
          trainingListMessage?.buttonText
            || createTrainingMessage?.buttonText
            || redactTrainingMessage?.buttonText
          }
        </Button>
      ]}

    />
  )
}