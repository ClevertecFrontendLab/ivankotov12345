import { SettingOutlined } from '@ant-design/icons';
import { MOBILE_WIDTH } from '@constants/constants';
import { useScreenWidth } from '@hooks/use-screen-width-hook';
import { Button, Typography } from 'antd';
import { Header } from 'antd/lib/layout/layout';

import styles from './header-profile.module.scss';

const { Title } = Typography;

export const HeaderProfile: React.FC = () => {
  const screenWidth = useScreenWidth();

  return (
    <Header className={styles.header}>
      <Title level={4} className={styles.title}>Профиль</Title>
        <div>
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