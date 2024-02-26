import { all } from 'redux-saga/effects';
import { registrationWatcher } from './registration-saga';
import { authWatcher } from './auth-saga';
import { forgotPassWatcher } from './frogot-pass-saga';
import { confirmEmailWatcher } from './confirm-email-saga';
import { changePasswordWatcher } from './change-password-saga';

export function* rootSaga() {
  yield all([
    authWatcher(),
    registrationWatcher(),
    forgotPassWatcher(),
    confirmEmailWatcher(),
    changePasswordWatcher(),
  ]);
}