import { call, put, takeLatest } from 'redux-saga/effects';
import { instance } from '@axios/axios';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosPaths } from '@typing/enums/axios-paths';
import { TrainingRequestType } from '@typing/types/request-types';
import { getCreateTrainingFetch, getCreateTrainingSuccess } from '@redux/slices/create-training';

function* createTrainingWorker(action: PayloadAction<TrainingRequestType>) {
  try {
    yield call(
      instance.post,
      AxiosPaths.TRAINING,
      action.payload,
    )
    yield put(getCreateTrainingSuccess());
  } catch(error) {
    console.log(error)
  }

}

export function* createTrainingWatcher() {
  yield takeLatest(getCreateTrainingFetch.type, createTrainingWorker);
}