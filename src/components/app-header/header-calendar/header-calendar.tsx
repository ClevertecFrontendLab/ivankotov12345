import { push } from 'redux-first-history';
import { SettingOutlined } from '@ant-design/icons';
import { Breadcrumbs } from '@components/breadcrumbs';
import { MOBILE_WIDTH } from '@constants/constants';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { useScreenWidth } from '@hooks/use-screen-width-hook';
import { Paths } from '@typing/enums/paths';
import { Button, Layout } from 'antd';

import 'antd/dist/antd.css';
import styles from './header-calendar.module.scss';

const { Header } = Layout;

export const HeaderCalendar: React.FC = () => {
  const dispatch = useAppDispatch();
  const screenWidth = useScreenWidth();

  const onSettingsClick = () => dispatch(push(Paths.SETTINGS));

  return (
    <Header className={styles.header}>
      <Breadcrumbs />
        <div className={styles.wrapper}>
          <Button
            className={styles.settingsButton}
            type='text'
            size='middle'
            shape={screenWidth && screenWidth > MOBILE_WIDTH ? 'default' : 'circle'}
            icon={<SettingOutlined />}
            onClick={onSettingsClick}
            data-test-id='header-settings'
          >
            {screenWidth && screenWidth > MOBILE_WIDTH && 'Настройки'}
          </Button>
        </div>
    </Header>
  )
}