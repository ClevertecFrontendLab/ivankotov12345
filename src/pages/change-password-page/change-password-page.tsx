import { useEffect, useState } from 'react';
import { InputPassword } from '@components/input-password';
import { Button, Card, Form, Typography } from 'antd';
import { ValidateStatus } from 'antd/es/form/FormItem';
import { FormRecoveryInputValues } from '@typing/types/form-input-values';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { getResetPasswordFetch, recoverySelect } from '@redux/slices/recovery';

import styles from './change-password-page.module.scss';

export const ChangePasswordPage: React.FC = () => {
  const [newPasswordStatus, setNewPasswordStatus] = useState<ValidateStatus>('');
  const [confirmNewPasswordStatus, setConfirmNewPasswordStatus] = useState<ValidateStatus>('');

  const { Title } = Typography;

  const dispatch = useAppDispatch();
  const { submittedNewPass } = useAppSelector(recoverySelect);

  const onSubmit = (data: FormRecoveryInputValues) => {
      dispatch(getResetPasswordFetch(data));
  };

  const onFinishFailed = () => {
    setNewPasswordStatus('error');
    setConfirmNewPasswordStatus('error');
  }

  const [form] = Form.useForm();

  useEffect(() => {
    if (submittedNewPass) {
      dispatch(getResetPasswordFetch(submittedNewPass));
    }
  })

  return (
    <Card className={styles.card}>
      <Title level={3} className={styles.cardTitle}>Восстановление аккаунта</Title>
      <Form onFinish={onSubmit} onFinishFailed={onFinishFailed} form={form}>
        <div className={styles.inputsWrapper}>
          <InputPassword
            status={newPasswordStatus}
            setStatus={setNewPasswordStatus}
            placeholder='Новый пароль'
            name='password'
            help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
          />
          <InputPassword
            status={confirmNewPasswordStatus}
            setStatus={setConfirmNewPasswordStatus}
            placeholder='Повторите пароль'
            name='confirmPassword'
          />
        </div>

        <Button
          type='primary'
          htmlType='submit'
          size='large'
          block
          className={styles.buttonSavePassword}
        >
          Сохранить
        </Button>
      </Form>
    </Card>
  )
}
