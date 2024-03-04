import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { authSelect } from '@redux/slices/auth';
import { registrationSelect } from '@redux/slices/registration';
import { recoverySelect } from '@redux/slices/recovery';
import { Loader } from '@components/loader';

import styles from './auth-layout.module.scss';
import { useEffect } from 'react';
import { goBack } from 'redux-first-history';

export const AuthLayout: React.FC = () => {
  const { isLoading: isAuthLoading } = useAppSelector(authSelect);
  const { isLoading: isRegistrationLoading } = useAppSelector(registrationSelect);
  const { isLoading: isRecoveryLoading } = useAppSelector(recoverySelect);

  const dispatch = useAppDispatch()

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if(token) {
      dispatch(goBack());
    }
  }, [dispatch])
  
  return (
    <>
      {(isAuthLoading || isRegistrationLoading || isRecoveryLoading) && <Loader />}
      <section className={styles.autContainer}>
        
        <div className={styles.authWrapper}>
          <Outlet />
        </div>
      </section>
    </>
)}
