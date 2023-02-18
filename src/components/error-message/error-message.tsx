import { ErrorPropsType } from '../../types/prop-types'

import closeError from './assets/svg/close.svg'
import errorSvg from './assets/svg/error.svg'

import styles from './error.module.css'

export const ErrorMessage = ({error}: ErrorPropsType) =>  (
  <div className={styles.outer}>
    <div className={styles.wrapper} data-test-id='error'>
      <img src={errorSvg} alt="error" />
      <span className={styles.text_error}>{error}</span>
      <img src={closeError} alt="close" className={styles.error_close} />
      </div>
</div>
  )

