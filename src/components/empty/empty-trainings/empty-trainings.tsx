import { Button, Typography } from 'antd'

const { Title } = Typography;

type EmptyTrainingsProps = {
  setIsSidebarOpen: (isSidebarOpen: boolean) => void,
}

export const EmptyTrainings: React.FC<EmptyTrainingsProps> = ({ setIsSidebarOpen }) => (
  <div>
    <Title level={2}>У вас ещё нет созданных тренировок</Title>
    <Button onClick={() => setIsSidebarOpen(true)}>Создать тренировку</Button>
  </div>
)

