import { Fragment, useState } from 'react';
import { CloseOutlined, EditOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { TrainingSidebarItem } from '@components/training-sidebar-item';
import { EMPTY_EXERCISE, FORMAT_DATE_IN_VIEW, FORMAT_DATE_PAYLOAD } from '@constants/constants';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { createTrainingSelect, getCreateTrainingFetch, setSelectedTraining } from '@redux/slices/create-training';
import { redactTrainingSelect } from '@redux/slices/redact-training';
import { trainingListSelect } from '@redux/slices/training-list';
import { ExerciseType } from '@typing/types/exercise-types';
import { Button, Checkbox, DatePicker, Drawer, Select, Typography } from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';

import styles from './create-training-sidebar.module.scss'

type CreateTrainingSidebarProps = {
  isSidebarOpen: boolean,
  setIsSidebarOpen: (isSidebarOpen: boolean) => void,
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

const { Title } = Typography;

export const CreateTrainingSidebar: React.FC<CreateTrainingSidebarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const dispatch = useAppDispatch()

  const { trainingList } = useAppSelector(trainingListSelect);
  const { isRedactingMode } = useAppSelector(redactTrainingSelect);
  const { exercises, selectedTraining } = useAppSelector(createTrainingSelect);

  const [exerciseItems, setExerciseItems] = useState<ExerciseType[]>(
    exercises.length === 0
    ? [EMPTY_EXERCISE]
    : [...exercises]);
  const [isRepeatChecked, setIsRepeatChecked] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Moment>(() => moment());
  const [selectedPeriod, setSelectedPeriod] = useState<number | undefined>();
  const [checkedRemoveItems, setCheckedRemoveItems] = 
    useState<boolean[]>(new Array(exerciseItems.length).fill(false));

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

    if(selectedTraining && exercisesNonEmpty) {
      dispatch(getCreateTrainingFetch({
        name: selectedTraining,
        date: selectedDate.format(FORMAT_DATE_PAYLOAD),
        parameters: {
          repeat: isRepeatChecked,
          period: selectedPeriod,
        },
        exercises: exerciseItems
      }))
    }
  };

  return (
    <Drawer
      open={isSidebarOpen}
      headerStyle={{ display: 'none' }}
      className={styles.trainingSidebar}
      footer={[
        <Button
          block={true}
          size='large'
          type='primary'
          onClick={onButtonSave}
        >
          Сохранить
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
                  Новая тренировка
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
        />
      </div>

      <div className={styles.selectsWrapper}>
        <Select
          options={selectTrainingOptions}
          onChange={onSelectTraining}
          placeholder='Выбор типа тренировки'
        />

        <div className={styles.datePickWrapper}>
          <DatePicker
            format={FORMAT_DATE_IN_VIEW}
            onSelect={onDateChange}
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
            options={selectOptions}
            onChange={onSelectPeriod}
          />
        }
      </div>

      <ul>
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

      <div>
        <Button
          type='link'
          size='large'
          onClick={addItem}
          icon={<PlusOutlined/>}
        >
          Добавить ещё
        </Button>

        {isRedactingMode &&
        <Button
          type='link'
          icon={<MinusOutlined />}
          onClick={removeCheckedItems}
          disabled={checkedRemoveItems.every(el => el === false)}
        >
          Удалить
        </Button>}
      </div>
    </Drawer>
  )
}
