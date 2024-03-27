import { call, takeLatest } from 'redux-saga/effects';
import { instance } from '@axios/axios';
import { getPayTariffFetch } from '@redux/slices/tariff';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosPaths } from '@typing/enums/axios-paths';
import { PayTariffRequestType } from '@typing/types/request-types';

function* payTariffWorker(action: PayloadAction<PayTariffRequestType>) {
  try {
    yield call(
      instance.post,
      AxiosPaths.PAY_TARIFF,
      action.payload,
    )
  } catch(error) {
    yield
  }
}

export function* payTariffWatcher() {
  yield takeLatest(getPayTariffFetch.type, payTariffWorker);
}