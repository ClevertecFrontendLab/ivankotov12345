import { getAuthGoogleFetch } from '@redux/slices/auth';
import { AxiosPaths } from '@typing/enums/axios-paths';
import { takeLatest } from 'redux-saga/effects'

function* authGoogleWorker() {
  try {
    yield window.location.href = `https://marathon-api.clevertec.ru${AxiosPaths.AUTH_GOOGLE}`;
  } catch(error) {
    console.log(error);
  }
}

export function* authGoogleWatcher() {
  yield takeLatest(getAuthGoogleFetch.type, authGoogleWorker);
}