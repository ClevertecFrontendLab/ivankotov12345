import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom'
import classNames from 'classnames';
import { NAV_BOOKS_ALL, NAV_LIST } from '../../constants/paths';
import styles from './menu.module.css'
import { MenuProps } from '../../types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getNavListFetch, navListSelect } from '../../store/slices/navigation-list-slice';
import { ErrorMessage } from '../error-message/error-message';



export const Menu = ({ closeMenu, dataTestIdShowcase, dataTestIdBooks, dataTestIdTerms, dataTestIdContract }: MenuProps) => {
    const { pathname } = useLocation();

    const [isMenuCollapsed, setIsmenuCollapsed] = useState<boolean>(true);

    const collapseHandler = () => {
        setIsmenuCollapsed(!isMenuCollapsed)
    }
    const { navList: navListCategories, error, isLoading } = useAppSelector(navListSelect);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const pathNameArr = pathname.split('/');
        if(+pathNameArr[pathNameArr.length -1] || pathNameArr[pathNameArr.length -1] === 'terms' || pathNameArr[pathNameArr.length -1] === 'contract') {
            setIsmenuCollapsed(false);
        }
    }, [pathname]);

    useEffect(() => {
        dispatch(getNavListFetch())
    }, [dispatch])

    if(error) {
        return <ErrorMessage error={error}/>
    }
    return (
    <div className={styles.nav_menu}>
        <nav>
            <ul className={styles.nav_list}>
                <ul className={styles.nav_list_books}>
                    <li className={styles.panel_list} data-test-id={dataTestIdShowcase}>
                       <NavLink 
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

                    <li className={styles.сategory_item} key={NAV_BOOKS_ALL.id} data-test-id={dataTestIdBooks}>
                                <NavLink 
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
                                    {name}
                                </span>
                                </NavLink>
                            </li>
                        ))}
{/*                         {NAV_BOOKS_LIST.map(({ name, category, quantity, dataTestId }) => (
                            <li className={styles.сategory_item} key={category} data-test-id={dataTestId}>
                                <NavLink 
                                className={({ isActive }) => isActive 
                                ? classNames(styles.category_list_item, styles.active_category)
                                : styles.category_list_item}
                                onClick={closeMenu}
                                to={`/${NAV_LIST.books.path}/${category}`}
                                >
                                    <span>
                                        {name}
                                        {quantity !== undefined ? <span className={styles.quantity}>{quantity}</span> : null}
                                    </span> 
                                </NavLink>
                              
                            </li>
                        ))} */}


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