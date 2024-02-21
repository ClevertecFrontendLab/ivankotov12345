import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects'
import { AxiosError } from 'axios';

import { instance } from '@axios/axios';
import { push } from 'redux-first-history';
import { AxiosPaths } from '@typing/enums/axios-paths';
import { FormInputValues } from '@typing/types/form-input-values';
import { Paths } from '@typing/enums/paths';
import { getRegistrationError, getRegistrationSuccess } from '@redux/slices/registration';
import { RegistrationMessages } from '@typing/enums/result-messages';



function* registrationWorker(action: PayloadAction<FormInputValues>) {
  try {
    yield call(
     instance.post,
     `${AxiosPaths.REGISTRATION}`,
     { ...action.payload },
    );
    yield put(getRegistrationSuccess({
      resultLabel: 'success',
      title: RegistrationMessages.registrationSuccessHeader,
      message: RegistrationMessages.registrationSuccess,
      buttonLink: Paths.AUTH,
      buttonText: RegistrationMessages.registrationSuccessButton,
    }));
    yield put(push(`${Paths.RESULT}${Paths.REGISTRATION_SUCCESS}`));
  } catch (error) {
    const { response } = error as AxiosError;
    if(response?.status === 409) {
      yield put(getRegistrationError({
        resultLabel: 'user exist',
        title: RegistrationMessages.registrationErrorHeader,
        message: RegistrationMessages.registrationErrorEmailExists,
        buttonLink: `${Paths.AUTH}${Paths.REGISTRATION}`,
        buttonText: RegistrationMessages.registrationErrorButton,
      }));
      yield put(push(`${Paths.RESULT}${Paths.ERROR_REGISTRATION_USER_EXIST}`));
    } else {
      yield put(getRegistrationError({
        resultLabel: 'try again',
        title: RegistrationMessages.registrationErrorHeader,
        message: RegistrationMessages.registrationSomethingGoesWrong,
        buttonLink: `${Paths.AUTH}${Paths.REGISTRATION}`,
        buttonText: RegistrationMessages.registrationErrorButtonTryAgain,
      }));
      yield put(push(`${Paths.RESULT}${Paths.REGISTRATION_ERROR}`));
    }
  }
}

export function* registrationWatcher() {
  yield takeLatest('registration/getRegistrationFetch', registrationWorker);
}