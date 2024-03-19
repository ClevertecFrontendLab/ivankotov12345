import { Badge, Button, Drawer, Typography } from 'antd';
import { useState } from 'react';
import type { Moment } from 'moment';

import { TrainingSidebarItem } from '@components/training-sidebar-item';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { createTrainingSelect, setExercisesList } from '@redux/slices/create-training';
import { ExerciseType } from '@typing/types/exercise-types';
import { DRAWER_WIDTH_DESKTOP, DRAWER_WIDTH_MOBILE, EMPTY_EXERCISE, FORMAT_DATE_IN_VIEW, MOBILE_WIDTH } from '@constants/constants';
import { CloseOutlined, EditOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { CalendarBadgeColors } from '@typing/enums/calendar-badge-colors';

import styles from './calendar-training-sidebar.module.scss';
import { redactTrainingSelect } from '@redux/slices/redact-training';
import { useScreenWidth } from '@hooks/use-screen-width-hook';

type CalendarTrainingSidebarProps = {
  isCalendarSidebarOpen: boolean,
  setIsCalendarSidebarOpen: (isCalendarSidebarOpen: boolean) => void,
  selectedDate: Moment,
}

const { Title, Text } = Typography;

export const CalendarTrainingSidebar: React.FC<CalendarTrainingSidebarProps> = ({
  isCalendarSidebarOpen,
  setIsCalendarSidebarOpen,
  selectedDate,
}) => {
  const dispatch = useAppDispatch();
  const { exercises, selectedTraining } = useAppSelector(createTrainingSelect);
  const { isRedactingMode } = useAppSelector(redactTrainingSelect);
  const [exerciseItems, setExerciseItems] = useState<ExerciseType[]>(
    exercises.length === 0
    ? [EMPTY_EXERCISE]
    : [...exercises]);

  const date = selectedDate.format(FORMAT_DATE_IN_VIEW);

  const screenWidth = useScreenWidth()

  const drawerWidth = screenWidth && screenWidth > MOBILE_WIDTH
    ? DRAWER_WIDTH_DESKTOP
    : DRAWER_WIDTH_MOBILE;

  const addItem = () => setExerciseItems([...exerciseItems, EMPTY_EXERCISE]);

  const [checkedRemoveItems, setCheckedRemoveItems] = 
    useState<boolean[]>(new Array(exerciseItems.length).fill(false));

  const handleRemoveChange = (index: number, isRemoveChecked: boolean) => {
    setCheckedRemoveItems(checkedRemoveItems.map((item, i) => i === index ? isRemoveChecked : item));
  };

  const changeExercise = (index: number, changedExercise: ExerciseType) => {
    setExerciseItems(exerciseItems.map((item, i) => i === index ? changedExercise : item));
  };

  const onClose = () => {
    const exercisesNonEmpty = exerciseItems.filter((exercise) => exercise.name);
    dispatch(setExercisesList(exercisesNonEmpty));
    setIsCalendarSidebarOpen(false);
  };

  const removeCheckedItems = () => {
    setExerciseItems(exerciseItems.filter((_, index) => !checkedRemoveItems[index]));
    setCheckedRemoveItems(checkedRemoveItems.filter((_, index) => !checkedRemoveItems[index]));
  };
  return (
    <Drawer
      open={isCalendarSidebarOpen}
      mask={false}
      closable={true}
      headerStyle={{ display: 'none' }}
      width={drawerWidth}
      className={styles.trainingSidebar}
      data-test-id='modal-drawer-right'
    >
      <div className={styles.headerWrapper}>
        <Title
          editable={{
            icon: isRedactingMode
              ? <><EditOutlined className={styles.titleLogo} />Редактирование</>
              : <><PlusOutlined className={styles.titleLogo} />Добавление упражнений</>,
              tooltip: false,
          }}
          level={4}
          className={styles.title}
        />
        <Button
          icon={<CloseOutlined />}
          onClick={onClose}
          type='link'
          size='small'
          className={styles.buttonClose}
          data-test-id='modal-drawer-right-button-close'
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
            handleRemoveChange={handleRemoveChange}
          />
        ))}
      </ul>
      
      <div className={styles.buttonsWrapper}>
        <Button
          type='link'
          size='large'
          onClick={addItem}
          icon={<PlusOutlined/>}
          className={styles.addRemoveButton}
        >
          Добавить ещё
        </Button>
        {isRedactingMode &&
        <Button
          type='link'
          icon={<MinusOutlined />}
          onClick={removeCheckedItems}
          disabled={checkedRemoveItems.every(el => el === false)}
          className={styles.addRemoveButton}
        >
          Удалить
        </Button>}
      </div>
    </Drawer>
  )
}