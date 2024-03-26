import { useEffect, useState } from 'react';
import { GooglePlusOutlined } from '@ant-design/icons';
import { InputEmail } from '@components/inputs/input-email';
import { InputPassword } from '@components/inputs/input-password';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { getRegistrationFetch, registrationSelect } from '@redux/slices/registration';
import { PlaceholderText } from '@typing/enums/placeholder-text';
import { FormInputValues } from '@typing/types/form-input-values';
import { Button, Form } from 'antd';
import { ValidateStatus } from 'antd/es/form/FormItem';

import styles from './register-page.module.scss';

export const RegisterPage: React.FC = () => {
  const [emailStatus, setEmailStatus] = useState<ValidateStatus>('');
  const [passwordStatus, setPasswordStatus] = useState<ValidateStatus>('');
  const [confirmPasswordStatus, setConfirmPasswordStatus] = useState<ValidateStatus>('');
  const [isFormValid, setIsFormValid] = useState(false);
  const testIdEmail = 'registration-email';
  const testIdPassword = 'registration-password';
  const testIdConfirmPassword = 'registration-confirm-password';
  const isPasswordRequired = true;


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
  }, [dispatch, message, submittedData]);

  return (
    <Form form={form} onFinish={onSubmit} className={styles.form}>
      <div className={styles.inputsWrapper}>
        <InputEmail 
          name='email'
          emailStatus={emailStatus}
          setEmailStatus={setEmailStatus}
          testId={testIdEmail}
        />
        <InputPassword 
          status={passwordStatus} 
          setStatus={setPasswordStatus}
          placeholder={PlaceholderText.PASSWORD}
          name='password'
          help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
          testId={testIdPassword}
          isPasswordRequired={isPasswordRequired}
        />
        <InputPassword
          passwordValue={form.getFieldValue('password')}
          status={confirmPasswordStatus} 
          setStatus={setConfirmPasswordStatus}
          placeholder={PlaceholderText.CONFIRM_PASSWORD}
          name='confirmPassword'
          testId={testIdConfirmPassword}
          isPasswordRequired={isPasswordRequired}
        />
      </div>

      <div className={styles.buttonsWrapper}>
        <Button
          type='primary'
          htmlType='submit'
          block={true}
          size='large'
          disabled={!isFormValid}
          className={styles.buttonRegister}
          data-test-id='registration-submit-button'
        >
          Вход
        </Button>
        <Button
          icon={<GooglePlusOutlined />}
          block={true}
          size='large'
        >
          Регистрация через Google
        </Button>
      </div>
    </Form>
  )
}
