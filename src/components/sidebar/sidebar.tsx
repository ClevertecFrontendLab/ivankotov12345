import { useState } from 'react';
import { push } from 'redux-first-history';
import { CalendarTwoTone, HeartTwoTone, IdcardOutlined, TrophyTwoTone } from '@ant-design/icons';
import { ExitOutlined } from '@components/exit-icon-outlined';
import { SidemenuSwitcher } from '@components/sidemenu-switcher';
import { MOBILE_WIDTH } from '@constants/constants';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useScreenWidth } from '@hooks/use-screen-width-hook';
import { history } from '@redux/configure-store';
import { getCalendarFetch } from '@redux/slices/calendar';
import { inviteSelect } from '@redux/slices/invite';
import { clearUser } from '@redux/slices/user';
import { Paths } from '@typing/enums/paths';
import { Badge, Layout, Menu } from 'antd';

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
    dispatch(clearUser());
  }

  const onCalendarClick = () => {
    dispatch(getCalendarFetch());
    dispatch(push(Paths.CALENDAR));
  };

  const onProfileClick = () => dispatch(push(Paths.PROFILE));

  const onTrainingsClick = () => {
    dispatch(getCalendarFetch());
    dispatch(push(Paths.WORKOUTS));
  }

  const toneColor = '#061178';
  const testId = screenWidth && screenWidth > MOBILE_WIDTH ? 'sider-switch' : 'sider-switch-mobile';

  const { responseData } = useAppSelector(inviteSelect);

  const invitesQuantity = responseData.length;

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
      icon: <Badge count={invitesQuantity} size='small'>
              <HeartTwoTone
                twoToneColor={toneColor}
                className={styles.iconFilled}
            />
            </Badge>,
      label: 'Тренировки',
      onClick: onTrainingsClick,
      className: styles.menuItem,
      path: Paths.WORKOUTS,
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
      onClick: onProfileClick,
      path: Paths.PROFILE,
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
      collapsible={true}
      collapsed={collapsed}
      theme='light'
      trigger={null}
      width={screenWidth && screenWidth > MOBILE_WIDTH ? 208 : 106}
      collapsedWidth={screenWidth && screenWidth > MOBILE_WIDTH ? 64 : 0}
      className={styles.sideBar}
      >
      <div className={
        collapsed
        ? styles.logo_hidden
        : styles.logo
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
