import { goBack } from 'redux-first-history';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks'
import { Button } from 'antd';
import { Header } from 'antd/lib/layout/layout';

import 'antd/dist/antd.css';
import styles from './header-settings.module.scss';

export const HeaderSettings: React.FC = () => {
  const dispatch = useAppDispatch();

  const onBack = () => dispatch(goBack());
  
  return (
    <Header className={styles.header}>
      <Button
        type='text'
        size='large'
        onClick={onBack}
        icon={<ArrowLeftOutlined />}
      >
        Назад
      </Button>
    </Header>
  )
}
