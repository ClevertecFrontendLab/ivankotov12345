import { Form, Input } from 'antd';
import { ValidateStatus } from 'antd/es/form/FormItem';

import styles from './input-email.module.scss';

type PropsType = {
  name: string,
  emailStatus: ValidateStatus,
  setEmailStatus: (emailStatus: ValidateStatus) => void,
  testId: string,
  setIsForgotPassDispabled?: (isForgotPassDispabled: boolean) => void,
};

export const InputEmail: React.FC<PropsType> = ({
  name,
  emailStatus,
  setEmailStatus,
  testId,
  setIsForgotPassDispabled,
 }) => {
  const emailRegExp = /^([a-zA-Z0-9._]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,6})+$/;
  
  const validateEmail = (email: string) =>  emailRegExp.test(email.toLocaleLowerCase());

  const handleInpuntChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    if(validateEmail(email)) {
      setEmailStatus('');
      setIsForgotPassDispabled && setIsForgotPassDispabled(false);
    } else {
      setEmailStatus('error');
    }
  };
  return (
    <Form.Item
      name={name}
      rules={[
        {
          required: true,
          message: '',
        },
        {
          pattern: emailRegExp,
          message: ''
        }
      ]}
      validateTrigger='onChange'
      validateStatus={emailStatus}
      data-test-id={testId}
    >
      <Input
        autoComplete='false'
        size='large'
        addonBefore='email:'
        onChange={handleInpuntChange}
        className={styles.inputEmail}
      />
    </Form.Item>
  )
}
