import { call, put, takeLatest } from 'redux-saga/effects';

import { instance } from '@axios/axios';
import { getTrainingListError, getTrainingListFetch, getTrainingListSuccess } from '@redux/slices/training-list';
import { AxiosPaths } from '@typing/enums/axios-paths';
import { AxiosResponse } from 'axios';
import { TrainingType } from '@typing/types/response-types';
import { GetTrainingListError } from '@typing/enums/result-messages';

function* trainingListWorker() {
  try {
    const { data }: AxiosResponse<TrainingType[]> = yield call(
      instance.get,
      AxiosPaths.TRAINING_LIST,
    );
    yield put(getTrainingListSuccess(data));
  } catch(error) {
    yield put(getTrainingListError({
      error: GetTrainingListError.status,
      title: GetTrainingListError.title,
      text: GetTrainingListError.text,
      buttonText: GetTrainingListError.buttonText,
    }));
  }
}

export function* trainingListWatcher() {
  yield takeLatest(getTrainingListFetch.type, trainingListWorker);
}