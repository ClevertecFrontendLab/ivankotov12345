import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { apiSlice } from '~/query/create-api';

import { authLoaderMiddleware } from './middleware/auth-loader-middleware';
import { appErrorMiddleware } from './middleware/error-middleware';
import { allergensReducer, allergensSlice } from './slices/allergens-slice';
import { appReducer, appSlice } from './slices/app-slice';
import { burgerReducer, burgerSlice } from './slices/burger-slice';
import { categoryReducer, categorySlice } from './slices/category-slice';
import { filterDrawerReducer, filterDrawerSlice } from './slices/filter-drawer-slice';
import { filtersReducer, filtersSlice } from './slices/filters-slice';
import { recipeReducer, recipeSlice } from './slices/recipe-slice';
import { searchInputReducer, searchInputSlice } from './slices/search-input-slice';
import { selectedRecipeReducer, selectedRecipeSlice } from './slices/selected-recipe-slice';

const isProduction = false;
const rootReducer = combineReducers({
    [appSlice.name]: appReducer,
    [allergensSlice.name]: allergensReducer,
    [burgerSlice.name]: burgerReducer,
    [filtersSlice.name]: filtersReducer,
    [selectedRecipeSlice.name]: selectedRecipeReducer,
    [recipeSlice.name]: recipeReducer,
    [filterDrawerSlice.name]: filterDrawerReducer,
    [searchInputSlice.name]: searchInputReducer,
    [categorySlice.name]: categoryReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            apiSlice.middleware,
            appErrorMiddleware,
            authLoaderMiddleware,
        ),
    devTools: !isProduction,
});
