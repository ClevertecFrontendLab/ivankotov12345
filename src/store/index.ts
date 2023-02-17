import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga'
import { booksReducer } from "./slices/books-slice";
import { rootSaga } from "./sagas/root-saga";
import { navigationReducer } from "./slices/navigation-list-slice";
import { bookReducer } from "./slices/book-slice";

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
    reducer: {
        books: booksReducer,
        navList: navigationReducer,
        book: bookReducer,
    },
    middleware: [sagaMiddleware],
    devTools: true,
})

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;