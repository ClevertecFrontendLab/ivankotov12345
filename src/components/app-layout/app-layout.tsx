import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

import { Sidebar } from '@components/sidebar';
import { AppHeader } from '@components/app-header';
import { AppFooter } from '@components/app-footer';

import 'antd/dist/antd.css';
import styles from './app-layout.module.scss';


const { Content } = Layout;

export const AppLayout: React.FC = () => {
  return (
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
  )
}
