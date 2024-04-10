import { Fragment, useEffect, useState } from 'react';
import { CloseOutlined, EditOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { TrainingSidebarItem } from '@components/training-sidebar-item';
import {
  DRAWER_WIDTH_DESKTOP,
  DRAWER_WIDTH_MOBILE,
  EMPTY_EXERCISE,
  FORMAT_DATE_IN_VIEW,
  FORMAT_DATE_PAYLOAD,
  MOBILE_WIDTH
} from '@constants/constants';
import { localeRU } from '@constants/locale';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useScreenWidth } from '@hooks/use-screen-width-hook';
import {
  createTrainingSelect,
  getCreateTrainingFetch,
  setSelectedTraining
} from '@redux/slices/create-training';
import { getRedactTrainingFetch, redactTrainingSelect, removeIsRedactTrainingMode } from '@redux/slices/redact-training';
import { trainingListSelect } from '@redux/slices/training-list';
import { CalendarBadgeColors } from '@typing/enums/calendar-badge-colors';
import { ExerciseType } from '@typing/types/exercise-types';
import { CalendarResponseItemType } from '@typing/types/response-types';
import { UserJointTrainingsType } from '@typing/types/user-joint-trainings-types';
import { Avatar, Badge, Button, Checkbox, DatePicker, Drawer, Select, Typography } from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';

import styles from './workouts-training-sidebar.module.scss';

type CreateTrainingSidebarProps = {
  isSidebarOpen: boolean,
  setIsSidebarOpen: (isSidebarOpen: boolean) => void,
  selectedTraining?: CalendarResponseItemType | null,
  selectedUser?: UserJointTrainingsType,
}

const selectOptions = [
  {
    value: 1,
    label: 'Через 1 день',
  },
  {
    value: 2,
    label: 'Через 2 дня',
  },
  {
    value: 3,
    label: 'Через 3 дня',
  },
  {
    value: 4,
    label: 'Через 4 дня',
  },
  {
    value: 5,
    label: 'Через 5 дней',
  },
  {
    value: 6,
    label: 'Через 6 дней',
  },
  {
    value: 7,
    label: '1 раз в неделю',
  },
]

const { Title, Text } = Typography;

export const WorkoutsTrainingSidebar: React.FC<CreateTrainingSidebarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
  selectedTraining,
  selectedUser
}) => {
  const dispatch = useAppDispatch()

  const { trainingList } = useAppSelector(trainingListSelect);
  const { isRedactingMode } = useAppSelector(redactTrainingSelect);
  const { exercises, selectedTraining: selectedTrainingName } = useAppSelector(createTrainingSelect);
  const today = moment();

  const [exerciseItems, setExerciseItems] = useState<ExerciseType[]>(
    exercises.length === 0
    ? [EMPTY_EXERCISE]
    : [...exercises]);
  const [isRepeatChecked, setIsRepeatChecked] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Moment | null>(null);
  const [selectedPeriod, setSelectedPeriod] = 
    useState<number | undefined>(selectedTraining?.parameters.period);
  const [checkedRemoveItems, setCheckedRemoveItems] = 
    useState<boolean[]>(new Array(exerciseItems.length).fill(false));

    const screenWidth = useScreenWidth();

  const drawerWidth = screenWidth && screenWidth > MOBILE_WIDTH
    ? DRAWER_WIDTH_DESKTOP
    : DRAWER_WIDTH_MOBILE;

  const disabledDate = (currentDate: Moment | null): boolean =>
    currentDate ? currentDate.isSameOrBefore(moment(), 'day') : false;

  const drawerPlacement = screenWidth && screenWidth > MOBILE_WIDTH
    ? 'right'
    : 'bottom';

  useEffect(() => {
    if(selectedTraining?.parameters.repeat) {
      setIsRepeatChecked(selectedTraining.parameters.repeat);
    }
  }, [selectedTraining]);

  useEffect(() => {
    if(selectedTraining?.date) {
      setSelectedDate(moment(selectedTraining.date));
    }
  }, [selectedTraining]);

  useEffect(() => {
    if(selectedUser) {
      dispatch(setSelectedTraining(selectedUser.trainingType))
    }
  }, [dispatch, selectedUser])

  const selectTrainingOptions = trainingList && trainingList
  .map((training) => ({
      value: training.name,
      name: training.name
    })
  ) || [];

  const addItem = () => setExerciseItems([...exerciseItems, EMPTY_EXERCISE]);

  const changeExercise = (index: number, changedExercise: ExerciseType) => {
    setExerciseItems(exerciseItems.map((item, i) => i === index ? changedExercise : item));
  };

  const handleRemoveChange = (index: number, isRemoveChecked: boolean) => {
    setCheckedRemoveItems(checkedRemoveItems.map((item, i) => i === index ? isRemoveChecked : item));
  };

  const removeCheckedItems = () => {
    setExerciseItems(exerciseItems.filter((_, index) => !checkedRemoveItems[index]));
    setCheckedRemoveItems(checkedRemoveItems.filter((_, index) => !checkedRemoveItems[index]));
  };

  const onDateChange = (selectDate: Moment) => setSelectedDate(selectDate);
  const onSelectTraining = (value: string) => dispatch(setSelectedTraining(value));
  const togglePeriodChecked = () => setIsRepeatChecked(!isRepeatChecked);
  const onSelectPeriod = (value: number) => setSelectedPeriod(value);

  const onButtonSave = () => {
    const exercisesNonEmpty = exerciseItems.filter((exercise) => exercise.name);

    if(selectedTrainingName && exercisesNonEmpty && selectedDate) {
      dispatch(getCreateTrainingFetch({
        name: selectedTrainingName,
        date: selectedDate.format(FORMAT_DATE_PAYLOAD),
        parameters: {
          repeat: isRepeatChecked,
          period: selectedPeriod,
        },
        exercises: exerciseItems
      }))
    }

    setIsSidebarOpen(false);
  };


  const onButtonSaveRedact = () => {
    if(selectedTraining && exerciseItems && selectedDate) {
      dispatch(getRedactTrainingFetch({
        name: selectedTraining?.name,
        date: selectedDate.format(FORMAT_DATE_PAYLOAD),
        exercises: exerciseItems,
        isImplementation: selectedDate <= today,
      }))
    }

    setIsSidebarOpen(false);
  }

  const onButtonClose = () => {
    setIsSidebarOpen(false);
    dispatch(removeIsRedactTrainingMode());
  }

  return (
    <Drawer
      open={isSidebarOpen}
      headerStyle={{ display: 'none' }}
      mask={false}
      closable={true}
      className={styles.trainingSidebar}
      width={drawerWidth}
      placement={drawerPlacement}
      footer={[
        <Button
          key='workoutsDrawerButton'
          block={true}
          size='large'
          type='primary'
          className={styles.footerButton}
          onClick={isRedactingMode ? onButtonSaveRedact : onButtonSave}
        >
          {selectedUser
            ? 'Отправить приглашение'
            : 'Сохранить'}    
        </Button>
      ]}
    >
      <div className={styles.headerWrapper}>
        <Title
          editable={{
            icon: isRedactingMode
              ? <Fragment>
                  <EditOutlined /> Редактировать тренировку
                </Fragment>
              : <Fragment>
                  <PlusOutlined />
                  {selectedUser ? 'Совместная тренировка' : 'Новая тренировка'}
                </Fragment>,
              tooltip: false,
          }}
          level={4}
          className={styles.title}
        />
        <Button
          icon={<CloseOutlined />}
          type='link'
          size='small'
          className={styles.buttonClose}
          onClick={onButtonClose}
        />
      </div>

      <div className={styles.selectsWrapper}>
        {selectedUser 
          ? <div>
              <div>
              <Avatar src={selectedUser.imageSrc} />
              <Text>{selectedUser.name}</Text>
              </div>

              <Badge
                color={CalendarBadgeColors[selectedUser.trainingType as keyof typeof CalendarBadgeColors]}
                text={selectedTrainingName}
              />
            </div>

          : <Select
              options={selectTrainingOptions}
              onChange={onSelectTraining}
              placeholder='Выбор типа тренировки'
              value={selectedTraining?.name}
              disabled={isRedactingMode}
              className={styles.selectTraining}
            />}

        <div className={styles.datePickWrapper}>
          <DatePicker
            format={FORMAT_DATE_IN_VIEW}
            onSelect={onDateChange}
            value={selectedDate}
            className={styles.datePicker}
            locale={localeRU}
            disabled={isRedactingMode}
            disabledDate={disabledDate}
          />
          <Checkbox
            checked={isRepeatChecked}
            onChange={togglePeriodChecked}
          >
            С периодичностью
          </Checkbox>
        </div>

        {isRepeatChecked &&
          <Select
            placeholder='Периодичность'
            options={selectOptions}
            onChange={onSelectPeriod}
            value={selectedPeriod}
          />
        }
      </div>

      <ul className={styles.exercisesList}>
        {exerciseItems.map((exercise, index) => (
          <TrainingSidebarItem
            exercise={exercise}
            key={`${exercise}`}
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
          {isRedactingMode
            ? 'Добавить ещё'
            : 'Добавить ещё упражнение'}
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
