import { call, put, takeLatest } from 'redux-saga/effects';
import { instance } from '@axios/axios';
import { getUserFetch, getUserSuccss } from '@redux/slices/user';
import { AxiosPaths } from '@typing/enums/axios-paths';
import { UserResponseType } from '@typing/types/response-types';
import { AxiosResponse } from 'axios';

function* userWorker() {
  try {
    const { data }: AxiosResponse<UserResponseType> = yield call(
      instance.get,
      AxiosPaths.USER_ME,
    );
    
    yield put(getUserSuccss(data));
  } catch(error) {
    yield
  }

}

export function* userWatcher() {
  yield takeLatest(getUserFetch.type, userWorker);
}