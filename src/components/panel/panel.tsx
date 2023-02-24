import { useEffect,useRef, useState } from 'react'
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { sortingToggle, sortSelect } from '../../store/slices/sort-slice';
import { SortType } from '../../store/slices/types';
import { PanelPropsType } from '../../types/prop-types';

import icon_close from './assets/svg/icon-close.svg'
import icon_sort from './assets/svg/icon-sort-ascending.svg'
import icon_sort_descending from './assets/svg/icon-sort-descending.svg'

import  styles  from './panel.module.css'


export const Panel = ({ isTile, setIsTile, searchPanelChange }: PanelPropsType) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const [isBtnSearchClicked, setIsBtnSearchClicked] = useState<boolean>(false);

  const dispatch = useAppDispatch()

  const { sortingType } = useAppSelector(sortSelect)

  const sortButtonClick = () => {
    dispatch(sortingToggle())
  }

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
    setIsFocused(!isFocused);
  };

  const searchClose = () => {
    setIsBtnSearchClicked(false);
    setIsFocused(false);
  };
  
  useEffect(() => {
    if(inputEl.current != null && isFocused) {
      inputEl.current.focus();
    }
  })

  return (
    <div className={styles.panel}>
    <div className={styles.panel_search_wrapper }>
      <input type='search' placeholder='Поиск книги или автора…' className={classNames(styles.panel_search, isBtnSearchClicked && styles.panel_search_active)} ref={inputEl} onFocus={focusSearch} onBlur={blurSearch}  data-test-id='input-search' onChange={searchPanelChange} />

      {isFocused && 
      <button type='button' className={styles.button_close} onClick={searchClose} data-test-id='button-search-close'>
        <img src={icon_close} alt='close button' />
      </button>}

      <button type='button' className={classNames(styles.button_search, isBtnSearchClicked && styles.button_search_clicked)} onClick={searchHandler} data-test-id='button-search-open'>
        <span className={styles.button_image_search} />
      </button>
    </div>

    <button type='button' className={classNames(styles.button_sort, isFocused && styles.button_display_hidden)} onClick={sortButtonClick} data-test-id='sort-rating-button'>
      <img src={sortingType === SortType.RATING_UP_FIRST ? icon_sort : icon_sort_descending} alt="icon sort" className={styles.button_sort_image} />
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
  )
}
