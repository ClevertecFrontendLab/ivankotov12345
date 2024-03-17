import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory } from 'history';
import { registrationReducer } from './slices/registration';
import { rootSaga } from './sagas/root-saga';
import { authReducer } from './slices/auth';
import { recoveryReducer } from './slices/recovery';
import { reviewsReducer } from './slices/reviews';
import { sendFeedbackReducer } from './slices/send-feedback';
import { calendarReducer } from './slices/calendar';
import { trainingListReducer } from './slices/training-list';
import { createTrainingReducer } from './slices/create-training';
import { redactTrainingReducer } from './slices/redact-training';

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
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(sagaMiddleware, routerMiddleware),
  devTools: true,
});

sagaMiddleware.run(rootSaga);
export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
