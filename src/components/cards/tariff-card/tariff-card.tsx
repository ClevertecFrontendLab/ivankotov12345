import { CheckOutlined } from '@ant-design/icons';
import { FORMAT_DATE_IN_VIEW_SHORT } from '@constants/constants';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { userSelect } from '@redux/slices/user';
import { Button, Card, Typography } from 'antd';
import moment from 'moment';

import coverFree from './assets/png/cover-free.png';
import coverPro from './assets/png/cover-pro.png'
import coverProDisabled from './assets/png/cover-pro-disabled.png'

import styles from './tariff-card.module.scss';

type TariffCardProps = {
  tariff: string,
  setIsSidebarOpen: (isSidebarOpen: boolean) => void,
}

const { Text } = Typography;

export const TariffCard: React.FC<TariffCardProps> = ({ tariff, setIsSidebarOpen }) => {
  const { userData } = useAppSelector(userSelect);

  let image;
  let buttonContent;


  const date = userData?.tariff && moment(userData?.tariff.expired).format(FORMAT_DATE_IN_VIEW_SHORT);

    const onButtonClick = () => {
    setIsSidebarOpen(true);
  }

  if(tariff === 'FREE') {
    image = coverFree;
    buttonContent = (
      <Text
        editable={{
          icon: <CheckOutlined className={styles.logo} />
        }}
        className={styles.tariffCardText}
      >
        Активен
      </Text>
    );
  } else if(tariff === 'PRO' && userData?.tariff) {
    image = coverPro;
    buttonContent = (
      <Text
        className={styles.tariffCardText}
      >
        {`Активен до ${date}`}
      </Text>
    )
  } else {
    image = coverProDisabled;
    buttonContent = (
      <Button
        onClick={onButtonClick}
        size='large'
        type='primary'
      >
        Активировать
      </Button>
    )
  }

  return (
    <Card
      className={styles.tariffCard}
      title={`${tariff} tariff`}
      extra={
      <Button
        type='text'
        className={styles.drawerButton}
        onClick={onButtonClick}
      >
        Подробнее
      </Button>
    }
    cover={<img src={image} alt='card cover' />}
    >
      {buttonContent}  
    </Card>
  )
}
