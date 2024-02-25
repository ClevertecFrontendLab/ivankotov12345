import { Outlet } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import { Loader } from '@components/loader';
import { Sidebar } from '@components/sidebar';
import { AppHeader } from '@components/app-header';
import { AppFooter } from '@components/app-footer';

import 'antd/dist/antd.css';
import styles from './app-layout.module.scss';


const Layout = lazy(() => import('antd').then(module => ({ default: module.Layout })));
const Content = lazy(() => import('antd').then(module => ({ default: module.Layout.Content })));


export const AppLayout: React.FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Layout className={styles.layout}>
        <Sidebar />
        <Layout>
          <AppHeader />
          <Content>
            <Outlet />
          </Content>
          <AppFooter />
        </Layout>
      </Layout>
    </Suspense>
  )
}
