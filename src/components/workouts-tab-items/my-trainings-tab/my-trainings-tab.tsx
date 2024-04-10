import { Fragment, useState } from 'react';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { EmptyTrainings } from '@components/empty';
import { WorkoutsTrainingSidebar } from '@components/sidebars';
import { WorkoutsPopover } from '@components/workouts-popover';
import { PERIODS_MAP } from '@constants/constants';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { calendarSelect } from '@redux/slices/calendar';
import { setExercisesList } from '@redux/slices/create-training';
import { setIsRedactingMode, setSelectedTrainingId } from '@redux/slices/redact-training';
import { CalendarBadgeColors } from '@typing/enums/calendar-badge-colors';
import { CalendarResponseItemType } from '@typing/types/response-types';
import { Badge, Button, Layout, Select, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import styles from './my-trainings-tab.module.scss'

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

  const paginationShown = trainings && trainings.length > 10;
  
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
      title: <Text className={styles.titleType}>Тип тренировки</Text>,
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: CalendarResponseItemType) => (
        <div className={styles.workout}>
          <Badge
            color={CalendarBadgeColors[name as keyof typeof CalendarBadgeColors]}
            text={name}
          />

          <WorkoutsPopover
            calendarItem={record}
            onRedactTraining={onRedactTraining}
          />
        </div>
      )
    },
    {
      title: <Select
                options={selectOptions}
                defaultValue='Сортировка по периоду'
                className={styles.select}
              />,
      dataIndex: 'parameters',
      key: 'parameters',
      render: ({ period }) => (
        <Text>{PERIODS_MAP.get(period)}</Text>
      ),
      sorter: (a, b) => {
        const periodA = a.parameters?.period || 0;
        const periodB = b.parameters?.period || 0;
        
        return periodA - periodB;
      }
    },
    {
      title: '',
      dataIndex: '_id',
      key: 'redacting',
      render: (_id) => (
        <Button
          className={styles.buttonEdit}
          size='large'
          icon={<EditOutlined className={styles.logo} />}
          type='text'
          onClick={() => onRedactTraining(_id)}
        />
      )
    },
  ]
  
  return (
    <Layout className={styles.trainingsTabWrapper}>
      {trainings && trainings?.length > 0
        ? <Fragment>
          <Table
            className={styles.table}
            columns={columns}
            dataSource={trainings}
            rowKey={(item) => item._id}
            size='small'
            pagination={paginationShown
              ? {
              pageSize: 10,
              position: ['bottomLeft']
            }
            : false
          }
          />
          <div>
            <Button
              icon={<PlusOutlined />}
              type='primary'
              size='large'
              block={false}
              onClick={() => setIsSidebarOpen(true)}
              className={styles.buttonNewTraining}
            >
              Новая тренировка
            </Button>
          </div>
          </Fragment>
        : <EmptyTrainings setIsSidebarOpen={setIsSidebarOpen} />}

      {isSidebarOpen && <WorkoutsTrainingSidebar
        setIsSidebarOpen={setIsSidebarOpen}
        isSidebarOpen={isSidebarOpen}
        selectedTraining={selectedTraining}
      />}
    </Layout>
  )
}
