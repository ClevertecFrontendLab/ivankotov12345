import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom'
import classNames from 'classnames';

import { NAV_BOOKS_ALL, NAV_LIST } from '../../constants/paths';
import { useAppSelector } from '../../store/hooks';
import { BooksSelect } from '../../store/slices/books-slice';
import { MenuProps } from '../../types';
import { BookCardType } from '../../types/book-types';

import styles from './menu.module.css'



export const Menu = ({ closeMenu, dataTestIdShowcase, dataTestIdBooks, dataTestIdTerms, dataTestIdContract, dataTestIdCategory, dataTestIdQuantity, navListCategories }: MenuProps) => {
    const { pathname } = useLocation();

    const [isMenuCollapsed, setIsmenuCollapsed] = useState<boolean>(true);

    const collapseHandler = () => {
        setIsmenuCollapsed(!isMenuCollapsed)
    }
    
    const { books: booksListAll } = useAppSelector(BooksSelect);

    const getBoooksCategoryQuantity = (books: BookCardType[], category: string) => {
        let quantity = 0

        books?.forEach(book => {
            if (book.categories?.includes(category)) {
                quantity+=1
            }
        })

        return quantity
    }
    

    useEffect(() => {
        const pathNameArr = pathname.split('/');

        if(+pathNameArr[pathNameArr.length -1] || pathNameArr[pathNameArr.length -1] === 'terms' || pathNameArr[pathNameArr.length -1] === 'contract') {
            setIsmenuCollapsed(false);
        } else {
            setIsmenuCollapsed(true)
        }
    }, [pathname]);

    return (
    <div className={styles.nav_menu}>
        <nav>
            <ul className={styles.nav_list}>
                <ul className={styles.nav_list_books}>
                    <li className={styles.panel_list} >
                       <NavLink data-test-id={dataTestIdShowcase}
                       className={({ isActive }) => isActive 
                       ? classNames(styles.books_item, styles.active_books_item)
                       : styles.books_item} 
                        
                       onClick={collapseHandler}
 
                       to={ 
                        pathname.split('/')[1] === NAV_LIST.books.path && 
                        pathname.split('/')[2] !== NAV_BOOKS_ALL.path 
                        ? `/${NAV_LIST.books.path}/${pathname.split('/')[2]}` 
                        : `/${NAV_LIST.books.path}/${NAV_BOOKS_ALL.path}` }
                        >
                            {NAV_LIST.books.name}

                            <div className={
                                pathname.split('/')[1] === NAV_LIST.books.path
                                ? isMenuCollapsed 
                                    ? styles.books_arrow
                                    : classNames(styles.books_arrow, styles.books_arrow_not_active)
                                : styles.books_arrow_none
                            } />
                        </NavLink>
                    </li>
                    
                    <ul className={classNames(styles.book_list_items, 
                        !isMenuCollapsed && styles.books_list_items_hidden)}>

                    <li className={styles.сategory_item} key={NAV_BOOKS_ALL.id}>
                                <NavLink 
                                data-test-id={dataTestIdBooks}
                                className={({ isActive }) => isActive 
                                ? classNames(styles.category_list_item, styles.active_category)
                                : styles.category_list_item}
                                onClick={closeMenu}
                                to={`/${NAV_LIST.books.path}/${NAV_BOOKS_ALL.path}`}
                                >
                                    <span>
                                        {NAV_BOOKS_ALL.name}
                                    </span> 
                                </NavLink>
                            </li>
                        
                        {navListCategories?.map(({ id, name, path }) => (
                            <li className={styles.сategory_item} key={id}>
                                <NavLink 
                                className={({ isActive }) => isActive 
                                ? classNames(styles.category_list_item, styles.active_category)
                                : styles.category_list_item}
                                onClick={closeMenu}
                                to={`/${NAV_LIST.books.path}/${path}`}
                                >
                                 <span>
                                    <span data-test-id={`${dataTestIdCategory}${path}`}>{name}</span>
                                    <span className={styles.quantity} data-test-id={`${dataTestIdQuantity}${path}`}>{getBoooksCategoryQuantity(booksListAll as BookCardType[], name as string)}</span>
                                </span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </ul>
                <li className={styles.panel_list}>
                    <NavLink
                    className={({ isActive }) => isActive 
                    ? classNames(styles.nav_list_item, styles.active_item)
                    : styles.nav_list_item}

                    onClick={closeMenu}
                    data-test-id={dataTestIdTerms}
                    to={`/${NAV_LIST.terms.path}`}>
                        {NAV_LIST.terms.name}
                    </NavLink>
                </li>

                <li className={styles.panel_list}>
                    <NavLink 
                    className={({ isActive }) => isActive 
                    ? classNames(styles.nav_list_item, styles.active_item)
                    : styles.nav_list_item} 

                    onClick={closeMenu}
                    
                    to={`/${NAV_LIST.contract.path}`}
                    data-test-id={dataTestIdContract}>
                        {NAV_LIST.contract.name}
                    </NavLink>
                </li>
            </ul>
        </nav>
    </div>
  )}