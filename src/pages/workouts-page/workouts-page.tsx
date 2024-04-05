import { useEffect } from 'react';
import { JointTrainingsTab, MarathonsTab, MyTrainingsTab } from '@components/workouts-tab-items';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { getTrainingListFetch } from '@redux/slices/training-list';
import { Layout, Tabs } from 'antd';



export const WorkoutsPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const tabs = [
    {
      label: 'Мои тренировки',
      key: 'myTrainings',
      children: <MyTrainingsTab />
    },
    { 
      label: 'Совместные тренировки',
      key: 'jontTrainings',
      children: <JointTrainingsTab />
    },
    { 
      label: 'Марафоны',
      key: 'marathons',
      children: <MarathonsTab />
    },
  ]

  useEffect(() => {
    dispatch(getTrainingListFetch());
  }, [dispatch]);
  
  return (
    <Layout>
      <Tabs items={tabs} />
    </Layout>
  )
}
