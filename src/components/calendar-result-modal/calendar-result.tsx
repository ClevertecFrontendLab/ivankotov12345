import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { MODAL_WIDTH_CALENDAR } from '@constants/constants';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { clearCreateTrainingError, closeCreateTrainingModal, createTrainingSelect } from '@redux/slices/create-training';
import { clearRedactingError, redactTrainingSelect } from '@redux/slices/redact-training';
import { clearError, getTrainingListFetch, trainingListSelect } from '@redux/slices/training-list';
import { Button, Modal, Typography } from 'antd';
import classNames from 'classnames';

import styles from './calendar-result.module.scss'

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

  const modalOpen = isTrainingListError || isCreateTrainingError || isRedactTrainingError;
  const mdoalTitle = trainingListMessage?.title
    || createTrainingMessage?.title
    || redactTrainingMessage?.title;
  const modalText = trainingListMessage?.text
    || createTrainingMessage?.text
    || redactTrainingMessage?.text;

  const modalButtonText = trainingListMessage?.buttonText
  || createTrainingMessage?.buttonText
  || redactTrainingMessage?.buttonText

  return(
    <Modal
      className={styles.modal}
      width={MODAL_WIDTH_CALENDAR}
      open={modalOpen}
      maskStyle={{
        backgroundColor: 'rgba(121, 156, 213, 0.5)',
        backdropFilter: 'blur(5px)'
      }}
      centered={true}
      title={
        <div className={styles.headerWrapper}>
          <CloseCircleOutlined className={
            isTrainingListError
              ? styles.closeCircleBlue
              : classNames(styles.closeCircleBlue, styles.closeCircleRed)
          } />
          <div>
            <Title level={5} className={styles.title} data-test-id='modal-error-user-training-title'>
              {mdoalTitle}
            </Title>
            <Text type='secondary' data-test-id='modal-error-user-training-subtitle'>
              {modalText}
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
          key={modalButtonText}
          type='primary'
          onClick={onRetryButtonClick}
          className={styles.retryButton}
          size='large'
          data-test-id='modal-error-user-training-button'
        >
          {modalButtonText}
        </Button>
      ]}

    />
  )
}