import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Modal, Typography } from 'antd';

import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { clearError, getTrainingListFetch, trainingListSelect } from '@redux/slices/training-list';
import { MODAL_WIDTH_CALENDAR } from '@constants/constants';

import styles from './calendar-result.module.scss'
import { clearCreateTrainingError, createTrainingSelect } from '@redux/slices/create-training';
import classNames from 'classnames';
import { clearRedactingError, redactTrainingSelect } from '@redux/slices/redact-training';

const { Title, Text } = Typography;

export const CalendarResult: React.FC = () => {
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
    }
    if(isRedactTrainingError) {
      dispatch(clearRedactingError());
    }
  };

  const onCloseModalClick = () => dispatch(clearError());
  return(
    <Modal
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
            <Title level={5} className={styles.title}>
              {trainingListMessage?.title
                || createTrainingMessage?.title
                || redactTrainingMessage?.title}
            </Title>
            <Text type='secondary'>
              {
              trainingListMessage?.text
                || createTrainingMessage?.text
                || redactTrainingMessage?.text
              }
            </Text>
            </div>

            {trainingListMessage &&
              <Button
                type='text'
                size='small'
                icon={<CloseOutlined className={styles.buttonCloseIcon} />}
                onClick={onCloseModalClick}
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