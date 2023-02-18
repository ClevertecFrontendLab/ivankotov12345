import React,{ useEffect, useRef,useState } from 'react'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'

import { useScreenWidth } from '../../hooks/use-screen-width'
import { Menu } from '../menu/menu'

import styles from './burger-menu.module.css'

export const BurgerMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const windowSize = useScreenWidth();

  const nav = useRef<HTMLDivElement>(null);
  const btnBurger = useRef<HTMLButtonElement>(null);

  const burgerHandler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const clickOutsideMenu = (event: MouseEvent) => {
      if (isMenuOpen && nav.current && !nav.current.contains(event.target as Node) && !btnBurger.current?.contains(event.target as Node)) {
        setIsMenuOpen(!isMenuOpen);
        event.preventDefault();
        event.stopPropagation();
      };
    }

    document.addEventListener('click', clickOutsideMenu);
  });

  useEffect(() => {
    const bodyStyles = document.body.style;

    if(isMenuOpen) {
      bodyStyles.overflow = 'hidden'
    } else {
      bodyStyles.overflow = 'scroll'
    }
  })

  const dataTestIdShowcase = 'burger-showcase';
  const dataTestIdBooks = 'burger-books';
  const dataTestIdTerms = 'burger-terms';
  const dataTestIdContract = 'burger-contract';
  
  return(
  <React.Fragment>
    <button type='button' onClick={burgerHandler} className={classNames(styles.burger, isMenuOpen && styles.burger_active)} ref={btnBurger} data-test-id='button-burger'>
      <span />
    </button>

    {windowSize && windowSize <= 900 && 
    <div className={classNames(styles.navigation, isMenuOpen && styles.navigation_active)} ref={nav} data-test-id='burger-navigation'>
      <div className={isMenuOpen && styles.navigation_inner}>
      <Menu closeMenu={closeMenu} dataTestIdShowcase={dataTestIdShowcase} dataTestIdBooks={dataTestIdBooks} dataTestIdTerms={dataTestIdTerms} dataTestIdContract={dataTestIdContract} />

      <hr className={styles.profile_line} />
      
      <ul className={styles.profile_nav}>
        <li>
          <NavLink to='/' className={({ isActive }) => isActive 
          ? classNames(styles.nav_list_item, styles.active_item)
          : styles.nav_list_item}>
            Профиль
          </NavLink>
        </li>

        <li>
          <NavLink to='/' className={({ isActive }) => isActive 
          ? classNames(styles.nav_list_item, styles.active_item)
          : styles.nav_list_item} >
            Выход
          </NavLink>
        </li>
      </ul>
      </div>
    </div>}
  </React.Fragment>

  )
}
