import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { getCalendarFetch } from '@redux/slices/calendar';
import { Button, Typography } from 'antd';

import styles from './action-card.module.scss';

type ActionCardProps = {
  cardLogo: JSX.Element,
  cardName: string,
  buttonText: string,
}

const {Text} = Typography;
const dataTestIdCalendar ='menu-button-calendar'

export const ActionCard: React.FC<ActionCardProps> = ({ cardLogo, cardName, buttonText }) => {
  const dispatch = useAppDispatch();

  const onCalendarButtonClick = () => dispatch(getCalendarFetch());

  return (
    <li className={styles.card}>
      <Text
        className={styles.text}
      >{cardName}</Text>
      <Button 
        type='link'
        icon={cardLogo}
        className={styles.cardButton}
        onClick={buttonText === 'Календарь' ? onCalendarButtonClick : undefined}
        data-test-id={buttonText === 'Календарь' ? dataTestIdCalendar : ''}
      >
        {buttonText}
      </Button>
    </li>
  )
}
