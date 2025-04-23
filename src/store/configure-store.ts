import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { apiSlice } from '~/query/create-api';

import appReducer, { appSlice } from './app-slice';
import { allergensReducer, allergensSlice } from './slices/allergens-slice';
import { filterDrawerReducer, filterDrawerSlice } from './slices/filter-drawer-slice';
import { filtersReducer, filtersSlice } from './slices/filters-slice';
import { filterRecipeReducer, filterRecipeSlice } from './slices/flter-recipe-slice';

const isProduction = false;
const rootReducer = combineReducers({
    [appSlice.name]: appReducer,
    [allergensSlice.name]: allergensReducer,
    [filtersSlice.name]: filtersReducer,
    [filterRecipeSlice.name]: filterRecipeReducer,
    [filterDrawerSlice.name]: filterDrawerReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: !isProduction,
});
