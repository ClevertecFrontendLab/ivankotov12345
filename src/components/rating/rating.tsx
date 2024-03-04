import { Rate } from 'antd';
import { StarFilled, StarOutlined } from '@ant-design/icons';


import styles from './rating.module.scss';


type PropsType = {
  rating: number
  setRating?: (rating: number) => void
  size: number,
  disabled: boolean
}

export const Rating: React.FC<PropsType> = ({ rating, setRating, size, disabled }) => {

  const starStyle = { fontSize: `${size}px` };

  const onRatingClick = (value: number) => {
    setRating && setRating(value)
  }
  return (
    <Rate
      disabled={disabled}
      value={rating}
      onChange={onRatingClick}
      character={({ index = 0, value = 0 }) => (
        index < value
          ? <StarFilled style={starStyle} className={styles.star} />
          : <StarOutlined style={starStyle} className={styles.star} />
      )}
    />
  )
}
