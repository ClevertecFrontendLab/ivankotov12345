import { useEffect, useState } from 'react';
import { GooglePlusOutlined } from '@ant-design/icons';
import { Button, Form } from 'antd';
import { ValidateStatus } from 'antd/es/form/FormItem';

import { InputEmail } from '@components/input-email';
import { InputPassword } from '@components/input-password';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { getRegistrationFetch, registrationSelect } from '@redux/slices/registration';
import { FormInputValues } from '@typing/types/form-input-values';

import styles from './register-page.module.scss';

export const RegisterPage: React.FC = () => {
  const [emailStatus, setEmailStatus] = useState<ValidateStatus>('');
  const [passwordStatus, setPasswordStatus] = useState<ValidateStatus>('');
  const [confirmPasswordStatus, setConfirmPasswordStatus] = useState<ValidateStatus>('');
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  const { message, submittedData } = useAppSelector(registrationSelect);

  const onSubmit = (data: FormInputValues) => {
    dispatch(getRegistrationFetch(data))
  }

  useEffect(() => {
    setIsFormValid(
      emailStatus === ''
      && passwordStatus === ''
      && confirmPasswordStatus === ''
      && form.isFieldsTouched(['email', 'password', 'confirmPassword'], true)
    );
  }, [emailStatus, passwordStatus, confirmPasswordStatus, form]);

  useEffect(() => {
    if(message && submittedData) {
      dispatch(getRegistrationFetch(submittedData));
    }
  })

  return (
    <Form form={form} onFinish={onSubmit} className={styles.form}>
      <div className={styles.inputsWrapper}>
        <InputEmail 
          name='email'
          emailStatus={emailStatus}
          setEmailStatus={setEmailStatus}
        />
        <InputPassword 
          status={passwordStatus} 
          setStatus={setPasswordStatus}
          placeholder='Пароль'
          name='password'
          help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
        />
        <InputPassword
          passwordValue={form.getFieldValue('password')}
          status={confirmPasswordStatus} 
          setStatus={setConfirmPasswordStatus}
          placeholder='Повторите пароль'
          name='confirmPassword'
        />
      </div>

      <div className={styles.buttonsWrapper}>
        <Button
          type='primary'
          htmlType='submit'
          block
          size='large'
          disabled={!isFormValid}
          className={styles.buttonRegister}
        >
          Вход
        </Button>
        <Button
          icon={<GooglePlusOutlined />}
          block
          size='large'
        >
          Регистрация через Google
        </Button>
      </div>
    </Form>
  )
}
