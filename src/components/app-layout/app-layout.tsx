import { Outlet } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { goBack } from 'redux-first-history';

import { Loader } from '@components/loader';
import { Sidebar } from '@components/sidebar';
import { AppHeader } from '@components/app-header';
import { AppFooter } from '@components/app-footer';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';

import 'antd/dist/antd.css';
import styles from './app-layout.module.scss';

const Layout = lazy(() => import('antd').then(module => ({ default: module.Layout })));
const Content = lazy(() => import('antd').then(module => ({ default: module.Layout.Content })));

export const AppLayout: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token) {
      dispatch(goBack());
    }
  }, [dispatch])
  return (
      <Layout className={styles.layout}>
        <Suspense fallback={<Loader />}>
        <Sidebar />
        <Layout>
          <AppHeader />
          <Content>
            <Outlet />
          </Content>
          <AppFooter />
        </Layout>
        </Suspense>
      </Layout>
  )
}
