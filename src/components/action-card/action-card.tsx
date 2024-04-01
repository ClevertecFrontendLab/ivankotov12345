import { push } from 'redux-first-history';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { getCalendarFetch } from '@redux/slices/calendar';
import { Paths } from '@typing/enums/paths';
import { Button, Typography } from 'antd';

import styles from './action-card.module.scss';

type ActionCardProps = {
  cardLogo: JSX.Element,
  cardName: string,
  buttonText: string,
}


const {Text} = Typography;
const dataTestIdCalendar = 'menu-button-calendar'
const dataTestIdProfile = 'menu-button-profile'

export const ActionCard: React.FC<ActionCardProps> = ({ cardLogo, cardName, buttonText }) => {
  const dispatch = useAppDispatch();

  let testId

  if(buttonText === 'Календарь') {
    testId = dataTestIdCalendar;
  } else if(buttonText === 'Профиль') {
    testId = dataTestIdProfile;
  }


  const onCalendarButtonClick = () => {
    dispatch(getCalendarFetch());
    dispatch(push(Paths.CALENDAR));
  }
  const onProfileButtonClick = () => dispatch(push(Paths.PROFILE));

  const onWorkoutsButtonClick = () => {
    dispatch(getCalendarFetch());
    dispatch(push(Paths.WORKOUTS));
  }

  const onClick = () => {
    if(buttonText === 'Календарь') {
      onCalendarButtonClick();
    }
    if(buttonText === 'Профиль') {
      onProfileButtonClick();
    }
    if(buttonText === 'Тренировки') {
      onWorkoutsButtonClick()
    }

  }

  return (
    <li className={styles.card}>
      <Text
        className={styles.text}
      >{cardName}</Text>
      <Button 
        type='link'
        icon={cardLogo}
        className={styles.cardButton}
        onClick={onClick}
        data-test-id={testId}
      >
        {buttonText}
      </Button>
    </li>
  )
}
