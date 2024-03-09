import { Button, Typography } from 'antd';

import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { getCalendarFetch } from '@redux/slices/calendar';

import styles from './action-card.module.scss';

type PropsType = {
  cardLogo: JSX.Element,
  cardName: string,
  buttonText: string,
}

const {Text} = Typography;

export const ActionCard: React.FC<PropsType> = ({ cardLogo, cardName, buttonText }: PropsType) => {
  const dispatch = useAppDispatch();

  const onCalendarButtonClick = () => dispatch(getCalendarFetch());
  return (
    <li className={styles.card}>
      <Text className={styles.text}>{cardName}</Text>
      <Button 
        type='link'
        icon={cardLogo}
        className={styles.cardButton}
        onClick={buttonText === 'Календарь' ? onCalendarButtonClick : undefined}
      >
        {buttonText}
      </Button>
    </li>
  )
}
