import { Button, Result } from 'antd';
import { goBack, push } from 'redux-first-history';
import { useEffect } from 'react';
import { history } from '@redux/configure-store';

import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { clearRegistration, registrationSelect } from '@redux/slices/registration';
import { clearRecovery, recoverySelect } from '@redux/slices/recovery';
import { authSelect, clearAuth } from '@redux/slices/auth';

import styles from './message-page.module.scss';

export const MessagePage: React.FC = () => {

  const dispatch = useAppDispatch();

  const { message: authMessage } = useAppSelector(authSelect);
  const {
    message: registrationMesage,
    submittedData,
  } = useAppSelector(registrationSelect);

  const urlToTestId: { [key: string]: string } = {
    '/result/success': 'registration-enter-button',
    '/result/error': 'registration-retry-button',
    '/result/error-user-exist': 'registration-back-button',
    '/result/error-login': 'login-retry-button',
    '/result/error-check-email-no-exist': 'check-retry-button',
    '/result/error-check-email': 'check-back-button',
    '/result/error-change-password': 'change-retry-button',
  };

  const { 
    message: recoveryMessage,
    submittedEmail,
    submittedNewPass,
  } = useAppSelector(recoverySelect);

  const clearMessageField = () => {
    dispatch(clearAuth());
    dispatch(clearRegistration());
    dispatch(clearRecovery());
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
    if(recoveryMessage && submittedNewPass) {
      dispatch(push(recoveryMessage.buttonLink))
    }
    if(recoveryMessage && submittedEmail) {
      dispatch(push(recoveryMessage.buttonLink))
    }
  }

  useEffect(() => {
    if(!authMessage && !recoveryMessage && !registrationMesage) {
      dispatch(goBack());
    }
  })
  return (
    <Result
      status={authMessage?.status || registrationMesage?.status || recoveryMessage?.status}
      title={authMessage?.title || registrationMesage?.title || recoveryMessage?.title}
      subTitle={authMessage?.subTitle || registrationMesage?.subTitle || recoveryMessage?.subTitle}
      extra={
        <Button
          type='primary'
          block={
            recoveryMessage 
            && (
              recoveryMessage.buttonText === 'Назад'
              || recoveryMessage.buttonText === 'Попробовать снова'
              )
            ? false
            : true
            }
          size='large'
          className={styles.messageButton}
          onClick={registrationMesage?.retry || recoveryMessage?.retry
            ? onRetryButtonClick
            : onButtonClick
          }
          data-test-id={urlToTestId[history.location.pathname]}
        >
          {authMessage?.buttonText || registrationMesage?.buttonText || recoveryMessage?.buttonText}
        </Button>
      }
      className={styles.messageCard}
    />
  )
}
