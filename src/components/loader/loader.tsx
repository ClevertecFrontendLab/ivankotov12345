import spinnerThumb from './assets/svg/spinner-thumb.svg'

import styles from './loader.module.css'

export const Loader = () => (
    <div className={styles.loader} data-test-id='loader'>
        <img src={spinnerThumb} alt="spinner thumb" className={styles.spinner} />
    </div>
  )

