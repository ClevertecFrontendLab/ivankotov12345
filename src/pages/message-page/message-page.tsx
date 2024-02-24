import { Button, Card, Typography } from 'antd';
import { CheckCircleFilled, CloseCircleFilled, WarningFilled } from '@ant-design/icons';
import { push } from 'redux-first-history';

import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { clearRegistration, registrationSelect } from '@redux/slices/registration';
import { recoverySelect } from '@redux/slices/recovery';
import { authSelect, clearAuth } from '@redux/slices/auth';

import somethingGoesWrong from './assets/png/something-goes-wrong.png'

import styles from './message-page.module.scss';

export const MessagePage: React.FC = () => {
  const { Title, Text } = Typography;

  const dispatch = useAppDispatch();

  const { message: authMessage } = useAppSelector(authSelect);
  const {
    message: registrationMesage,
    isSuccess,
    submittedData
  } = useAppSelector(registrationSelect);

  const { 
    message: recoveryMessage,
    isForgotSuccess,
    isResetSuccess,
  } = useAppSelector(recoverySelect);

  const clearMessageField = () => {
    dispatch(clearAuth());
    dispatch(clearRegistration());
  }

  const onButtonClick = () => {
    if(authMessage) {
      dispatch(push(authMessage.buttonLink));
    }
    if(registrationMesage) {
      dispatch(push(registrationMesage.buttonLink));
    }
    if(recoveryMessage) {
      dispatch(push(recoveryMessage.buttonLink))
    }
    clearMessageField();
  };

  const onRetryButtonClick = () => {
    if(registrationMesage && submittedData) {
      dispatch(push(registrationMesage.buttonLink));
    }
  }

  return (
    <Card className={styles.messageCard}>
      {authMessage && <WarningFilled className={styles.messageCard_logoAuth} />}

      {(registrationMesage || recoveryMessage?.resultLabel === 'success')
        && (isSuccess || isResetSuccess)
        && <CheckCircleFilled className={styles.messageCard_logoSuccess} />}

      {(registrationMesage
        || recoveryMessage?.resultLabel === 'error not found'
        || recoveryMessage?.resultLabel === 'change password error')
        && (!isSuccess || !isForgotSuccess || !isResetSuccess)
        && <CloseCircleFilled className={styles.messageCard_logoError} />}

      {recoveryMessage?.resultLabel === 'something goes wrong'
      && !isForgotSuccess
      && <img src={somethingGoesWrong} alt='Something goes wrong' />}

      <div>
        <Title level={3} className={styles.messageHeader}>
          {authMessage && authMessage.title}
          {registrationMesage && registrationMesage.title}
          {recoveryMessage && recoveryMessage.title}
        </Title>
        <Text className={styles.messageText}>
          {authMessage && authMessage.message}
          {registrationMesage && registrationMesage.message}
          {recoveryMessage && recoveryMessage.message}
        </Text>
      </div>

      <Button
        block
        type='primary'
        size='large'
        onClick={
          registrationMesage && registrationMesage.resultLabel === 'try again'
          ? onRetryButtonClick
          : onButtonClick
        }
        className={styles.messageButton}
      >
        {authMessage && authMessage.buttonText}
        {registrationMesage && registrationMesage.buttonText}
        {recoveryMessage && recoveryMessage.buttonText}
      </Button>
    </Card>
  )
}
