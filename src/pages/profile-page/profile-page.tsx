import { Form, Layout, Upload } from 'antd';
import { useForm } from 'antd/lib/form/Form';

export const ProfilePage: React.FC = () => {
  const [form] = useForm();

  return (
    <Layout>
      <Form form={form}>
        <Form.Item>
          <Upload
            name='Загрузить изображение'
          />
        </Form.Item>
      </Form>
    </Layout>
  )
}