import { SettingOutlined } from '@ant-design/icons';
import { MOBILE_WIDTH } from '@constants/constants';
import { useScreenWidth } from '@hooks/use-screen-width-hook';
import { Breadcrumb, Button, Layout, Typography } from 'antd';

import 'antd/dist/antd.css';
import styles from './header-main.module.scss';

const { Header } = Layout;
const { Title } = Typography;

export const HeaderMain: React.FC = () => {

  const screenWidth = useScreenWidth();

  return (
    <Header className={styles.header}>
      <Breadcrumb>
        <Breadcrumb.Item>Главная</Breadcrumb.Item>
      </Breadcrumb>
      <div className={styles.wrapper}>
        <Title className={styles.title}>
          Приветствуем тебя в CleverFit — приложении,<br />
          которое поможет тебе добиться своей мечты!
        </Title>
        <Button
          className={styles.settingsButton}
          type={screenWidth && screenWidth > MOBILE_WIDTH ? 'text' : 'default'}
          size='middle'
          shape={screenWidth && screenWidth > MOBILE_WIDTH ? 'default' : 'circle'}
          icon={<SettingOutlined className={styles.settingsButtonLabel} />}
          >
        {screenWidth && screenWidth > MOBILE_WIDTH && 'Настройки'}
        </Button>
      </div>
    </Header>
  )
}
