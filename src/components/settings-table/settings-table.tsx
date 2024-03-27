import { CheckCircleFilled, CloseCircleOutlined } from '@ant-design/icons';
import { Table } from 'antd';

const columns = [
  {
    title: '',
    dataIndex: 'preferency',
    key: 'preferency',
  },
  {
    title: 'FREE',
    dataIndex: 'free',
    key: 'free',
  },
  {
    title: 'PRO',
    dataIndex: 'pro',
    key: 'pro',
  },
]

const data = [
  {
    key: '1',
    preferency: 'Статистика за месяц',
    free: <CheckCircleFilled />,
    pro: <CheckCircleFilled />,
  },
  {
    key: '2',
    preferency: 'Статистика за всё время',
    free: <CloseCircleOutlined />,
    pro: <CheckCircleFilled />,
  },
  {
    key: '3',
    preferency: 'Совместные тренировки',
    free: <CheckCircleFilled />,
    pro: <CheckCircleFilled />,
  },
  {
    key: '4',
    preferency: 'Участие в марафонах',
    free: <CloseCircleOutlined />,
    pro: <CheckCircleFilled />,
  },
  {
    key: '5',
    preferency: 'Приложение iOS',
    free: <CloseCircleOutlined />,
    pro: <CheckCircleFilled />,
  },
  {
    key: '6',
    preferency: 'Приложение Android',
    free: <CloseCircleOutlined />,
    pro: <CheckCircleFilled />,
  },
  {
    key: '7',
    preferency: 'Индивидуальный Chat GPT',
    free: <CloseCircleOutlined />,
    pro: <CheckCircleFilled />,
  },

]

export const SettingsTable: React.FC = () => (
  <Table
    columns={columns}
    dataSource={data}
    bordered={false}
    pagination={false}
    size='small'
  />
)

