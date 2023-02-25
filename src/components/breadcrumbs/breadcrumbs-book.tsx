import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { BooksSelect, getBooksListFetch } from '../../store/slices/books-slice';
import { navListSelect } from '../../store/slices/navigation-list-slice';
import { BreadCrumbsPropsType } from '../../types/prop-types';

import styles from './breadcrumbs.module.css'

export const Breadcrumbs = ({ categoryName, bookId } : BreadCrumbsPropsType) => {
    const { navList: navListCategories } = useAppSelector(navListSelect);
    const { books: booksListAll } = useAppSelector(BooksSelect);

    const category = navListCategories?.find(categ => categ.path === categoryName)
    const bookName = booksListAll?.find(name => name.id.toString() === bookId)

  return (
    <div className={styles.path_section_outer}>
      <span className={styles.path_section_inner}>

          <Link to={ categoryName === 'all'
          ? '/books/all' 
          : `/books/${categoryName}` }  
          data-test-id='breadcrumbs-link'>
            {categoryName === 'all' ? 'Все книги': category?.name}
            </Link> 

        <span className={styles.slash}>/</span> 

        <span data-test-id='book-name'>{bookName?.title}</span>
      </span>
  </div>
  )
}
