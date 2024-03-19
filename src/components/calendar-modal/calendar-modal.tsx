import { Badge, Button, Card, Divider, Empty, Typography } from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';

import { ModalCoords } from '@typing/types/modal-coords';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { calendarSelect } from '@redux/slices/calendar';
import { CalendarBadgeColors } from '@typing/enums/calendar-badge-colors';
import { trainingListSelect } from '@redux/slices/training-list';
import {
  openCreateTrainingModal,
  setExercisesList,
  setSelectedTraining
} from '@redux/slices/create-training';
import { setIsRedactingMode, setSelectedTrainingId } from '@redux/slices/redact-training';
import { useScreenWidth } from '@hooks/use-screen-width-hook';
import { FORMAT_DATE_IN_VIEW, MOBILE_WIDTH } from '@constants/constants';

import styles from './calendar-modal.module.scss';

const { Text } = Typography;

type CalendarModalProps = {
  setIsModalOpen: (isModalOpen: boolean) => void,
  modalCoords: ModalCoords,
  selectedDate: Moment,
}

export const CalendarModal: React.FC<CalendarModalProps> = ({
  setIsModalOpen,
  modalCoords,
  selectedDate,
 }) => {
  const currDate = selectedDate.format(FORMAT_DATE_IN_VIEW);
  const today = moment();
  const screenWidth = useScreenWidth();
  const isDesktop = screenWidth && screenWidth > MOBILE_WIDTH ? true : false;

  const modalPosition = selectedDate.day() === 0
    ? {
      top: `${modalCoords.top}px`,
      right: `${modalCoords.right}px`
      }
    : {
      top: `${modalCoords.top}px`,
      left: `${modalCoords.left}px`
      };

  const { trainings } = useAppSelector(calendarSelect);
  const { trainingList } = useAppSelector(trainingListSelect);
  const dispatch = useAppDispatch();

  const currentDateTrainings = trainings
    ?.filter((training) => {
      const trainingDate = moment(training.date).format(FORMAT_DATE_IN_VIEW);
      return currDate === trainingDate;
    });

  const onCreateTraining = () => {
    dispatch(openCreateTrainingModal());
    setIsModalOpen(false);
  }

  const onRedactTraining = (trainingName: string) => {
    const currentDateTrainingItem = currentDateTrainings
      ?.find(({ name }) => name === trainingName);
    const currentDateExercises = currentDateTrainingItem?.exercises
      .map(({ name, replays, weight, approaches, isImplementation }) => {
        return {
          name,
          replays,
          weight,
          approaches,
          isImplementation
        }
      });
    if(currentDateTrainingItem && currentDateExercises) {
      dispatch(setSelectedTrainingId(currentDateTrainingItem._id));
      dispatch(setSelectedTraining(currentDateTrainingItem.name));
      dispatch(setExercisesList(currentDateExercises));
    }
    dispatch(openCreateTrainingModal());
    dispatch(setIsRedactingMode());
    setIsModalOpen(false);
  }

  const onCancel = () => setIsModalOpen(false);

  const buttonCreateTrainingDisabled = trainingList
    ?.every((list) => currentDateTrainings?.some(training => training.name === list.name));
  return (
    <Card
      className={styles.card}
      style={isDesktop ? modalPosition : {top: '246px'}}
      data-test-id='modal-create-training'
    >
      <div className={styles.headWrapper}>
        <Text
          className={styles.title}
        >
          Тренировки на {currDate}
        </Text>

        <Button
          icon={<CloseOutlined className={styles.closeIcon} />}
          type='link'
          onClick={onCancel}
          className={styles.closeButton}
          data-test-id='modal-create-training-button-close'
        />
      </div>
      <div className={styles.content}>
        {currentDateTrainings?.length 
            ? <ul className={styles.trainingList}>
              {currentDateTrainings.map(({ name, isImplementation }, index) => (
                <li key={name} >
                  <Button
                    type='text'
                    onClick={() => onRedactTraining(name)}
                    disabled={isImplementation}
                    className={styles.buttonRedact}
                    data-test-id={`modal-update-training-edit-button${index}`}
                  >
                    <Badge
                      color={CalendarBadgeColors[name as keyof typeof CalendarBadgeColors]}
                      text={name}
                    />
                    <EditOutlined className={styles.editIcon} />
                </Button>
                </li>
              ))}
              </ul>
            : <>
                <Text type='secondary'>Нет активных тренировок</Text>
                <Empty
                  image={'https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'}
                  description={false}
                  className={styles.emptyContainer}
                  imageStyle={{
                    height: 32
                  }}
                />
              </>
        }
      </div>

      <Divider className={styles.divider} />

      <div className={styles.buttonCreateTraineeWrapper}>
        <Button
          block
          type='primary'
          disabled={buttonCreateTrainingDisabled || selectedDate <= today}
          onClick={onCreateTraining}
          className={styles.buttonCreateTrainee}
        >
          Создать тренировку
        </Button>
      </div>
    </Card>
  )
}
