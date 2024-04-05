import { useState } from 'react';
import { EmptyTrainings } from '@components/empty';
import { CreateTrainingSidebar } from '@components/sidebars';
import { PERIODS_MAP } from '@constants/constants';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { calendarSelect } from '@redux/slices/calendar';
import { CalendarBadgeColors } from '@typing/enums/calendar-badge-colors';
import { CalendarResponseItemType } from '@typing/types/response-types';
import { Badge, Layout, Select, Table, Typography } from 'antd';
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
  const { trainings } = useAppSelector(calendarSelect);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
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
      dataIndex: 'redacting',
      key: 'redacting',
    },
  ]
  
  return (
    <Layout>
      {trainings && trainings?.length > 0
        ? <Table
           columns={columns}
           dataSource={trainings}
          />
        : <EmptyTrainings setIsSidebarOpen={setIsSidebarOpen} />}

      {isSidebarOpen && <CreateTrainingSidebar
        setIsSidebarOpen={setIsSidebarOpen}
        isSidebarOpen={isSidebarOpen}
      />}
    </Layout>
  )
}
