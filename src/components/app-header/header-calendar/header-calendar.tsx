import { SettingOutlined } from '@ant-design/icons';
import { Breadcrumbs } from '@components/breadcrumbs';
import { MOBILE_WIDTH } from '@constants/constants';
import { useScreenWidth } from '@hooks/use-screen-width-hook';
import { Button, Layout } from 'antd';

import 'antd/dist/antd.css';
import styles from './header-calendar.module.scss';

const { Header } = Layout;

export const HeaderCalendar: React.FC = () => {
  const screenWidth = useScreenWidth();

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
          >
            {screenWidth && screenWidth > MOBILE_WIDTH && 'Настройки'}
          </Button>
        </div>
    </Header>
  )
}