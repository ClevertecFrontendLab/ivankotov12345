import { call, takeLatest } from 'redux-saga/effects';
import { instance } from '@axios/axios';
import { changeUserDataFetch } from '@redux/slices/change-user-data';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosPaths } from '@typing/enums/axios-paths';
import { UserDataValues } from '@typing/types/form-input-values';

function* changeUserDataWorker(action: PayloadAction<UserDataValues>) {
  try {
    yield call(
      instance.put,
      AxiosPaths.CHANGE_USER_INFO,
      action.payload,
    )
  } catch(error) {
    yield
  }
};

export function* changeUserDataWatcher() {
  yield takeLatest(changeUserDataFetch.type, changeUserDataWorker);
};