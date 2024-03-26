import { goBack } from 'redux-first-history';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks'
import { Button } from 'antd';
import { Header } from 'antd/lib/layout/layout';

export const HeaderSettings: React.FC = () => {
  const dispatch = useAppDispatch();

  const onBack = () => dispatch(goBack());
  
  return (
    <Header>
      <Button
        onClick={onBack}
        icon={<ArrowLeftOutlined />}
      >
        Назад
      </Button>
    </Header>
  )
}
