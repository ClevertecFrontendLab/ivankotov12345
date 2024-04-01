import { JointTrainingsTab, MarathonsTab, MyTrainingsTab } from '@components/workouts-tab-items'
import { useAppDispatch } from '@hooks/typed-react-redux-hooks'
import { getTrainingListFetch } from '@redux/slices/training-list'
import { Layout, Tabs } from 'antd'
import { useEffect } from 'react'

const tabs = [
  {
    label: 'Мои тренировки',
    key: 'item-1',
    children: <MyTrainingsTab />
  },
  { 
    label: 'Совместные тренировки',
    key: 'item-2',
    children: <JointTrainingsTab />
  },
  { 
    label: 'Марафоны',
    key: 'item-3',
    children: <MarathonsTab />
  },
]

export const WorkoutsPage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTrainingListFetch());
  }, [dispatch]);
  
  return (
    <Layout>
      <Tabs items={tabs} />
    </Layout>
  )
}
