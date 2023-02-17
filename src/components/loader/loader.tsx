import styles from './loader.module.css'
import spinnerThumb from './assets/svg/spinner-thumb.svg'

export const Loader = () => (
    <div className={styles.loader} data-test-id='loader'>
        <img src={spinnerThumb} alt="spinner thumb" className={styles.spinner} />
    </div>
  )

