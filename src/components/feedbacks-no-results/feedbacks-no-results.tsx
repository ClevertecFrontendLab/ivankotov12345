import { Button, Card, Typography } from 'antd';

import styles from './feedback-no-results.module.scss';

type PropsType = {
    setIsSendFeedbackOpen: (isSendFeedbackOpen: boolean) => void,
}

export const FeedbacksNoResults: React.FC<PropsType> = ({ setIsSendFeedbackOpen }) => {
  const { Title, Text } = Typography;

  const onClick = () => {
    setIsSendFeedbackOpen(true);
  }

  return (
    <div className={styles.wrapper}>
      <Card className={styles.card}>
        <Title level={3} className={styles.title}>Оставьте свой отзыв первым</Title>

        <div className={styles.textWrapper}>
          <Text>Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении.</Text>
          <Text>Поделитесь своим мнением и опытом с другими пользователями,</Text>
          <Text>и помогите им сделать правильный выбор.</Text>
        </div>
      </Card>

      <Button
        type='primary'
        size='large'
        className={styles.buttonMessage}
        onClick={onClick}
      >
        Написать отзыв
    </Button>
    </div>
  )
}
