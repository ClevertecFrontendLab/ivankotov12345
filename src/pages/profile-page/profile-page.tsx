import { useEffect, useState } from 'react';
import { InputEmail, InputPassword, UploadImage } from '@components/inputs';
import { SubmitDataResult } from '@components/submit-data-result-modal';
import { FORMAT_DATE_IN_VIEW, FORMAT_DATE_PAYLOAD } from '@constants/constants';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { changeUserDataFetch, changeUserDataSelect } from '@redux/slices/change-user-data';
import { userSelect } from '@redux/slices/user';
import { PlaceholderText } from '@typing/enums/placeholder-text';
import { UserDataValues } from '@typing/types/form-input-values';
import { Alert, Button, DatePicker, Form, Input, Layout, Typography } from 'antd';
import { ValidateStatus } from 'antd/es/form/FormItem';
import { useForm } from 'antd/lib/form/Form';
import moment from 'moment' ;

import styles from './profile-page.module.scss';

const { Title } = Typography

export const ProfilePage: React.FC = () => {
  const [emailStatus, setEmailStatus] = useState<ValidateStatus>('');
  const [newPasswordStatus, setNewPasswordStatus] = useState<ValidateStatus>('');
  const [confirmNewPasswordStatus, setConfirmNewPasswordStatus] = useState<ValidateStatus>('');
  const [isButtonSubmitDisabled, setIsButtonSubmitDisabled] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const { userData } = useAppSelector(userSelect);
  const { isError, isSuccess } = useAppSelector(changeUserDataSelect);
  const dispatch = useAppDispatch();
  const isPasswordRequired = false

  useEffect(() => {
    if(isError) {
      setIsModalOpen(true)
    }
  }, [isError])

  const [form] = useForm();

  const onChange = () => {
    if(form.isFieldsTouched()) {
      setIsButtonSubmitDisabled(false);
    }
    if(form.getFieldValue('password') !== form.getFieldValue('confirm password')) {
      setIsButtonSubmitDisabled(true);
    }
    if(
      emailStatus === 'error'
        || newPasswordStatus === 'error'
        || confirmNewPasswordStatus === 'error'
      ) {
      setIsButtonSubmitDisabled(true);
    }
  }

  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        birthday: userData.birthday ? moment(userData?.birthday) : '',
        email: userData?.email,
        imgSrc: userData?.imgSrc,
      });
    }
    if (imageSrc) {
      form.setFieldsValue({
        imgSrc: imageSrc,
      });
    }
  }, [userData, imageSrc, form]);

  const onSubmit = (data: UserDataValues) => {
    const submittedData = data;
    
    if (submittedData.birthday) {
      submittedData.birthday = moment(submittedData.birthday).format(FORMAT_DATE_PAYLOAD);
    }
    dispatch(changeUserDataFetch(submittedData));
    setIsButtonSubmitDisabled(true);
  };

  return (
    <Layout className={styles.layoutProfile}>

      <Form 
        form={form} 
        className={styles.form} 
        onFieldsChange={onChange}
        onFinish={onSubmit}
      >
        <Title level={5} className={styles.title}>Личная информация</Title>
        <div className={styles.formPersonalInfo}>
          <Form.Item name='imgSrc'>
            <UploadImage setImageSrc={setImageSrc}/>
          </Form.Item>
          <div className={styles.inputsWrapper}>
            <Form.Item name='firstName'>
              <Input
                placeholder={PlaceholderText.NAME}
                className={styles.inputItem}
              />
            </Form.Item>

            <Form.Item name='lastName'>
              <Input
                placeholder={PlaceholderText.LAST_NAME}
                className={styles.inputItem}
                />
            </Form.Item>

            <Form.Item name='birthday'>
              <DatePicker
                placeholder={PlaceholderText.DATE_OF_BIRTH}
                format={FORMAT_DATE_IN_VIEW}
                allowClear={false}
                className={styles.inputItem}
              />
            </Form.Item>
          </div>
        </div>

        <Title
          level={5}
          className={styles.title}
        >
          Приватность и авторизация
        </Title>

        <div className={styles.inputsWrapperAuth}>
          <InputEmail
            name='email'
            emailStatus={emailStatus}
            setEmailStatus={setEmailStatus}
          />
          <InputPassword
            name='password'
            status={newPasswordStatus}
            setStatus={setNewPasswordStatus}
            placeholder={PlaceholderText.PASSWORD}
            isPasswordRequired={isPasswordRequired}
            help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
          />
          <InputPassword
            name='confirm password'
            status={confirmNewPasswordStatus}
            setStatus={setConfirmNewPasswordStatus}
            placeholder={PlaceholderText.CONFIRM_PASSWORD}
            isPasswordRequired={isPasswordRequired}
          />
        </div>

        <Button
          type='primary'
          htmlType='submit'
          size='large'
          className={styles.button}
          disabled={isButtonSubmitDisabled}
        >
          Сохранить изменения
        </Button>
      </Form>

      {isModalOpen && <SubmitDataResult setIsModalOpen={setIsModalOpen} />}
      {isSuccess &&
        <Alert
          type='success'
          message='Данные профиля успешно обновлены'
          showIcon={true}
          closable={true}
        />}
    </Layout>
  )
}