import { call, put, select, takeLatest } from 'redux-saga/effects';

import {
  getRedactTrainingFetch,
  getRedactTrainingSuccess,
  trainingIdSelect } from '@redux/slices/redact-training';
import { instance } from '@axios/axios';
import { AxiosPaths } from '@typing/enums/axios-paths';
import { getCalendarFetch } from '@redux/slices/calendar';
import { PayloadAction } from '@reduxjs/toolkit';
import { ExerciseType } from '@typing/types/exercise-types';


function* redactTrainingWorker(action: PayloadAction<ExerciseType[]>) {
  try {
    const id: string = yield select(trainingIdSelect);
    yield call(
      instance.put,
      `${AxiosPaths.TRAINING}/${id}`,
      action.payload
    );
    yield put(getRedactTrainingSuccess());
    yield put(getCalendarFetch());
  } catch(error) {
    console.log(error)
  }
}

export function* redactTrainingWatcher() {
  yield takeLatest(getRedactTrainingFetch.type, redactTrainingWorker);
}