import { goForward, replace } from 'redux-first-history';
import { call, put, takeLatest } from 'redux-saga/effects';
import { instance } from '@axios/axios';
import { getResetPasswordError, getResetPasswordFetch, getResetPasswordSuccess } from '@redux/slices/recovery';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosPaths } from '@typing/enums/axios-paths';
import { Paths } from '@typing/enums/paths';
import { ChangePasswordErrorMessage, ChangePasswordSuccessMessage } from '@typing/enums/result-messages';
import { FormRecoveryInputValues } from '@typing/types/form-input-values';


function* changePasswordWorker(action: PayloadAction<FormRecoveryInputValues>) {
  try {
    yield call(
      instance.post,
      AxiosPaths.CHANGE_PASSWORD,
      action.payload,
      { withCredentials: true },
    )
    yield put(getResetPasswordSuccess({
      status: ChangePasswordSuccessMessage.status,
      title: ChangePasswordSuccessMessage.title,
      subTitle: ChangePasswordSuccessMessage.subTitle,
      buttonText: ChangePasswordSuccessMessage.buttonText,
      buttonLink: Paths.AUTH,
    }))
    yield put(replace(`${Paths.RESULT}${Paths.CHANGE_PASSWORD_SUCCESS}`));
    yield put(goForward());
  }
  catch(error) {
    yield put(getResetPasswordError({
      status: ChangePasswordErrorMessage.status,
      title: ChangePasswordErrorMessage.title,
      subTitle: ChangePasswordErrorMessage.subTitle,
      buttonText: ChangePasswordErrorMessage.buttonText,
      buttonLink: `${Paths.AUTH}${Paths.CHANGE_PASSWORD}`,
      retry: true,
    }));
    yield put(replace(`${Paths.RESULT}${Paths.ERROR_CHANGE_PASSWORD}`));
    yield put(goForward())
  }
}

export function* changePasswordWatcher() {
  yield takeLatest(getResetPasswordFetch.type, changePasswordWorker);
}