import styles from './footer.module.css'
import iconFacebook from './assets/svg/icon-facebook.svg'
import iconInstagram from './assets/svg/icon-instagram.svg'
import iconVk from './assets/svg/icon-vk.svg'
import iconLinkedIn from './assets/svg/icon-linked-in.svg'

export const Footer = () => (
    <footer className={styles.footer}>
        <hr />
        <div className={styles.content}>
            <span className={styles.footer_text}>© 2020-2023 Cleverland. Все права защищены.</span>
            <div className={styles.links_wrapper}>
                <a href='#'><img src={iconFacebook} alt="icon social media" /></a>
                <a href='#'><img src={iconInstagram} alt="icon social media" /></a>
                <a href='#'><img src={iconVk} alt="icon social media" /></a>
                <a href='#'><img src={iconLinkedIn} alt="icon social media" /></a>
            </div>
        </div>
    </footer>
  )

