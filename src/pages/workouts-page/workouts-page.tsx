import { useEffect } from 'react';
import { JointTrainingsTab, MarathonsTab, MyTrainingsTab } from '@components/workouts-tab-items';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { inviteSelect } from '@redux/slices/invite';
import { getTrainingListFetch } from '@redux/slices/training-list';
import { Badge, Layout, Tabs, Typography } from 'antd';

import 'antd/dist/antd.css';
import styles from './workouts-page.module.scss';

const { Text } = Typography;

export const WorkoutsPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const { responseData } = useAppSelector(inviteSelect);

  const invitesQuantity = responseData.length;

  const tabs = [
    {
      label: 'Мои тренировки',
      key: 'myTrainings',
      children: <MyTrainingsTab />
    },
    { 
      label:
        <Text editable={{
          icon: <Badge count={invitesQuantity} className={styles.badge} />,
          tooltip: false,
        }}>
          Совместные тренировки
        </Text>,
      key: 'jontTrainings',
      children: <JointTrainingsTab />
    },
    { 
      label: 'Марафоны',
      key: 'marathons',
      children: <MarathonsTab />
    },
  ];

  useEffect(() => {
    dispatch(getTrainingListFetch());
  }, [dispatch]);
  
  return (
    <Layout className={styles.layoutWorkouts}>
      <Tabs items={tabs} />
    </Layout>
  )
}
