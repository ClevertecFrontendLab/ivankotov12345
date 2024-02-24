import { useEffect, useRef, useState } from 'react';
import { GooglePlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form } from 'antd';
import { ValidateStatus } from 'antd/es/form/FormItem';

import { InputEmail } from '@components/input-email';
import { InputPassword } from '@components/input-password';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { FormInputValues } from '@typing/types/form-input-values';
import { getAuthFetch } from '@redux/slices/auth';

import styles from './auth-page.module.scss';
import { getForgotPassFetch } from '@redux/slices/recovery';

export const AuthPage: React.FC = () => {
  const [emailStatus, setEmailStatus] = useState<ValidateStatus>('');
  const [passwordStatus, setPasswordStatus] = useState<ValidateStatus>('');
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [isForgotPassDispabled, setIsForgotPassDispabled] = useState<boolean>(true);

  const formRef = useRef(null);
  const [form] = Form.useForm();

  const onRememberCheckBox = () => {
    setIsChecked(!isChecked);
  }

  useEffect(() => {
    setIsFormValid(
      emailStatus === ''
      && passwordStatus === ''
      && form.isFieldsTouched(['email', 'password'], true)
    );
  }, [emailStatus, passwordStatus, form]);

  useEffect(() => {
    if(
      form.isFieldsTouched(['email'], true)
      && emailStatus === ''
      ) {
        setIsForgotPassDispabled(false);
      } else {
        setIsForgotPassDispabled(true);
      }
  }, [form, emailStatus]);

  const dispatch = useAppDispatch();

  const onSubmit = (data: FormInputValues) => {
    dispatch(getAuthFetch(data));
  }

  const onForgetPass = () => {
    const emailValue: string = form.getFieldValue('email');
    console.log(emailValue)
    dispatch(getForgotPassFetch({email: emailValue}))
  }
  return (
    <Form
      className={styles.form}
      form={form} ref={formRef}
      onFinish={onSubmit}
    >
      <InputEmail
        name='email'
        emailStatus={emailStatus}
        setEmailStatus={setEmailStatus}
      />
      <InputPassword
        name='password'
        status={passwordStatus}
        setStatus={setPasswordStatus}
        placeholder='Пароль'
      />

      <div className={styles.logInControls}>
        <Checkbox checked={isChecked} onChange={onRememberCheckBox}>Запомнить меня</Checkbox>
        <Button
          type='link'
          size='large'
          className={styles.buttonForgotPass}
          disabled={isForgotPassDispabled}
          onClick={onForgetPass}
        >
          Забыли пароль?
        </Button>
      </div>

      <div className={styles.buttonsWrapper}>
        <Button
          type='primary'
          htmlType='submit' 
          block disabled={!isFormValid}
          size='large'
          className={styles.buttonEnter}
        >
          Войти
        </Button>
        <Button
          icon={<GooglePlusOutlined />}
          block
          size='large'
        >
          Войти через Google
        </Button>
      </div>
    </Form>
  )
}
