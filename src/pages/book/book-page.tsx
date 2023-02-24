import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import classNames from 'classnames';
import SwiperCore,{ FreeMode, Pagination,Thumbs } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react';

import bookNoCover from '../../assets/img/no-cover-book.jpg'
import { Breadcrumbs } from '../../components/breadcrumbs/breadcrumbs-book';
import { Button } from '../../components/button/button';
import { Commentary } from '../../components/commentary/commentary';
import { ErrorMessage } from '../../components/error-message/error-message';
import { Loader } from '../../components/loader/loader';
import { Rating } from '../../components/rating/rating';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { BookSelect, getBookFetch } from '../../store/slices/book-slice';

import arrow from './assets/svg/arrow.svg'

import './swiper.css'
import styles from './book-page.module.css';

import 'swiper/css';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';



export const BookPage = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore>();
  const [isCommentariesOpen, setIsCommentariesOpen] = useState<boolean>(true);

  const { pathname } = useLocation()
  const categoryName = pathname.split('/')[2]
  const {bookId} = useParams();
  const dispatch = useAppDispatch();
  const { book: bookCurrent, error, isLoading } = useAppSelector(BookSelect)


  useEffect(() => {
      dispatch(getBookFetch(bookId as unknown as string))
  }, [dispatch, bookId])

  const commentSectionHandler = () => {
    setIsCommentariesOpen(!isCommentariesOpen);
  };

  if(isLoading) {
    return <Loader />
  }
  if(error) {
    return (
    <div className={styles.error_msg_outer}>
      <ErrorMessage error={error} />
      <Breadcrumbs categoryName={categoryName} bookId={bookId} />
    </div>
    )
  }

  return (
  <section className={styles.book_page}>

    <Breadcrumbs categoryName={categoryName} bookId={bookId} />
      
    <div className={styles.book_section}>
      <div className={styles.book_image_wrapper}>
        {bookCurrent?.images && bookCurrent?.images.length >= 1 
        ? <Swiper
        loop={bookCurrent?.images.length > 1 && true}
        slidesPerView={1}
        modules={[Thumbs, Pagination, FreeMode]}
        thumbs={{
          swiper:
            thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        pagination={{ clickable: true }}
        className={styles.slide}
        data-test-id='slide-big'>
          {bookCurrent?.images.map(el => (
            <SwiperSlide key={el.url}>
              <img src={`https://strapi.cleverland.by${el.url}`} alt="book" className={styles.book_img} />
            </SwiperSlide>
          ))}
        </Swiper> 
        : <img src={bookNoCover} alt='cover' className={styles.book_img} />}

        {bookCurrent?.images && bookCurrent?.images.length > 1 && 
        <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs]}
        slidesPerView={5}
        className={styles.book_img_list}
        >
          {bookCurrent?.images.map(el => (
            <SwiperSlide key={el.url} className={styles.book_img_list_inner} data-test-id='slide-mini'>
              <img src={`https://strapi.cleverland.by${el.url}`} alt="book" className={styles.book_img_preview} />
            </SwiperSlide>
          ))}
        </Swiper>}
      </div>
        <h1 className={styles.name} data-test-id='book-title'>{bookCurrent?.title}</h1>

        <span className={styles.author}>{bookCurrent?.authors?.join(', ')}, {bookCurrent?.issueYear}</span>

        <Button delivery={bookCurrent?.delivery} booking={bookCurrent?.booking} buttonStyles={styles.button} />

        <h2 className={styles.title_about}>О книге</h2>

        <div className={styles.description}>
          <p>{bookCurrent?.description}</p>

        </div>
    </div>

    <div className={styles.rating_container_wrapper}>
      <h2 className={styles.title_rating}>Рейтинг</h2>

      <hr className={styles.line} />

      <div className={styles.rating_wrapper}>
        <Rating ratingVal={bookCurrent?.rating} classStars={styles.rating_stars} classStar={styles.star} />
        {bookCurrent?.rating === null ? '' : <span className={styles.rating_value}>{bookCurrent?.rating}</span>}
      </div>
    </div>
    <div className={styles.about_wrapper}> 
      <div className={styles.table_header_wrapper}>
      <h1 className={styles.table_header}>Подробная информация</h1>
      <hr />
      </div>
      <table>
        <tbody className={styles.table_body}>
          <tr className={classNames(styles.table_column, styles.name_col1)}>
            <td className={styles.table_name}>Издательство</td>
            <td className={styles.table_name}>Год издания</td>
            <td className={styles.table_name}>Страниц</td>
            <td className={styles.table_name}>переплет</td>
            <td className={styles.table_name}>Формат</td>
          </tr>
          <tr className={classNames(styles.table_column, styles.value_col1)}>
            <td className={styles.table_value}>{bookCurrent?.publish}</td>
            <td className={styles.table_value}>{bookCurrent?.issueYear}</td>
            <td className={styles.table_value}>{bookCurrent?.pages}</td>
            <td className={styles.table_value}>{bookCurrent?.cover}</td>
            <td className={styles.table_value}>{bookCurrent?.format}</td>
          </tr> 
          <tr className={classNames(styles.table_column, styles.name_col2)}>
            <td className={styles.table_name}>Жанр</td>
            <td className={styles.table_name}>Вес</td>
            <td className={styles.table_name}>ISBN</td>
            <td className={styles.table_name}>Изготовитель</td>
          </tr>
          <tr className={classNames(styles.table_column, styles.value_col2)}>
            <td className={styles.table_value}>{bookCurrent?.categories?.join('')}</td>
            <td className={styles.table_value}>{bookCurrent?.weight}</td>
            <td className={styles.table_value}>{bookCurrent?.ISBN}</td>
            <td className={styles.table_value}>{bookCurrent?.producer}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className={styles.commentaries_wrapper}>
      <div className={styles.commentaries_inner}>
        {bookCurrent?.comments ? <button type='button' className={styles.title_comments} onClick={commentSectionHandler}>
          Oтзывы 
          <span className={styles.comment_quantity}>
            {bookCurrent?.comments.length}
            </span>
          <img src={arrow} alt='arrow' className={classNames(styles.title_arrow, !isCommentariesOpen && styles.title_arrow_active)} data-test-id='button-hide-reviews' />
        </button>
        : <span className={styles.title_comments}>Oтзывы 
        <span className={styles.comment_quantity}>0</span>
        </span>}
        {bookCurrent?.comments &&  <div className={classNames(styles.comments, !isCommentariesOpen && styles.comments_hidden)}>
        <hr className={styles.line} />
          {bookCurrent?.comments.map(({ id, rating, text, createdAt, user }) => <Commentary key={id}
                                user={user}
                                rating={rating}
                                id={id}
                                createdAt={createdAt}
                                text={text} />)}
        </div>}
      </div>
      <button type='button' className={styles.button_commentary}>Оценить книгу</button>
      </div>
  </section>
);
}