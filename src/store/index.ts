import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit';

import { rootSaga } from './sagas/root-saga';
import { bookReducer } from './slices/book-slice';
import { booksReducer } from './slices/books-slice';
import { navigationReducer } from './slices/navigation-list-slice';
import { sortReducer } from './slices/sort-slice';

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
    reducer: {
        books: booksReducer,
        navList: navigationReducer,
        book: bookReducer,
        sort: sortReducer,
    },
    middleware: [sagaMiddleware],
    devTools: true,
})

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;