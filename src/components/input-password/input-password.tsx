import { Form, Input } from 'antd';
import { ValidateStatus } from 'antd/es/form/FormItem';

import styles from './input-password.module.scss';

type InputPasswordProps = {
  passwordValue?: string
  status: ValidateStatus,
  setStatus: (status: ValidateStatus) => void,
  placeholder: string,
  name: string,
  help?: string,
  testId: string,
}

export const InputPassword: React.FC<InputPasswordProps> = ({
  passwordValue,
  status,
  setStatus,
  placeholder,
  name,
  help,
  testId
}) => {
  const validatePassword = (password: string) => {
    const passwordRegExp = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    return passwordRegExp.test(password);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;

    if (validatePassword(password)) {
      setStatus('');
    } else {
      setStatus('error');
    }
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const confirmPassword = event.target.value;

    if (passwordValue === confirmPassword) {
      setStatus('');
    } else {
      setStatus('error');
    }
  };

  return (
    <Form.Item
      rules={[
        {
          required: true,
          message: ''
        },
      ]}
      name={name}
      help={status === 'error' && name === 'confirmPassword' ? 'Пароли не совпадают' : help}
      validateTrigger='onChange'
      validateStatus={status}
      className={styles.inputPassword}
      data-test-id={testId}
    >
      <Input.Password
        autoComplete='false'
        size='large'
        onChange={
          name === 'ConfirmPassword'
          ? handleConfirmPasswordChange
          : handlePasswordChange
        }
        placeholder={placeholder}
      />
    </Form.Item>
  )
}
