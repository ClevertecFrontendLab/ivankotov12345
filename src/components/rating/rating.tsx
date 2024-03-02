import { StarFilled, StarOutlined } from '@ant-design/icons';

import styles from './rating.module.scss';

type PropsType = {
  rating: number
}

export const Rating: React.FC<PropsType> = ({ rating }) => {
  const ratingArr: number[] = Array(rating).fill(1);
  while (ratingArr.length < 5) {
    ratingArr.push(0);
  }
  return (
    <div className={styles.ratingWrapper}>
      {ratingArr.map((star, index) => (
        <span key={index}>
          {star > 0
            ? <StarFilled className={styles.star} />
            : <StarOutlined className={styles.star} />}
        </span>
      ))}
    </div>
  )
}
