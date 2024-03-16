import { Badge, Button, Drawer, Typography } from 'antd';
import { useState } from 'react';
import type { Moment } from 'moment';

import { TrainingSidebarItem } from '@components/training-sidebar-item';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { createTrainingSelect, setExercisesList } from '@redux/slices/create-training';
import { ExerciseType } from '@typing/types/exercise-types';
import { DRAWER_WIDTH_DESKTOP, EMPTY_EXERCISE } from '@constants/constants';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { CalendarBadgeColors } from '@typing/enums/calendar-badge-colors';

import styles from './calendar-training-sidebar.module.scss';

type PropsType = {
  isCalendarSidebarOpen: boolean,
  setIsCalendarSidebarOpen: (isCalendarSidebarOpen: boolean) => void,
  selectedDate: Moment,
}

const { Title, Text } = Typography;

export const CalendarTrainingSidebar: React.FC<PropsType> = ({
  isCalendarSidebarOpen,
  setIsCalendarSidebarOpen,
  selectedDate,
}) => {
  const dispatch = useAppDispatch();
  const { exercises, selectedTraining } = useAppSelector(createTrainingSelect);
  const [exerciseItems, setExerciseItems] = useState<ExerciseType[]>(
    exercises.length === 0
    ? [EMPTY_EXERCISE]
    : [...exercises]);

  const date = selectedDate.format('DD.MM.YYYY');

  const addItem = () => setExerciseItems([...exerciseItems, EMPTY_EXERCISE]);

  const changeExercise = (index: number, changedExercise: ExerciseType) => {
    setExerciseItems(exerciseItems.map((item, i) => i === index ? changedExercise : item));
  };

  const onClose = () => {
    const exercisesNonEmpty = exerciseItems.filter((exercise) => exercise.name);
    dispatch(setExercisesList(exercisesNonEmpty));
    setIsCalendarSidebarOpen(false);
  };

  return (
    <Drawer
      open={isCalendarSidebarOpen}
      mask={false}
      headerStyle={{ display: 'none' }}
      width={DRAWER_WIDTH_DESKTOP}
      className={styles.trainingSidebar}
    >
      <div className={styles.headerWrapper}>
        <Title level={4} className={styles.title}>
          <PlusOutlined className={styles.titleLogo} />Добавление упражнений
        </Title>
        <Button
          icon={<CloseOutlined />}
          onClick={onClose}
          type='link'
          size='small'
          className={styles.buttonClose}
        />
      </div>

      <div className={styles.selectedTrainingWrapper}>
        <Badge
          color={CalendarBadgeColors[selectedTraining as keyof typeof CalendarBadgeColors]}
          text={selectedTraining}
          className={styles.badge}
        />

        <Text type='secondary' className={styles.date}>{date}</Text>
      </div>

      <ul className={styles.exercisesList}>
        {exerciseItems.map((exercise, index) => (
          <TrainingSidebarItem
            exercise={exercise}
            key={index}
            changeExercise={changeExercise}
            index={index}
          />
        ))}
      </ul>
      
      <div className={styles.buttonsWrapper}>
        <Button
          type='link'
          size='large'
          onClick={addItem}
          icon={<PlusOutlined
        />}>
          Добавить ещё
        </Button>
      </div>
    </Drawer>
  )
}