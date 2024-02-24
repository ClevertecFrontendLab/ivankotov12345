import { call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { push } from 'redux-first-history';
import { instance } from '@axios/axios';
import { AxiosPaths } from '@typing/enums/axios-paths';
import { PayloadAction } from '@reduxjs/toolkit';
import { FormRecoveryInputEmail } from '@typing/types/form-input-values';
import { Paths } from '@typing/enums/paths';
import { getForgotPassError, getForgotPassFetch, getForgotPassSuccess } from '@redux/slices/recovery';
import { ChangePasswordEmailExist, ChangePasswordSomethingGoesWrong } from '@typing/enums/result-messages';
import { MessageResponse } from '@typing/types/message-types';


export function* forgotPassWorker(action: PayloadAction<FormRecoveryInputEmail>) {
  try {
    yield call(
      instance.post,
      `${AxiosPaths.CHECK_EMAIL}`,
      { ...action.payload },
      {
        withCredentials: true,
      }
    )
    yield put(push(`${Paths.AUTH}${Paths.CONFIRM_EMAIL}`));
    yield put(getForgotPassSuccess())
  } catch(error) {
    const { response } = error as AxiosError;
    const responseData = response?.data as MessageResponse
    if(responseData.message === 'Email не найден') {
      yield put(getForgotPassError({
        resultLabel: 'error not found',
        title: ChangePasswordEmailExist.title,
        message: ChangePasswordEmailExist.text,
        buttonLink: `${Paths.AUTH}`,
        buttonText: ChangePasswordEmailExist.buttonText,
      }));
      yield put(push(`${Paths.RESULT}${Paths.ERROR_EMAIL_NO_EXIST}`));
    } else {
      yield put(getForgotPassError({
        resultLabel: 'something goes wrong',
        title: ChangePasswordSomethingGoesWrong.title,
        message: ChangePasswordSomethingGoesWrong.text,
        buttonLink: `${Paths.AUTH}`,
        buttonText: ChangePasswordSomethingGoesWrong.buttonText,
      }));
      yield put(push(`${Paths.RESULT}${Paths.ERROR_CHECK_EMAIL}`))
    }
  }
}

export function* forgotPassWatcher() {
  yield takeLatest(getForgotPassFetch.type, forgotPassWorker);
}