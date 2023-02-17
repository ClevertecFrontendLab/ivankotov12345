
import React, { useState, useRef, useEffect } from 'react'
import classNames from 'classnames'

import styles from './main-page.module.css'
import icon_sort from './assets/svg/icon-sort-ascending.svg'
import icon_close from './assets/svg/icon-close.svg'
import { BookCard } from '../../components/book-card/book-card'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { BooksSelect, getBooksListFetch } from '../../store/slices/books-slice'
import { Loader } from '../../components/loader/loader'
import { ErrorMessage } from '../../components/error-message/error-message'

export const MainPage = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isTile, setIsTile] = useState<boolean>(true);
  const [isBtnSearchClicked, setIsBtnSearchClicked] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { books: booksListAll, error, isLoading } = useAppSelector(BooksSelect)

  useEffect(() => {
    if(!booksListAll) {
      dispatch(getBooksListFetch())
    }
  }, [booksListAll, dispatch])

  const inputEl = useRef<HTMLInputElement>(null);

  const focusSearch = (e: React.FocusEvent) => {
    e.preventDefault();
    setIsFocused(true);
  };

  const blurSearch = (e: React.FocusEvent) => {
    e.preventDefault();
    setIsFocused(false);
    setIsBtnSearchClicked(false)
  };

  const changeBookViewTile = () => {
    setIsTile(true);
  };

  const changeBookViewList = () => {
    setIsTile(false);
  };

  const searchHandler = () => {
    setIsBtnSearchClicked(true);
  };

  const searchClose = () => {
    setIsBtnSearchClicked(false);
    setIsFocused(false);
  };

  useEffect(() => {
    if(isBtnSearchClicked) {
      inputEl.current?.focus();
    };
  }, [isBtnSearchClicked]);

  if(isLoading) {
    return <Loader />
  }
  if(error) {
    return <ErrorMessage error={error} />
  }
  return (
  <section className={styles.main_page}>
    
    <div>
      <div className={styles.panel}>
        <div className={styles.panel_search_wrapper }>
          <input type='search' placeholder='Поиск книги или автора…' className={classNames(styles.panel_search, isBtnSearchClicked && styles.panel_search_active)} onFocus={focusSearch} onBlur={blurSearch} ref={inputEl} data-test-id='input-search' />

          {isFocused && 
          <button type='button' className={styles.button_close} onClick={searchClose} data-test-id='button-search-close'>
            <img src={icon_close} alt='close button' />
          </button>}

          <button type='button' className={classNames(styles.button_search, isBtnSearchClicked && styles.button_search_clicked)} onClick={searchHandler} data-test-id='button-search-open'>
            <span className={styles.button_image_search} />
          </button>
        </div>

        <button type='button' className={classNames(styles.button_sort, isFocused && styles.button_display_hidden)}>
          <img src={icon_sort} alt="icon sort" className={styles.button_sort_image} />
          <span className={styles.button_sort_text}>По рейтингу</span>
        </button>
        
        <button type='button' data-test-id='button-menu-view-window' className={classNames(styles.button_display_tile, isTile && styles.active, isFocused && styles.button_display_hidden)} onClick={changeBookViewTile}>
          <span className={
          isTile === true  
            ? styles.button_image_tile_active
            : styles.button_image_tile
          } />
        </button>

        <button type='button' data-test-id='button-menu-view-list' className={classNames(styles.button_display_list, !isTile && styles.active, isFocused && styles.button_display_hidden)} onClick={changeBookViewList}>
        <span className={
          isTile === false  
            ? styles.button_image_list_active
            : styles.button_image_list
          } />
        </button>
      </div>

      <div className={styles.content_wrapper}>
        <ul className={ isTile === true ? styles.content_grid : styles.content_list}>
          {booksListAll?.map(({id, authors, booking, categories, delivery, histories, image, issueYear, rating, title}) => <BookCard key={id} 
                id={id} 
                image={image} 
                rating={rating} 
                title={title} 
                authors={authors} 
                issueYear={issueYear}
                delivery={delivery}
                booking={booking}
                isTile={isTile}
                categories={categories}
                histories={histories} />)}
        </ul>
      </div>
    </div>
  </section>
)
}