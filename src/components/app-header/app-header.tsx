import { Breadcrumb, Button, Layout, Typography } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

import { useScreenWidth } from '@hooks/use-screen-width-hook';

import styles from './header.module.scss';

export const AppHeader: React.FC = () => {
  const { Header } = Layout;
  const { Title } = Typography;
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
          type={screenWidth && screenWidth > 675 ? 'text' : 'default'}
          size='middle'
          ghost={screenWidth && screenWidth > 675 ? true : false}
          shape={screenWidth && screenWidth > 675 ? 'default' : 'circle'}
          icon={<SettingOutlined className={styles.settingsButtonLabel} />}
          >
        {screenWidth && screenWidth > 675 && 'Настройки'}
        </Button>
      </div>
    </Header>
  )
}
