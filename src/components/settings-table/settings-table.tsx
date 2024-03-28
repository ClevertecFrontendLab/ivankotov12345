import { CheckCircleFilled, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { userSelect } from '@redux/slices/user';
import { Table, Typography } from 'antd';

import styles from './settings-table.module.scss';

const { Text } = Typography;



const data = [
  {
    key: '1',
    preferency: 'Статистика за месяц',
    free: <CheckCircleFilled className={styles.item} />,
    pro: <CheckCircleFilled className={styles.item} />,
  },
  {
    key: '2',
    preferency: 'Статистика за всё время',
    free: <CloseCircleOutlined className={styles.item_unavailable} />,
    pro: <CheckCircleFilled className={styles.item} />,
  },
  {
    key: '3',
    preferency: 'Совместные тренировки',
    free: <CheckCircleFilled className={styles.item} />,
    pro: <CheckCircleFilled className={styles.item} />,
  },
  {
    key: '4',
    preferency: 'Участие в марафонах',
    free: <CloseCircleOutlined className={styles.item_unavailable} />,
    pro: <CheckCircleFilled className={styles.item} />,
  },
  {
    key: '5',
    preferency: 'Приложение iOS',
    free: <CloseCircleOutlined className={styles.item_unavailable} />,
    pro: <CheckCircleFilled className={styles.item} />,
  },
  {
    key: '6',
    preferency: 'Приложение Android',
    free: <CloseCircleOutlined className={styles.item_unavailable} />,
    pro: <CheckCircleFilled className={styles.item} />,
  },
  {
    key: '7',
    preferency: 'Индивидуальный Chat GPT',
    free: <CloseCircleOutlined className={styles.item_unavailable} />,
    pro: <CheckCircleFilled className={styles.item} />,
  },

]

export const SettingsTable: React.FC = () => {
  const { userData } = useAppSelector(userSelect);

  const columns = [
    {
      title: '',
      dataIndex: 'preferency',
      key: 'preferency',
    },
    {
      title: <Text className={styles.text}>FREE</Text>,
      dataIndex: 'free',
      key: 'free',
    },
    {
      title: <Text
               className={styles.textPro}
               editable={
                 userData?.tariff && {
                  icon: <CheckCircleOutlined className={styles.logo} />,
                  tooltip: false,
                 }
               }
             >
              PRO
             </Text>,
      dataIndex: 'pro',
      key: 'pro',
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      bordered={false}
      pagination={false}
      size='small'
      className={styles.table}
    />
  )
}
