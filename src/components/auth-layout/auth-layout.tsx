import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { Loader } from '@components/loader';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { authSelect } from '@redux/slices/auth';
import { recoverySelect } from '@redux/slices/recovery';
import { registrationSelect } from '@redux/slices/registration';

import styles from './auth-layout.module.scss';

export const AuthLayout: React.FC = () => {
  const { isLoading: isAuthLoading } = useAppSelector(authSelect);
  const { isLoading: isRegistrationLoading } = useAppSelector(registrationSelect);
  const { isLoading: isRecoveryLoading } = useAppSelector(recoverySelect);

  return (
    <Fragment>
      {(isAuthLoading || isRegistrationLoading || isRecoveryLoading) && <Loader />}
      <section className={styles.autContainer}>
        <div className={styles.authWrapper}>
          <Outlet />
        </div>
      </section>
    </Fragment>
)}
