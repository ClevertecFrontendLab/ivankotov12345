import { useState } from 'react';
import { Layout, Menu } from 'antd';
import { CalendarTwoTone, HeartTwoTone, IdcardOutlined, TrophyTwoTone } from '@ant-design/icons';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { push } from 'redux-first-history';

import { useScreenWidth } from '@hooks/use-screen-width-hook';

import { ExitOutlined } from '@components/exit-icon-outlined/exit-icon-outlined';
import { SidemenuSwitcher } from '@components/sidemenu-switcher';
import { Paths } from '@typing/enums/paths';

import clever from './assets/svg/clever.svg';
import logo from './assets/svg/fit.svg';

import 'antd/dist/antd.css';
import styles from './sidebar.module.scss';


export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { Sider } = Layout;
  const screenWidth = useScreenWidth();

  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    localStorage.removeItem('token');
    dispatch(push(Paths.AUTH));
    console.log('1')
  }

  const toneColor = '#061178';
  const testId = screenWidth && screenWidth > 675 ? 'sider-switch' : 'sider-switch-mobile';

  const menuItems = [
    {
      key: '1',
      icon: <CalendarTwoTone
        className={styles.iconFilled}
        twoToneColor={toneColor}
      />,
      label: 'Календарь',
      className: styles.menuItem,
    },
    {
      key: '2',
      icon: <HeartTwoTone
        twoToneColor={toneColor}
        className={styles.iconFilled}
      />,
      label: 'Тренировки',
      className: styles.menuItem,
    },
    {
      key: '3',
      icon: <TrophyTwoTone
        twoToneColor={toneColor}
        className={styles.iconFilled}
      />,
      label: 'Достижения',
      className: styles.menuItem,
    },
    {
      key: '4',
      icon: <IdcardOutlined
        className={styles.iconOutlined}
      />,
      label: 'Профиль',
      className: styles.menuItem,
    },
    {
      key: '5',
      icon: <ExitOutlined className={styles.iconOutlined} />,
      label: 'Выход',
      onClick: handleLogOut,
      className: styles.exitButtonWrapper,
    }
  ];
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      theme='light'
      trigger={null}
      width={screenWidth && screenWidth > 675 ? 208 : 106}
      collapsedWidth={screenWidth && screenWidth > 675 ? 64 : 0}
      className={styles.sideBar}
      >
      <div className={
        !collapsed
        ? styles.logo
        : styles.logo_hidden
        }>
        <img src={clever} alt='Clever Logo' className={styles.logoClever} />
        <img src={logo} alt='Fit Logo' className={styles.logoFit} />
      </div>

      <Menu items={menuItems} selectable={false} className={styles.sidebarMenu} />

      <SidemenuSwitcher collapsed={collapsed} setCollapsed={setCollapsed} testId={testId} />
    </Sider>
  )
}
