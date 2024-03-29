import { call, put, takeLatest } from 'redux-saga/effects';
import { instance } from '@axios/axios';
import { getTariffListFetch, getTariffListSuccss } from '@redux/slices/tariff';
import { AxiosPaths } from '@typing/enums/axios-paths';

function* tariffListWorker() {
  try {
    const { data } = yield call(
      instance.get,
      AxiosPaths.TARIFF_LIST,
    );

    yield put(getTariffListSuccss(data));
  } catch(error) {
    yield
  }
}

export function* tariffListWatcher() {
  yield takeLatest(getTariffListFetch.type, tariffListWorker);
}