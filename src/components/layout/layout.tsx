import { Outlet } from 'react-router-dom'

import { Footer } from '../footer/footer'
import { Header } from '../header/header'

import styles from './layout.module.css'

export const Layout = () => (
    <div className={styles.outer}>
        <Header />
        <Outlet />
        <Footer />
    </div>
  )

