import { useEffect, useRef, useState } from 'react';
import { GooglePlusOutlined } from '@ant-design/icons';
import { InputEmail } from '@components/input-email';
import { InputPassword } from '@components/input-password';
import { MOBILE_WIDTH } from '@constants/constants';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useScreenWidth } from '@hooks/use-screen-width-hook';
import { getAuthFetch, getAuthGoogleFetch, toggleRememberMe } from '@redux/slices/auth';
import { getForgotPassFetch, recoverySelect } from '@redux/slices/recovery';
import { FormInputValues } from '@typing/types/form-input-values';
import { Button, Checkbox, Form } from 'antd';
import { ValidateStatus } from 'antd/es/form/FormItem';

import styles from './auth-page.module.scss';

export const AuthPage: React.FC = () => {
  const [emailStatus, setEmailStatus] = useState<ValidateStatus>('');
  const [passwordStatus, setPasswordStatus] = useState<ValidateStatus>('');
  const [isChecked, setIsChecked] = useState(false);
  const [isForgotPassDispabled, setIsForgotPassDispabled] = useState(false);

  const screenWidth = useScreenWidth();

  const testIdEmail = 'login-email';
  const testIdPassword = 'login-password';

  const formRef = useRef(null);
  const [form] = Form.useForm();

  const { submittedEmail } = useAppSelector(recoverySelect)

  const dispatch = useAppDispatch();

  const onSubmit = (data: FormInputValues) => {
    if(emailStatus === 'error' || passwordStatus === 'error') {
      return;
    }
    dispatch(getAuthFetch(data));
  };

  const onRememberCheckBox = () => {
    const currentCheck = !isChecked;

    setIsChecked(currentCheck);
    dispatch(toggleRememberMe(currentCheck));
  };

  const onGoogleAuthClick = () => {
    dispatch(getAuthGoogleFetch());
  };

  const onForgetPass = () => {
    const email: string = form.getFieldValue('email');

    if (email === null || !form.isFieldTouched('email')) {
      setEmailStatus('error');
      setIsForgotPassDispabled(true);

      return;
    }
    const emailValue: string = form.getFieldValue('email');

    dispatch(getForgotPassFetch({email: emailValue}));
  };

  useEffect(() => {
    if(submittedEmail) {
      dispatch(getForgotPassFetch(submittedEmail));
    }
  }, [dispatch, submittedEmail]);

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
        testId={testIdEmail}
        setIsForgotPassDispabled={setIsForgotPassDispabled}
      />
      <InputPassword
        name='password'
        status={passwordStatus}
        setStatus={setPasswordStatus}
        placeholder='Пароль'
        testId={testIdPassword}
      />

      <div className={styles.logInControls}>
        <Checkbox
          checked={isChecked}
          onChange={onRememberCheckBox}
          data-test-id='login-remember'
        >
          Запомнить меня
        </Checkbox>
        <Button
          type='link'
          size={screenWidth && screenWidth > MOBILE_WIDTH ? 'large' : 'middle'}
          className={styles.buttonForgotPass}
          disabled={isForgotPassDispabled}
          onClick={onForgetPass}
          data-test-id='login-forgot-button'
        >
          Забыли пароль?
        </Button>
      </div>

      <div className={styles.buttonsWrapper}>
        <Button
          type='primary'
          htmlType='submit' 
          block={true}
          size='large'
          className={styles.buttonEnter}
          data-test-id='login-submit-button'
        >
          Войти
        </Button>
        <Button
          icon={<GooglePlusOutlined />}
          block={true}
          size='large'
          onClick={onGoogleAuthClick}
        >
          Войти через Google
        </Button>
      </div>
    </Form>
  )
}
