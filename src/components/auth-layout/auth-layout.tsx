import { Outlet } from 'react-router-dom';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { authSelect } from '@redux/slices/auth';
import { registrationSelect } from '@redux/slices/registration';
import { recoverySelect } from '@redux/slices/recovery';
import { Loader } from '@components/loader';

import styles from './auth-layout.module.scss';

export const AuthLayout: React.FC = () => {
  const { isLoading: isAuthLoading } = useAppSelector(authSelect);
  const { isLoading: isRegistrationLoading } = useAppSelector(registrationSelect);
  const { isLoading: isRecoveryLoading } = useAppSelector(recoverySelect);
  return (
      <section className={styles.autContainer}>
        {(isAuthLoading || isRegistrationLoading || isRecoveryLoading) && <Loader />}
        <div className={styles.authWrapper}>
          <Outlet />
        </div>
      </section>
)}
