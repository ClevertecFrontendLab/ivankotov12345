import { call, put, takeLatest } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';

import { BookCardType } from '../../types/book-types';
import { API_LIST } from '../api';
import { getbooksDataFail, getBooksDataSuccess } from '../slices/books-slice';


function* booksListRequestWorker() {
    try {
        const { data }: AxiosResponse<BookCardType[]> = yield call(axios.get, API_LIST.BOOOKS_LIST_URL);

        yield put(getBooksDataSuccess(data))
    } catch {
        yield put(getbooksDataFail('Что-то пошло не так. Обновите страницу через некоторое время.'))
    }
}
export function* booksListRequestWatcher() {
    yield takeLatest('booksList/getBooksListFetch', booksListRequestWorker)
}