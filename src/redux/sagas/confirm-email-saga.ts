import { goForward, replace } from 'redux-first-history';
import { call, put, takeLatest } from 'redux-saga/effects';
import { instance } from '@axios/axios';
import { getConfirmEmailError, getConfirmEmailFetch, getConfirmEmailSuccess } from '@redux/slices/recovery'
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosPaths } from '@typing/enums/axios-paths';
import { Paths } from '@typing/enums/paths';
import { FromRecoveryConfirmEmail } from '@typing/types/form-input-values';

function* confirmEmailWorker(action: PayloadAction<FromRecoveryConfirmEmail>) {
  try {
    yield call(
      instance.post,
      `${AxiosPaths.CONFIRM_EMAIL}`,
      action.payload,
      { withCredentials: true },
    );
    yield put(getConfirmEmailSuccess())
    yield put(replace(`${Paths.AUTH}${Paths.CHANGE_PASSWORD}`));
    yield put(goForward());
  } catch(error) {
    yield put(getConfirmEmailError());
  }
}

export function* confirmEmailWatcher() {
  yield takeLatest(getConfirmEmailFetch.type, confirmEmailWorker);
}