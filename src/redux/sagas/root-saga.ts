import { all } from 'redux-saga/effects';

import { authGoogleWatcher } from './auth-google-saga';
import { authWatcher } from './auth-saga';
import { calendarWatcher } from './calendar-saga';
import { changePasswordWatcher } from './change-password-saga';
import { changeUserDataWatcher } from './change-user-data-saga';
import { confirmEmailWatcher } from './confirm-email-saga';
import { createTrainingWatcher } from './create-training-saga';
import { forgotPassWatcher } from './frogot-pass-saga';
import { payTariffWatcher } from './pay-tariff-saga';
import { redactTrainingWatcher } from './redact-training-saga';
import { registrationWatcher } from './registration-saga';
import { reviewsWatcher } from './reviews-saga';
import { sendFeedbackWatcher } from './send-feedback-saga';
import { tariffListWatcher } from './tariff-list-saga';
import { trainingListWatcher } from './training-list-saga';
import { userWatcher } from './user-saga';

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
    redactTrainingWatcher(),
    userWatcher(),
    changeUserDataWatcher(),
    tariffListWatcher(),
    payTariffWatcher(),
  ]);
}