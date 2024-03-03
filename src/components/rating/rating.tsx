import { StarFilled, StarOutlined } from '@ant-design/icons';

import styles from './rating.module.scss';
import { Button } from 'antd';


type PropsType = {
  rating: number
  setRating?: (rating: number) => void
  size: number,
  disabled: boolean
}

export const Rating: React.FC<PropsType> = ({ rating, setRating, size, disabled }) => {
  const ratingArr: number[] = Array(rating).fill(1);
  while (ratingArr.length < 5) {
    ratingArr.push(0);
  }

  const starStyle = { fontSize: `${size}px` };

  const onRatingClick = (index: number) => {
    setRating && setRating(index + 1)
  }
  return (
    <div className={styles.ratingWrapper}>
      {ratingArr.map((star, index) => (
        <Button
          type='link'
          key={index}
          onClick={() => onRatingClick(index)}
          className={styles.starButton}
          icon={star > 0
            ? <StarFilled style={starStyle} className={styles.star} />
            : <StarOutlined style={starStyle} className={styles.star} />}
          disabled={disabled}
        />
      ))}
    </div>
  )
}
