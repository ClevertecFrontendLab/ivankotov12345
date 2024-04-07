import { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { EmptyTrainings } from '@components/empty';
import { CreateTrainingSidebar } from '@components/sidebars';
import { PERIODS_MAP } from '@constants/constants';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { calendarSelect } from '@redux/slices/calendar';
import { setExercisesList } from '@redux/slices/create-training';
import { setIsRedactingMode, setSelectedTrainingId } from '@redux/slices/redact-training';
import { CalendarBadgeColors } from '@typing/enums/calendar-badge-colors';
import { CalendarResponseItemType } from '@typing/types/response-types';
import { Badge, Button, Layout, Select, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';

const selectOptions = [
  {
    value: 'Сортировка по периоду',
    key: 'period'
  },
  {
    value: 'Сортировка по дате',
    key: 'date'
  },
  {
    value: 'Сортировка по дням',
    key: 'days'
  },
  {
    value: 'Сортировка по всему',
    key: 'all'
  },
]

const { Text } = Typography;

export const MyTrainingsTab: React.FC = () => {
  const dispatch = useAppDispatch()
  const { trainings } = useAppSelector(calendarSelect);
  

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState<CalendarResponseItemType | null>(null);

  const onRedactTraining = (id: string) => {
    dispatch(setSelectedTrainingId(id));
    const currTraining = trainings && trainings.find(training => training._id === id);

    if(currTraining) {
      setSelectedTraining(currTraining);
      const currExercises = currTraining.exercises;

      dispatch(setExercisesList(currExercises))
    };

    dispatch(setIsRedactingMode());
    setIsSidebarOpen(true);
  }

  const columns: ColumnsType<CalendarResponseItemType> = [
    {
      title: 'Тип тренировки',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => (
        <Badge
          color={CalendarBadgeColors[name as keyof typeof CalendarBadgeColors]}
          text={name}
        />
      )
    },
    {
      title: <Select options={selectOptions} defaultValue='Сортировка по периоду' />,
      dataIndex: 'parameters',
      key: 'parameters',
      render: ({ period }) => (
        <Text>{PERIODS_MAP.get(period)}</Text>
      ),
      sorter: (periodA, periodB) => +periodA - +periodB
    },
    {
      title: '',
      dataIndex: '_id',
      key: 'redacting',
      render: (_id) => (
        <Button
          icon={<EditOutlined />}
          type='text'
          onClick={() => onRedactTraining(_id)}
        />
      )
    },
  ]
  
  return (
    <Layout>
      {trainings && trainings?.length > 0
        ? <Table
           columns={columns}
           dataSource={trainings}
           rowKey={(item) => item._id}
          />
        : <EmptyTrainings setIsSidebarOpen={setIsSidebarOpen} />}

      {isSidebarOpen && <CreateTrainingSidebar
        setIsSidebarOpen={setIsSidebarOpen}
        isSidebarOpen={isSidebarOpen}
        selectedTraining={selectedTraining}
      />}
    </Layout>
  )
}
