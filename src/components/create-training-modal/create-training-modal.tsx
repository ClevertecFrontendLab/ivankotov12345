import { useEffect } from 'react';
import { ArrowLeftOutlined, DownOutlined, EditOutlined } from '@ant-design/icons';
import moment from 'moment';
import type { Moment } from 'moment';

import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingListSelect } from '@redux/slices/training-list';
import { ModalCoords } from '@typing/types/modal-coords';
import { Button, Card, Divider, Dropdown, Empty, MenuProps, Space, Typography } from 'antd';
import {
  clearExercisesList,
  closeCreateTrainingModal,
  createTrainingSelect,
  getCreateTrainingFetch,
  setExercisesList,
  setSelectedTraining
} from '@redux/slices/create-training';
import { calendarSelect } from '@redux/slices/calendar';
import {
  getRedactTrainingFetch,
  redactTrainingSelect,
  removeIsRedactTrainingMode,
} from '@redux/slices/redact-training';

import styles from './create-training-modal.module.scss';


type PropsType = {
  setIsModalOpen: (isModalOpen: boolean) => void,
  modalCoords: ModalCoords,
  setIsCalendarSidebarOpen: (isCalendarSidebarOpen: boolean) => void,
  selectedDate: Moment,
}

const { Text } = Typography;

export const CreateTrainingModal: React.FC<PropsType> = ({
  setIsModalOpen,
  modalCoords,
  setIsCalendarSidebarOpen,
  selectedDate,
}) => {
  const dispatch = useAppDispatch();
  const { trainingList } = useAppSelector(trainingListSelect);
  const { exercises, selectedTraining, isLoading } = useAppSelector(createTrainingSelect);
  
  const { trainings } = useAppSelector(calendarSelect);
  const { isRedactingMode } = useAppSelector(redactTrainingSelect);

  const currentDateTrainings = trainings
    ?.filter((training) => {
      const trainingDate = moment(training.date).format('DD.MM.YYYY');
      return selectedDate.format('DD.MM.YYYY') === trainingDate
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

  const items: MenuProps['items'] = trainingList
    ?.filter(({ name }) => {
      if (isRedactingMode) {
        return true;
      }
      return !currentDateTrainings?.some((type) => type.name === name);
    })
    .map(({ name, key }) => {
      return {
        label: name,
        key,
        onClick: () => {
          const selectedType= currentDateTrainings?.find((type) => type.name === name);
          dispatch(setSelectedTraining(name));
          if(selectedType) {
            dispatch(setExercisesList(selectedType?.exercises));
          } else {
            dispatch(setExercisesList([]));
          }
          setIsModalOpen(true);
        },
      }
  });
  const onButtonSaveCreate = () => {
    if(selectedTraining && exercises) {
      dispatch(getCreateTrainingFetch({
        name: selectedTraining,
        date: selectedDate.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
        exercises: exercises,
      }));
    }
  }

  const onButtonSaveRedact = () => {
    if(selectedTraining && exercises) {
      dispatch(getRedactTrainingFetch({
        name: selectedTraining,
        date: selectedDate.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
        exercises: exercises,
      }));
    }
  }

  useEffect(() => {
    if(exercises.length === 0) {
      dispatch(removeIsRedactTrainingMode());
    }
  }, [dispatch, exercises]);
  return (
    <Card
      className={styles.card}
      style={modalPosition}
    >
      <div className={styles.headerWrapper}>
        <Button
          icon={<ArrowLeftOutlined className={styles.buttonLogo} />}
          type='link'
          onClick={onBack}
          className={styles.buttonBack}
        />

        <Dropdown
          menu={{ items }}
          trigger={['click']}
          className={styles.dropdown}
        >
            <Space>
              {selectedTraining ? selectedTraining : 'Выбор типа тренировки'}
              <DownOutlined className={styles.dropdownButton} />
            </Space>
        </Dropdown>
      </div>

      <Divider className={styles.divider} />

      <div className={styles.emptyWrapper}>
        {exercises.length
          ? <ul className={styles.exercisesList}>
              {exercises.map(({ name }) => (
                <li key={name} className={styles.listItem}>
                  <Text className={styles.itemText}>{name}</Text>
                  <Button
                    type='link'
                    icon={<EditOutlined className={styles.buttonIcon} />}
                    size='small'
                    onClick={openCalendarSidebar}
                  />
                </li>
              ))}
            </ul>
          : <Empty
              image={'https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'}
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
          block
          onClick={openCalendarSidebar}
          disabled={!selectedTraining}
        >
          Добавить упражнения
        </Button>

        <Button
          type='link'
          block
          onClick={isRedactingMode? onButtonSaveRedact : onButtonSaveCreate}
          loading={isLoading}
          disabled={exercises.length === 0}
          className={styles.buttonSave}
        >
          Сохранить
        </Button>
      </div>
    </Card>
  )
}
