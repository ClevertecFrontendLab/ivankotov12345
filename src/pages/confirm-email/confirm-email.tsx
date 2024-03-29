import { useEffect, useState } from 'react';
import VerificationInput from 'react-verification-input';
import { goBack } from 'redux-first-history';
import { CloseCircleFilled, ExclamationCircleFilled } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { getConfirmEmailFetch, recoverySelect } from '@redux/slices/recovery';
import { Card, Typography } from 'antd';

import styles from './confirm-email.module.scss';

const { Title, Text } = Typography;

export const ConfirmEmail: React.FC = () => {
  const [messageTitle, setMessageTitle] = useState<string | null>();
  const [inputValue, setInputValue] = useState<string>('');

  const dispatch = useAppDispatch();
  const { submittedEmail, isConfirmEmailError } = useAppSelector(recoverySelect);

  useEffect(() => {
    if(isConfirmEmailError) {
      setMessageTitle('Неверный код. Введите код для восстановления аккауанта');
    } else {
      setMessageTitle('Введите код для восстановления аккаунта');
    }
  }, [isConfirmEmailError])

  const onCompleteVerification = (value: string) => {
    if(submittedEmail) {
      dispatch(getConfirmEmailFetch({
        email: submittedEmail.email,
        code: value
      }));
    }
    setInputValue('');
  }

  useEffect(() => {
    if(!submittedEmail) {
      dispatch(goBack());
    }
  }, [dispatch, submittedEmail])

  return (
    <Card className={styles.confirmCard}>
      {isConfirmEmailError
        ? <CloseCircleFilled className={styles.cardLogoError} />
        : <ExclamationCircleFilled className={styles.cardLogo} />}

      <div className={styles.textWrapper}>
        <Title level={3} className={styles.title}>
          {messageTitle}
        </Title>
        <Text type='secondary' className={styles.text}>
          Мы отправили вам на e-mail
          <Text strong={true} type='secondary'>{` ${submittedEmail?.email} `}</Text>
          шестизначный код. Введите его в поле ниже.
        </Text>
      </div>

      <VerificationInput
        value={inputValue}
        length={6}
        placeholder=''
        validChars='0-9'
        onComplete={(value) => onCompleteVerification(value)}
        onChange={setInputValue}
        classNames={{
          container: styles.verificationContainer,
          character: isConfirmEmailError? styles.characterError : styles.character,
          characterFilled: styles.caracterFilled,
        }}
        inputProps={{ 'data-test-id': 'verification-input' }}

      />
      <Text className={styles.text} type='secondary'>Не пришло письмо? Проверьте папку Спам.</Text>
    </Card>
  )
}
