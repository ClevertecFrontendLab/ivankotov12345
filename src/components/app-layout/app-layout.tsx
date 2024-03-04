import { Outlet } from 'react-router-dom';
import { Suspense, lazy, useEffect, useState } from 'react';
import { push } from 'redux-first-history';

import { Loader } from '@components/loader';
import { Sidebar } from '@components/sidebar';
import { AppHeader } from '@components/app-header';
import { AppFooter } from '@components/app-footer';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { reviewsSelect } from '@redux/slices/reviews';
import { history } from '@redux/configure-store';
import { Paths } from '@typing/enums/paths';

import 'antd/dist/antd.css';
import styles from './app-layout.module.scss';

const Layout = lazy(() => import('antd').then(module => ({ default: module.Layout })));
const Content = lazy(() => import('antd').then(module => ({ default: module.Layout.Content })));

export const AppLayout: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<string>(history.location.pathname);
  const { isLoading } = useAppSelector(reviewsSelect);
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.addEventListener('beforeunload', () => sessionStorage.clear());
    dispatch(push(Paths.AUTH));
    return () => {
      window.removeEventListener('beforeunload', () => sessionStorage.clear());
    };
  }, [dispatch]);

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
  return (
      <>
        {isLoading && <Loader />}
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
      </>
  )
}
