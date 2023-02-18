import { RatingPropsType } from '../../types'

import starEmpty from './assets/svg/rating-empty.svg'
import starFilled from './assets/svg/rating-filled.svg'

export const Rating = ({ ratingVal, classRating, classStars, classStar }: RatingPropsType) => {
  let positive = 0;
  let negative = 0;

  const ratingRound = ratingVal ? Math.trunc(ratingVal) : null

  const starsArr: number[] = [];

  while (starsArr.length !== ratingRound && ratingRound!==null) {
    starsArr.push(positive +=1)
  };
  while (starsArr.length !== 5 && ratingRound!==null) {
    starsArr.push(negative -=1);
  };

  return (
    <div className={classRating}>{ratingRound === null 
      ? <span>еще нет оценок</span> 
      : <div className={classStars}>
        {starsArr.map(el => el > 0 ? <img src={starFilled} alt='star filled' key={el} className={classStar} /> : <img src={starEmpty} alt='star empty' key={el} className={classStar} />)}</div>}
      </div>
  )
}

