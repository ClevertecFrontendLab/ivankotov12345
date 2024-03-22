import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { push } from 'redux-first-history';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { history } from '@redux/configure-store';
import { Paths } from '@typing/enums/paths';
import { Card } from 'antd';

import formLogo from './assets/svg/logo.svg';

import styles from './auth-form.module.scss';

const tabList = [
  {
    key: Paths.AUTH,
    tab: <span className={styles.tab}>Вход</span>,
  },
  {
    key: `${Paths.AUTH}${Paths.REGISTRATION}`,
    tab: <div className={styles.tab}>Регистрация</div>,
  }
];

export const AuthForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState(history.location.pathname);

  const onTabChange = (key: string) => {
    setActiveTab(key);
    dispatch(push(key));
  };

  return (
    <Card 
      title={<img alt='Cleverfit' src={formLogo} className={styles.logo} />}
      activeTabKey={activeTab}
      tabList={tabList}
      onTabChange={onTabChange}
      className={styles.formCard}
    >
      <Outlet />
    </Card>
  )
}
