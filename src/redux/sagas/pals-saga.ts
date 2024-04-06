import { call, put, takeLatest } from 'redux-saga/effects';
import { instance } from '@axios/axios';
import { getPalsFetch, getPalsSuccess } from '@redux/slices/joint-trainings';
import { AxiosPaths } from '@typing/enums/axios-paths';

function* palsWorker() {
  try {
    const { data } = yield call(
      instance.get,
      AxiosPaths.TRAININGS_PALS,
    )
    
    yield put(getPalsSuccess(data));
  } catch(error) {
    yield
  }
}

export function* palsWatcher() {
    yield takeLatest(getPalsFetch.type, palsWorker);
}