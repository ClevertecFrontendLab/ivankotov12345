import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { instance } from '@axios/axios';

import { getResetPasswordFetch, getResetPasswordSuccess } from '@redux/slices/recovery';
import { AxiosPaths } from '@typing/enums/axios-paths';
import { FormRecoveryInputValues } from '@typing/types/form-input-values';
import { goForward, replace } from 'redux-first-history';
import { Paths } from '@typing/enums/paths';
import { ChangePasswordSomethingGoesWrong, ChangePasswordSuccessMessage } from '@typing/enums/result-messages';
import { getRegistrationError } from '@redux/slices/registration';


export function* changePasswordWorker(action: PayloadAction<FormRecoveryInputValues>) {
  try {
    yield call(
      instance.post,
      AxiosPaths.CHANGE_PASSWORD,
      { ...action.payload },
      { withCredentials: true },
    )
    yield put(getResetPasswordSuccess({
      resultLabel: 'success',
      title: ChangePasswordSuccessMessage.title,
      message: ChangePasswordSuccessMessage.text,
      buttonLink: Paths.AUTH,
      buttonText: ChangePasswordSuccessMessage.buttonText,
    }))
    yield put(replace(`${Paths.RESULT}${Paths.CHANGE_PASSWORD_SUCCESS}`));
    yield put(goForward());
  }
  catch(error) {
    yield put(getRegistrationError({
      resultLabel: 'change password error',
      title: ChangePasswordSomethingGoesWrong.title,
      message: ChangePasswordSomethingGoesWrong.text,
      buttonLink: `${Paths.AUTH}${Paths.CHANGE_PASSWORD}`,
      buttonText: ChangePasswordSomethingGoesWrong.buttonText,
    }));
    yield put(replace(`${Paths.RESULT}${Paths.ERROR_CHANGE_PASSWORD}`));
    yield put(goForward())
  }
}

export function* changePasswordWatcher() {
  yield takeLatest(getResetPasswordFetch.type, changePasswordWorker);
}