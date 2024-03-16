import { Button, Drawer, Typography } from 'antd';
import { useState } from 'react';

import { TrainingSidebarItem } from '@components/training-sidebar-item';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { createTrainingSelect, setExercisesList } from '@redux/slices/create-training';
import { ExerciseType } from '@typing/types/exercise-types';
import { DRAWER_WIDTH_DESKTOP, EMPTY_EXERCISE } from '@constants/constants';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';

import styles from './calendar-training-sidebar.module.scss';

type PropsType = {
  isCalendarSidebarOpen: boolean,
  setIsCalendarSidebarOpen: (isCalendarSidebarOpen: boolean) => void
}

const { Title } = Typography;

export const CalendarTrainingSidebar: React.FC<PropsType> = ({
  isCalendarSidebarOpen,
  setIsCalendarSidebarOpen,
}) => {
  const dispatch = useAppDispatch();
  const { exercises } = useAppSelector(createTrainingSelect);
  const [exerciseItems, setExerciseItems] = useState<ExerciseType[]>(
    exercises.length === 0
    ? [EMPTY_EXERCISE]
    : [...exercises]);

  const addItem = () => setExerciseItems([...exerciseItems, EMPTY_EXERCISE]);

  const changeExercise = (index: number, changedExercise: ExerciseType) => {
    setExerciseItems(exerciseItems.map((item, i) => i === index ? changedExercise : item));
  }

  const onClose = () => {
    const exercisesNonEmpty = exerciseItems.filter((exercise) => exercise.name);
    dispatch(setExercisesList(exercisesNonEmpty));
    setIsCalendarSidebarOpen(false);
  }

  return (
    <Drawer
      open={isCalendarSidebarOpen}
      mask={false}
      headerStyle={{ display: 'none' }}
      width={DRAWER_WIDTH_DESKTOP}
    >
      <div>
        <Title level={4}><PlusOutlined /> Добавление упражнений</Title>
        <Button icon={<CloseOutlined />} onClick={onClose} />
      </div>
      
      {exerciseItems.map((exercise, index) => (
        <TrainingSidebarItem
          exercise={exercise}
          key={index}
          changeExercise={changeExercise}
          index={index}
        />
      ))}
      
      <Button
        onClick={addItem}
        icon={<PlusOutlined
      />}>Добавить ещё</Button>
    </Drawer>
  )
}