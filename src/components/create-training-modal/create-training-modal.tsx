import { useState } from 'react';
import { ArrowLeftOutlined, DownOutlined } from '@ant-design/icons';
import moment from 'moment';
import type { Moment } from 'moment';

import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingListSelect } from '@redux/slices/training-list';
import { ModalCoords } from '@typing/types/modal-coords';
import { Button, Card, Dropdown, Empty, MenuProps, Space, Typography } from 'antd';
import {
  createTrainingSelect,
  getCreateTrainingFetch,
  setExercisesList
} from '@redux/slices/create-training';
import { calendarSelect } from '@redux/slices/calendar';

import styles from './create-training-modal.module.scss';

type PropsType = {
  setIsTrainingModalOpen: (isTraineeModalOpen: boolean) => void,
  setIsModalOpen: (isModalOpen: boolean) => void,
  modalCoords: ModalCoords,
  setIsCalendarSidebarOpen: (isCalendarSidebarOpen: boolean) => void,
  selectedDate: Moment,
}

const { Text } = Typography;

export const CreateTrainingModal: React.FC<PropsType> = ({
  setIsTrainingModalOpen,
  setIsModalOpen,
  modalCoords,
  setIsCalendarSidebarOpen,
  selectedDate,
}) => {
  const dispatch = useAppDispatch();
  const { trainingList } = useAppSelector(trainingListSelect);
  const { exercises } = useAppSelector(createTrainingSelect);
  const { trainings } = useAppSelector(calendarSelect);

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

  const [selectedTraining, setSelectedTraining] = useState<string | null>(null);

  const openCalendarSidebar = () => setIsCalendarSidebarOpen(true);
  const onBack = () => {
    setIsTrainingModalOpen(false);
    setIsModalOpen(true);
  }

  const items: MenuProps['items'] = trainingList?.map(({ name, key }) => {
    return {
      label: name,
      key,
      onClick: () => {
        const selectedType= currentDateTrainings?.find((type) => type.name === name);
        setSelectedTraining(name);
        dispatch(setExercisesList(selectedType?.exercises || []));
      },
    }
  });
  const onButtonSave = () => {
    if(selectedTraining && exercises) {
      dispatch(getCreateTrainingFetch({
        name: selectedTraining,
        date: selectedDate.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
        exercises: exercises,
      }));
    }
    setIsTrainingModalOpen(false);
  }
  return (
    <Card
      className={styles.card}
      style={modalPosition}
    >
      <div className={styles.headerWrapper}>
        <Button
          icon={<ArrowLeftOutlined />}
          type='link'
          onClick={onBack}
        />

        <Dropdown menu={{ items }} trigger={['click']}>
            <Space>
              {selectedTraining ? selectedTraining : 'Выбор типа тренировки'}
              <DownOutlined />
            </Space>
        </Dropdown>
      </div>

      <div>
        {exercises.length
          ? exercises.map(({ name }) => (
              <Text key={name}>{name}</Text>
            )
          )
          : <Empty />
      }
      </div>

      <div>
        <Button
          type='primary'
          block
          onClick={openCalendarSidebar}
          disabled={!selectedTraining}
        >
          Добавить упражнения
        </Button>

        <Button
          type='link'
          block
          onClick={onButtonSave}
        >
          Сохранить
        </Button>
      </div>
    </Card>
  )
}
