import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

import { BookType } from '../../types/book-detailed-types';
import { API_LIST } from '../api';
import { getBookDataFail,getBookDataSuccess } from '../slices/book-slice';

function* bookWorker(action: PayloadAction<string>) {
    try {
        const { data }: AxiosResponse<BookType> = yield call(axios.get, `${API_LIST.BOOK_URL}${action.payload}`);

        yield put(getBookDataSuccess(data))
    } catch {
        yield put(getBookDataFail('Что-то пошло не так. Обновите страницу через некоторое время.'))
    }
}

export function* bookWatcher() {
    yield takeLatest('book/getBookFetch', bookWorker)
}