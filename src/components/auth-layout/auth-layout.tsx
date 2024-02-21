import { Outlet } from "react-router-dom";

import styles from './auth-layout.module.scss';

export const AuthLayout: React.FC = () =>  (
  <section className={styles.autContainer}>
    <div className={styles.authWrapper}>
      <Outlet />
    </div>
  </section>
)
