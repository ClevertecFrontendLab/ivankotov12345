import { all } from 'redux-saga/effects';
import { registrationWatcher } from './registration-saga';
import { authWatcher } from './auth-saga';
import { forgotPassWatcher } from './frogot-pass-saga';
import { confirmEmailWatcher } from './confirm-email-saga';
import { changePasswordWatcher } from './change-password-saga';
import { reviewsWatcher } from './reviews-saga';
import { authGoogleWatcher } from './auth-google-saga';
import { sendFeedbackWatcher } from './send-feedback-saga';
import { calendarWatcher } from './calendar-saga';
import { trainingListWatcher } from './training-list-saga';
import { createTrainingWatcher } from './create-training-saga';

export function* rootSaga() {
  yield all([
    authWatcher(),
    authGoogleWatcher(),
    registrationWatcher(),
    forgotPassWatcher(),
    confirmEmailWatcher(),
    changePasswordWatcher(),
    reviewsWatcher(),
    sendFeedbackWatcher(),
    calendarWatcher(),
    trainingListWatcher(),
    createTrainingWatcher(),
  ]);
}