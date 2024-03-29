import { takeLatest } from 'redux-saga/effects'
import { getAuthGoogleFetch } from '@redux/slices/auth';
import { AxiosPaths } from '@typing/enums/axios-paths';

function* authGoogleWorker() {
  yield window.location.href = `${AxiosPaths.BASE_URL}${AxiosPaths.AUTH_GOOGLE}`;
}

export function* authGoogleWatcher() {
  yield takeLatest(getAuthGoogleFetch.type, authGoogleWorker);
}