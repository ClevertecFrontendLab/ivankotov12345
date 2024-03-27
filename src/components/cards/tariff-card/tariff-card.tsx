import { Button, Card, Typography } from 'antd';

import coverFree from './assets/png/cover-free.png';
import coverPro from './assets/png/cover-pro.png'

import styles from './tariff-card.module.scss';

type TariffCardProps = {
  tariff: string,
  setIsSidebarOpen: (isSidebarOpen: boolean) => void,
}

const { Text } = Typography;

export const TariffCard: React.FC<TariffCardProps> = ({ tariff, setIsSidebarOpen }) => {
  const image = tariff === 'FREE' ? coverFree : coverPro;

  const onButtonClick = () => {
    setIsSidebarOpen(true);
  }

  return (
    <Card
      className={styles.tariffCard}
      title={`${tariff} tariff`}
      extra={
      <Button
        onClick={onButtonClick}
      >
        Подробнее
      </Button>
    }
    cover={<img src={image} alt='card cover' />}
    >
      <Text>Активен</Text>
    </Card>
  )
}
