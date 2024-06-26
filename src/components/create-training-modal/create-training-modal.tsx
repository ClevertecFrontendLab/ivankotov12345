import { useEffect, useState } from 'react';
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import { FORMAT_DATE_PAYLOAD, MOBILE_WIDTH } from '@constants/constants';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useScreenWidth } from '@hooks/use-screen-width-hook';
import { calendarSelect } from '@redux/slices/calendar';
import {
  clearExercisesList,
  closeCreateTrainingModal,
  createTrainingSelect,
  getCreateTrainingFetch,
  setExercisesList,
  setSelectedTraining
} from '@redux/slices/create-training';
import {
  getRedactTrainingFetch,
  redactTrainingSelect,
  removeIsRedactTrainingMode,
} from '@redux/slices/redact-training';
import { trainingListSelect } from '@redux/slices/training-list';
import { ModalCoords } from '@typing/types/modal-coords';
import { Button, Card, Divider, Empty, Select, Typography } from 'antd';
import classNames from 'classnames';
import type { Moment } from 'moment';
import moment from 'moment';

import styles from './create-training-modal.module.scss';


type CreateTrainingModalProps = {
  setIsModalOpen: (isModalOpen: boolean) => void,
  modalCoords: ModalCoords,
  setIsCalendarSidebarOpen: (isCalendarSidebarOpen: boolean) => void,
  selectedDate: Moment,
}

const { Text } = Typography;

export const CreateTrainingModal: React.FC<CreateTrainingModalProps> = ({
  setIsModalOpen,
  modalCoords,
  setIsCalendarSidebarOpen,
  selectedDate,
}) => {
  const today = moment();
  const isFuture = selectedDate > today;

  const [edititngDisable, setEditingDisable] = useState(false);
  
  const dispatch = useAppDispatch();
  const { trainingList } = useAppSelector(trainingListSelect);
  const {
    exercises,
    selectedTraining,
    isLoading,
    isModalTrainingsOpen
  } = useAppSelector(createTrainingSelect);

  const screenWidth = useScreenWidth();
  const isDesktop = screenWidth && screenWidth > MOBILE_WIDTH;
  
  const { trainings } = useAppSelector(calendarSelect);
  const { isRedactingMode } = useAppSelector(redactTrainingSelect);

  const currentDateTrainings = trainings
    ?.filter((training) => {
      const trainingDate = moment(training.date).format('DD.MM.YYYY');

      return selectedDate.format('DD.MM.YYYY') === trainingDate;
    });

  const modalPosition = selectedDate.day() === 0
  ? {
    top: `${modalCoords.top}px`,
    right: `${modalCoords.right}px`
    }
  : {
    top: `${modalCoords.top}px`,
    left: `${modalCoords.left}px`
    };

  const openCalendarSidebar = () => setIsCalendarSidebarOpen(true);
  const onBack = () => {
    dispatch(closeCreateTrainingModal());
    dispatch(removeIsRedactTrainingMode());
    dispatch(clearExercisesList());
    setIsModalOpen(true);
  }

  const selectOptions = trainingList
    ?.filter(({ name }) => {
      const currentTraining = currentDateTrainings?.find((type) => type.name === name);

      if (isRedactingMode && selectedDate <= today && currentTraining?.isImplementation === false) {
        return true;
      }

      return !currentDateTrainings?.some((type) => type.name === name);
    })
    .map(({ name }) => ({
        value: name,
        label: name,
      }));

    const onChange = (value: string) => {
      const selectedType = currentDateTrainings?.find((type) => type.name === value);
      const exercisesListData = selectedType ? selectedType?.exercises : []

      dispatch(setSelectedTraining(value));
      dispatch(setExercisesList(exercisesListData));
      setIsModalOpen(true);
      setEditingDisable(false);
      };

  const onButtonSaveCreate = () => {
    if(selectedTraining && exercises) {
      dispatch(getCreateTrainingFetch({
        name: selectedTraining,
        date: selectedDate.format(FORMAT_DATE_PAYLOAD),
        exercises,
      }));
    }
  }

  const onButtonSaveRedact = () => {
    if(selectedTraining && exercises) {
      dispatch(getRedactTrainingFetch({
        name: selectedTraining,
        date: selectedDate.format(FORMAT_DATE_PAYLOAD),
        exercises,
        isImplementation: selectedDate <= today,
      }));
      setEditingDisable(true);
    }
  }

  useEffect(() => {
    if(exercises.length === 0) {
      dispatch(removeIsRedactTrainingMode());
    }
  }, [dispatch, exercises]);

  return (
    <Card
      className={
        isModalTrainingsOpen
          ? classNames(styles.card, styles.cardOpen)
          : styles.card
        }
      style={isDesktop ? modalPosition : {top: '264px'}}
      data-test-id='modal-create-exercise'
    >
      <div className={styles.headerWrapper}>
        <Button
          icon={<ArrowLeftOutlined className={styles.buttonLogo} />}
          type='link'
          onClick={onBack}
          className={styles.buttonBack}
          data-test-id='modal-exercise-training-button-close'
        />

        <Select
          defaultValue='Выбор типа тренировки'
          options={selectOptions}
          bordered={false}
          className={styles.select}
          onChange={onChange}
          data-test-id='modal-create-exercise-select'
        />
      </div>

      <Divider className={styles.divider} />

      <div className={styles.emptyWrapper}>
        {exercises.length
          ? <ul className={styles.exercisesList}>
              {exercises.map(({ name }, index) => (
                <li key={name} className={styles.listItem}>
                  <Button
                    type='link'
                    size='small'
                    onClick={openCalendarSidebar}
                    className={styles.buttonRedact}
                    disabled={!isFuture && edititngDisable}
                    data-test-id={`modal-update-training-edit-button${index}`}
                  >
                    <Text
                      className={styles.itemText}
                    >{name}</Text>
                    <EditOutlined className={styles.buttonIcon} />
                  </Button>
                </li>
              ))}
            </ul>
          : <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              description={false}
              imageStyle={{
                height: 32
              }}
            />
      }
      </div>

      <Divider className={styles.divider} />

      <div className={styles.buttonsWrapper}>
        <Button
          block={true}
          onClick={openCalendarSidebar}
          disabled={!selectedTraining}
        >
          Добавить упражнения
        </Button>

        <Button
          type='link'
          block={true}
          onClick={isRedactingMode? onButtonSaveRedact : onButtonSaveCreate}
          loading={isLoading}
          disabled={exercises.length === 0}
          className={styles.buttonSave}
        >
          {isRedactingMode ? 'Сохранить изменения' : 'Сохранить'} 
        </Button>
      </div>
    </Card>
  )
}
