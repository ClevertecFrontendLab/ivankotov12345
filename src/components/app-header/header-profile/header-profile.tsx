import { push } from 'redux-first-history';
import { SettingOutlined } from '@ant-design/icons';
import { MOBILE_WIDTH } from '@constants/constants';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { useScreenWidth } from '@hooks/use-screen-width-hook';
import { Paths } from '@typing/enums/paths';
import { Button, Typography } from 'antd';
import { Header } from 'antd/lib/layout/layout';

import 'antd/dist/antd.css';
import styles from './header-profile.module.scss';

const { Title } = Typography;

export const HeaderProfile: React.FC = () => {
  const dispatch = useAppDispatch()
  const screenWidth = useScreenWidth();

  const onSettingsClick = () => dispatch(push(Paths.SETTINGS))

  return (
    <Header className={styles.header}>
      <Title level={4} className={styles.title}>Профиль</Title>
        <div className={styles.buttonWrapper}>
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