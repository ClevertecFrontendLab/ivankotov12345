import { Button, Typography } from 'antd';

import styles from './action-card.module.scss';

type PropsType = {
  cardLogo: JSX.Element,
  cardName: string,
  buttonText: string,
}
export const ActionCard: React.FC<PropsType> = ({ cardLogo, cardName, buttonText }: PropsType) => {
  const {Text} = Typography;
  return (
    <li className={styles.card}>
      <Text className={styles.text}>{cardName}</Text>
      <Button 
        type='link'
        icon={cardLogo}
        className={styles.cardButton}
      >{buttonText}</Button>
    </li>
  )
}
