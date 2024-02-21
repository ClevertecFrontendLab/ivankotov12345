import { all } from 'redux-saga/effects';
import { registrationWatcher } from './registration-saga';
import { authWatcher } from './auth-saga';

export function* rootSaga() {
  yield all([
    authWatcher(),
    registrationWatcher(),
  ]);
}