import { Button, Result, Typography } from 'antd';

import styles from './empty-trainings.module.scss'

const {Title} = Typography;

type EmptyTrainingsProps = {
  setIsSidebarOpen: (isSidebarOpen: boolean) => void,
}

export const EmptyTrainings: React.FC<EmptyTrainingsProps> = ({ setIsSidebarOpen }) => (
  <Result
    icon={null}
    className={styles.emptyContainer}
    title={<Title level={3} className={styles.title}>У вас ещё нет созданных тренировок</Title>}
    extra={[
      <Button
        key='buttonEmpty'
        onClick={() => setIsSidebarOpen(true)}
        type='primary'
        className={styles.buttonCreateTraining}
      >
        Создать тренировку
      </Button>
    ]}
  />
)

