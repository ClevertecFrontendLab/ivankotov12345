import { UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Typography } from 'antd';

import { Rating } from '@components/rating';

import styles from './commentary.module.scss'

type PropsType = {
  createdAt: string,
  fullName: string | null,
  imageSrc: string | null,
  message: string | null,
  rating: number,
}

export const Commentary: React.FC<PropsType> = (
  {
    createdAt,
    fullName,
    imageSrc,
    message,
    rating,
  }) => {
  const { Text } = Typography;
  const fullNameArr = fullName?.split(' ');
  return (
    <Card className={styles.commentaryWrapper}>
      <div className={styles.commentaryUser}>
        <Avatar src={imageSrc || <UserOutlined className={styles.userLogo} />} size={42} className={styles.avatar} />
        {fullName &&
          <div>
            {fullNameArr?.map((el, index) => (
              <Text className={styles.textUserName} key={index}>
                {el}
              </Text>
            ))}
          </div>}
      </div>
      <div>
        <div className={styles.commentaryHead}>
          <Rating rating={rating} size={16} disabled={true} />
          <Text type='secondary' className={styles.textDate}>
            {new Date(createdAt).toLocaleDateString()}
          </Text>
        </div>
        <Text className={styles.commentaryText}>{message}</Text>
      </div>
    </Card>
  )
}
