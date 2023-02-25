
import { ChangeEvent, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { BookCard } from '../../components/book-card/book-card'
import { ErrorMessage } from '../../components/error-message/error-message'
import { Loader } from '../../components/loader/loader'
import { Panel } from '../../components/panel/panel'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { BooksSelect, getBooksListFetch } from '../../store/slices/books-slice'
import { navListSelect } from '../../store/slices/navigation-list-slice'
import { sortSelect } from '../../store/slices/sort-slice'
import { SortType } from '../../store/slices/types'
import { BookCardType } from '../../types/book-types'

import styles from './main-page.module.css'


export const MainPage = () => {
  const { pathname } = useLocation()
  const categoryPathName = pathname.split('/')[2]

  const [isTile, setIsTile] = useState<boolean>(true);
  const [bookName, setBookName] = useState<string>('');

  const searchPanelChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBookName(event.target.value)
  }

  const dispatch = useAppDispatch();

  const { books: booksListAll, error, isLoading } = useAppSelector(BooksSelect);
  const { navList: navListCategories } = useAppSelector(navListSelect);
  const { sortingType } = useAppSelector(sortSelect);
  const [booksList, setBooksList] = useState<BookCardType[]>([]);

  useEffect(() => {
    if(!booksListAll) {
      dispatch(getBooksListFetch())
    }
  }, [booksListAll, dispatch])

  useEffect(() => {
    let sortedBooksAll

    if(sortingType === SortType.RATING_LOW_FIRST) {
      sortedBooksAll = booksListAll && [...booksListAll].sort((a, b) => 
                          !a.rating && !b.rating
                          ? -1
                          : !a.rating
                          ? -1
                          : !b.rating
                          ? 1
                          : a.rating - b.rating
                          ? a.rating - b.rating
                          : -1)
    } else {
      sortedBooksAll = booksListAll && [...booksListAll].sort((a, b) => 
                          !a.rating && !b.rating
                          ? -1
                          : !a.rating
                          ? 1
                          : !b.rating
                          ? -1
                          : a.rating - b.rating
                          ? b.rating - a.rating
                          : -1)
    }
    if(sortedBooksAll) {
      setBooksList(sortedBooksAll)
    }
  }, [sortingType, booksListAll])

  const currCategory = navListCategories?.filter(category => category.path === categoryPathName)[0];

  const filterCategory = categoryPathName === 'all' ? booksList : booksList?.filter(book => 
  book.categories?.includes(currCategory?.name as string));

  const booksFiltered = categoryPathName === 'all'
                                  ? booksList?.filter(book => 
                                      book.title.toLowerCase().includes(bookName.toLowerCase()))
                                  : booksList?.filter(book => 
                                      book.categories?.includes(currCategory?.name as string) &&
                                      book.title.toLowerCase().includes(bookName.toLowerCase()));
  
  if(error) {
    return <ErrorMessage error={error} />
  }

  return (
  <section className={styles.main_page}>
    
    <div>
      <Panel isTile={isTile} setIsTile={setIsTile} searchPanelChange={searchPanelChange} />

      <div className={styles.content_wrapper}>
        <ul className={ isTile === true ? styles.content_grid : styles.content_list}>
          {booksFiltered?.length
            ? booksFiltered?.map(({id, authors, booking, categories, delivery, histories, image, issueYear, rating, title}) => <BookCard key={id} 
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
                histories={histories}
                bookName={bookName} />)
            : filterCategory.length > 0
            ? <div className={styles.empty_book_list}  data-test-id='search-result-not-found'>По запросу ничего не найдено</div> 
            : <div className={styles.empty_book_list}  data-test-id='empty-category'>
                В этой категории книг ещё нет
              </div>}
        </ul>
      </div>
    </div>
  </section>
)
}