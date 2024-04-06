import { Fragment, lazy, Suspense, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { push } from 'redux-first-history';
import { AppFooter } from '@components/app-footer';
import { AppHeader } from '@components/app-header';
import { Loader } from '@components/loader';
import { Sidebar } from '@components/sidebar';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { history } from '@redux/configure-store';
import { authSelect } from '@redux/slices/auth';
import { calendarSelect } from '@redux/slices/calendar';
import { jointTrainingsSelect } from '@redux/slices/joint-trainings';
import { reviewsSelect } from '@redux/slices/reviews';
import { getUserFetch, userSelect } from '@redux/slices/user';
import { Paths } from '@typing/enums/paths';

import styles from './app-layout.module.scss';

const Layout = lazy(() => import('antd').then(module => ({ default: module.Layout })));
const Content = lazy(() => import('antd').then(module => ({ default: module.Layout.Content })));

export const AppLayout: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState(history.location.pathname);
  const { isLoading: isReviewsLoading } = useAppSelector(reviewsSelect);
  const { isLoading: isCalendarLoading } = useAppSelector(calendarSelect);
  const { isLoading: isJointTrainingsLoading } = useAppSelector(jointTrainingsSelect);
  const { userData } = useAppSelector(userSelect);
  const { token: storeToken } = useAppSelector(authSelect);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    if(!token) {
      dispatch(push(Paths.AUTH));
    }
  }, [dispatch]);

  useEffect(() => {
    const unlisten = history.listen((update) => {
      setCurrentLocation(update.location.pathname);
    });
  
    return () => {
      unlisten();
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if(!storeToken && !token) {
      sessionStorage.clear();
      dispatch(push(Paths.AUTH));
    }
  }, [storeToken, dispatch]);

  useEffect(() => {
    if(!userData) {
      dispatch(getUserFetch());
    }
  }, [dispatch, userData]);

  return (
      <Fragment>
        {(isReviewsLoading || isCalendarLoading || isJointTrainingsLoading) && <Loader />}
        <Layout className={styles.layout}>
          <Suspense fallback={<Loader />}>
          <Sidebar />
          <Layout>
            <AppHeader />
            <Content>
              <Outlet />
            </Content>
            {currentLocation === Paths.MAIN && <AppFooter />}
          </Layout>
          </Suspense>
        </Layout>
      </Fragment>
  )
}
