import { AxiosResponse } from 'axios';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'redux-first-history';

import { instance } from '@axios/axios';
import { getAuthError, getAuthFetch, getAuthSuccess, rememberMeSelect } from '@redux/slices/auth';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosPaths } from '@typing/enums/axios-paths';
import { Paths } from '@typing/enums/paths';
import { FormInputValues } from '@typing/types/form-input-values';
import { AuthResponseType } from '@typing/types/response-types';
import { AuthMessage } from '@typing/enums/result-messages';

function* authWorker(action: PayloadAction<FormInputValues>) {
  try {
    const { data }: AxiosResponse<AuthResponseType> = yield call(
      instance.post,
      `${AxiosPaths.LOG_IN}`,
      action.payload
    );
    yield put(getAuthSuccess(data));

    const rememberMe: boolean = yield select(rememberMeSelect)

    if(rememberMe) {
      yield localStorage.setItem('token', data.accessToken);
    } else {
      yield sessionStorage.setItem('token', data.accessToken);
    }

    yield put(push(Paths.MAIN));
  } catch(error) {
    if(error) {
      yield put(getAuthError({
        status: AuthMessage.status,
        title: AuthMessage.title,
        subTitle: AuthMessage.subTitle,
        buttonText: AuthMessage.buttonText,
        buttonLink: Paths.AUTH
      }));
      yield put(push(`${Paths.RESULT}${Paths.ERROR_LOG_IN}`));
    }
  }
}

export function* authWatcher() {
  yield takeLatest(getAuthFetch.type, authWorker);
}