import iconFacebook from './assets/svg/icon-facebook.svg'
import iconInstagram from './assets/svg/icon-instagram.svg'
import iconLinkedIn from './assets/svg/icon-linked-in.svg'
import iconVk from './assets/svg/icon-vk.svg'

import styles from './footer.module.css'

export const Footer = () => (
    <footer className={styles.footer}>
        <hr />
        <div className={styles.content}>
            <span className={styles.footer_text}>© 2020-2023 Cleverland. Все права защищены.</span>
            <div className={styles.links_wrapper}>
                <a href='https://www.google.com/'><img src={iconFacebook} alt="icon social media" /></a>
                <a href='https://www.google.com/'><img src={iconInstagram} alt="icon social media" /></a>
                <a href='https://www.google.com/'><img src={iconVk} alt="icon social media" /></a>
                <a href='https://www.google.com/'><img src={iconLinkedIn} alt="icon social media" /></a>
            </div>
        </div>
    </footer>
  )

