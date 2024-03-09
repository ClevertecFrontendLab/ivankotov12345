import { Calendar } from 'antd';
import { useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/ru';

import { localeRU } from './locale/locale.ts';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { getTrainingListFetch } from '@redux/slices/training-list.ts';

moment.updateLocale('ru', { week: { dow: 1 } });

export const CalendarPage: React.FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getTrainingListFetch());
  }, [dispatch]);
  return (
    <Calendar
    locale={localeRU}
    />
  )
}
