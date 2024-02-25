import { useEffect, useRef, useState } from 'react';
import { GooglePlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form } from 'antd';
import { ValidateStatus } from 'antd/es/form/FormItem';

import { InputEmail } from '@components/input-email';
import { InputPassword } from '@components/input-password';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { FormInputValues } from '@typing/types/form-input-values';
import { getAuthFetch } from '@redux/slices/auth';
import { getForgotPassFetch, recoverySelect } from '@redux/slices/recovery';
import { useScreenWidth } from '@hooks/use-screen-width-hook';

import styles from './auth-page.module.scss';


export const AuthPage: React.FC = () => {
  const [emailStatus, setEmailStatus] = useState<ValidateStatus>('');
  const [passwordStatus, setPasswordStatus] = useState<ValidateStatus>('');
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [isForgotPassDispabled, setIsForgotPassDispabled] = useState<boolean>(true);

  const screenWidth = useScreenWidth()

  const formRef = useRef(null);
  const [form] = Form.useForm();

  const { submittedEmail } = useAppSelector(recoverySelect)

  const onRememberCheckBox = () => {
    setIsChecked(!isChecked);
  }

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

  const onFinishFailed = () => {
    setEmailStatus('error');
    setPasswordStatus('error');
  }

  const onForgetPass = () => {
    const emailValue: string = form.getFieldValue('email');
    dispatch(getForgotPassFetch({email: emailValue}));
  }

  useEffect(() => {
    if(submittedEmail) {
      dispatch(getForgotPassFetch(submittedEmail));
    }
  })
  return (
    <>
    <Form
      className={styles.form}
      form={form} ref={formRef}
      onFinish={onSubmit}
      onFinishFailed={onFinishFailed}
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
          size={screenWidth && screenWidth > 675 ? 'large' : 'middle'}
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
          block
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
    </>
  )
}
