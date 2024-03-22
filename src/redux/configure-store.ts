import { createReduxHistoryContext } from 'redux-first-history';
import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';

import { rootSaga } from './sagas/root-saga';
import { authReducer } from './slices/auth';
import { calendarReducer } from './slices/calendar';
import { createTrainingReducer } from './slices/create-training';
import { recoveryReducer } from './slices/recovery';
import { redactTrainingReducer } from './slices/redact-training';
import { registrationReducer } from './slices/registration';
import { reviewsReducer } from './slices/reviews';
import { sendFeedbackReducer } from './slices/send-feedback';
import { trainingListReducer } from './slices/training-list';
import { userReducer } from './slices/user';

const {
    createReduxHistory,
    routerMiddleware,
    routerReducer
  } = createReduxHistoryContext({
    history: createBrowserHistory(),
    savePreviousLocations: 1,
  });

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    router: routerReducer,
    auth: authReducer,
    registration: registrationReducer,
    recovery: recoveryReducer,
    reviews: reviewsReducer,
    sendFeedback: sendFeedbackReducer,
    calendar: calendarReducer,
    trainingList: trainingListReducer,
    createTraining: createTrainingReducer,
    redactTraining: redactTrainingReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(sagaMiddleware, routerMiddleware),
  devTools: true,
});

sagaMiddleware.run(rootSaga);
export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
