import { useEffect, useState } from 'react';
import { Button, Layout, Typography } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

import { history } from '@redux/configure-store';
import { useScreenWidth } from '@hooks/use-screen-width-hook';
import { Paths } from '@typing/enums/paths';
import { Breadcrumbs } from '@components/breadcrumbs';
import { MOBILE_WIDTH } from '@constants/constants';

import styles from './header.module.scss';
import classNames from 'classnames';

const { Header } = Layout;
const { Title } = Typography;

export const AppHeader: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<string>(history.location.pathname);
  const screenWidth = useScreenWidth();

  useEffect(() => {
    const unlisten = history.listen((update) => {
      setCurrentLocation(update.location.pathname);
    });
    return () => {
      unlisten();
    }
  }, []);
  return (
    <Header
      className={
        currentLocation === Paths.MAIN
          ? styles.header
          : classNames(styles.header, styles.headerCalendar) 
      }
    >
      <Breadcrumbs />
      {(currentLocation === Paths.MAIN || currentLocation === Paths.CALENDAR) &&
        <div
          className={
            currentLocation === Paths.MAIN
              ? styles.wrapper
              : classNames(styles.wrapper, styles.wrapperCalendar) 
          }
        >
          <Title
            className={
              currentLocation === Paths.MAIN
                ? styles.title
                : classNames(styles.title, styles.titleHidden) 
              }
          >
            Приветствуем тебя в CleverFit — приложении,<br />
            которое поможет тебе добиться своей мечты!
          </Title>
          <Button
            className={styles.settingsButton}
            type={screenWidth && screenWidth > MOBILE_WIDTH ? 'text' : 'default'}
            size='middle'
            ghost={screenWidth && screenWidth > MOBILE_WIDTH ? true : false}
            shape={screenWidth && screenWidth > MOBILE_WIDTH ? 'default' : 'circle'}
            icon={<SettingOutlined className={styles.settingsButtonLabel} />}
          >
            {screenWidth && screenWidth > MOBILE_WIDTH && 'Настройки'}
          </Button>
        </div>
      }
    </Header>
  )
}