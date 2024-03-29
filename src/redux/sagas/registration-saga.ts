import { push } from 'redux-first-history';
import { call, put, takeLatest } from 'redux-saga/effects'
import { instance } from '@axios/axios';
import { getRegistrationError, getRegistrationSuccess } from '@redux/slices/registration';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosPaths } from '@typing/enums/axios-paths';
import { ErrorStatus } from '@typing/enums/error-status';
import { Paths } from '@typing/enums/paths';
import {
  RegistrationMessageEmailExists,
  RegistrationMessageError,
  RegistrationMessageSuccess
} from '@typing/enums/result-messages';
import { FormInputValues } from '@typing/types/form-input-values';
import { AxiosError } from 'axios';

function* registrationWorker(action: PayloadAction<FormInputValues>) {
  try {
    yield call(
     instance.post,
     `${AxiosPaths.REGISTRATION}`,
     action.payload,
    );
    yield put(getRegistrationSuccess({
      status: RegistrationMessageSuccess.status,
      title: RegistrationMessageSuccess.title,
      subTitle: RegistrationMessageSuccess.subTitle,
      buttonText: RegistrationMessageSuccess.buttonText,
      buttonLink: Paths.AUTH
    }));
    yield put(push(`${Paths.RESULT}${Paths.REGISTRATION_SUCCESS}`));
  } catch (error) {
    const { response } = error as AxiosError;

    if(response?.status === ErrorStatus.EMAIL_EXISTS) {
      yield put(getRegistrationError({
        status: RegistrationMessageEmailExists.status,
        title: RegistrationMessageEmailExists.title,
        subTitle: RegistrationMessageEmailExists.subTitle,
        buttonText: RegistrationMessageEmailExists.buttonText,
        buttonLink: `${Paths.AUTH}${Paths.REGISTRATION}`
      }));
      yield put(push(`${Paths.RESULT}${Paths.ERROR_REGISTRATION_USER_EXIST}`));
    } else {
      yield put(getRegistrationError({
        status: RegistrationMessageError.status,
        title: RegistrationMessageError.title,
        subTitle: RegistrationMessageError.subTitle,
        buttonText: RegistrationMessageError.buttonText,
        buttonLink: `${Paths.AUTH}${Paths.REGISTRATION}`,
        retry: true,
      }));
      yield put(push(`${Paths.RESULT}${Paths.REGISTRATION_ERROR}`));
    }
  }
}

export function* registrationWatcher() {
  yield takeLatest('registration/getRegistrationFetch', registrationWorker);
}