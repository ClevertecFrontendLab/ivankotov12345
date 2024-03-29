import { Button, Card, Typography } from 'antd';

import styles from './feedback-no-results.module.scss';

type FeedbackNoResulstProps = {
    setIsSendFeedbackOpen: (isSendFeedbackOpen: boolean) => void,
}

const { Title, Text } = Typography;

export const FeedbacksNoResults: React.FC<FeedbackNoResulstProps> = ({ setIsSendFeedbackOpen }) => {
  const onClick = () => setIsSendFeedbackOpen(true);

  return (
    <div className={styles.wrapper}>
      <Card className={styles.card}>
        <Title level={3} className={styles.title}>Оставьте свой отзыв первым</Title>

        <div className={styles.textWrapper}>
          <Text className={styles.text}>Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении.</Text>
          <Text className={styles.text}>Поделитесь своим мнением и опытом с другими пользователями,</Text>
          <Text className={styles.text}>и помогите им сделать правильный выбор.</Text>
        </div>
      </Card>

      <Button
        type='primary'
        size='large'
        className={styles.buttonMessage}
        onClick={onClick}
        data-test-id='write-review'
      >
        Написать отзыв
    </Button>
    </div>
  )
}
