import { useEffect } from 'react'
import { Outlet } from'react-router-dom'

import { useScreenWidth } from '../../hooks/use-screen-width'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { BooksSelect } from '../../store/slices/books-slice'
import { getNavListFetch, navListSelect } from '../../store/slices/navigation-list-slice'
import { ErrorMessage } from '../error-message/error-message'
import { Menu } from '../menu/menu'

import styles from './layout-main-page.module.css'

export const LayoutMainPage = () => {
    const windowSize = useScreenWidth();

    const { navList: navListCategories, error } = useAppSelector(navListSelect)
    const { books: booksListAll } = useAppSelector(BooksSelect);
    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(getNavListFetch())
  }, [dispatch])
    
    const dataTestIdShowcase = 'navigation-showcase';
    const dataTestIdBooks = 'navigation-books';
    const dataTestIdTerms = 'navigation-terms';
    const dataTestIdContract = 'navigation-contract';
    const dataTestIdCategory = 'navigation-'
    const dataTestIdQuantity = 'navigation-book-count-for-'

    if(error) {
      return <ErrorMessage error={error}/>
  }

    return (
    <main className={styles.main}>
        {windowSize && windowSize > 900 && 
        <aside data-test-id='burger-navigation'>
          <Menu dataTestIdShowcase={dataTestIdShowcase} dataTestIdBooks={dataTestIdBooks} dataTestIdTerms={dataTestIdTerms} dataTestIdContract={dataTestIdContract} dataTestIdCategory={dataTestIdCategory} dataTestIdQuantity={dataTestIdQuantity} navListCategories={navListCategories} booksListAll={booksListAll} />
        </aside>}
        <Outlet />
    </main>
  )
}
