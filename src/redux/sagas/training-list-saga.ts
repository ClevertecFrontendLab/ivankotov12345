import { call, put, takeLatest } from 'redux-saga/effects';

import { instance } from '@axios/axios';
import { getTrainingListSuccess } from '@redux/slices/training-list';
import { AxiosPaths } from '@typing/enums/axios-paths';
import { AxiosResponse } from 'axios';
import { TrainingType } from '@typing/types/response-types';

function* trainingListWorker() {
  try {
    const { data }: AxiosResponse<TrainingType[]> = yield call(
      instance.get,
      AxiosPaths.TRAINING_LIST,
    );
    yield put(getTrainingListSuccess(data));
  } catch(error) {
    console.log(error)
  }
}

export function* trainingListWatcher() {
  yield takeLatest('trainingList/getTrainingListFetch', trainingListWorker);
}