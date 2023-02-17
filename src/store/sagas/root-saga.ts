import { all } from 'redux-saga/effects'
import { bookWatcher } from './book-saga'
import { booksListRequestWatcher } from './books-saga'
import { navigationListRequestWatcher } from './nav-list-saga'

export function* rootSaga () {
    yield all([booksListRequestWatcher(), navigationListRequestWatcher(), bookWatcher()])
}