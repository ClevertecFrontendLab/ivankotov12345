import { useEffect, useState } from 'react';
import { CloseCircleFilled, ExclamationCircleFilled } from '@ant-design/icons';
import { Card, Typography } from 'antd';
import VerificationInput from 'react-verification-input';

import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { getConfirmEmailFetch, recoverySelect } from '@redux/slices/recovery';

import styles from './confirm-email.module.scss';

export const ConfirmEmail: React.FC = () => {
  const [messageTitle, setMessageTitle] = useState<string | null>();
  const [inputValue, setInputValue] = useState<string>('');
  const { Title, Text } = Typography;

  const dispatch = useAppDispatch();
  const { submittedEmail, isConfirmEmailError } = useAppSelector(recoverySelect);

  useEffect(() => {
    if(!isConfirmEmailError) {
      setMessageTitle('Введите код для восстановления аккаунта');
    } else {
      setMessageTitle('Неверный код. Введите код для восстановления аккауанта');
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
  return (
    <Card className={styles.confirmCard}>
      {!isConfirmEmailError
        ? <ExclamationCircleFilled className={styles.cardLogo} />
        : <CloseCircleFilled className={styles.cardLogoError} />}

      <div className={styles.textWrapper}>
        <Title level={3} className={styles.title}>
          {messageTitle}
        </Title>
        <Text type='secondary' className={styles.text}>
          Мы отправили вам на e-mail
          <Text strong type='secondary'>{` ${submittedEmail?.email} `}</Text>
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
      />
      <Text className={styles.text} type='secondary'>Не пришло письмо? Проверьте папку Спам.</Text>
    </Card>
  )
}
