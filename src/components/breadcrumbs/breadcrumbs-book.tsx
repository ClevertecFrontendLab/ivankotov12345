import { useAppSelector } from '../../store/hooks';
import { BooksSelect } from '../../store/slices/books-slice';
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
      {categoryName === 'all' ? 'Все книги' : category?.name}
      <span className={styles.slash}>/</span> 
      {bookName?.title}
      </span>
  </div>
  )
}
