import { useState } from 'react';
import { Layout, Menu } from 'antd';
import { CalendarTwoTone, HeartTwoTone, IdcardOutlined, TrophyTwoTone } from '@ant-design/icons';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { push } from 'redux-first-history';

import { useScreenWidth } from '@hooks/use-screen-width-hook';
import { MOBILE_WIDTH } from '@constants/constants';

import { ExitOutlined } from '@components/exit-icon-outlined';
import { SidemenuSwitcher } from '@components/sidemenu-switcher';
import { Paths } from '@typing/enums/paths';
import { getCalendarFetch } from '@redux/slices/calendar';
import { history } from '@redux/configure-store';

import clever from './assets/svg/clever.svg';
import logo from './assets/svg/fit.svg';

import 'antd/dist/antd.css';
import styles from './sidebar.module.scss';

const { Sider } = Layout;

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);

  const screenWidth = useScreenWidth();

  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    localStorage.removeItem('token');
    sessionStorage.clear();
    dispatch(push(Paths.AUTH));
  }

  const onCalendarClick = () => dispatch(getCalendarFetch());

  const toneColor = '#061178';
  const testId = screenWidth && screenWidth > MOBILE_WIDTH ? 'sider-switch' : 'sider-switch-mobile';

  const menuItems = [
    {
      key: '1',
      icon: <CalendarTwoTone
        className={styles.iconFilled}
        twoToneColor={toneColor}
      />,
      label: 'Календарь',
      onClick: onCalendarClick,
      className: styles.menuItem,
      path: Paths.CALENDAR,
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

  const selectedItem = menuItems.find(item => item.path === history.location.pathname);
  const selectedKey = selectedItem ? selectedItem.key : undefined;
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      theme='light'
      trigger={null}
      width={screenWidth && screenWidth > MOBILE_WIDTH ? 208 : 106}
      collapsedWidth={screenWidth && screenWidth > MOBILE_WIDTH ? 64 : 0}
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

      <Menu
        items={menuItems}
        className={styles.sidebarMenu}
        selectedKeys={selectedKey ? [selectedKey] : []}
      />

      <SidemenuSwitcher collapsed={collapsed} setCollapsed={setCollapsed} testId={testId} />
    </Sider>
  )
}
