import { Outlet } from'react-router-dom'

import { useScreenWidth } from '../../hooks/use-screen-width'
import { Menu } from '../menu/menu'

import styles from './layout-main-page.module.css'

export const LayoutMainPage = () => {
    const windowSize = useScreenWidth();
    
    const dataTestIdShowcase = 'navigation-showcase';
    const dataTestIdBooks = 'navigation-books';
    const dataTestIdTerms = 'navigation-terms';
    const dataTestIdContract = 'navigation-contract';

    return (
    <main className={styles.main}>
        {windowSize && windowSize > 900 && 
        <aside data-test-id='burger-navigation'>
          <Menu dataTestIdShowcase={dataTestIdShowcase} dataTestIdBooks={dataTestIdBooks} dataTestIdTerms={dataTestIdTerms} dataTestIdContract={dataTestIdContract} />
        </aside>}
        <Outlet />
    </main>
  )
}
