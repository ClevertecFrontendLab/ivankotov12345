import { Badge, Calendar } from 'antd';
import { useEffect, useState } from 'react';
import moment from 'moment';
import type { Moment } from 'moment';
import 'moment/locale/ru';

import { localeRU } from './locale/locale.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { getTrainingListFetch } from '@redux/slices/training-list.ts';
import { CalendarModal } from '@components/calendar-modal/calendar-modal.tsx';
import { ModalCoords } from '@typing/types/modal-coords.ts';
import { CreateTrainingModal } from '@components/create-training-modal/create-training-modal.tsx';
import { CalendarTrainingSidebar } from '@components/calendar-training-sidebar/calendar-training-sidebar.tsx';
import { calendarSelect } from '@redux/slices/calendar.tsx';
import { CalendarBadgeColors } from '@typing/enums/calendar-badge-colors.ts';
import {
  clearExercisesList,
  closeCreateTrainingModal,
  createTrainingSelect,
  } from '@redux/slices/create-training.ts';
import { removeIsRedactTrainingMode } from '@redux/slices/redact-training.ts';
import { useScreenWidth } from '@hooks/use-screen-width-hook.ts';
import { MOBILE_WIDTH } from '@constants/constants.ts';

import styles from './calendar-page.module.scss'
import { CalendarResult } from '@components/calendar-result-modal/calendar-result.tsx';


moment.updateLocale('ru', { week: { dow: 1 } });

export const CalendarPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCalendarSidebarOpen, setIsCalendarSidebarOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Moment>(() => moment());
  const [modalCoords, setModalCoords] = useState<ModalCoords>({
    top: null,
    left: null,
    right: null,
  });

  const { isModalTrainingsOpen } = useAppSelector(createTrainingSelect);
  const screenWidth = useScreenWidth();

  const dispatch = useAppDispatch();

  const { trainings } = useAppSelector(calendarSelect);

  const getTrainingsNotifications = (date: Moment) => {
    const trainingsOnDate = trainings?.filter(training => moment(training.date).isSame(date, 'day'));
    if(trainingsOnDate?.length) {
      return trainingsOnDate.map((training) => {
        return {
          color: CalendarBadgeColors[training.name as keyof typeof CalendarBadgeColors],
          name: training.name,
          key: training._id
        }
      })
    }
  }

  const dateCellRender = (date: Moment) => {
    const trainingList = getTrainingsNotifications(date);
    return (
      <ul className={styles.trainingList}>
        {trainingList && trainingList.map(({ name, key, color }) => (
          <li key={key}>
            <Badge color={color} text={name} className={styles.badge} />
          </li>
        ))}
      </ul>
    )
  }
  const dateCellRenderMobile = (date: Moment) => {
    const trainingList = getTrainingsNotifications(date);
    if (trainingList && trainingList.length > 0) {
      return (
        <div className={styles.trainingDateMobile} />
      );
    }
  }
  useEffect(() => {
    dispatch(getTrainingListFetch());
  }, [dispatch]);
  
  const getModalCoords = () => {
    const selectedDate = document.querySelector('.ant-picker-cell-selected') as HTMLElement;
    const rect = selectedDate.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowWidth = window.innerWidth;
    setModalCoords({
      top: rect.top + scrollTop,
      left: rect.left,
      right: windowWidth - rect.right,
    });
  }

  useEffect(() => {
    getModalCoords();
  }, [selectedDate]);

  useEffect(() => {
    window.addEventListener('resize', getModalCoords);
    return () => {
      window.removeEventListener('resize', getModalCoords);
    };
  }, [selectedDate]);

  const onSelect = (currDate: Moment) => {
    dispatch(removeIsRedactTrainingMode());
    dispatch(closeCreateTrainingModal());
    setIsModalOpen(true);
    setIsCalendarSidebarOpen(false);
    setSelectedDate(currDate);
    dispatch(clearExercisesList()); 
  }

  const isFullScreen = screenWidth && screenWidth > MOBILE_WIDTH ? true : false
  return (
    <>
      <Calendar
        locale={localeRU}
        onSelect={onSelect}
        className={styles.calendarWrapper}
        dateCellRender={
          screenWidth && screenWidth > MOBILE_WIDTH
            ? dateCellRender
            : dateCellRenderMobile
        }
        fullscreen={isFullScreen}
      />

      {isModalOpen && <CalendarModal
        setIsModalOpen={setIsModalOpen}
        modalCoords={modalCoords}
        selectedDate={selectedDate}
      />}
      {isModalTrainingsOpen && <CreateTrainingModal
        setIsModalOpen={setIsModalOpen}
        modalCoords={modalCoords}
        setIsCalendarSidebarOpen={setIsCalendarSidebarOpen}
        selectedDate={selectedDate}
      />}
      {isCalendarSidebarOpen && <CalendarTrainingSidebar
        isCalendarSidebarOpen={isCalendarSidebarOpen}
        setIsCalendarSidebarOpen={setIsCalendarSidebarOpen}
        selectedDate={selectedDate}
      />}

      <CalendarResult
        setIsModalOpen={setIsModalOpen}
      />
    </>
  )
}