import { StarFilled, StarOutlined } from '@ant-design/icons';
import { Rate } from 'antd';

type RatingProps = {
  rating: number
  setRating?: (rating: number) => void
  size: number,
  disabled: boolean
}

export const Rating: React.FC<RatingProps> = ({ rating, setRating, size, disabled }) => {
  const starStyle = {
    fontSize: `${size}px`,
    color: '#faad14'
  };

  const onRatingClick = (value: number) => setRating && setRating(value);

  const currentCharacter = ({ index = 0, value = 0 }) => (
    index < value
      ? <StarFilled style={starStyle} />
      : <StarOutlined style={starStyle} />
  )

  return (
    <Rate
      disabled={disabled}
      value={rating}
      onChange={onRatingClick}
      character={currentCharacter}
    />
  )
}
