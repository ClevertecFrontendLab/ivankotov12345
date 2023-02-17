import { Link } from 'react-router-dom'
import logo from './assets/svg/logo.svg'
import avatar from './assets/img/avatar.jpg'
import styles from './header.module.css'
import { BurgerMenu } from '../burger-menu/burger-menu'

export const Header = () => (
    <header className={styles.outer}>
      <Link to='/' className={styles.link_homepage}><img src={logo} alt='clevertec logo' /></Link>

      <BurgerMenu />
      
      <span className={styles.text_library}>Библиотека</span>
      
      <div className={styles.user_greetings}>
        <span>Привет, Иван!</span>
        <img src={avatar} alt='user avatar' className={styles.user_image} />
      </div>
    </header>
  )

