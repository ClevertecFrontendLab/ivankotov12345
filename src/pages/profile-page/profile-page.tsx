import { useEffect, useState } from 'react';
import { InputEmail, InputPassword, UploadImage } from '@components/inputs';
import { FORMAT_DATE_IN_VIEW, FORMAT_DATE_PAYLOAD } from '@constants/constants';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { changeUserDataFetch } from '@redux/slices/change-user-data';
import { userSelect } from '@redux/slices/user';
import { PlaceholderText } from '@typing/enums/placeholder-text';
import { UserDataValues } from '@typing/types/form-input-values';
import { Button, DatePicker, Form, Input, Layout, Typography } from 'antd';
import { ValidateStatus } from 'antd/es/form/FormItem';
import { useForm } from 'antd/lib/form/Form';
import moment from 'moment';

import styles from './profile-page.module.scss';

const { Title } = Typography

export const ProfilePage: React.FC = () => {
  const [emailStatus, setEmailStatus] = useState<ValidateStatus>('');
  const [newPasswordStatus, setNewPasswordStatus] = useState<ValidateStatus>('');
  const [confirmNewPasswordStatus, setConfirmNewPasswordStatus] = useState<ValidateStatus>('');
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const { userData } = useAppSelector(userSelect);
  const dispatch = useAppDispatch();

  const isPasswordRequired = false;

  const [form] = useForm();

  useEffect(() => {
    if (imageSrc) {
      form.setFieldsValue({
        imgSrc: imageSrc,
      });
    }
  }, [imageSrc, form]);

  const onSubmit = (data: UserDataValues) => {
    const submittedData = data;
    
    if (submittedData.birthday) {
      submittedData.birthday = moment(submittedData.birthday).format(FORMAT_DATE_PAYLOAD);
    }
    dispatch(changeUserDataFetch(submittedData))
  };

  return (
    <Layout className={styles.layoutProfile}>

      <Form 
        form={form} 
        className={styles.form} 
        initialValues={{
          firstName: userData?.firstName,
          lastName: userData?.lastName,
          birthday: moment(userData?.birthday),
          email: userData?.email,
          imgSrc: userData?.imgSrc,
        }}
        onFinish={onSubmit}
      >
        <Title level={5}>Личная информация</Title>
        <div className={styles.formPersonalInfo}>
          <Form.Item name='imgSrc'>
            <UploadImage setImageSrc={setImageSrc} />
          </Form.Item>
          <div>
            <Form.Item name='firstName'>
              <Input
                placeholder={PlaceholderText.NAME}
                />
            </Form.Item>

            <Form.Item name='lastName'>
              <Input
                placeholder={PlaceholderText.LAST_NAME}
                />
            </Form.Item>

            <Form.Item name='birthday'>
              <DatePicker
                placeholder={PlaceholderText.DATE_OF_BIRTH}
                format={FORMAT_DATE_IN_VIEW}
                allowClear={false}
              />
            </Form.Item>
          </div>
        </div>

        <Title level={5}>Приватность и авторизация</Title>

        <div>
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
        >
          Сохранить изменения
        </Button>
      </Form>
    </Layout>
  )
}