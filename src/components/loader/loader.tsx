import Lottie from 'react-lottie';

import animationData from './json/loader.json';

import styles from './loader.module.scss';

export const Loader: React.FC = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <div className={styles.loaderWrapper} data-test-id='loader'>
      <Lottie
        options={defaultOptions}
        width={150}
        height={150}
      />
    </div>
  )
}
