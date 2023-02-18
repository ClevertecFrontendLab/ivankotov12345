import classNames from 'classnames';

import { ButtonPropsType } from '../../types/prop-types';

import styles from './button.module.css';

export const Button = ({ booking, delivery, buttonStyles }: ButtonPropsType) => {
    const buttonReserve = !!booking === false
                        ? 'Забронировать'
                        : !!booking === true
                        ? 'Забронирована'
                        : `Занята до ${delivery?.dateHandedTo}`;
    
    const isDisabled = delivery?.handed ? true : false;

    const buttonClasses = classNames(buttonStyles, buttonReserve === 'Забронировать' ? styles.button_not_reserved : styles.button_reserved )

  return (
    <button type='button' disabled={isDisabled} className={buttonClasses}>{buttonReserve}</button>
  )
}
