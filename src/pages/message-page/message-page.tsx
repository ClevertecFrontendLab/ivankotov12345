import { Button, Card, Typography } from 'antd';
import { CheckCircleFilled, CloseCircleFilled, WarningFilled } from '@ant-design/icons';
import { clearRegistration, registrationSelect } from '@redux/slices/registration';
import { goBack, push } from 'redux-first-history';

import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { authSelect, clearAuth } from '@redux/slices/auth';

import styles from './message-page.module.scss';

export const MessagePage: React.FC = () => {
  const { Title, Text } = Typography;

  const dispatch = useAppDispatch();

  const { message: authMessage } = useAppSelector(authSelect);
  const { message: registrationMesage, isSuccess, submittedData } = useAppSelector(registrationSelect);

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

      {registrationMesage
        && isSuccess
        && <CheckCircleFilled className={styles.messageCard_logoSuccess} />}

      {registrationMesage
        && !isSuccess
        && <CloseCircleFilled className={styles.messageCard_logoError} />}

      <div>
        <Title level={3} className={styles.messageHeader}>
          {authMessage && authMessage.title}
          {registrationMesage && registrationMesage.title}
        </Title>
        <Text className={styles.messageText}>
          {authMessage && authMessage.message}
          {registrationMesage && registrationMesage.message}
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
      </Button>
    </Card>
  )
}
