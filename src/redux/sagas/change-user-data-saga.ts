import { call, put, takeLatest } from 'redux-saga/effects';
import { instance } from '@axios/axios';
import { changeUserDataError, changeUserDataFetch, changeUserDataSuccess } from '@redux/slices/change-user-data';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosPaths } from '@typing/enums/axios-paths';
import { ChangeUserDataError } from '@typing/enums/result-messages';
import { UserDataValues } from '@typing/types/form-input-values';

function* changeUserDataWorker(action: PayloadAction<UserDataValues>) {
  try {
    yield call(
      instance.put,
      AxiosPaths.CHANGE_USER_INFO,
      action.payload,
    )
    yield put(changeUserDataSuccess());
  } catch(error) {
    yield put(changeUserDataError({
      error: ChangeUserDataError.status,
      title: ChangeUserDataError.title,
      text: ChangeUserDataError.text,
      buttonText: ChangeUserDataError.buttonText,
    }));
  }
};

export function* changeUserDataWatcher() {
  yield takeLatest(changeUserDataFetch.type, changeUserDataWorker);
};